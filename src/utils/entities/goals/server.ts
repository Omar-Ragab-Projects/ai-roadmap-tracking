"use server";

import renderError from "@/utils/renderError";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const addGoalAction = async (
  prev: any,
  formData: FormData
): Promise<{ status: "success" | "error"; message: string }> => {
  const supabase = await createClient();
  const roadmapId = formData.get("roadmapId");
  const name = formData.get("name");
  const description = formData.get("description");
  const priority = formData.get("priority");

  if (!name) return { status: "error", message: "Please add goal title." };

  const data = {
    roadmap_id: roadmapId,
    name,
    description,
    priority: priority || "medium",
    status: "todo",
  };

  console.log(data);

  try {
    const res = await supabase.from("goals").insert(data);
    console.log(res);
    revalidatePath(`/roadmaps/${roadmapId}`);
    return { status: "success", message: "Goal created successfully!" };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteGoalAction = async (
  prev: any,
  formData: FormData
): Promise<{ status: "success" | "error"; message: string }> => {
  const supabase = await createClient();
  const goalId = formData.get("goalId");
  const roadmapId = formData.get("roadmapId");

  try {
    const res = await supabase.from("goals").delete().eq("id", goalId);
    console.log(res);
    revalidatePath(`/roadmaps/${roadmapId}`);
    return { status: "success", message: "Goal deleted successfully!" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateGoalStatus = async (
  goalId: string,
  status: string
): Promise<{ status: "success" | "error"; message: string }> => {
  const supabase = await createClient();
  try {
    const res = await supabase
      .from("goals")
      .update({ status })
      .eq("id", goalId);
    console.log(res);
    return { status: "success", message: "Goal status updated successfully!" };
  } catch (error) {
    return renderError(error);
  }
};
