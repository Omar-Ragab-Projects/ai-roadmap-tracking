import GoalPriority from "@/components/global/goal/GoalPriority";
import { Goal, GoalStatus } from "@/types/roadmap";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function RecentGoals({ goals }: { goals: Goal[] }) {
  const latestDoneOrInprogressGoals = goals.filter(
    (goal) => goal.status != "todo"
  );

  return (
    <div className="card">
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
              className="flex-between bg-muted/50 p-4 rounded-xl shadow-md border border-border hover:bg-muted/70 transition-colors cursor-pointer gap-2"
              href={`/roadmaps/${goal.roadmap_id}`}
              // target="_blank"
            >
              <div className="max-w-[80%]">
                <h4 className="font-medium">{goal.name}</h4>
                <p className="text-text whitespace-break-spaces max-lines-2 mt-1">
                  {goal.description || "-"}
                </p>
              </div>
              <GoalPriority priority={goal.priority} />
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
