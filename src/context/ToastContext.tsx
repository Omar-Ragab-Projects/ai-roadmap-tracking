"use client";
import { X } from "lucide-react";
import { createContext, useEffect, useState } from "react";

export const ToastContext = createContext<any>(null);

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState("");
  const clearMessage = () => setMessage("");

  useEffect(() => {
    if (!message) return;
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [message]);

  return (
    <ToastContext value={{ message, setMessage }}>
      {children}
      {message && (
        <span className="animate-move-left z-100 font-semibold shadow-md fixed h-fit top-6 right-4 border border-border bg-white py-2 pl-6 pr-10 w-fit rounded-lg">
          {message}
          <X
            onClick={clearMessage}
            size={14}
            className="absolute top-2 right-2 text-text"
          />
        </span>
      )}
    </ToastContext>
  );
}
