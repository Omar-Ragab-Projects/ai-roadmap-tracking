import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmButton from "@/components/ui/ConfirmButton";
import { deleteGoalAction } from "@/utils/entities/goals/server";
import { Goal, GoalStatus } from "@/types/roadmap";
import { createPortal } from "react-dom";
import EditGoalForm from "./edit-goal/EditGoalForm";

export default function GoalItem({ goal }: { goal?: Goal }) {
  if (!goal) return null;

  const [editRoadmap, setEditRoadmap] = useState<number | null>(null);
  const showEditRoadmap = (roadmapId: number) => setEditRoadmap(roadmapId);
  const hideEditRoadmap = () => setEditRoadmap(null);

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
      className={`group cursor-grab list-none bg-[#dedee8] hover:bg-[#e2e2e2] active:bg-[#d4d4dd] active:opacity-40 rounded-lg p-6 mb-3 ${getStatusStyles(
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
          {/* Title & Description */}
          {editRoadmap == goal.id ? (
            <>
              {createPortal(
                <div
                  onPointerDown={(e) => {
                    e.stopPropagation();
                  }}
                  className="fixed inset-0 bg-black/40 bg-opacity-50 z-1000"
                >
                  <EditGoalForm hideEditRoadmap={hideEditRoadmap} goal={goal} />
                </div>,
                document.body
              )}
            </>
          ) : (
            <>
              <h4 className="font-medium">{goal.name}</h4>
              <p className="text-text whitespace-break-spaces">
                {goal.description || "-"}
              </p>
            </>
          )}
          <span
            className={`${getPriorityStyles(
              goal.priority
            )} text-xs py-1 px-2 rounded capitalize mt-4 inline-block`}
          >
            {goal.priority}
          </span>
        </div>

        {/* Controllers */}
        <div
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          className="flex-center gap-2 "
        >
          <Pencil
            onClick={() => showEditRoadmap(goal.id)}
            size={14}
            className="opacity-0 group-hover:opacity-100 cursor-pointer w-7 h-7 p-1 text-primary/75 hover:text-primary transition"
          />
          <ConfirmButton
            onConfirm={deleteGoalAction}
            confirmTitle="Delete"
            values={{
              goalId: goal.id,
              roadmapId: goal.roadmap_id,
            }}
          >
            <Trash2
              size={14}
              className="opacity-0 group-hover:opacity-100 cursor-pointer w-7 h-7 p-1 text-red-400 hover:text-red-500 transition"
            />
          </ConfirmButton>
        </div>
      </div>
    </li>
  );
}
