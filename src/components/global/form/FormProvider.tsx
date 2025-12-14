"use client";
import { ToastContext } from "@/context/ToastContext";
import React, { useActionState, useContext, useEffect } from "react";

interface FormProviderProps {
  children: React.ReactNode;
  action: (
    previousState: any,
    formData: FormData
  ) => Promise<{ status: "success" | "error"; message: string; payload?: any }>;
  className?: string;
  onSuccess?: (payload?: any) => void;
  ref?: React.Ref<HTMLFormElement> | undefined;
  hiddenFields?: { name: string; value: string }[];
}

const initState = {
  message: "",
  status: "" as "success" | "error",
  payload: null,
};

export default function FormProvider({
  children,
  action,
  className = "",
  onSuccess,
  ref = undefined,
  hiddenFields = [],
}: FormProviderProps) {
  const [state, formAction, isPending] = useActionState(action, initState);
  const { setMessage } = useContext(ToastContext);

  useEffect(() => {
    if (!state) return;

    setMessage(state.message);

    if (state.status == "success" && onSuccess) {
      onSuccess(state.payload);
    }
  }, [state]);
  return (
    <form ref={ref} action={formAction} className={className}>
      {hiddenFields.map((field) => (
        <input
          key={field.name}
          type="hidden"
          name={field.name}
          defaultValue={field.value}
        />
      ))}
      {children}
    </form>
  );
}
