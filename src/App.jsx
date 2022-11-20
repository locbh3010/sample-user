import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { Carts } from "./components/ui/cart/Cart";
import ForgotPassword from "./pages/account/ForgotPassword";
import Register from "./pages/account/Register";
import SignIn from "./pages/account/SignIn";
import Blog from "./pages/blog/Blog";
import Blogs from "./pages/blog/Blogs";
import CartPage from "./pages/cart/CartPage";
import Home from "./pages/home/Home";
import ProductDetail from "./pages/product/ProductDetail";
import Shop from "./pages/shop/Shop";
import { cartStore } from "./store/cart-store";
import { userStore } from "./store/user-store";

const App = () => {
  const user = userStore((state) => state.user);
  return (
    <div>
      <Carts />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/product/:id" element={<ProductDetail />}></Route>
          <Route
            path="/sign-in"
            element={<>{user ? <Navigate to="/"></Navigate> : <SignIn />}</>}
          ></Route>
          <Route
            path="/register"
            element={<>{user ? <Navigate to="/"></Navigate> : <Register />}</>}
          ></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/blog/:id" element={<Blog />}></Route>
          <Route
            path="/cart"
            element={!user ? <Navigate to="/sign-in"></Navigate> : <CartPage />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
