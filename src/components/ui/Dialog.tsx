import { X } from "lucide-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Dialog({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (open && !(event.target as HTMLElement).closest(".inside-dialog")) {
        onClose();
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, [open]);

  return (
    <>
      {createPortal(
        <div
          onPointerDown={(e) => e.stopPropagation()}
          className="fixed inset-0 bg-black/40 bg-opacity-50 z-1000"
        >
          <div className="inside-dialog absolute top-[10%] animate-move-down left-center w-[500px] max-w-[90%] bg-white p-6 pt-12 rounded shadow-md">
            <X
              onClick={(e) => {
                onClose();
                e.stopPropagation();
              }}
              size={20}
              className="absolute right-4 top-4 text-text/80 hover:text-text/60 cursor-pointer"
            />
            {children}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
