"use client";
import { createContext, useState } from "react";

export const GoalsContext = createContext<{
  goalsUpdating: boolean;
  setGoalsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  goalsUpdating: false,
  setGoalsUpdating: () => {},
});

export default function GoalsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [goalsUpdating, setGoalsUpdating] = useState(false);

  return (
    <GoalsContext.Provider value={{ goalsUpdating, setGoalsUpdating }}>
      {children}
    </GoalsContext.Provider>
  );
}
