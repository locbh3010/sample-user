import React from "react";
import { Link, Outlet } from "react-router-dom";
import CloseIcon from "../icon/CloseIcon";
import Button from "../ui/button/Button";
import Footer from "./Footer";
import Nav from "./Nav";

const Layout = () => {
  return (
    <div>
      <Nav></Nav>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
