import React from "react";

const Checkbox = ({ name, display, ...props }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        className="w-4 h-4 rounded-[2px] border-gray-dark cursor-pointer"
        name={name}
        id={name}
        {...props}
      />

      {display && (
        <label
          htmlFor={name}
          className="text-black font-medium cursor-pointer select-none"
        >
          {display}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
