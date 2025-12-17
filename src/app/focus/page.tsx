"use client";

import { Pause, Play, RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const initTimer = {
  minutes: 25,
  seconds: 0,
};

export default function FocusPage() {
  const timerInterval = 1000;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useState(initTimer);
  const [rounds, setRounds] = useState(0);

  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    const storedRounds = localStorage.getItem("roundsCompleted");
    if (storedRounds) {
      setRounds(parseInt(storedRounds, 10));
    }
  }, []);

  const handleZero = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimer(initTimer);
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

  const roundFinsihed = () => {
    const roundsCompleted = rounds + 1;
    setRounds(roundsCompleted);
    localStorage.setItem("roundsCompleted", roundsCompleted.toString());
    resetTimer();
  };

  const completionPercentage =
    ((initTimer.minutes * 60 - (timer.minutes * 60 + timer.seconds)) /
      (initTimer.minutes * 60)) *
    100;

  return (
    <div className="card w-fit px-[10vw] mx-auto text-center relative">
      <h1 className="text-primary font-semibold">Focus Session</h1>

      {/* Timer */}
      <div
        className="progress-bar mt-16 flex flex-col relative "
        role="progressbar"
        data-valuenow={completionPercentage}
        data-valuemin="0"
        data-valuemax="100"
      >
        <span className="absolute inset-0 w-full h-full bg-linear-to-t from-primary/10 from-40% to-secondary/6 rounded-full blur-xs " />
        <span className="text-9xl font-bold text-foreground  tracking-[-0.075em] ">
          {timer.minutes}
        </span>
        <span className="text-7xl font-bold text-muted-foreground -mt-3  tracking-tighter">
          {handleZero(timer.seconds)}
        </span>
      </div>

      {/* Title */}
      <div className="mt-14 flex flex-col gap-4">
        <span className="uppercase text-sm text-text">Focusing on</span>
        <span className="font-semibold text-foreground text-3xl">
          Master React Hooks
        </span>
      </div>

      {/* Actions */}
      <div className="flex-center gap-8 mt-10">
        <RotateCcw onClick={resetTimer} size={18} className="cursor-pointer" />
        <span
          className="bg-primary p-4 rounded-full text-white cursor-pointer hover:bg-primary/90 transition"
          onClick={isTimerActive ? pauseFocus : startFocus}
        >
          {!isTimerActive ? <Play size={18} /> : <Pause size={18} />}
        </span>
        <X size={18} className="cursor-pointer" />
      </div>

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
