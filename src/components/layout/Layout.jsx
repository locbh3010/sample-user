import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import Nav from "./Nav";

const Layout = () => {
  return (
    <div>
      <Nav></Nav>
      <Outlet />
      <Footer />
      <BottomNav></BottomNav>
    </div>
  );
};

export default Layout;
