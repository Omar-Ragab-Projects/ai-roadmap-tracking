import { RotateCcw, Play, Pause, X } from "lucide-react";

interface FocusActionsProps {
  isTimerActive: boolean;
  startFocus: () => void;
  pauseFocus: () => void;
  restartFocus: () => void;
  resetTimer: () => void;
}

export default function FocusActions({
  isTimerActive,
  startFocus,
  pauseFocus,
  restartFocus,
  resetTimer,
}: FocusActionsProps) {
  return (
    <div className="flex-center gap-8 mt-10">
      <RotateCcw onClick={resetTimer} size={18} className="cursor-pointer" />
      <span
        className="bg-primary p-4 rounded-full text-white cursor-pointer hover:bg-primary/90 transition"
        onClick={isTimerActive ? pauseFocus : startFocus}
      >
        {!isTimerActive ? <Play size={18} /> : <Pause size={18} />}
      </span>
      <X onClick={restartFocus} size={18} className="cursor-pointer" />
    </div>
  );
}
