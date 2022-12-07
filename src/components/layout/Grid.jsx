import React from "react";

const Grid = ({ children }) => {
  return <div>{children}</div>;
};

const GridItem = () => {
  return <div></div>;
};

Grid.Item = GridItem;

export default Grid;
