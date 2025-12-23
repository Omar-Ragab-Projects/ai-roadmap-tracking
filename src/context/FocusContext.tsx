import { Roadmap, Goal } from "@/types/roadmap";
import { createContext, useEffect, useRef, useState } from "react";

type FocusContextProps = {
  initTimer: {
    minutes: number;
    seconds: number;
  };
  choosedRoadmap: Roadmap | null;
  setChoosedRoadmap: React.Dispatch<React.SetStateAction<Roadmap | null>>;
  choosedGoal: Goal | null;
  setChoosedGoal: React.Dispatch<React.SetStateAction<Goal | null>>;
  timerInterval: number;
  intervalRef: React.RefObject<NodeJS.Timeout | null>;
  timer: typeof initTimer;
  setTimer: React.Dispatch<React.SetStateAction<typeof initTimer>>;
  rounds: number;
  setRounds: React.Dispatch<React.SetStateAction<number>>;
  isTimerActive: boolean;
  setIsTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
  getSelectedFocusTitle: () => string;
  visible: boolean;
  hidePortal: () => void;
  showPortal: () => void;
} | null;

export const FocusContext = createContext<FocusContextProps>(null);

const initTimer = {
  minutes: 25,
  seconds: 0,
};

export default function FocusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Focus Logic
  const [choosedRoadmap, setChoosedRoadmap] = useState<Roadmap | null>(null);
  const [choosedGoal, setChoosedGoal] = useState<Goal | null>(null);

  // Timer Logic
  const timerInterval = 1000;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useState(initTimer);
  const [rounds, setRounds] = useState(0);

  const [isTimerActive, setIsTimerActive] = useState(false);

  const [visible, setVisible] = useState(true);
  const hidePortal = () => setVisible(false);
  const showPortal = () => setVisible(true);

  const getSelectedFocusTitle = () => {
    if (choosedRoadmap && !choosedGoal) {
      return `${choosedRoadmap.title}`;
    } else if (choosedRoadmap && choosedGoal) {
      return `${choosedGoal.name}`;
    } else {
      return ":)";
    }
  };

  useEffect(() => {
    if (timer == initTimer) return;
    localStorage.setItem("focusTimer", JSON.stringify(timer));
  }, [timer]);

  useEffect(() => {
    if (!choosedRoadmap) return;
    localStorage.setItem("choosedRoadmap", JSON.stringify(choosedRoadmap));
  }, [choosedRoadmap]);

  useEffect(() => {
    if (!choosedGoal) return;
    localStorage.setItem("choosedGoal", JSON.stringify(choosedGoal));
  }, [choosedGoal]);

  useEffect(() => {
    const storedTimer = localStorage.getItem("focusTimer");
    const storedRoadmap = localStorage.getItem("choosedRoadmap");
    const storedGoal = localStorage.getItem("choosedGoal");

    if (storedTimer) {
      setTimer(JSON.parse(storedTimer));
    }

    if (storedRoadmap) {
      setChoosedRoadmap(JSON.parse(storedRoadmap));
    }

    if (storedGoal) {
      setChoosedGoal(JSON.parse(storedGoal));
    }
  }, []);

  return (
    <FocusContext.Provider
      value={{
        initTimer,
        choosedRoadmap,
        setChoosedRoadmap,
        choosedGoal,
        setChoosedGoal,
        timerInterval,
        intervalRef,
        timer,
        setTimer,
        rounds,
        setRounds,
        isTimerActive,
        setIsTimerActive,
        getSelectedFocusTitle,
        visible,
        hidePortal,
        showPortal,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
}
