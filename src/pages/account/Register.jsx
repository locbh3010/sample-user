import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input/Input";
import { userStore } from "../../store/user-store";

const Register = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { signUp } = userStore((state) => state);

  const handleCreateUser = (value) => {
    signUp(value, () => {
      navigate("/");
    });
  };
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
          <form
            className="flex flex-col mt-32"
            onSubmit={handleSubmit(handleCreateUser)}
          >
            <div className="mb-11.5">
              <Input
                name="fullname"
                placeholder="Full name"
                control={control}
              />
            </div>
            <div className="mb-11.5">
              <Input name="email" placeholder="Email" control={control} />
            </div>
            <div className="mb-4">
              <Input
                name="password"
                placeholder="Password"
                type="password"
                control={control}
              />
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
