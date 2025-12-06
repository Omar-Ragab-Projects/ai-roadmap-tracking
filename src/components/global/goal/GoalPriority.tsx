import type { GoalPriority } from "@/types/roadmap";

export default function GoalPriority({
  priority,
  className,
}: {
  priority: GoalPriority;
  className?: string;
}) {
  const getPriorityStyles = (priority: GoalPriority) => {
    switch (priority) {
      case "high":
        return "bg-primary text-white";
      case "medium":
        return "bg-secondary/75 text-yellow-100";
      case "low":
        return "bg-gray text-white";
      default:
        return "text-text text-muted";
    }
  };

  return (
    <span
      className={`${getPriorityStyles(
        priority
      )} text-xs py-1 px-2 rounded capitalize mt-4 inline-block shadow-md ${className}`}
    >
      {priority}
    </span>
  );
}
