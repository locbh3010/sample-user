import React from "react";

const Input = ({ type = "text", name, ...props }) => {
  return (
    <input
      className="block w-full py-3 border-b border-gray-light placeholder:text-gray-dark outline-none duration-300 focus:shadow px-2"
      type={type}
      name={name}
      id={name}
      {...props}
    />
  );
};

export default Input;
