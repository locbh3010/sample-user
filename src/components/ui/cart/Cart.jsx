import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../../icon/CloseIcon";
import { userStore } from "../../../store/user-store";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../configs/firebase-configs";
import clsx from "clsx";

export const Carts = () => {
  const { user } = userStore((state) => state);
  const [total, setTotal] = useState(0);
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      const cart = doc(collection(db, "carts"), user.id);
      onSnapshot(cart, (res) => {
        if (res.data()?.items?.length > 0) {
          setCarts(res.data().items);
        } else {
          setCarts([]);
        }
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
  const classesCart = clsx(
    "fixed bg-white border-l border-gray-400 w-full max-w-[calc(80*4px)] top-0 right-0 h-full duration-300 h-screen"
  );
  const handleClickButton = () => {
    const cartToggle = document.querySelector("input#cart-toggle");

    cartToggle.checked = false;
    navigate("/cart");
  };

  return (
    <>
      <div className={classesCart}>
        <div className="w-full h-full flex flex-col justiy-between">
          <div className="flex-shrink-0 w-full top-0 left-0 bg-white border-b border-gray-400 px-9 pt-[72px] justify-between flex items-center pb-4">
            <p className="font-semibold">Shopping bag</p>
            <label htmlFor="cart-toggle" className="cursor-pointer">
              <CloseIcon></CloseIcon>
            </label>
          </div>
          <div className="flex-1 px-7 py-8 overflow-y-scroll gap-7 flex flex-col">
            {carts?.length > 0 &&
              carts.map((cart) => (
                <CartItem key={cart.pid} cart={cart} uid={user?.id} />
              ))}
          </div>

          <div className="flex-shrink-0 w-full bottom-0 left-0 border-t border-gray-400 py-7 px-9 bg-white mt-auto">
            <div className="flex items-center justify-between font-medium mb-5">
              <span>Subtotal ({carts?.length})</span>
              <span>$ {total}</span>
            </div>
            <button
              className="btn btn-dark rounded-sm w-full uppercase"
              onClick={handleClickButton}
            >
              view cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const CartItem = React.memo(({ cart, uid }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const handleDeleteItem = () => {
    if (uid) {
      const cartRef = doc(collection(db, "carts"), uid);
      const { id } = data;

      getDoc(cartRef).then((res) => {
        if (res.data()) {
          const items = res.data().items;

          if (items.length > 0) {
            const index = items.findIndex((obj) => {
              return obj.pid === id;
            });

            items.splice(index, 1);

            setDoc(cartRef, { items });
          }
        }
      });
    }
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
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      {data && (
        <>
          <div
            className="overflow-hidden aspect-square rounded flex-shrink-0 cursor-pointer bg-gray-200"
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
