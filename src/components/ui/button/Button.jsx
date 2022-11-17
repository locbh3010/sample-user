import React from "react";

const Button = ({ children, ...props }) => {
  return (
    <button
      className="block rounded py-4 w-full bg-transparent border border-black uppercase text-black font-bold duration-300 hover:bg-black hover:text-white"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
