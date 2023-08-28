import { UserLogout } from "@/actions/auth";
import { logOut } from "@/redux/features/authSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.authReducer.value.user);

  const { mutate, isLoading } = useMutation(() => UserLogout(), {
    onSuccess: (res) => {
      dispatch(logOut());
      router.replace("/login");
      toast.success("User Logged Out Successfully.");
    },
    onError: (err: any) => {
      toast.error(err.response.data.error || "something wrong happened.");
    },
  });

  return (
    <header className="text-gray-600 body-font bg-darkBlue">
      <div className="container mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
        <div className="flex title-font font-medium items-center text-secondary">
          <span>Hello,&nbsp;</span>
          <span className="text-sm uppercase">
            {user ? user?.email?.split("@")[0] : ""}
          </span>
        </div>

        <button
          className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"
          onClick={() => mutate()}
        >
          <span className="mr-1">Logout</span>
          <BsArrowRight />
        </button>
      </div>
    </header>
  );
};

export default Header;
