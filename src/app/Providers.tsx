"use client";
import FocusProvider from "@/context/FocusContext";
import ToastProvider from "@/context/ToastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <FocusProvider>{children}</FocusProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
