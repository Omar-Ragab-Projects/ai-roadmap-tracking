import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmButton from "@/components/ui/ConfirmButton";
import { deleteGoalAction } from "@/utils/entities/goals/server";
import { Goal, GoalStatus } from "@/types/roadmap";
import { createPortal } from "react-dom";
import EditGoalForm from "./edit-goal/EditGoalForm";
import GoalPriority from "@/components/global/goal/GoalPriority";

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
          <GoalPriority priority={goal.priority} />
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
