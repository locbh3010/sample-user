import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "../icon/SearchIcon";
import ShoppingCart from "../icon/ShoppingCart";
import UserIcon from "../icon/UserIcon";

const Nav = () => {
  return (
    <div className="w-full sticky top-0 left-0 z-50 bg-white mb-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-[35px] uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500"
          >
            GoldenBees
          </Link>
          <div className="flex items-center gap-16 capitalize font-medium">
            <Link to="/shop">Shop</Link>
            <Link>Our Story</Link>
            <Link>Blog</Link>
            <Link>
              <SearchIcon></SearchIcon>
            </Link>
            <Link>
              <ShoppingCart></ShoppingCart>
            </Link>
            <Link>
              <UserIcon></UserIcon>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
