import clsx from "clsx";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userStore } from "../../store/user-store";
import BarIcon from "../icon/BarIcon";
import LogOutIcon from "../icon/LogOutIcon";
import SearchIcon from "../icon/SearchIcon";
import ShoppingCart from "../icon/ShoppingCart";
import UserIcon from "../icon/UserIcon";
import Button from "../ui/button/Button";
import { Carts } from "../ui/cart/Cart";
import Tooltip from "../ui/Tooltip";

export const MenuList = [
  {
    display: "Shop",
    to: "/shop",
  },
  {
    display: "Order",
    to: "/orders",
  },
  {
    display: "Blog",
    to: "/blogs",
  },
];
const MenuItem = ({ to, children }) => {
  const className = (isActive) => {
    const baseClass = "border-b-2 px-8 duration-300 py-6";
    return clsx(
      baseClass,
      isActive ? "border-b-blue-500" : "border-b-transparent"
    );
  };
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? className(isActive) : className(isActive)
      }
    >
      {children}
    </NavLink>
  );
};

const Nav = () => {
  const { user, signOut } = userStore((state) => state);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };
  const handleClickButtonCart = () => {
    if (user) {
      const cartToggle = document.querySelector("input#cart-toggle");
      cartToggle.checked = !cartToggle.checked;
    } else {
      navigate("/sign-in");
    }
  };

  const Navbar = () => {
    const DropdownItem = ({ to, children, onClick = () => {} }) => {
      return (
        <li onClick={onClick}>
          <Link
            to={to}
            className="flex items-center gap-4"
            style={{ borderRadius: "6px" }}
          >
            {children}
          </Link>
        </li>
      );
    };
    return (
      <div className="navbar p-0">
        <div className="navbar-start">
          <Link
            to="/"
            className={clsx(
              "text-xl uppercase font-semibold text-transparent",
              "bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500",
              "md:text-2xl lg:text-3xl"
            )}
          >
            GoldenBees
          </Link>
        </div>
        <div className="navbar-center">
          <ul className="hidden lg:block">
            {MenuList.map((menu) => (
              <MenuItem to={menu.to} key={menu.to}>
                {menu.display}
              </MenuItem>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex items-center gap-6">
            <button onClick={handleClickButtonCart}>
              <Tooltip tip="My cart" className="tooltip-bottom">
                <ShoppingCart className="pointer-events-none"></ShoppingCart>
              </Tooltip>
            </button>
            {!user ? (
              <Link to="/sign-in">
                <UserIcon></UserIcon>
              </Link>
            ) : (
              <div className="dropdown dropdown-end hidden lg:inline-block">
                <label tabIndex={0} className="mt-1 block cursor-pointer">
                  <Tooltip tip="my-account" className="tooltip-bottom">
                    <div className="avatar online">
                      <div className="w-12 rounded-full">
                        <img
                          src={user?.avatar}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </Tooltip>
                </label>
                <ul className="dropdown-content menu p-2 shadow rounded-md w-64 bg-base-100">
                  <DropdownItem to="/account">
                    <UserIcon></UserIcon>
                    Profile Detail
                  </DropdownItem>
                  <DropdownItem to="/favorites">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                    My Favorites
                  </DropdownItem>
                  <DropdownItem to="/cart">
                    <ShoppingCart></ShoppingCart>
                    My Cart
                  </DropdownItem>
                  <DropdownItem onClick={handleSignOut}>
                    <LogOutIcon></LogOutIcon>
                    Log Out
                  </DropdownItem>
                </ul>
              </div>
            )}
            <label
              htmlFor="my-drawer"
              className="drawer-button cursor-pointer lg:hidden"
            >
              <BarIcon></BarIcon>
            </label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full sticky top-0 left-0 z-50 bg-white/80 mb-4 backdrop-blur-sm">
      <div className="container">
        {/* <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-[35px] uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500"
          >
            GoldenBees
          </Link>
          <div className="flex items-center gap-16 capitalize font-medium">
            <div className="flex items-center">
              {MenuList.map((menu) => (
                <MenuItem to={menu.to} key={menu.display}>
                  {menu.display}
                </MenuItem>
              ))}
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
        </div> */}
        <Navbar></Navbar>
      </div>
    </div>
  );
};

export default Nav;
