"use server";

import { createClient } from "@/utils/supabase/server";
import renderError from "@/utils/renderError";
import { cache } from "react";
import { actionPromiseResponse } from "@/types/globalTypes";
import getAnonymousUser from "@/utils/anonymous-users/getAnonymousUser";
import { cookies } from "next/headers";

export const addRoadmapAction = async (
  prev: any,
  formData: FormData
): Promise<actionPromiseResponse> => {
  const supabase = await createClient();
  const user = await getAnonymousUser();

  const title = formData.get("title");
  const description = formData.get("description");

  if (!title) return { status: "error", message: "Please add roadmap title." };

  const data = {
    title,
    description,
    user_id: user?.id,
  };

  try {
    await supabase.from("roadmaps").insert(data);
    return { status: "success", message: "Roadmap created successfully!" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateRoadmapAction = async (
  prev: any,
  formData: FormData
): Promise<actionPromiseResponse> => {
  const supabase = await createClient();
  const user = await getAnonymousUser();

  const roadmapId = formData.get("roadmapId");
  const title = formData.get("title");
  const description = formData.get("description");

  if (!title) return { status: "error", message: "Please add roadmap title." };

  const data = {
    title,
    description,
    user_id: user?.id,
  };

  try {
    await supabase.from("roadmaps").update(data).eq("id", roadmapId);
    return { status: "success", message: "Roadmap updated successfully!" };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteRoadmapAction = async (
  prev: any,
  formData: FormData
): Promise<actionPromiseResponse> => {
  const supabase = await createClient();
  const roadmapId = formData.get("roadmapId");

  if (!roadmapId)
    return { status: "error", message: "Roadmap does not exist." };

  try {
    await supabase.from("roadmaps").delete().eq("id", roadmapId);
    return { status: "success", message: "Roadmap deleted successfully!" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchRoadmapsServer = async () => {
  const supabase = await createClient();
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
    .order("updated_at");

  const [roadmapsRes, goalsRes] = await Promise.all([
    roadmapsQuery,
    goalsQuery,
  ]);

  if (roadmapsRes.error) {
    throw new Error(roadmapsRes.error.message);
  }
  if (goalsRes.error) {
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

  return { roadmaps: roadmapsData, totalGoals: goalsData };
};

export const fetchRoadmap = async (roadmapId: string) => {
  const supabase = await createClient();
  const user = await getAnonymousUser();

  const roadmapQuery = supabase
    .from("roadmaps")
    .select("*")
    .eq("id", roadmapId)
    .eq("user_id", user?.id)
    .single();
  const goalQuery = supabase
    .from("goals")
    .select("*")
    .eq("roadmap_id", roadmapId)
    .eq("user_id", user?.id)
    .order("created_at", { ascending: true });

  try {
    const [roadmapRes, goalsRes] = await Promise.all([roadmapQuery, goalQuery]);
    const data = {
      ...roadmapRes.data,
      goals: goalsRes.data,
    };
    return data;
  } catch (error) {
    renderError(error);
  }
};

// cache the roadmap fetch because it is used in a server component
export const fetchRoadmapCache = cache(fetchRoadmap);

export const saveRoadmapAction = async (
  previousState: any,
  formData: FormData
): Promise<actionPromiseResponse> => {
  const supabase = await createClient();
  const user = await getAnonymousUser();

  const roadmapData = formData.get("roadmapData") as string;
  if (!roadmapData)
    return { status: "error", message: "No roadmap data to save." };
  const parsedData = JSON.parse(roadmapData);

  try {
    const roadmapRes = await supabase
      .from("roadmaps")
      .insert({
        title: parsedData.title,
        description: parsedData.description,
        user_id: user?.id,
      })
      .select()
      .single();
    const roadmapId = roadmapRes.data.id;

    const goalsData = parsedData.goals.map((goal: any) => ({
      roadmap_id: roadmapId,
      name: goal.name,
      description: goal.description,
      priority: goal.priority,
      status: goal.status,
      user_id: user?.id,
    }));

    await supabase.from("goals").insert(goalsData);

    return {
      status: "success",
      message: "Roadmap saved successfully!",
      payload: { id: roadmapId },
    };
  } catch (error) {
    return renderError(error);
  }
};
