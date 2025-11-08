"use client";
import { ToastContext } from "@/context/ToastContext";
import React, { useActionState, useContext, useEffect } from "react";

interface FormProviderProps {
  children: React.ReactNode;
  action: (
    previousState: any,
    formData: FormData
  ) => Promise<{ status: "success" | "error"; message: string }>;
  className?: string;
  onSuccess?: () => void;
}

const initState = { message: "", status: "" as "success" | "error" };

export default function FormProvider({
  children,
  action,
  className = "",
  onSuccess,
}: FormProviderProps) {
  const [state, formAction, isPending] = useActionState(action, initState);
  const { setMessage } = useContext(ToastContext);

  useEffect(() => {
    if (!state) return;

    setMessage(state.message);

    if (state.status == "success" && onSuccess) {
      onSuccess();
    }
  }, [state]);
  return (
    <form action={formAction} className={className}>
      {children}
    </form>
  );
}
