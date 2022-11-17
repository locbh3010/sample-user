import React from "react";
import { Outlet } from "react-router-dom";
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
