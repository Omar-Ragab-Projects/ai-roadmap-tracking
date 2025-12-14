"use client";
import React, { useEffect, useState } from "react";
import FormProvider from "../global/form/FormProvider";
import SubmitButton from "../global/form/SubmitButton";
import { X } from "lucide-react";
import { actionPromiseResponse } from "@/types/globalTypes";
import Dialog from "./Dialog";

export default function ConfirmButton({
  children,
  onConfirm,
  confirmTitle,
  values,
  onSuccess,
  className,
  message,
}: {
  children: React.ReactNode;
  onConfirm: (
    previousState: any,
    formData: FormData
  ) => Promise<actionPromiseResponse> | any;
  confirmTitle?: string;
  values?: Record<string, string | number | boolean>;
  onSuccess?: () => void;
  className?: string;
  message?: string;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const showConfirmation = () => setShowConfirm(true);
  const hideConfirmation = () => setShowConfirm(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showConfirm &&
        !(event.target as HTMLElement).closest(".confirm-form")
      ) {
        hideConfirmation();
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, [showConfirm]);

  return (
    <>
      {/* {!showConfirm && ( */}
      <button
        className={`active:outline-0 focus:outline-0 " + ${className || ""}`}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          showConfirmation();
        }}
      >
        {children}
      </button>
      {/* // )} */}

      <Dialog open={showConfirm} onClose={hideConfirmation}>
        <FormProvider
          className="flex-center flex-col confirm-form"
          action={onConfirm}
          onSuccess={() => {
            onSuccess && onSuccess();
            hideConfirmation();
          }}
        >
          {values &&
            Object.entries(values).map(([k, v]) => (
              <input key={k} type="hidden" name={k} value={String(v)} />
            ))}
          <X
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
            onClick={hideConfirmation}
            size={20}
            className="absolute right-4 top-4 text-text/80 hover:text-text/60 cursor-pointer"
          />
          <p className="text-xl">{message || "Are you sure?"}</p>
          <SubmitButton
            title={confirmTitle || "Confirm"}
            className="mt-6 min-w-[200px] text-sm"
          />
        </FormProvider>
      </Dialog>
    </>
  );
}
