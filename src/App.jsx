import React, { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { Carts } from "./components/ui/cart/Cart";
import { cartStore } from "./store/cart-store";
// import ForgotPassword from "./pages/account/ForgotPassword";
// import Register from "./pages/account/Register";
// import SignIn from "./pages/account/SignIn";
// import Blog from "./pages/blog/Blog";
// import Blogs from "./pages/blog/Blogs";
// import CartPage from "./pages/cart/CartPage";
// import Home from "./pages/home/Home";
// import OrderPreview from "./pages/order/OrderPreview";
// import Orders from "./pages/order/Orders";
// import OrderSumary from "./pages/order/OrderSumary";
// import ProductDetail from "./pages/product/ProductDetail";
// import Shop from "./pages/shop/Shop";
import { userStore } from "./store/user-store";

const Home = lazy(() => import("./pages/home/Home"));
const OrderPreview = lazy(() => import("./pages/order/OrderPreview"));
const Orders = lazy(() => import("./pages/order/Orders"));
const OrderSumary = lazy(() => import("./pages/order/OrderSumary"));
const ProductDetail = lazy(() => import("./pages/product/ProductDetail"));
const Shop = lazy(() => import("./pages/shop/Shop"));
const ForgotPassword = lazy(() => import("./pages/account/ForgotPassword"));
const Register = lazy(() => import("./pages/account/Register"));
const SignIn = lazy(() => import("./pages/account/SignIn"));
const Blog = lazy(() => import("./pages/blog/Blog"));
const Blogs = lazy(() => import("./pages/blog/Blogs"));
const CartPage = lazy(() => import("./pages/cart/CartPage"));

const App = () => {
  const user = userStore((state) => state.user);

  return (
    <>
      <Carts />
      <Suspense>
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
              element={
                <>{user ? <Navigate to="/"></Navigate> : <Register />}</>
              }
            ></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/blogs" element={<Blogs />}></Route>
            <Route path="/blog/:id" element={<Blog />}></Route>
            <Route path="/order/:id" element={<OrderPreview />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/sumary" element={<OrderSumary />}></Route>
            <Route
              path="/cart"
              element={
                !user ? <Navigate to="/sign-in"></Navigate> : <CartPage />
              }
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
