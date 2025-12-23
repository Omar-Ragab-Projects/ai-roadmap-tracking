"use client";

import { FocusContext } from "@/context/FocusContext";
import { useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import FocusTimer from "../focus/_components/FocusTimer";
import FocusActions from "../focus/_components/FocusActions";
import useFocusActions from "../focus/hooks/useFocusActions";
import { EyeOff } from "lucide-react";

export default function FocusPortal() {
  const focusContext = useContext(FocusContext);
  const pathname = usePathname();

  if (!focusContext) {
    throw new Error("FocusContext must be used within a FocusProvider");
  }

  const { initTimer, timer, isTimerActive, visible, hidePortal } = focusContext;

  const { startFocus, pauseFocus, restartFocus, resetTimer } = useFocusActions({
    chooseFocusRef: undefined,
  });

  if (timer != initTimer && !pathname.includes("focus") && visible)
    return (
      <div className="focus-portal fixed bottom-15 lg:bottom-6 right-4 z-50 animate-focusPortal group shadow-xl rounded-full ">
        <FocusTimer initTimer={initTimer} timer={timer} className="mt-0!" />
        <div
          className="absolute lg:inset-0 lg:bg-white/75 rounded-full lg:flex-center lg:w-full lg:h-full lg:backdrop-blur-sm lg:opacity-0 lg:group-hover:opacity-100 transition-opacity
        max-lg:scale-50 max-lg:-top-8 max-lg:left-center
        "
        >
          <FocusActions
            isTimerActive={isTimerActive}
            startFocus={startFocus}
            pauseFocus={pauseFocus}
            restartFocus={restartFocus}
            resetTimer={resetTimer}
          />
        </div>
        <EyeOff
          size={16}
          onClick={hidePortal}
          className="absolute left-0 top-0 opacity-40 cursor-pointer "
        />
      </div>
    );
}
