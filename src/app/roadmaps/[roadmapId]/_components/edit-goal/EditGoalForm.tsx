import FormGroup from "@/components/global/form/FormGroup";
import FormProvider from "@/components/global/form/FormProvider";
import SubmitButton from "@/components/global/form/SubmitButton";
import { Goal } from "@/types/roadmap";
import { updateGoalAction } from "@/utils/entities/goals/server";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const priorityOptions = [
  { color: "#afaeb4", value: "low", label: "Low" },
  { color: "#008994", value: "medium", label: "Medium" },
  { color: "#5554b6", value: "high", label: "High" },
];

export default function EditGoalForm({
  hideEditRoadmap,
  goal,
}: {
  hideEditRoadmap: () => void;
  goal: Goal;
}) {
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    if (goal.priority) {
      setPriority(goal.priority);
    }
  }, [goal.priority]);

  return (
    <FormProvider
      className="flex flex-col edit-goal-form"
      action={updateGoalAction}
      onSuccess={hideEditRoadmap}
    >
      <p className="text-xl text-primary/80 text-center font-semibold mb-3 text-shadow-md">
        Edit goal in current roadmap
      </p>
      <input
        type="text"
        name="roadmapId"
        defaultValue={goal.roadmap_id}
        hidden
      />
      <input
        type="text"
        name="roadmapId"
        defaultValue={goal.roadmap_id}
        hidden
      />
      <input type="text" name="goalId" defaultValue={goal.id} hidden />
      <FormGroup
        label={"Title"}
        name={"name"}
        placeholder="Learn HTML..."
        required
        defaultValue={goal.name}
      />
      <FormGroup
        textarea
        label={"Description"}
        name={"description"}
        placeholder="Watch 4 hours daily of Elzero course..."
        defaultValue={goal.description || ""}
      />
      <div className="mt-6 flex items-center gap-4">
        <label>Priority:</label>
        <div className="flex-1 flex gap-2">
          {priorityOptions.map((option) => (
            <div className="flex-1 ">
              <input
                type="radio"
                name="priority"
                value={priority}
                onChange={() => setPriority(option.value)}
                id={option.value}
                hidden
              />
              <label htmlFor={option.value}>
                <div
                  className={`flex-center gap-2 cursor-pointer p-2 border border-primary/20 rounded mt-2 hover:bg-primary/10 
                          ${priority == option.value ? "bg-primary/15!" : ""}`}
                >
                  <span
                    className="w-3 h-3 rounded-full inline-block "
                    style={{ backgroundColor: option.color }}
                  />
                  <span className="text-sm text-foreground/70">
                    {option.label}
                  </span>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
      <SubmitButton
        title={"Edit Goal"}
        className="mt-6 min-w-[200px] text-sm"
      />
    </FormProvider>
  );
}
