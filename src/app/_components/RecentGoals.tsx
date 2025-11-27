import { Goal, GoalStatus } from "@/types/roadmap";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function RecentGoals({ goals }: { goals: Goal[] }) {
  const getPriorityStyles = (priority: string) => {
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

  const latestDoneOrInprogressGoals = goals.filter(
    (goal) => goal.status != "todo"
  );

  return (
    <div className="bg-white rounded-xl shadow-md border border-border p-6 ">
      <h3>Recent Goals</h3>
      <p>Your latest achievements and in-progress goals</p>

      <ul className="mt-6">
        {latestDoneOrInprogressGoals.length === 0 && (
          <p className="w-full h-[300px] flex-center text-secondary font-bold tracking-widest text-xs">
            No goals found.
          </p>
        )}
        {latestDoneOrInprogressGoals.slice(0, 4).map((goal) => (
          <li key={goal.id} className="group relative not-last:mb-4">
            <Link
              className="flex-between bg-muted/50 p-4 rounded-xl shadow-md border border-border hover:bg-muted/70 transition-colors cursor-pointer"
              href={`/roadmaps/${goal.roadmap_id}`}
              target="_blank"
            >
              <div>
                <h4 className="font-medium">{goal.name}</h4>
                <p className="text-text whitespace-break-spaces">
                  {goal.description || "-"}
                </p>
              </div>
              <span
                className={`${getPriorityStyles(
                  goal.priority
                )} text-xs py-1 px-2 rounded capitalize mt-4 inline-block`}
              >
                {goal.priority}
              </span>
            </Link>
            <ExternalLink
              className="absolute top-2 right-2 text-secondary   group-hover:opacity-100 opacity-0 transition-opacity"
              size={12}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
