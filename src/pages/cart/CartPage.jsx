import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CloseIcon from "../../components/icon/CloseIcon";
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
      <div className="border-gray-light card gap-2 card-compact sm:card-normal sm:card-side">
        <figure className="overflow-hidden rounded aspect-video w-full bg-gray-100 relative sm:w-1/3 flex-shrink-0">
          {product?.images && (
            <img
              src={product.images[0]}
              alt=""
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => navigate(`/product/${data.pid}`)}
            />
          )}
          <button className="absolute top-2 right-2 btn btn-ghost sm:hidden">
            <CloseIcon />
          </button>
        </figure>
        <div className="card-body p-0">
          <p
            className="text-black font-medium capitalize card-title cursor-pointer basis-0"
            onClick={() => navigate(`/product/${data.pid}`)}
          >
            {product?.name}
          </p>
          <span className="text-accent text-lg flex-1">
            ${data.price} - Amount: {data.amount}
          </span>
        </div>
        <button
          className="btn btn-ghost hidden sm:block absolute top-3 right-3"
          onClick={handleDelete}
        >
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
        <div
          className="py-10
          max-w-4xl
          mx-auto
          flex
          items-start
          justify-between
          flex-col
          gap-3
          sm:flex-row
          "
        >
          <div className="font-bold uppercase flex-1 flex-shrink-0 basis-[70%]">
            total ({carts.length} Item): ${total}
          </div>
          <button
            className="btn bg-black rounded-sm text-white btn-sm sm:btn-md btn-ghost"
            onClick={handleNavigate}
          >
            CHECKOUT
          </button>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 grid-flow-row auto-rows-fr gap-7">
          {carts?.length > 0 &&
            carts.map((cart) => <CartItem key={cart.pid} data={cart} />)}
          {carts?.length === 0 && (
            <>
              <span>You have no items in your shopping cart</span>
              <div className="tooltip btn-wide" data-tip="Go to shop">
                <Link className="btn btn-secondary btn-wide" to="/shop">
                  Continue Shopping
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
