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
    <div className="flex-1 max-h-[80vh] overflow-y-auto scroll-bar-styles p-6 bg-gray-500/2 rounded-xl border border-border">
      <SortableContext
        id={id}
        items={goals}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>
          <h3>{title}</h3>
          <ul className="mt-6">
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
    </div>
  );
}
