"use client";
import { Roadmap } from "@/types/roadmap";
import GoalItem from "./GoalItem";

export default function MobileGoalsList({ roadmap }: { roadmap: Roadmap }) {
  return (
    <div className="xl:hidden">
      <ul className="mt-6">
        {roadmap.goals?.length === 0 && (
          <li className="text-center text-text/60 py-10">
            No goals added yet.
          </li>
        )}
        {roadmap.goals?.map((goal) => (
          <GoalItem key={goal.id} goal={goal} />
        ))}
      </ul>
    </div>
  );
}
