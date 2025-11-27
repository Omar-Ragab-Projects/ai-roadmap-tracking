"use client";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AddGoalForm from "./AddGoalForm";

export default function AddGoalButton({ roadmapId }: { roadmapId: number }) {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const showAddGoalForm = () => setShowAddGoal(true);
  const hideAddGoalForm = () => setShowAddGoal(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showAddGoal &&
        !(event.target as HTMLElement).closest(".add-goal-form")
      ) {
        hideAddGoalForm();
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, [showAddGoal]);

  return (
    <>
      {showAddGoal && (
        <>
          {createPortal(
            <div className="fixed inset-0 bg-black/40 bg-opacity-50 z-1000">
              <AddGoalForm
                hideAddGoalForm={hideAddGoalForm}
                roadmapId={roadmapId}
              />
            </div>,
            document.body
          )}
        </>
      )}
      <Button onClick={showAddGoalForm} title={"Add Goal"} Icon={Plus} />
    </>
  );
}
