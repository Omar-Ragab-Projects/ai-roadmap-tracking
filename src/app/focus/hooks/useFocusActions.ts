import { FocusContext } from "@/context/FocusContext";
import { setWithExpiry } from "@/utils/common";
import React, { useContext } from "react";

export default function useFocusActions({
  chooseFocusRef,
}: {
  chooseFocusRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const focusContext = useContext(FocusContext);

  if (!focusContext) {
    throw new Error("FocusContext must be used within a FocusProvider");
  }

  const {
    initTimer,
    setChoosedRoadmap,
    setChoosedGoal,
    timerInterval,
    intervalRef,
    setTimer,
    rounds,
    setRounds,
    setIsTimerActive,
  } = focusContext;

  const resetTimer = () => {
    setIsTimerActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimer(initTimer);
    localStorage.removeItem("focusTimer");
  };

  const startFocus = () => {
    setIsTimerActive(true);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            roundFinsihed();
            return initTimer;
          } else {
            return {
              minutes: prev.minutes - 1,
              seconds: 59,
            };
          }
        } else {
          return {
            minutes: prev.minutes,
            seconds: prev.seconds - 1,
          };
        }
      });
    }, timerInterval);
  };

  const pauseFocus = () => {
    setIsTimerActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const restartFocus = () => {
    setChoosedRoadmap(null);
    setChoosedGoal(null);
    resetTimer();
    if (chooseFocusRef && chooseFocusRef.current) {
      chooseFocusRef.current.style.display = "block";
    }
  };

  const roundFinsihed = () => {
    const roundsCompleted = rounds + 1;
    setRounds(roundsCompleted);
    setWithExpiry("roundsCompleted", roundsCompleted, 24 * 60 * 60 * 1000); // 24 hours expiry
    resetTimer();
  };
  return {
    startFocus,
    pauseFocus,
    restartFocus,
    resetTimer,
  };
}
