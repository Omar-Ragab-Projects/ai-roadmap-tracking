"use client";
import { useEffect, useRef } from "react";

export default function AnimateCount({ count }: { count: number }) {
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!countRef.current) return;
    if (count == 0) return;

    let start = 0;
    const end = count;
    const duration = 500;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      if (countRef.current) {
        countRef.current.textContent = start.toString();
      }
      if (start === end) {
        clearInterval(timer);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [count]);

  return <span ref={countRef}>{count}</span>;
}
