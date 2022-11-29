import React, { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { Carts } from "./components/ui/cart/Cart";
import { cartStore } from "./store/cart-store";
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
const NotFound = lazy(() => import("./pages/NotFound"));
const MyAccount = lazy(() => import("./pages/account/MyAccount"));

const Loading = () => {
  return (
    <div className="fixed z-[100] bg-slate-900 inset-0 flex items-center justify-center">
      <div role="status">
        <svg
          aria-hidden="true"
          className="mr-2 w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
const ScrollToTop = ({ children }) => {
  const location = useLocation();
  const handleOpenCart = cartStore((state) => state.handleOpenCart);

  useEffect(() => {
    handleOpenCart(false);
    window.scrollTo(0, 0);
  }, [location]);
  return <div>{children}</div>;
};
const App = () => {
  const user = userStore((state) => state.user);

  return (
    <>
      <ScrollToTop>
        {user && <Carts />}
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/shop" element={<Shop />}></Route>
              <Route path="/product/:id" element={<ProductDetail />}></Route>
              <Route
                path="/sign-in"
                element={
                  <>{user ? <Navigate to="/"></Navigate> : <SignIn />}</>
                }
              ></Route>
              <Route
                path="/register"
                element={
                  <>{user ? <Navigate to="/"></Navigate> : <Register />}</>
                }
              ></Route>
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
              ></Route>
              <Route path="/blogs" element={<Blogs />}></Route>
              <Route path="/blog/:id" element={<Blog />}></Route>
              <Route path="/order/:id" element={<OrderPreview />}></Route>
              <Route
                path="/orders"
                element={
                  !user ? <Navigate to="/sign-in"></Navigate> : <Orders />
                }
              ></Route>
              <Route path="/sumary" element={<OrderSumary />}></Route>
              <Route
                path="/cart"
                element={
                  !user ? <Navigate to="/sign-in"></Navigate> : <CartPage />
                }
              ></Route>
              <Route
                path="/account"
                element={
                  !user ? <Navigate to="/sign-in"></Navigate> : <MyAccount />
                }
              ></Route>
              <Route
                path="/address"
                element={
                  !user ? <Navigate to="/sign-in"></Navigate> : <MyAccount />
                }
              ></Route>
              <Route
                path="/favorites"
                element={
                  !user ? <Navigate to="/sign-in"></Navigate> : <MyAccount />
                }
              ></Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Suspense>
      </ScrollToTop>
    </>
  );
};

export default App;
