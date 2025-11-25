"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FormProvider from "../global/form/FormProvider";
import SubmitButton from "../global/form/SubmitButton";
import { X } from "lucide-react";

export default function ConfirmButton({
  children,
  onConfirm,
  confirmTitle,
  values,
  onSuccess,
}: {
  children: React.ReactNode;
  onConfirm: (
    previousState: any,
    formData: FormData
  ) => Promise<{ status: "success" | "error"; message: string }>;
  confirmTitle?: string;
  values?: Record<string, string | number | boolean>;
  onSuccess?: () => void;
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
      {showConfirm ? (
        createPortal(
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 z-50">
            <FormProvider
              className="absolute confirm-form top-[10%] animate-move-down left-center w-[500px] max-w-[90%]  flex-center flex-col bg-white p-6 rounded shadow-md"
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
              <p className="text-xl">Are you sure?</p>
              <SubmitButton
                title={confirmTitle || "Confirm"}
                className="mt-6 min-w-[200px] text-sm"
              />
            </FormProvider>
          </div>,
          document.body
        )
      ) : (
        <button
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
      )}
    </>
  );
}
