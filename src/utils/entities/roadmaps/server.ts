"use server";

import { createClient } from "@/utils/supabase/server";
import renderError from "@/utils/renderError";
import { cache } from "react";

export const addRoadmapAction = async (
  prev: any,
  formData: FormData
): Promise<{ status: "success" | "error"; message: string }> => {
  const supabase = await createClient();
  const title = formData.get("title");
  const description = formData.get("description");

  if (!title) return { status: "error", message: "Please add roadmap title." };

  const data = {
    title,
    description,
  };

  try {
    const res = await supabase.from("roadmaps").insert(data);
    return { status: "success", message: "Roadmap created successfully!" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateRoadmapAction = async (
  prev: any,
  formData: FormData
): Promise<{ status: "success" | "error"; message: string }> => {
  const supabase = await createClient();
  const roadmapId = formData.get("roadmapId");
  const title = formData.get("title");
  const description = formData.get("description");

  if (!title) return { status: "error", message: "Please add roadmap title." };

  const data = {
    title,
    description,
  };

  try {
    const res = await supabase
      .from("roadmaps")
      .update(data)
      .eq("id", roadmapId);
    return { status: "success", message: "Roadmap updated successfully!" };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteRoadmapAction = async (
  prev: any,
  formData: FormData
): Promise<{ status: "success" | "error"; message: string }> => {
  const supabase = await createClient();
  const roadmapId = formData.get("roadmapId");

  if (!roadmapId)
    return { status: "error", message: "Roadmap does not exist." };

  try {
    const res = await supabase.from("roadmaps").delete().eq("id", roadmapId);
    return { status: "success", message: "Roadmap deleted successfully!" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchRoadmap = async (roadmapId: string) => {
  const supabase = await createClient();
  const roadmapQuery = supabase
    .from("roadmaps")
    .select("*")
    .eq("id", roadmapId)
    .single();
  const goalQuery = supabase
    .from("goals")
    .select("*")
    .eq("roadmap_id", roadmapId)
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

export const fetchRoadmapCache = cache(fetchRoadmap);
