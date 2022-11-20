import React from "react";
import Button from "../../components/ui/button/Button";

const OrderSumary = () => {
  return (
    <div className="pt-24 pb-[250px]">
      <div className="container">
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
              <div className="flex items-center justify-between capitalize">
                <span>Lira Earrings</span>
                <span>$64</span>
              </div>
              <div className="flex items-center justify-between capitalize">
                <span>Ollie Earrings</span>
                <span>$10</span>
              </div>
              <div className="flex items-center justify-between capitalize">
                <span>Kaede Hair Pin</span>
                <span>$64</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-black uppercase">
              <span className="font-semibold">total</span>
              <span>$85</span>
            </div>
          </div>
          <div className="mt-10">
            <Button type="secondary">Place order</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSumary;
