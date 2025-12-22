"use client";
import { Loader2, LucideProps } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  title?: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  variant?: "default" | "skeleton" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  href?: string | undefined;
  children?: React.ReactNode;
}

export default function Button({
  children,
  title,
  Icon,
  variant = "default",
  className = "",
  type = "submit",
  disabled = false,
  loading = false,
  onClick,
  href = undefined,
}: ButtonProps) {
  const { pending } = useFormStatus();
  const isDisabled = pending || loading;

  const buttonClassname = () => {
    let joinClasses = `flex-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all font-semibold shadow text-sm lg:text-base ${className} ${
      isDisabled || disabled ? "opacity-50 cursor-auto! " : ""
    }`;

    switch (variant) {
      case "skeleton":
        joinClasses +=
          "text-black/70 hover:text-primary border-b border-transparent hover:border-primary/10 p-0! ";
        break;

      case "ghost":
        joinClasses +=
          "text-black/90 border border-gray/40 hover:text-black  hover:border-primary/30  ";
        break;

      default:
        joinClasses += "bg-primary text-white hover:bg-primary/95";
    }

    return joinClasses;
  };

  if (!href)
    return (
      <button
        onClick={onClick}
        type={type}
        disabled={isDisabled || disabled}
        className={buttonClassname()}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
      >
        {isDisabled && <Loader2 size={16} className="animate-spin" />}
        {!isDisabled && Icon && <Icon size={16} />}
        {!isDisabled && title && <span>{title}</span>}
        {children}
      </button>
    );

  if (href)
    return (
      <Link
        href={href}
        type={type}
        className={buttonClassname()}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
      >
        {Icon && <Icon size={16} />}
        {title && <span>{title}</span>}
        {children}
      </Link>
    );
}
