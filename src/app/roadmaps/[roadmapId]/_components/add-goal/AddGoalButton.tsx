"use client";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddGoalForm from "./AddGoalForm";
import Dialog from "@/components/ui/Dialog";

export default function AddGoalButton({ roadmapId }: { roadmapId: number }) {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const showAddGoalForm = () => setShowAddGoal(true);
  const hideAddGoalForm = () => setShowAddGoal(false);

  return (
    <>
      <Dialog open={showAddGoal} onClose={hideAddGoalForm}>
        <AddGoalForm hideAddGoalForm={hideAddGoalForm} roadmapId={roadmapId} />
      </Dialog>
      <Button
        className="max-lg:flex-1 min-w-[140px]"
        onClick={showAddGoalForm}
        title={"Add Goal"}
        Icon={Plus}
      />
    </>
  );
}
