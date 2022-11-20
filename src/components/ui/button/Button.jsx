import React from "react";

const Button = ({
  children,
  type = "primary",
  onClick = () => {},
  ...props
}) => {
  return (
    <button
      className={`block rounded py-4 w-full  border border-black uppercase  font-bold duration-300 ${
        type === "primary"
          ? "text-black bg-transparent hover:bg-black hover:text-white"
          : "bg-black text-white hover:bg-transparent hover:text-black"
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
