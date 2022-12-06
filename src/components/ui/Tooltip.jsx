import clsx from "clsx";
import React from "react";

const Tooltip = ({ tip, className, children }) => {
  const classes = clsx("tooltip", className);
  return (
    <div className={classes} data-tip={tip}>
      {children}
    </div>
  );
};

export default Tooltip;
