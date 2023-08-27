"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthCheck } from "@/auth-check/authcheck";
import { ToastContainer } from "react-toastify";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            retryOnMount: false,
            refetchOnWindowFocus: false,
            networkMode: "always",
          },
          mutations: {
            networkMode: "always",
          },
        },
      })
  );

  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthCheck>{children}</AuthCheck>
        </Provider>
      </QueryClientProvider>
    </>
  );
}
