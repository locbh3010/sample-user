import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import Checkbox from "../../components/ui/input/Checkbox";
import Input from "../../components/ui/input/Input";

const SignIn = () => {
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
                style={(isActive) => ({
                  background: isActive ? "white" : "transparent",
                })}
              >
                Sign in
              </NavLink>
              <NavLink
                to="/register"
                className={`w-full rounded-lg duration-300 bg-transparent hover:bg-white/50 cursor-pointer h-full flex-center py-3 text-xl font-medium`}
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
            <Checkbox name="remember" display="Remember me" />

            <div className="mt-17">
              <Button type="secondary">SIGN IN</Button>
            </div>
          </form>

          <NavLink
            to="/forgot-password"
            className="mt-3 block text-black font-medium text-center"
          >
            Have you forgotten your password?
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
