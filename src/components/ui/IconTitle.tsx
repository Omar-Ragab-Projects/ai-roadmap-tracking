import React from "react";
import PageTitle from "./PageTitle";
import { LucideProps } from "lucide-react";

interface IconTitleProps {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
  className?: string;
}

export default function IconTitle({
  Icon,
  title,
  description,
  className = "",
}: IconTitleProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      <Icon className="hidden lg:block bg-primary text-white w-12 h-12 p-2.5 rounded-lg bg-linear-to-br from-primary via-70% via-white/20 to-primary" />
      <div className="max-lg:text-center">
        <h1 className="font-bold ">{title}</h1>
        <p className="text-text lg:text-lg max-w-5/6 mt-2 max-lg:me-auto max-lg:ms-auto">
          {description}
        </p>
      </div>
    </div>
  );
}
