import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  type = "primary",
  typeButton = "button",
  onClick = () => {},
  to,
  className,
  ...props
}) => {
  const classes = clsx(
    "block rounded py-4 w-full  border border-black uppercase  font-bold duration-300",
    type === "primary"
      ? "text-black bg-transparent hover:bg-black hover:text-white"
      : "bg-black text-white hover:bg-transparent hover:text-black",
    className
  );
  if (to)
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  else
    return (
      <button
        type={typeButton}
        className={classes}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
};

export default React.memo(Button);
