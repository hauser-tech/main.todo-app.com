"use client";

import { CreateUser } from "@/actions/auth";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import { useAppSelector } from "@/redux/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
    reset,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isLoading } = useMutation((data) => CreateUser(data), {
    onSuccess: (res) => {
      router.replace("/login");
      toast.success(res.data.message);
      reset();
    },
    onError: (err: any) => {
      toast.error(err.response.data.error);
    },
  });

  const onSubmit = (data: any) => mutate(data);

  const pass1 = watch("password");
  const pass2 = watch("confirmPassword");

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
                Sign up for your account
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
                      required={true}
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
                      errors={
                        errors.password ||
                        (pass1 !== pass2 && {
                          message: "Password do not match.",
                        })
                      }
                      required={true}
                    />
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{ required: "Confirm Password is Required." }}
                  render={({ field }) => (
                    <Input
                      field={{ ...field }}
                      label="Confirm Password"
                      placeholder="Enter Password"
                      type="password"
                      icon={showPassword ? AiOutlineEye : AiOutlineEyeInvisible}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      errors={
                        errors.confirmPassword ||
                        (pass1 !== pass2 && {
                          message: "Password do not match.",
                        })
                      }
                      required={true}
                    />
                  )}
                />

                <button
                  className={`submit-btn ${
                    (!isValid || !isDirty || pass1 !== pass2) && "disabled"
                  }`}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  type="submit"
                  disabled={!isValid || !isDirty || pass1 !== pass2}
                >
                  Signup
                </button>
              </form>
              <div className="text-center">
                <p
                  onClick={() => router.push("/login")}
                  className="text-darkBlue hover:text-secondary cursor-pointer"
                >
                  Switch To Login
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Signup;
