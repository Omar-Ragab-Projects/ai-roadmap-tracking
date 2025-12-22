import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Eye, Pencil, PenLine, Trash2, Zap } from "lucide-react";
import ConfirmButton from "@/components/ui/ConfirmButton";
import { deleteGoalAction } from "@/utils/entities/goals/server";
import { Goal, GoalStatus } from "@/types/roadmap";
import EditGoalForm from "./edit-goal/EditGoalForm";
import GoalPriority from "@/components/global/goal/GoalPriority";
import ResponseMarkdown from "@/components/global/ai/ResponseMarkdown";
import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import FormProvider from "@/components/global/form/FormProvider";
import FormGroup from "@/components/global/form/FormGroup";
import SubmitButton from "@/components/global/form/SubmitButton";
import { addNoteAction } from "@/utils/entities/notes/server";
import Link from "next/link";
import MobileGoalStatus from "./MobileGoalStatus";

export default function GoalItem({ goal }: { goal?: Goal }) {
  if (!goal) return null;

  const [editRoadmap, setEditRoadmap] = useState<number | null>(null);
  const showEditRoadmap = (roadmapId: number) => setEditRoadmap(roadmapId);
  const hideEditRoadmap = () => setEditRoadmap(null);

  const [showReferences, setShowReferences] = useState(false);
  const toggleShowReferences = () => setShowReferences(!showReferences);

  const [addNote, setAddNote] = useState(false);
  const toggleAddNote = () => setAddNote(!addNote);

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
      className={`group lg:cursor-grab list-none bg-[#dedee8] hover:bg-[#e2e2e2] active:bg-[#d4d4dd] active:opacity-95 rounded-lg p-6 mb-3 ${getStatusStyles(
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
          {/* Edit Goal */}
          <Dialog open={editRoadmap == goal.id} onClose={hideEditRoadmap}>
            <EditGoalForm hideEditRoadmap={hideEditRoadmap} goal={goal} />
          </Dialog>

          <h4 className="font-medium">{goal.name}</h4>
          <p className="text-text whitespace-break-spaces">
            {/* {goa  l.description || "-"} */}
          </p>
          <ResponseMarkdown className="text-text">
            {goal.description?.split("References:")[0] || "-"}
          </ResponseMarkdown>

          {goal.description?.split("References:")[1] && (
            <Button className="mt-4" Icon={Eye} onClick={toggleShowReferences}>
              References
            </Button>
          )}

          <Dialog open={showReferences} onClose={toggleShowReferences}>
            <ResponseMarkdown className="text-text ">
              {goal.description?.split("References:")[1] || "No references."}
            </ResponseMarkdown>
          </Dialog>
        </div>

        {/* Controllers */}
        <div
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          className="flex flex-col lg:flex-row gap-1 lg:gap-2 max-lg:opacity-75 hover:opacity-100 transition"
        >
          <Pencil
            onClick={() => showEditRoadmap(goal.id)}
            size={14}
            className="lg:opacity-0 group-hover:opacity-100 cursor-pointer w-6 h-6 lg:w-7 lg:h-7 p-1 text-primary/75 hover:text-primary transition"
          />
          <ConfirmButton
            onConfirm={deleteGoalAction}
            note="all notes for this goal will be deleted"
            confirmTitle="Delete"
            values={{
              goalId: goal.id,
              roadmapId: goal.roadmap_id,
            }}
          >
            <Trash2
              size={14}
              className="lg:opacity-0 group-hover:opacity-100 cursor-pointer w-6 h-6 lg:w-7 lg:h-7 p-1 text-red-400 hover:text-red-500 transition"
            />
          </ConfirmButton>
        </div>
      </div>

      <div className="flex-between flex-wrap gap-6 mt-8">
        <div className="flex items-center gap-2 flex-wrap">
          <GoalPriority priority={goal.priority} className="mt-0!" />
          {goal.status && (
            <Link
              href={{
                pathname: "/focus",
                query: {
                  roadmap: goal.roadmap_id,
                  goal: goal.id,
                },
              }}
              data-tooltip="Focus"
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
            >
              <Zap
                className="text-primary cursor-pointer p-2 w-9 h-9"
                data-tooltip="Focus"
              />
            </Link>
          )}
          <Button
            className="shadow-none text-xs opacity-50 hover:opacity-100 transition focus:outline-0! p-2! w-max"
            Icon={PenLine}
            variant="skeleton"
            onClick={toggleAddNote}
          >
            Add note
          </Button>

          <Dialog open={addNote} onClose={toggleAddNote}>
            <FormProvider
              action={addNoteAction}
              onSuccess={toggleAddNote}
              hiddenFields={[{ name: "goalId", value: goal.id.toString() }]}
            >
              <h3 className="mb-4">Add note to {goal.name}</h3>
              <FormGroup
                textarea
                name="goalNote"
                placeholder="When I searched for ...."
                required
              />
              <SubmitButton className="mt-4">Add Note</SubmitButton>
            </FormProvider>
          </Dialog>
        </div>

        <div className="lg:hidden ">
          <MobileGoalStatus goal={goal} />
        </div>
      </div>
    </li>
  );
}
