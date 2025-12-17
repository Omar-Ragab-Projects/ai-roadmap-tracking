"use client";
import { Roadmap } from "@/types/roadmap";
import getAnonymousUser from "@/utils/anonymous-users/getAnonymousUser";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const fetchRoadmapsClient = async (): Promise<Roadmap[]> => {
  const user = await getAnonymousUser();

  const roadmapsQuery = supabase
    .from("roadmaps")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at");
  const goalsQuery = supabase
    .from("goals")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at");

  const [roadmapsRes, goalsRes] = await Promise.all([
    roadmapsQuery,
    goalsQuery,
  ]);

  if (roadmapsRes?.error) {
    throw new Error(roadmapsRes.error.message);
  }
  if (goalsRes?.error) {
    throw new Error(goalsRes.error.message);
  }

  let roadmapsData = roadmapsRes.data || [];
  const goalsData = goalsRes.data || [];

  roadmapsData = roadmapsData.map((roadmap) => {
    return {
      ...roadmap,
      goals: goalsData.filter((goal) => goal.roadmap_id === roadmap.id),
    };
  });

  return roadmapsData;
};
