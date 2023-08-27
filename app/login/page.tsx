"use client";

import { UserLogin } from "@/actions/auth";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import { logIn } from "@/redux/features/authSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);

  useEffect(() => {
    if (isAuth) {
      router.replace("/");
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isLoading } = useMutation((data) => UserLogin(data), {
    onSuccess: (res) => {
      router.push("/");
      toast.success("User Logged In Successfully.");
      dispatch(logIn(res.data));
    },
    onError: (err: any) => {
      toast.error(err.response.data.error || "something wrong happened.");
    },
  });

  const onSubmit = (data: any) => mutate(data);

  return (
    <section className="bg-grayWhite">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div
          className={`w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 ${
            isLoading ? "bg-transparent" : "bg-white shadow"
          }`}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-black">
                Sign in to your account
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email is Required." }}
                  render={({ field }) => (
                    <Input
                      field={{ ...field }}
                      label="Email"
                      placeholder="Enter Email"
                      errors={errors.email}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is Required." }}
                  render={({ field }) => (
                    <Input
                      field={{ ...field }}
                      label="Password"
                      placeholder="Enter Password"
                      type="password"
                      icon={showPassword ? AiOutlineEye : AiOutlineEyeInvisible}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      errors={errors.password}
                    />
                  )}
                />

                <button
                  className={`submit-btn ${
                    (!isValid || !isDirty) && "disabled"
                  }`}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  type="submit"
                  disabled={!isValid || !isDirty}
                >
                  Login
                </button>
              </form>
              <div className="text-center">
                <p
                  onClick={() => router.push("/signup")}
                  className="text-darkBlue hover:text-secondary cursor-pointer"
                >
                  Switch To Signup
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
