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
  title: string;
  description?: string | null;
  priority: number;
  created_at: string;
}
