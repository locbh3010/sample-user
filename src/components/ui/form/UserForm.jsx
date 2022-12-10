import {
  collection,
  doc,
  documentId,
  getCountFromServer,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { db } from "../../../configs/firebase-configs";
import { userStore } from "../../../store/user-store";
import Button from "../button/Button";
import Input from "../input/Input";
import { storage } from "../../../configs/firebase-configs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { nameRegExp, phoneRegExp, titleCase } from "../../../utils/function";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valids")
    .min(10)
    .max(11),
  fullname: yup.string().matches(nameRegExp, "Name is not valid").required(),
});
const UserForm = () => {
  const navigate = useNavigate();
  const userCol = collection(db, "users");
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const { user, setUser } = userStore((state) => state);
  const userRef = doc(userCol, user.id);
  const [searchParam] = useSearchParams();
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [changePass, setChangePass] = useState({
    oldPass: null,
    newPass: null,
    confirmPass: null,
  });
  const handleUpdateUser = async (value) => {
    value.fullname = value.fullname.replace(/\s\s+/g, " ");
    value.fullname = titleCase(value.fullname);

    const emailRef = query(
      userCol,
      where("email", "==", value.email),
      where(documentId(), "!=", user.id)
    );
    const phoneRef = query(
      userCol,
      where("phone", "==", value.phone),
      where(documentId(), "!=", user.id)
    );
    const countEmail = await getCountFromServer(emailRef);
    const countPhone = await getCountFromServer(phoneRef);
    if (countEmail.data().count >= 1) {
      toast.error("Email already exists");
      return;
    }
    if (countPhone.data().count >= 1) {
      toast.error("Phone already exitsts");
      return;
    }

    if (Object.values(errors).length === 0 || !Object.values(errors)) {
      updateDoc(userRef, value).then(() => {
        toast.success("Update profile success");
        setUser(value);
        return;
      });
    }
  };
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const { oldPass, newPass, confirmPass } = changePass;
    if (oldPass !== user.password) {
      toast.error("Wrong password");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error(
        "The new password must be the same as the confirmation password"
      );
      return;
    }
    if (newPass === oldPass) {
      toast.error("The new password must be different from the old password");
      return;
    }

    user.password = newPass;
    updateDoc(userRef, user);
    setUser(user);
    toast.success("Update password success");
    navigate("/account");
  };

  useEffect(() => {
    if (searchParam.get("changepass")) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [searchParam]);
  useEffect(() => {
    for (const key in user) setValue(key, user[key]);
    setAvatar(getValues().avatar);
  }, [user]);
  useEffect(() => {
    const errList = Object.values(errors);
    errList.length > 0 && toast.error(errList[0].message);
  }, [errors]);
  const handleInputChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file) {
        const storageRef = ref(storage, `/images/${user.id}/${file.name}`);

        uploadBytes(storageRef, file).then(async (snapshot) => {
          setLoading(true);
          await getDownloadURL(snapshot.ref).then((downloadURL) => {
            setAvatar(downloadURL);
            setValue("avatar", downloadURL);
          });

          setLoading(false);
        });
      }
    } else if (e.target.type === "password") {
      const dataType = e.target.dataset.type;
      setChangePass({
        ...changePass,
        [dataType]: e.target.value,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <NavLink
        to="/account"
        className={`fixed inset-0 bg-black/20 z-[100] duration-300 ${
          searchParam.get("changepass")
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      ></NavLink>
      <form
        className={`duration-300 bg-white rounded-lg p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[110] max-w-xl w-full ${
          searchParam.get("changepass")
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
        onSubmit={handleUpdatePassword}
      >
        <div className="w-full flex items-center">
          <NavLink to="/account" className="ml-auto">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </NavLink>
        </div>
        <div className="py-3">
          <h2 className="text-xl text-slate-900 capitalize">Update Password</h2>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter your old password"
            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
            data-type="oldPass"
            onChange={handleInputChange}
            required
          />
          <div className="w-full h-0.5 my-3 bg-gray-200"></div>
          <input
            type="password"
            placeholder="Enter your new password"
            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
            data-type="newPass"
            onChange={handleInputChange}
            min="6"
            max="16"
            required
          />
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
            data-type="confirmPass"
            onChange={handleInputChange}
            min="6"
            max="16"
            required
          />
          <Button typeButton="submit" type="secondary">
            Update
          </Button>
        </div>
      </form>
      <div className="flex items-center gap-8">
        <label
          className="w-24 h-24 rounded-full overflow-hidden block relative"
          htmlFor="avatar"
        >
          {loading && (
            <div className="absolute inset-0 bg-white/70 animate-pulse flex items-center justify-center"></div>
          )}
          <img
            src={avatar}
            alt=""
            className="w-full h-full bg-gray-300 object-cover"
          />
          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={handleInputChange}
            accept="image/png, image/jpeg, image/jpg, image/gif"
          />
        </label>
        <NavLink
          to="/account?changepass=true"
          className="block rounded-lg text-blue-500 bg-blue-500/25 font-medium text-lg px-3 py-4 capitalize"
        >
          Change password
        </NavLink>
      </div>

      <form
        onSubmit={handleSubmit(handleUpdateUser)}
        className="mt-10 flex flex-col gap-6"
      >
        <Input
          control={control}
          name="fullname"
          placeholder="Your fullname"
        ></Input>
        <Input control={control} name="email" placeholder="Your email"></Input>
        <Input
          control={control}
          name="phone"
          placeholder="Your phome number"
        ></Input>
        <Button typeButton="submit">Save change</Button>
      </form>
    </div>
  );
};

export default UserForm;
