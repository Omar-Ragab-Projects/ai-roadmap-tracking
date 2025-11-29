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
  ref?: React.Ref<HTMLFormElement> | undefined;
}

const initState = { message: "", status: "" as "success" | "error" };

export default function FormProvider({
  children,
  action,
  className = "",
  onSuccess,
  ref = undefined,
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
    <form ref={ref} action={formAction} className={className}>
      {children}
    </form>
  );
}
