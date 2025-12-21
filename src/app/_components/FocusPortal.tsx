"use client";

import { FocusContext } from "@/context/FocusContext";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import FocusTimer from "../focus/_components/FocusTimer";
import FocusActions from "../focus/_components/FocusActions";
import useFocusActions from "../focus/hooks/useFocusActions";

export default function FocusPortal() {
  const focusContext = useContext(FocusContext);
  const pathname = usePathname();

  if (!focusContext) {
    throw new Error("FocusContext must be used within a FocusProvider");
  }

  const { initTimer, timer, isTimerActive } = focusContext;

  const { startFocus, pauseFocus, restartFocus, resetTimer } = useFocusActions({
    chooseFocusRef: undefined,
  });

  if (timer != initTimer && !pathname.includes("focus"))
    return (
      <div className="fixed bottom-6 right-4 z-50 animate-focusPortal group shadow-xl rounded-full ">
        <FocusTimer initTimer={initTimer} timer={timer} className="mt-0!" />
        <div className="absolute inset-0 bg-white/75 rounded-full flex-center w-full h-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <FocusActions
            isTimerActive={isTimerActive}
            startFocus={startFocus}
            pauseFocus={pauseFocus}
            restartFocus={restartFocus}
            resetTimer={resetTimer}
          />
        </div>
      </div>
    );
}
