import React from "react";
import { useNavigate } from "react-router-dom";

export const ProductList = ({ children }) => {
  return (
    <div className="grid grid-cols-3 gap-12 grid-flow-row auto-rows-fr">
      {children}
    </div>
  );
};

export const ProductItem = React.memo(({ data }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${data.id}`);
  };
  return (
    <div className="w-full h-auto flex flex-col cursor-pointer group border border-gray-200">
      <div
        className="rounded-lg overflow-hidden mb-6 aspect-square flex-shrink-0 relative rounded-b-none"
        onClick={handleNavigate}
      >
        <img
          src={data.images[0]}
          alt=""
          className="w-full h-full object-cover rounded-lg scale-125 duration-300 group-hover:scale-150"
        />
        <button className="absolute bottom-0 left-0 w-full duration-300 bg-gray-300 py-5.5 uppercase text-black font-bold flex-center hover:bg-gray-400 hover:text-white translate-y-full group-hover:translate-y-0">
          add to cart
        </button>
      </div>
      <div className="flex-1 px-4 py-3">
        <span
          className="text-2xl font-normal mb-4 block line-clamp-1"
          onClick={handleNavigate}
        >
          {data.name}
        </span>
        <span className="text-xl font-medium text-accent block">
          ${data.price}
        </span>
      </div>
    </div>
  );
});
