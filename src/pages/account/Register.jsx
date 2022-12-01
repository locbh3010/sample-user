import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input/Input";
import { userStore } from "../../store/user-store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../configs/firebase-configs";

const schema = yup.object().shape({
  fullname: yup.string().required().max(30).min(3),
  email: yup.string().email().required(),
  password: yup.string().min(1).max(16).required(),
});
const Register = () => {
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

  const handleCreateUser = async (value) => {
    const { email } = value;
    const userCol = collection(db, "users");
    const query_ = query(userCol, where("email", "==", email));
    const count = await getCountFromServer(query_);

    if (count.data().count) {
      toast.error("This email already exists");
    } else {
      addDoc(userCol, value).then((res) => {
        const currentUser = {
          id: res.id,
          ...value,
        };
        setUser(currentUser);
        navigate("/");
      });
    }
  };

  useEffect(() => {
    const errList = Object.values(errors);

    if (errList.length > 0) toast.error(errList[0].message);
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
              <Button type="secondary" typeButton="submit">
                register
              </Button>
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
