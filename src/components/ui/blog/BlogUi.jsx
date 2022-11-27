import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const BlogItem = ({ blog }) => {
  const navigate = useNavigate();
  const description = useRef(null);

  useEffect(() => {
    description.current.textContent = "";
    description.current.insertAdjacentHTML("beforeend", blog.description);
  }, [blog]);

  const handleNavigate = () => {
    navigate("/blog/" + blog.id);
  };
  return (
    <div className="flex flex-col group gap-5.5">
      <div
        className="aspect-video overflow-hidden rounded-lg flex-shrink-0 cursor-pointer"
        onClick={handleNavigate}
      >
        <img
          src={blog.image}
          alt=""
          className="w-full h-full object-cover duration-300 group-hover:scale-125"
        />
      </div>
      <div className="flex flex-col flex-1">
        <span className="block text-gray-dark text-sm capitalize">
          {blog.categories} - {blog.createAt.toDate().toDateString()}
        </span>
        <p
          className="mt-1 mb-3.5 capitalize text-xl line-clamp-2 text-black cursor-pointer"
          onClick={handleNavigate}
        >
          {blog.name}
        </p>
        <span
          className="text-gray-dark mb-6 line-clamp-2 mt-auto"
          ref={description}
        ></span>

        <span
          className="mt-auto text-accent capitalize font-bold cursor-pointer"
          onClick={handleNavigate}
        >
          Read More
        </span>
      </div>
    </div>
  );
};
