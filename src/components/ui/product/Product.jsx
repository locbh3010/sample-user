import { Button } from "myLib";
import React from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "../Tooltip";

export const ProductList = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-12 grid-flow-row auto-rows-fr sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
    <Tooltip tip={data.name}>
      <div className="w-full card card-compact md:card-normal cursor-pointer group">
        <figure
          className="rounded-lg overflow-hidden aspect-square rounded-b-none bg-gray-200 relative"
          onClick={handleNavigate}
        >
          <img
            src={data.images[0]}
            alt=""
            className="w-full h-full object-cover"
          />
          <button className="absolute bottom-0 left-0 w-full duration-300 bg-gray-300 py-5.5 uppercase text-black font-bold flex-center hover:bg-gray-400 hover:text-white translate-y-full group-hover:translate-y-0 text-xs xl:text-base">
            View detail
          </button>
        </figure>
        <div className="text-left mt-2 px-3">
          <h2 className="card-title line-clamp-1 font-medium sm:text-sm md:text-lg">
            {data.name}
          </h2>
          <p className="text-accent text-lg">${data.price}</p>
        </div>
      </div>
    </Tooltip>
  );
});

export const ProductItemSkeleton = () => {
  return (
    <div className="w-full card card-compact md:card-normal cursor-pointer group">
      <figure className="rounded-lg overflow-hidden aspect-square rounded-b-none bg-gray-light relative animate-pulse animation-delay-200"></figure>
      <div className="text-left mt-2 px-3">
        <div className="bg-gray-light animate-pulse w-full h-7 rounded animation-delay-500"></div>
        <div className="bg-gray-light animate-pulse w-1/3 h-5 rounded mt-3 animation-delay-1000"></div>
      </div>
    </div>
  );
};
