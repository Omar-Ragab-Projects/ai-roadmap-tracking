"use client";
import { Goal, Roadmap } from "@/types/roadmap";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import GoalItem from "./GoalItem";

export default function GoalsList({ roadmap }: { roadmap: Roadmap }) {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    if (roadmap.goals) setGoals(roadmap.goals);
  }, [roadmap]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setGoals((goals) => {
        const oldIndex = goals.findIndex((goal) => goal.id === active.id);
        const newIndex = goals.findIndex((goal) => goal.id === over.id);

        return arrayMove(goals, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="mt-10">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={goals} strategy={verticalListSortingStrategy}>
          <div>
            <h3>Todo</h3>
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
      </DndContext>
    </div>
  );
}
