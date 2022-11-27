import React from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { userStore } from "../../store/user-store";

const classNameTabNonActive =
  "flex items-center px-5 py-3 font-medium border-b-2 cursor-pointer duration-300 gap-x-2 text-gray-500 border-b-transparent hover:border-b-blue-500 hover:text-blue-500";
const classNameTabIsActive =
  "flex items-center px-5 py-3 font-medium border-b-2 cursor-pointer duration-300 gap-x-2 text-blue-500 border-b-blue-500";
const MyAccount = () => {
  const { signOut } = userStore((state) => state);
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const handleLogOut = () => {
    signOut();
    navigate("/");
  };
  return (
    <div className="py-20 pt-16">
      <div className="container">
        <div className="py-10">
          <div
            className="flex overflow-x-auto gap-x-5 whitespace-nowrap font-medium"
            aria-label="tab-v4"
          >
            <NavLink
              to="/account"
              className={
                searchParam.get("address")
                  ? classNameTabNonActive
                  : classNameTabIsActive
              }
            >
              Profile detail
            </NavLink>
            <NavLink
              to="/account?address=true"
              className={
                !searchParam.get("address")
                  ? classNameTabNonActive
                  : classNameTabIsActive
              }
            >
              Address shipping
            </NavLink>
            <button
              className="rounded-lg font-medium bg-blue-100 text-blue-500 px-6 py-3"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4"></div>
      </div>
    </div>
  );
};

export default MyAccount;
