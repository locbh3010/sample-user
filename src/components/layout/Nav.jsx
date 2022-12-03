import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { cartStore } from "../../store/cart-store";
import { userStore } from "../../store/user-store";
import SearchIcon from "../icon/SearchIcon";
import ShoppingCart from "../icon/ShoppingCart";
import UserIcon from "../icon/UserIcon";
import Button from "../ui/button/Button";

const Nav = () => {
  const { user, signOut } = userStore((state) => state);
  const { handleOpenCart } = cartStore((state) => state);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const handleClickButtonCart = () => {
    if (user) {
      handleOpenCart();
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className="w-full sticky top-0 left-0 z-50 bg-white/80 mb-4 backdrop-blur-sm">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-[35px] uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500"
          >
            GoldenBees
          </Link>
          <div className="flex items-center gap-16 capitalize font-medium">
            <div className="flex items-center">
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-blue-500 px-8 border-b-2 py-8 duration-300"
                    : "border-b-transparent px-8 border-b-2 py-8 duration-300"
                }
              >
                Shop
              </NavLink>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-blue-500 px-8 border-b-2 py-8 duration-300"
                    : "border-b-transparent px-8 border-b-2 py-8 duration-300"
                }
              >
                Order
              </NavLink>
              {/* <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-blue-500 px-8 border-b-2 py-8 duration-300"
                    : "border-b-transparent px-8 border-b-2 py-8 duration-300"
                }
              >
                Blog
              </NavLink> */}
            </div>
            <Link to="/shop">
              <SearchIcon></SearchIcon>
            </Link>
            <button className="toggle-cart" onClick={handleClickButtonCart}>
              <ShoppingCart className="pointer-events-none"></ShoppingCart>
            </button>
            {!user ? (
              <Link to="/sign-in">
                <UserIcon></UserIcon>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/account"
                  className="rounded-full w-12 h-12 overflow-hidden bg-black flex-shrink-0"
                >
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </Link>
                <Button
                  type="secondary"
                  style={{ paddingInline: "16px" }}
                  onClick={handleSignOut}
                >
                  Sign out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
