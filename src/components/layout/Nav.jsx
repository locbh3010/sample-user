import React from "react";
import { Link } from "react-router-dom";
import { userStore } from "../../store/user-store";
import SearchIcon from "../icon/SearchIcon";
import ShoppingCart from "../icon/ShoppingCart";
import UserIcon from "../icon/UserIcon";
import Button from "../ui/button/Button";

const Nav = () => {
  const { user, signOut } = userStore((state) => state);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="w-full sticky top-0 left-0 z-50 bg-white/80 mb-4 py-4 backdrop-blur-sm">
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
            <Link to="/blogs">Blog</Link>
            <Link>
              <SearchIcon></SearchIcon>
            </Link>
            <Link>
              <ShoppingCart></ShoppingCart>
            </Link>
            {!user ? (
              <Link to="/sign-in">
                <UserIcon></UserIcon>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <div className="rounded-full w-12 h-12 overflow-hidden bg-black flex-shrink-0">
                  <img
                    src="https://fuziondigital.co.za/wp-content/uploads/Screenshot-2021-06-21-at-12-13-34-Default-Placeholder-Avatar-Profile-On-Gray-Background-Man-And-Woman-1.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
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
