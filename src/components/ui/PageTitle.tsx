interface PageTitleProps {
  title: string;
  description: string;
}

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div className="max-lg:text-center">
      <h1 className="text-2xl lg:text-3xl font-bold ">{title}</h1>
      <p className="text-sm lg:text-base text-text mt-2 ">{description}</p>
    </div>
  );
}
