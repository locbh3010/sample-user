import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input/Input";

const Register = () => {
  return (
    <div className="pt-32 pb-[250px]">
      <div className="container">
        <div className="max-w-xl mx-auto">
          <div>
            <h1 className="mb-16 text-4xl text-black font-medium text-center">
              My account
            </h1>
            <div className="w-full grid grid-cols-2 gap-1.5 p-1.5 rounded-lg bg-gray-light">
              <NavLink
                to="/sign-in"
                className={`w-full rounded-lg duration-300 bg-transparent hover:bg-white/50 cursor-pointer h-full flex-center py-3 text-xl font-medium`}
              >
                Sign in
              </NavLink>
              <NavLink
                to="/register"
                className={`w-full rounded-lg duration-300 bg-transparent hover:bg-white/50 cursor-pointer h-full flex-center py-3 text-xl font-medium`}
                style={(isActive) => ({
                  background: isActive ? "white" : "transparent",
                })}
              >
                Register
              </NavLink>
            </div>
          </div>
          <form className="flex flex-col mt-32">
            <div className="mb-11.5">
              <Input name="email" placeholder="Email" />
            </div>
            <div className="mb-4">
              <Input name="password" placeholder="Password" type="password" />
            </div>

            <div className="mt-17">
              <Button type="secondary">register</Button>
            </div>
            <NavLink
              to="/forgot-password"
              className="mt-3 block text-black font-medium text-center"
            >
              Have an account <span className="underline">to sign in</span>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
