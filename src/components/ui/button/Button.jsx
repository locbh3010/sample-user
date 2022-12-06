import clsx from "clsx";
import React from "react";

const Button = ({
  children,
  type = "primary",
  typeButton = "button",
  onClick = () => {},
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
  return (
    <button type={typeButton} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default React.memo(Button);
