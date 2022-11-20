import React from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  function OrderItem() {
    return (
      <tr className="bg-white border-b">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
        >
          DKVUIAD801KDFN
        </th>
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
        >
          Pending
        </th>
        <td className="py-4 px-6">15 October 2022</td>
        <td className="py-4 px-6">$100</td>
        <td className="py-4 px-6 text-accent font-medium">
          <Link to="/order-preview">View Order</Link>
        </td>
      </tr>
    );
  }
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
              <OrderItem></OrderItem>
              <OrderItem></OrderItem>
              <OrderItem></OrderItem>
              <OrderItem></OrderItem>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
