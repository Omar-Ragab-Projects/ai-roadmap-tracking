"use client";

import { Roadmap } from "@/types/roadmap";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const fetchRoadmaps = async () => {
  return await supabase.from("roadmaps").select("*").order("created_at");
};
