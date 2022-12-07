import clsx from "clsx";
import React from "react";

const Grid = ({ className, gap = 0, children }) => {
  const classes = clsx(
    "grid",
    `gap-${gap}`,
    "grid-flow-row auto-rows-fr",
    className
  );
  return <div className={classes}>{children}</div>;
};

const GridItem = () => {
  return <div></div>;
};

Grid.Item = GridItem;

export default Grid;
