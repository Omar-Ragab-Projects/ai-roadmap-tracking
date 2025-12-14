import { Goal, Roadmap } from "./roadmap";

export type Note = {
  id: number;
  note: string;
  goal_id: number;
  goal: {
    id: number;
    name: string;
    roadmap: Roadmap;
  };
  created_at: string;
};

export type NotesResponseTypes = Array<Note>;
