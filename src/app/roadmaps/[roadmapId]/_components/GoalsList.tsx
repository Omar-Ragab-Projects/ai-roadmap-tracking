"use client";
import { Goal, Roadmap } from "@/types/roadmap";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useContext, useEffect, useState } from "react";
import SortableContainer from "./dnd/SortableContainer";
import GoalItem from "./GoalItem";
import { updateGoalStatus } from "@/utils/entities/goals/server";
import { GoalsContext } from "../context/GoalsContextProvider";

interface GloalsListTypes {
  todo: Goal[];
  inprogress: Goal[];
  done: Goal[];
}

export default function GoalsList({ roadmap }: { roadmap: Roadmap }) {
  const [goals, setGoals] = useState<GloalsListTypes>({
    todo: [],
    inprogress: [],
    done: [],
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const { setGoalsUpdating } = useContext(GoalsContext);

  useEffect(() => {
    if (roadmap.goals) {
      const todoGoals = roadmap.goals.filter((goal) => goal.status === "todo");
      const inprogressGoals = roadmap.goals.filter(
        (goal) => goal.status === "inprogress"
      );
      const doneGoals = roadmap.goals.filter((goal) => goal.status === "done");

      setGoals({
        todo: todoGoals || [],
        inprogress: inprogressGoals || [],
        done: doneGoals || [],
      });
    }
  }, [roadmap.goals]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    const activeContainer = active.data.current.sortable?.containerId;
    const overContainer =
      over?.data?.current?.sortable?.containerId || over?.id;

    // Guard: if no valid target or same element, do nothing
    if (!over || active.id === over.id) return;

    const currentItems = goals[activeContainer as keyof GloalsListTypes] || [];
    const overItems = goals[overContainer as keyof GloalsListTypes] || [];

    const oldIndex = currentItems.findIndex((goal) => goal.id === active.id);
    const newIndex = overItems.findIndex((goal) => goal.id === over.id);

    // If moving within the same container
    if (activeContainer && overContainer && activeContainer === overContainer) {
      if (oldIndex === -1 || newIndex === -1) return;
      setGoals((prev) => {
        const box = { ...prev };
        box[activeContainer as keyof GloalsListTypes] = arrayMove(
          box[activeContainer as keyof GloalsListTypes],
          oldIndex,
          newIndex
        );
        return box;
      });
      return;
    }

    // Moving between different containers: remove from source and insert into destination
    if (activeContainer && overContainer && activeContainer !== overContainer) {
      setGoals((prev) => {
        const box = { ...prev };

        const source = [
          ...(box[activeContainer as keyof GloalsListTypes] || []),
        ];
        const dest = [...(box[overContainer as keyof GloalsListTypes] || [])];

        // If the item cannot be found in source, abort
        if (oldIndex === -1) return prev;

        const [moved] = source.splice(oldIndex, 1);

        // If over item wasn't found, append to the end
        const insertAt = newIndex === -1 ? dest.length : newIndex + 1;
        moved.status = overContainer;
        dest.splice(insertAt, 0, moved);

        box[activeContainer as keyof GloalsListTypes] = source;
        box[overContainer as keyof GloalsListTypes] = dest;

        return box;
      });
      updateGoalStatus(active.id, overContainer);
      setGoalsUpdating(true);
    }
  }

  function handleDragStart(event: any) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function findGoalById(id: string): Goal | undefined {
    return roadmap.goals && roadmap.goals.find((goal) => goal.id === +id);
  }

  return (
    <div className="mt-10 gap-3 hidden xl:flex">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContainer id="todo" items={goals.todo} title="Todo" />
        <span></span>
        <SortableContainer
          id="inprogress"
          items={goals.inprogress}
          title="In Progress"
        />
        <span></span>
        <SortableContainer id="done" items={goals.done} title="Done" />
        <DragOverlay>
          {activeId && roadmap.goals ? (
            <GoalItem goal={findGoalById(activeId)} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
