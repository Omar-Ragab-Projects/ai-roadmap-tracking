import ReactMarkdown from "react-markdown";

export default function ResponseMarkdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      className={`${className} mark-down-parent wrap-break-word whitespace-pre-wrap  `}
      style={{ wordBreak: "break-word" }}
    >
      <ReactMarkdown
        components={{
          p: "span",
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
