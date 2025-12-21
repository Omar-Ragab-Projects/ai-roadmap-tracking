import Button from "@/components/ui/Button";
import { Goal, Roadmap } from "@/types/roadmap";
import React, { Ref } from "react";

interface SelectFocusProps {
  chooseFocusRef: Ref<HTMLDivElement> | null;
  isLoading: boolean;
  roadmaps: Roadmap[] | undefined;
  choosedRoadmap: Roadmap | null;
  choosedGoal: Goal | null;
  roadmapSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  goalSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  clearFocusPopup: () => void;
}

export default function SelectFocus({
  chooseFocusRef,
  isLoading,
  roadmaps,
  choosedRoadmap,
  choosedGoal,
  roadmapSelected,
  goalSelected,
  clearFocusPopup,
}: SelectFocusProps) {
  return (
    <div
      ref={chooseFocusRef}
      className="absolute inset-0 w-[full] h-full bg-white/60 rounded-lg backdrop-blur-sm z-20 py-8 px-[10%]"
    >
      <h2 className="text-2xl font-semibold mb-6">Select a Goal to Focus on</h2>
      <label>
        <select
          disabled={isLoading}
          value={choosedRoadmap?.id || ""}
          onChange={roadmapSelected}
        >
          {isLoading && <option>Loading Roadmaps...</option>}
          <option value="">Select Roadmap..</option>
          {roadmaps?.map((roadmap) => (
            <option key={roadmap.id} value={roadmap.id}>
              {roadmap.title}
            </option>
          ))}
        </select>
        {choosedRoadmap && (
          <select
            className="ml-4"
            value={choosedGoal?.id || ""}
            onChange={goalSelected}
          >
            <option value="">Select Goal..</option>
            {choosedRoadmap.goals?.map((goal) => (
              <option key={goal.id} value={goal.id}>
                {goal.name}
              </option>
            ))}
          </select>
        )}
        <Button className="ml-auto" onClick={clearFocusPopup}>
          {!choosedRoadmap && "Focus without choosing a roadmap"}
          {choosedRoadmap && !choosedGoal && "Focus without choosing a goal"}
          {choosedRoadmap && choosedGoal && "Focus on selected goal"}
        </Button>
      </label>
    </div>
  );
}
