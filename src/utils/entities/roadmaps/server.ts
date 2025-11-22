"use server";

import { createClient } from "@/utils/supabase/server";

const renderError = (
  error: any
): { status: "success" | "error"; message: string } => {
  if (error instanceof Error) {
    return { status: "error", message: error.message };
  } else {
    return { status: "error", message: "An error occured!" };
  }
};

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
