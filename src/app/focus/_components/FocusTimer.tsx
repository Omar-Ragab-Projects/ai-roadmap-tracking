export default function FocusTimer({
  initTimer,
  timer,
  className,
}: {
  initTimer: { minutes: number; seconds: number };
  timer: { minutes: number; seconds: number };
  className?: string;
}) {
  const handleZero = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  const completionPercentage =
    ((initTimer.minutes * 60 - (timer.minutes * 60 + timer.seconds)) /
      (initTimer.minutes * 60)) *
    100;

  return (
    <div
      className={`progress-bar mt-16 flex flex-col relative ${className}`}
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
  );
}
