"use client";
import { getWithExpiry } from "@/utils/common";
import { fetchRoadmapsClient } from "@/utils/entities/roadmaps/client";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useMemo, useRef } from "react";
import SelectFocus from "./_components/SelectFocus";
import { useRouter, useSearchParams } from "next/navigation";
import { FocusContext } from "@/context/FocusContext";
import FocusTimer from "./_components/FocusTimer";
import FocusActions from "./_components/FocusActions";
import useFocusActions from "./hooks/useFocusActions";

export default function FocusPage() {
  const {
    data: roadmaps,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["roadmaps"],
    queryFn: fetchRoadmapsClient,
  });

  if (error) {
    return <div>Error loading roadmaps please refresh the page.</div>;
  }

  // Router and Search Params
  const router = useRouter();
  const searchParams = useSearchParams();
  const goal = useMemo(() => searchParams.get("goal"), []);
  const roadmap = useMemo(() => searchParams.get("roadmap"), []);
  const chooseFocusRef = useRef<HTMLDivElement | null>(null);

  const focusContext = useContext(FocusContext);

  if (!focusContext) {
    throw new Error("FocusContext must be used within a FocusProvider");
  }

  const {
    initTimer,
    choosedRoadmap,
    setChoosedRoadmap,
    choosedGoal,
    setChoosedGoal,
    timer,
    rounds,
    setRounds,
    isTimerActive,
    getSelectedFocusTitle,
  } = focusContext;

  const { startFocus, pauseFocus, restartFocus, resetTimer } = useFocusActions({
    chooseFocusRef,
  });

  // Focus Selection from URL
  useEffect(() => {
    if (roadmaps) {
      if (roadmap && goal) {
        const selectedRoadmap = roadmaps.find((rm) => rm.id == +roadmap);
        const selectedGoal = selectedRoadmap?.goals?.find((g) => g.id == +goal);
        setChoosedGoal(selectedGoal || null);
        setChoosedRoadmap(selectedRoadmap || null);
        router.replace("/focus");
      }
    }
  }, [roadmaps, roadmap, goal]);

  const roadmapSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoadmap = roadmaps?.find(
      (roadmap) => roadmap.id == +e.target.value
    );
    setChoosedRoadmap(selectedRoadmap || null);
  };

  const goalSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGoal = choosedRoadmap?.goals?.find(
      (goal) => goal.id == +e.target.value
    );
    setChoosedGoal(selectedGoal || null);
  };

  useEffect(() => {
    if (isTimerActive || timer != initTimer) clearFocusPopup();
  }, [isTimerActive, timer]);

  const clearFocusPopup = () => {
    if (chooseFocusRef.current) {
      chooseFocusRef.current.style.display = "none";
    }
  };

  useEffect(() => {
    const storedRounds = getWithExpiry("roundsCompleted");
    if (storedRounds) {
      setRounds(parseInt(storedRounds, 10));
    }
  }, []);

  return (
    <div className="card w-fit px-[10vw] mx-auto text-center relative">
      {!goal && !roadmap && (
        <SelectFocus
          chooseFocusRef={chooseFocusRef}
          isLoading={isLoading}
          roadmaps={roadmaps}
          choosedRoadmap={choosedRoadmap}
          choosedGoal={choosedGoal}
          roadmapSelected={roadmapSelected}
          goalSelected={goalSelected}
          clearFocusPopup={clearFocusPopup}
        />
      )}

      <h1 className="text-primary font-semibold">Focus Session</h1>

      {/* Timer */}
      <FocusTimer initTimer={initTimer} timer={timer} />

      {/* Title */}
      <div className="mt-14 flex flex-col gap-4">
        <span className="uppercase text-sm text-text">Focusing on</span>
        <span className="font-semibold text-foreground text-3xl">
          {isLoading ? "Loading :)" : getSelectedFocusTitle()}
        </span>
      </div>

      {/* Actions */}
      <FocusActions
        isTimerActive={isTimerActive}
        startFocus={startFocus}
        pauseFocus={pauseFocus}
        restartFocus={restartFocus}
        resetTimer={resetTimer}
      />

      {/* Rounds */}
      <div className="text-text flex flex-col bg-primary/4 absolute top-8 right-0 px-3 py-1 rounded-l-lg group cursor-pointer hover:bg-primary/5 transition">
        <span className="ml-auto opacity-60 group-hover:hidden group-hover:opacity-0 transition text-primary text-sm font-bold">
          {rounds}
        </span>
        <span className="text-2xl text-primary font-bold  hidden group-hover:block">
          {rounds}
        </span>
        <span className="text-[10px]  hidden group-hover:block">
          Sessions Today
        </span>
      </div>
    </div>
  );
}
