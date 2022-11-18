import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input/Input";

const ForgotPassword = () => {
  const { control, handleSubmit } = useForm();

  const handleForgot = (value) => {};
  return (
    <div className="pt-32 pb-[250px]">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div>
            <h1 className="text-center mb-10 text-4xl font-medium">
              Have you Forgotten Your Password?
            </h1>
            <p className="text-center max-w-lg mx-auto mb-19 text-xl text-black font-medium">
              If you've forgotten your password, enter your e-mail address and
              we'll send you an e-mail
            </p>
          </div>

          <form
            className="flex flex-col gap-16"
            onSubmit={handleSubmit(handleForgot)}
          >
            <Input name="email" placeholder="Email" control={control} />
            <Button type="secondary">SIGN IN</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
