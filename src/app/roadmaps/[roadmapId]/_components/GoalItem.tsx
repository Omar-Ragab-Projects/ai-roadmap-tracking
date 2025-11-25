import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";
import ConfirmButton from "@/components/ui/ConfirmButton";
import { deleteGoalAction } from "@/utils/entities/goals/server";

export default function GoalItem({ goal }: { goal?: any }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: goal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-primary bg-red-100";
      case "medium":
        return "bg-secondary bg-yellow-100";
      case "low":
        return "bg-gray bg-green-100";
      default:
        return "text-text bg-muted";
    }
  };
  return (
    <li
      className="cursor-grab bg-primary/10 hover:bg-primary/15 active:bg-primary/20 rounded-lg p-6 mb-3"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {/* ... */}
      <div
        className="flex justify-between"
        onClick={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        onMouseEnter={(e) => e.preventDefault()}
        onMouseOver={(e) => e.preventDefault()}
      >
        <div>
          <h4 className="font-medium">{goal.name}</h4>
          <p className="text-text">{goal.description || "-"}</p>
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
            onClick={(e) => {
              e.preventDefault();
            }}
            size={18}
            className="text-red-400 cursor-pointer w-8 h-8 hover:text-red-500 p-2"
          />
        </ConfirmButton>
      </div>
    </li>
  );
}
