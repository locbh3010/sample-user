import React, { useEffect, useReducer, useRef } from "react";
import { Link } from "react-router-dom";
import { cartStore } from "../../../store/cart-store";
import CloseIcon from "../../icon/CloseIcon";
import Button from "../button/Button";

export const Carts = () => {
  const { isOpen, handleOpenCart } = cartStore((state) => state);
  const handleClickOverlay = () => {
    handleOpenCart(false);
  };
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

          <CartList />

          <div className="flex-shrink-0 w-full bottom-0 left-0 border-t border-gray-400 py-7 px-9 bg-white">
            <div className="flex items-center justify-between font-medium mb-5">
              <span>Subtotal (5 items)</span>
              <span>$ 10,00</span>
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

const CartList = () => {
  return (
    <div className="flex-1 px-7 py-8 overflow-y-scroll gap-7 flex flex-col">
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
    </div>
  );
};

export const CartItem = () => {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <div className="overflow-hidden aspect-square rounded flex-shrink-0">
        <img
          src="https://i.pinimg.com/236x/2a/9b/d4/2a9bd4501756808d01ed7f70e2ea0106.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm line-clamp-1 flex-1">
            Lira Earrings
          </p>
          <button className="flex-shrink-0">
            <CloseIcon width="16px" />
          </button>
        </div>
        <span className="text-sm font-medium text-gray-dark">
          Black/ Medium
        </span>
        <span className="text-accent text-sm font-medium">$14,00</span>
      </div>
    </div>
  );
};
