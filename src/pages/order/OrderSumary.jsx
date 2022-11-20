import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/ui/button/Button";
import { db } from "../../configs/firebase-configs";
import { userStore } from "../../store/user-store";

export const SumaryItem = ({ data }) => {
  return (
    <div className="flex items-center justify-between capitalize">
      <span>
        {data.name} x {data.amount}
      </span>
      <span>${data.price}</span>
    </div>
  );
};

const OrderSumary = () => {
  const { user } = userStore((state) => state);
  const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      const cartRef = doc(collection(db, "carts"), user.id);

      getDoc(cartRef).then((res) => {
        if (res.data()?.items?.length > 0) setCarts(res.data().items);
      });
    }
  }, [user.id]);
  useEffect(() => {
    let total_ = 0;
    carts?.length > 0 &&
      carts.map((cart) => {
        total_ += cart.amount * cart.price;
      });

    setTotal(total_);
  }, [carts]);

  const handlePlaceOrder = () => {
    const date = new Date();

    const data = {
      uid: user.id,
      total,
      status: "pending",
      date,
      items: carts,
    };

    addDoc(collection(db, "orders"), data).then(() => {
      toast.success("Đặt hàng thành công");
      const cartRef = doc(collection(db, "carts"), user.id);

      carts.map((cart) => {
        const { pid, amount } = cart;
        const productRef = doc(collection(db, "products"), pid);
        getDoc(productRef).then((res) => {
          const data = res.data();
          data.count = data.count - amount;
          updateDoc(productRef, data);
        });
      });

      deleteDoc(cartRef);
      navigate("/orders");
    });
  };

  return (
    <div className="pt-24 pb-[250px]">
      <div className="container">
        {carts?.length > 0 && (
          <div className="max-w-xl mx-auto">
            <h1 className="text-center mb-10 capitalize font-medium text-3xl">
              order summary
            </h1>
            <div className="bg-gray-200 text-gray-dark py-10 px-15">
              <div className="flex items-center justify-between text-black mb-5.5 pb-4.5 uppercase border-b border-gray-dark">
                <span className="font-semibold">product</span>
                <span>total</span>
              </div>
              <div className="mb-6 py-3 border-b border-gray-dark flex flex-col gap-7">
                {carts?.length > 0 &&
                  carts.map((cart) => (
                    <SumaryItem key={cart.pid} data={cart} />
                  ))}
              </div>
              <div className="flex items-center justify-between text-black uppercase">
                <span className="font-semibold">total</span>
                <span>${total}</span>
              </div>
            </div>
            <div className="mt-10">
              <Button type="secondary" onClick={handlePlaceOrder}>
                Place order
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSumary;
