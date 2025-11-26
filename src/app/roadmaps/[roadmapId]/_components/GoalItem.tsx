import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";
import ConfirmButton from "@/components/ui/ConfirmButton";
import { deleteGoalAction } from "@/utils/entities/goals/server";
import AddGoalButton from "./AddGoalButton";
import { Goal, GoalStatus } from "@/types/roadmap";

export default function GoalItem({ goal }: { goal?: Goal }) {
  if (!goal) return null;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: goal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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

  const getStatusStyles = (status: GoalStatus) => {
    switch (status) {
      case "todo":
        return "bg-primary/10 hover:bg-[#d7d7e5]! border-2 border-dotted border-primary/15 ";
      case "inprogress":
        return "bg-foreground/8 hover:bg-[#d6d6d6]! border-2 border-dotted border-foreground/15  ";
      case "done":
        return "bg-secondary/10  hover:bg-[#cadfe0]! border-2 border-dotted border-secondary/15 ";
      default:
        return "text-text text-muted";
    }
  };

  return (
    <li
      className={`cursor-grab list-none bg-[#dedee8] hover:bg-[#e2e2e2] active:bg-[#d4d4dd] active:opacity-40 rounded-lg p-6 mb-3 ${getStatusStyles(
        goal.status
      )}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {/* ... */}
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{goal.name}</h4>
          <p className="text-text whitespace-break-spaces">
            {goal.description || "-"}
          </p>
          <span
            className={`${getPriorityStyles(
              goal.priority
            )} text-xs py-1 px-2 rounded capitalize mt-4 inline-block`}
          >
            {goal.priority}
          </span>
        </div>
        <ConfirmButton
          onConfirm={deleteGoalAction}
          values={{
            goalId: goal.id,
            roadmapId: goal.roadmap_id,
          }}
        >
          <Trash2
            size={14}
            className="text-red-300 cursor-pointer w-8 h-8 hover:text-red-400 transition p-2"
          />
        </ConfirmButton>
        {/* <AddGoalButton roadmapId={goal.roadmap_id} /> */}
      </div>
    </li>
  );
}
