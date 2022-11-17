import React from "react";

export const BlogItem = () => {
  return (
    <div className="flex flex-col group gap-5.5">
      <div className="aspect-video overflow-hidden rounded-lg flex-shrink-0">
        <img
          src="https://i.pinimg.com/564x/ab/50/40/ab5040a1dd86289dd175ab4dce78d598.jpg"
          alt=""
          className="w-full h-full object-cover duration-300 group-hover:scale-125"
        />
      </div>
      <div className="flex flex-col flex-1">
        <span className="block text-gray-dark text-sm capitalize">
          Fashion - October 8, 2020
        </span>
        <p className="mt-1 mb-3.5 capitalize text-xl line-clamp-2 text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, ab.
        </p>
        <span className="text-gray-dark mb-6 line-clamp-2 mt-auto">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium
          ratione maxime fugiat tempore atque at. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Ullam iste cum ipsum! Incidunt voluptate
          id dicta cum iusto provident alias?
        </span>

        <span className="mt-auto text-accent capitalize font-bold">
          Read More
        </span>
      </div>
    </div>
  );
};
