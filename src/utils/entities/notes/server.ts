"use server";
import { actionPromiseResponse } from "@/types/globalTypes";
import renderError from "@/utils/renderError";
import { createClient } from "@/utils/supabase/server";

export const addNoteAction = async (
  previousState: any,
  formData: FormData
): Promise<actionPromiseResponse> => {
  try {
    const supabase = await createClient();
    const goalId = formData.get("goalId") as string;
    const goalNote = formData.get("goalNote") as string;

    if (!goalNote) {
      return { status: "error", message: "Please add a note." };
    }

    await supabase.from("notes").insert({
      goal_id: goalId,
      note: goalNote,
    });

    return { status: "success", message: "Note added successfully!" };
  } catch (error) {
    return renderError(error);
  }
};
