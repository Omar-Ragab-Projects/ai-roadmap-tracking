"use client";
import Button from "@/components/ui/Button";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  title: string;
}

export default function SubmitButton({ title }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className="flex-1 p-3!"
      title={pending ? "Loading..." : title}
      type="submit"
    />
  );
}
