"use server";
import { createClient } from "../supabase/server";

const supabase = await createClient();

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
