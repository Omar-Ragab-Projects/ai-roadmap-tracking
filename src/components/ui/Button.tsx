import { Loader, Loader2, LucideProps } from "lucide-react";

interface ButtonProps {
  title: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  varient?: "default" | "skeleton" | "cancel";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export default function Button({
  title,
  Icon,
  varient = "default",
  className = "",
  type = "submit",
  disabled = false,
  loading = false,
  onClick,
}: ButtonProps) {
  const buttonClassname = () => {
    let joinClasses = `flex-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all font-semibold ${className} `;

    switch (varient) {
      case "skeleton":
        joinClasses +=
          "text-black/70 hover:text-primary border-b border-transparent hover:border-primary/10 p-0! ";
        break;

      case "cancel":
        joinClasses +=
          "text-black/90 border border-gray/40 hover:text-black  hover:border-primary/30  ";
        break;

      default:
        joinClasses += "bg-primary text-white hover:bg-primary/95";
    }

    return joinClasses;
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={buttonClassname()}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {!loading && Icon && <Icon size={16} />}
      {!loading && title && <span>{title}</span>}
    </button>
  );
}
