"use server";

import { actionPromiseResponse } from "@/types/globalTypes";
import getAnonymousUser from "@/utils/anonymous-users/getAnonymousUser";
import renderError from "@/utils/renderError";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const addGoalAction = async (
  prev: any,
  formData: FormData
): Promise<actionPromiseResponse> => {
  const supabase = await createClient();
  const user = await getAnonymousUser();

  const roadmapId = formData.get("roadmapId");
  const name = formData.get("name");
  const description = formData.get("description");
  const priority = formData.get("priority");

  if (!name) return { status: "error", message: "Please add goal title." };

  const data = {
    roadmap_id: roadmapId,
    user_id: user?.id,
    name,
    description,
    priority: priority || "medium",
    status: "todo",
  };

  try {
    const res = await supabase.from("goals").insert(data);
    console.log(res);
    revalidatePath(`/roadmaps/${roadmapId}`);
    return { status: "success", message: "Goal created successfully!" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateGoalAction = async (
  prev: any,
  formData: FormData
): Promise<actionPromiseResponse> => {
  const supabase = await createClient();
  const goalId = formData.get("goalId");
  const roadmapId = formData.get("roadmapId");
  const name = formData.get("name");
  const description = formData.get("description");
  const priority = formData.get("priority");

  if (!name) return { status: "error", message: "Please add goal title." };

  const data = {
    name,
    description,
    priority: priority || "medium",
  };

  try {
    const res = await supabase.from("goals").update(data).eq("id", goalId);
    console.log(res);
    revalidatePath(`/roadmaps/${roadmapId}`);
    return { status: "success", message: "Goal updated successfully!" };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteGoalAction = async (
  prev: any,
  formData: FormData
): Promise<actionPromiseResponse> => {
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
): Promise<actionPromiseResponse> => {
  const supabase = await createClient();
  try {
    const res = await supabase
      .from("goals")
      .update({ status })
      .eq("id", goalId);
    console.log(res);
    revalidatePath(`/roadmaps/${goalId}`);
    return { status: "success", message: "Goal status updated successfully!" };
  } catch (error) {
    return renderError(error);
  }
};
