import React from "react";
import { Link } from "react-router-dom";
import CloseIcon from "../../components/icon/CloseIcon";
import Button from "../../components/ui/button/Button";

const CartPage = () => {
  const CartItem = () => {
    return (
      <div className="flex items-start gap-10 w-full relative pb-10 border-b border-gray-light">
        <div className="overflow-hidden rounded aspect-square w-[15%]">
          <img
            src="https://i.pinimg.com/236x/d0/f8/b8/d0f8b804a908ce4aaee63d54035d2192.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-xl text-black font-medium mb-3.5 capitalize">
            Lira Earrings
          </p>
          <p className="text-gray-dark">Black / Medium</p>
          <span className="text-accent">$20</span>
        </div>

        <button className="absolute top-0 right-0">
          <CloseIcon width="24px" />
        </button>
      </div>
    );
  };
  return (
    <div className="py-24 pb-[250px]">
      <div className="container">
        <h1 className="mb-16 text-center capitalize font-bold text-4xl text-black">
          shopping cart
        </h1>
        <div className="py-10 max-w-4xl mx-auto flex items-center justify-between">
          <div className="font-bold uppercase flex-1 flex-shrink-0 basis-[70%]">
            total: $10
          </div>
          <Button type="secondary">
            <Link to="/sumary">PROCEED TO CHECKOUT</Link>
          </Button>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 grid-flow-row auto-rows-fr gap-10">
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
