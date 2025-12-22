import { useEffect, useRef } from "react";

export default function ProgressBar({ percentage }: { percentage: number }) {
  const progressBarRef = useRef(null);

  useEffect(() => {
    const progressElement = progressBarRef.current as HTMLElement | null;
    if (percentage >= 0 && progressElement) {
      setTimeout(() => {
        progressElement.style.width = `${percentage}%`;
      }, 50);
    }
  }, [percentage]);
  return (
    <div className="lg:mt-6 lg:min-w-[250px] max-lg:flex-1">
      {/* Percentage Count */}
      <div className="flex-between gap-2">
        <span className="text-sm text-foreground">Progress</span>
        <span
          className={`${
            percentage == 100 ? "text-secondary" : "text-primary"
          } font-bold transition`}
        >
          {percentage}%
        </span>
      </div>
      {/* Percentage Bar */}
      <div className="relative h-3 rounded-full bg-primary/15 mt-2">
        <span
          ref={progressBarRef}
          className={`absolute percentage-bar w-[0%] left-0 h-full transition-all duration-500 rounded-full ${
            percentage == 100
              ? "bg-secondary"
              : "bg-linear-to-r from-primary to-secondary"
          }`}
        />
      </div>
    </div>
  );
}
