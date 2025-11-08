import React from "react";

interface PageTitleProps {
  title: string;
  description: string;
}

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold ">{title}</h1>
      <p className="text-text mt-2">{description}</p>
    </div>
  );
}
