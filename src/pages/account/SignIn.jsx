import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import Checkbox from "../../components/ui/input/Checkbox";
import Input from "../../components/ui/input/Input";
import { userStore } from "../../store/user-store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../configs/firebase-configs";

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { setUser } = userStore((state) => state);
  const handleSignIn = (val) => {
    const { email, password } = val;
    const docRef = query(collection(db, "users"), where("email", "==", email));

    onSnapshot(docRef, (res) => {
      if (res.docs.length > 0) {
        res.docs.map((doc) => {
          const data = doc.data();

          if (data.password === password) {
            const currentUser = {
              id: doc.id,
              ...data,
            };

            setUser(currentUser);
            history.back();
            return;
          } else {
            toast.error("Password is wrong");
          }
        });
      } else {
        toast.error("Email is wrong");
        return;
      }
    });

    return;
  };

  useEffect(() => {
    if (Object.values(errors).length > 0) {
      toast.error(Object.values(errors)[0].message);
      return;
    }
  }, [errors]);

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

          <form
            className="flex flex-col mt-32"
            onSubmit={handleSubmit(handleSignIn)}
          >
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
            <Checkbox name="remember" display="Remember me" />

            <div className="mt-17">
              <Button type="secondary" typeButton="submit">
                SIGN IN
              </Button>
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
