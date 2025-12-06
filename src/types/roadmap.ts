export interface Roadmap {
  id: number;
  title: string;
  description?: string | null;
  created_at: string;
  goals?: Goal[];
}

export interface Goal {
  id: number;
  roadmap_id: number;
  name: string;
  description?: string | null;
  priority: GoalPriority;
  created_at: string;
  status: GoalStatus;
}

export type GoalPriority = "high" | "medium" | "low";

export type GoalStatus = "todo" | "inprogress" | "done";
