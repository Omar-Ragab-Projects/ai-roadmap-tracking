import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import GoalItem from "../GoalItem";
import { useDroppable } from "@dnd-kit/core";

export default function SortableContainer({
  items: goals,
  title,
  id,
}: {
  items: any[];
  title: string;
  id: string;
}) {
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <SortableContext
      id={id}
      items={goals}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef}>
        <h3>{title}</h3>
        <ul className="bg-muted/50 p-4 rounded-xl border-2 border-dashed border-black/5 mt-4">
          {goals.length === 0 && (
            <li className="text-center text-text/60 py-10">
              No goals added yet.
            </li>
          )}
          {goals.map((goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
        </ul>
      </div>
    </SortableContext>
  );
}
