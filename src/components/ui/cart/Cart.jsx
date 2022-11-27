import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartStore } from "../../../store/cart-store";
import CloseIcon from "../../icon/CloseIcon";
import Button from "../button/Button";
import { userStore } from "../../../store/user-store";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../../configs/firebase-configs";
import { applyActionCode } from "firebase/auth";

export const Carts = () => {
  const { isOpen, handleOpenCart } = cartStore((state) => state);
  const { user } = userStore((state) => state);
  const [total, setTotal] = useState(0);
  const handleClickOverlay = () => {
    handleOpenCart(false);
  };
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    if (user) {
      const cart = doc(collection(db, "carts"), user.id);
      onSnapshot(cart, (res) => {
        if (res.data()?.items?.length > 0) setCarts(res.data().items);
      });
    }
  }, [user]);
  useEffect(() => {
    let total_ = 0;
    carts?.length > 0 &&
      carts.map((cart) => {
        total_ = cart.price * cart.amount + total_;
      });

    setTotal(total_);
  }, [carts]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/80 duration-300 ${
          isOpen ? "opacity-40 visible" : "opacity-0 invisible"
        }`}
        onClick={handleClickOverlay}
      ></div>
      <div
        className={`fixed z-[100] bg-white border-l border-gray-400 w-[400px] top-0 right-0 h-full duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full h-full flex flex-col justiy-between">
          <div className="flex-shrink-0 w-full top-0 left-0 bg-white border-b border-gray-400 px-9 pt-[72px]">
            <p className="font-semibold mb-4">Shopping bag</p>
          </div>
          {carts?.length > 0 && <CartList carts={carts} user={user} />}

          <div className="flex-shrink-0 w-full bottom-0 left-0 border-t border-gray-400 py-7 px-9 bg-white mt-auto">
            <div className="flex items-center justify-between font-medium mb-5">
              <span>Subtotal ({carts.length})</span>
              <span>$ {total}</span>
            </div>
            <Link to="/cart">
              <Button type="primary">view cart</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const CartList = ({ carts, user }) => {
  return (
    <div className="flex-1 px-7 py-8 overflow-y-scroll gap-7 flex flex-col">
      {carts?.length > 0 &&
        carts.map((cart) => (
          <CartItem key={cart.pid} cart={cart} uid={user.id} />
        ))}
    </div>
  );
};

const CartItem = React.memo(({ cart, uid }) => {
  const [data, setData] = useState({});
  const cartRef = doc(collection(db, "carts"), uid);
  const navigate = useNavigate();
  const handleDeleteItem = () => {
    const { id } = data;

    onSnapshot(cartRef, (res) => {
      const items = res.data().items;
      const index = items.findIndex((obj) => {
        return obj.pid === id;
      });

      items.splice(index, 1);

      setDoc(cartRef, { items });
    });
  };
  const handleNavigate = () => {
    navigate(`/product/${data.id}`);
  };

  useEffect(() => {
    const { pid } = cart;
    const product = doc(collection(db, "products"), pid);

    onSnapshot(product, (res) => {
      setData({
        id: res.id,
        ...res.data(),
      });
    });
  }, [cart]);

  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      {data && (
        <>
          <div
            className="overflow-hidden aspect-square rounded flex-shrink-0 cursor-pointer"
            onClick={handleNavigate}
          >
            {data?.images?.length > 0 && (
              <img
                src={data?.images[0]}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p
                className="font-semibold text-sm line-clamp-1 flex-1 cursor-pointer"
                onClick={handleNavigate}
              >
                {data.name}
              </p>
              <button
                className="flex-shrink-0 relative z-50"
                onClick={handleDeleteItem}
              >
                <CloseIcon width="16px" />
              </button>
            </div>
            <span className="text-sm font-medium text-gray-dark">
              Số lượng: {cart.amount}
            </span>
            <span className="text-accent text-sm font-medium">
              ${data.price}
            </span>
          </div>
        </>
      )}
    </div>
  );
});
