"use client";
import React, { useContext, useEffect } from "react";
import { GoalsContext } from "../context/GoalsContextProvider";
import Loader from "@/components/ui/Loader";
import { Roadmap } from "@/types/roadmap";
import { CloudCheck } from "lucide-react";

export default function UpdatingGoalsIndicator({
  roadmap,
}: {
  roadmap?: Roadmap;
}) {
  const { goalsUpdating, setGoalsUpdating } = useContext(GoalsContext);

  useEffect(() => {
    if (!roadmap) return;
    setGoalsUpdating(false);
  }, [roadmap]);

  return (
    <>
      {goalsUpdating ? (
        <span className="text-xs text-primary/70 italic flex flex-col items-center me-5">
          <span className="w-4 h-4 border-2 border-primary/70 rounded-full border-b-secondary/40 border-r-secondary/40  animate-spin" />
          Saving changes...
        </span>
      ) : (
        <span className="text-xs text-primary/30 italic flex flex-col items-center me-5 text-center">
          <CloudCheck className="w-4 h-4" /> All changes saved
        </span>
      )}
    </>
  );
}
