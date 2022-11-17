import React from "react";
import { useController } from "react-hook-form";

const Input = ({
  type = "text",
  defaultValue = "",
  control,
  name,
  ...props
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue,
  });
  return (
    <input
      className="block w-full py-3 border-b border-gray-light placeholder:text-gray-dark outline-none duration-300 focus:shadow px-2"
      type={type}
      name={name}
      id={name}
      {...field}
      {...props}
    />
  );
};

export default Input;
