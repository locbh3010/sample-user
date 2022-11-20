import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  query,
  where,
  collection,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../configs/firebase-configs";
import { userStore } from "../../store/user-store";

const Orders = () => {
  const { user } = userStore((state) => state);
  const [orders, setOrders] = useState([]);
  const colRef = collection(db, "orders");
  function OrderItem({ order }) {
    return (
      <tr className="bg-white border-b">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
        >
          {order.id}
        </th>
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap capitalize"
        >
          {order.status}
        </th>
        <td className="py-4 px-6">{order.date.toDate().toDateString()}</td>
        <td className="py-4 px-6">${order.total}</td>
        <td className="py-4 px-6 text-accent font-medium">
          <Link to={`/order/${order.id}`}>View Order</Link>
        </td>
      </tr>
    );
  }

  useEffect(() => {
    if (user.id) {
      const orderQuery = query(colRef, where("uid", "==", user.id));
      onSnapshot(orderQuery, (res) => {
        let temp = [];
        const docs = res.docs;
        docs?.length > 0 &&
          docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));
        setOrders(temp);
      });
    }
  }, [user.id]);

  return (
    <div className="pt-24 pb-[250px]">
      <div className="container">
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Order id
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
                <th scope="col" className="py-3 px-6">
                  Date
                </th>
                <th scope="col" className="py-3 px-6">
                  Total
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.length > 0 &&
                orders.map((order) => (
                  <OrderItem key={order.id} order={order} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;