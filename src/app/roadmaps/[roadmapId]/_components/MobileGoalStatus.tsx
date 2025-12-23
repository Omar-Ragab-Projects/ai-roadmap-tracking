import { Goal } from "@/types/roadmap";
import React, { useContext } from "react";
import { GoalsContext } from "../context/GoalsContextProvider";
import { updateGoalStatus } from "@/utils/entities/goals/server";

export default function MobileGoalStatus({ goal }: { goal: Goal }) {
  const { setGoalsUpdating } = useContext(GoalsContext);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    updateGoalStatus(goal.id.toString(), newStatus);
    setGoalsUpdating(true);
  };
  return (
    <>
      <select name="goalStatus" id="goalStatus" onChange={handleStatusChange}>
        <option value="todo" defaultChecked={goal.status === "todo"}>
          To Do
        </option>
        <option
          value="inprogress"
          defaultChecked={goal.status === "inprogress"}
        >
          In Progress
        </option>
        <option value="done" defaultChecked={goal.status === "done"}>
          Done
        </option>
      </select>
    </>
  );
}
