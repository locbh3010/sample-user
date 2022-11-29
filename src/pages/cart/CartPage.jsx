import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CloseIcon from "../../components/icon/CloseIcon";
import Button from "../../components/ui/button/Button";
import { db } from "../../configs/firebase-configs";
import { userStore } from "../../store/user-store";

const CartPage = () => {
  const [carts, setCarts] = useState([]);
  const { user } = userStore((state) => state);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const CartItem = ({ data }) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
      const { pid } = data;
      onSnapshot(doc(collection(db, "products"), pid), (res) => {
        setProduct({ ...res.data() });
      });
    }, [data]);
    const handleDelete = () => {
      const { pid } = data;
      const index = carts.findIndex((obj) => {
        return obj.pid === pid;
      });

      if (index !== -1) {
        carts.splice(index, 1);
        setDoc(doc(collection(db, "carts"), user.id), { items: carts });
      }
    };
    return (
      <div className="flex items-start gap-10 w-full relative pb-10 border-b border-gray-light">
        <div className="overflow-hidden rounded aspect-square w-[15%]">
          {product?.images && (
            <img
              src={product.images[0]}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <p className="text-xl text-black font-medium mb-3.5 capitalize">
            {product?.name}
          </p>
          <p className="text-gray-dark">Black / Medium</p>
          <span className="text-accent">
            ${data.price} - {data.amount}
          </span>
        </div>

        <button className="absolute top-0 right-0 z-50" onClick={handleDelete}>
          <CloseIcon width="24px" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (user) {
      const cart = doc(collection(db, "carts"), user.id);
      onSnapshot(cart, (res) => {
        if (res.data()?.items?.length > 0) setCarts(res.data().items);
        else setCarts([]);
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
  const handleNavigate = () => {
    if (carts?.length > 0) {
      navigate("/sumary");
    } else {
      toast.error("You have no products in your shopping cart");
    }
  };
  return (
    <div className="py-24 pb-[250px]">
      <div className="container">
        <h1 className="mb-16 text-center capitalize font-bold text-4xl text-black">
          shopping cart
        </h1>
        <div className="py-10 max-w-4xl mx-auto flex items-center justify-between">
          <div className="font-bold uppercase flex-1 flex-shrink-0 basis-[70%]">
            total ({carts.length} Item): ${total}
          </div>
          <Button type="secondary">
            <span onClick={handleNavigate}>PROCEED TO CHECKOUT</span>
          </Button>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 grid-flow-row auto-rows-fr gap-10">
          {carts?.length > 0 &&
            carts.map((cart) => <CartItem key={cart.pid} data={cart} />)}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
