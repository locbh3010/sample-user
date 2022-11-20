import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../configs/firebase-configs";
import { SumaryItem } from "./OrderSumary";

const OrderPreview = () => {
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const colRef = collection(db, "orders");

  useEffect(() => {
    const orderRef = doc(colRef, id);
    getDoc(orderRef).then((res) => {
      setOrder({ id: res.id, ...res.data() });
    });
  }, [id]);

  return (
    <div className="pt-24 pb-[250px]">
      <div className="container">
        {order && (
          <div className="max-w-xl mx-auto">
            <h1 className="text-center mb-10 capitalize font-medium text-3xl">
              order preview
            </h1>
            <div className="bg-gray-200 text-gray-dark py-10 px-15">
              <div className="flex items-center justify-between text-black mb-5.5 pb-4.5 uppercase border-b border-gray-dark">
                <span className="font-semibold">product</span>
                <span>total</span>
              </div>
              <div className="mb-6 py-3 border-b border-gray-dark flex flex-col gap-7">
                {order.items?.length > 0 &&
                  order.items.map((item) => (
                    <SumaryItem key={item.pid} data={item} />
                  ))}
              </div>
              <div className="flex items-center justify-between text-black uppercase mb-4 border-b border-gray-300 pb-4">
                <span className="font-medium">shipping</span>
                <span>free shipping</span>
              </div>
              <div className="flex items-center justify-between text-black uppercase">
                <span className="font-semibold">total</span>
                <span>${order.total}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPreview;
