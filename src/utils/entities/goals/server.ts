"use server";

import renderError from "@/utils/renderError";
import { createClient } from "@/utils/supabase/server";

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
    status: "pending",
  };

  console.log(data);

  try {
    const res = await supabase.from("goals").insert(data);
    console.log(res);
    return { status: "success", message: "Goal created successfully!" };
  } catch (error) {
    return renderError(error);
  }
};
