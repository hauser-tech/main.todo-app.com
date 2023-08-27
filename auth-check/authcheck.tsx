"use client";

import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetUser } from "@/actions/auth";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/features/authSlice";
import { useRouter, usePathname } from "next/navigation";
import Loader from "@/components/Loader";

const protectedRoutes: string[] = ["/"];

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();

  const dispatch = useDispatch<AppDispatch>();

  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);

  const pathProtected = useMemo(
    () => protectedRoutes.indexOf(pathName) !== -1,
    [pathName]
  );

  const { isLoading } = useQuery(["userData"], () => GetUser(), {
    onSuccess: ({ data }) => {
      dispatch(logIn(data));
    },
    onError: () => {
      if (pathProtected) {
        router.replace("/login");
      }
    },
    enabled: !isAuth ? true : false,
  });

  return (
    <>
      {(!isAuth || isLoading) && pathProtected ? (
        <div className="flex h-screen justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
