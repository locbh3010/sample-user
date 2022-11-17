import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ForgotPassword from "./pages/account/ForgotPassword";
import Register from "./pages/account/Register";
import SignIn from "./pages/account/SignIn";
import Home from "./pages/home/Home";
import ProductDetail from "./pages/product/ProductDetail";
import Shop from "./pages/shop/Shop";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/product/:id" element={<ProductDetail />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
