import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userStore } from "../../store/user-store";
import CloseIcon from "../icon/CloseIcon";
import ShoppingCart from "../icon/ShoppingCart";
import UserIcon from "../icon/UserIcon";
import { MenuList } from "./Nav";

const handleClickMenuItem = () => {
  const myDrawer = document.querySelector("input#my-drawer");
  myDrawer.checked = false;
};

const MobileNav = () => {
  const { user, signOut } = userStore((state) => state);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
    handleClickMenuItem();
  };
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 max-w-[calc(80*4px)] bg-base-100 text-base-content w-full my-drawer menu-vertical">
        <div className="flex w-full py-3">
          <label
            htmlFor="my-drawer"
            className="ml-auto drawer-button cursor-pointer"
          >
            <CloseIcon></CloseIcon>
          </label>
        </div>

        <Link
          to="/"
          className="text-[35px] uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-4"
          onClick={handleClickMenuItem}
        >
          GoldenBees
        </Link>

        {MenuList.map((menu) => {
          return (
            <li key={menu.to} onClick={handleClickMenuItem}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "bg-gray-200" : "bg-transparent"
                }
                to={menu.to}
              >
                {menu.display}
              </NavLink>
            </li>
          );
        })}

        {user && (
          <>
            <div className="mt-4 border-t border-t-gray-300">
              <div>
                <label
                  htmlFor="toggle-dropdown"
                  className="w-full flex gap-3 items-center p-4 mb-0 active:bg-primary duration-300 active:text-white"
                >
                  <div className="avatar online">
                    <div className="w-12 rounded-full">
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="line-clamp-1 font-bold">{user.fullname}</p>
                </label>
                <input
                  type="checkbox"
                  id="toggle-dropdown"
                  className="hidden"
                />
                <ul className="menu dropdown-list duration-300 overflow-hidden">
                  <li onClick={handleClickMenuItem}>
                    <Link
                      to="/account"
                      className="flex items-center gap-4 capitalize"
                    >
                      <UserIcon></UserIcon>
                      profile detail
                    </Link>
                  </li>
                  <li onClick={handleClickMenuItem}>
                    <Link
                      to="/favorites"
                      className="flex items-center gap-4 capitalize"
                    >
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
                      My favorites
                    </Link>
                  </li>
                  <li onClick={handleClickMenuItem}>
                    <Link
                      to="/cart"
                      className="flex items-center gap-4 capitalize"
                    >
                      <ShoppingCart></ShoppingCart>
                      My cart
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <li
              className="mt-auto flex items-center gap-3 w-full btn btn-secondary justify-center"
              onClick={handleSignOut}
            >
              Log Out
            </li>
          </>
        )}
        {!user && (
          <Link
            className="btn btn-secondary mt-auto w-full"
            to="/sign-in"
            onClick={handleClickMenuItem}
          >
            Sign In
          </Link>
        )}
      </ul>
    </div>
  );
};

export default MobileNav;
