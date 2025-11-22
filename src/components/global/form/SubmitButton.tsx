"use client";
import Button from "@/components/ui/Button";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  title?: string;
  className?: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> &
      React.RefAttributes<SVGSVGElement>
  >;
}

export default function SubmitButton({
  title = "",
  className = "",
  Icon,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={`flex-1 p-3! ${className}`}
      disabled={pending}
      loading={pending}
      type="submit"
      title={title}
      Icon={Icon}
    />
  );
}
