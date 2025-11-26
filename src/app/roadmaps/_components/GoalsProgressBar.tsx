"use client";
import ProgressBar from "@/components/ui/ProgressBar";
import { Roadmap } from "@/types/roadmap";
import { useCallback } from "react";

export default function GoalsProgressBar({ roadmap }: { roadmap: Roadmap }) {
  const doneGoalsCount =
    roadmap.goals?.filter((goal) => goal.status == "done").length || 0;

  const progressPercentage = useCallback(() => {
    if (!roadmap.goals || roadmap.goals?.length === 0) return 0;
    return Math.min(
      Math.round((doneGoalsCount / roadmap.goals.length) * 100),
      100
    );
  }, [roadmap.goals]);

  return <ProgressBar percentage={progressPercentage()} />;
}
