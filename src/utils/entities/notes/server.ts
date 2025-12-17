"use server";
import { actionPromiseResponse } from "@/types/globalTypes";
import getAnonymousUser from "@/utils/anonymous-users/getAnonymousUser";
import renderError from "@/utils/renderError";
import { createClient } from "@/utils/supabase/server";

export const addNoteAction = async (
  previousState: any,
  formData: FormData
): Promise<actionPromiseResponse> => {
  try {
    const supabase = await createClient();
    const user = await getAnonymousUser();
    const goalId = formData.get("goalId") as string;
    const goalNote = formData.get("goalNote") as string;

    if (!goalNote) {
      return { status: "error", message: "Please add a note." };
    }

    await supabase.from("notes").insert({
      goal_id: goalId,
      note: goalNote,
      user_id: user?.id,
    });

    return { status: "success", message: "Note added successfully!" };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteNoteAction = async (
  previousState: any,
  formData: FormData
) => {
  try {
    const supabase = await createClient();
    const noteId = formData.get("noteId") as string;

    if (!noteId) {
      return { status: "error", message: "Note ID is required." };
    }

    await supabase.from("notes").delete().eq("id", noteId);

    return { status: "success", message: "Note deleted successfully!" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateNoteAction = async (
  previousState: any,
  formData: FormData
): Promise<actionPromiseResponse> => {
  try {
    const supabase = await createClient();
    const noteId = formData.get("noteId") as string;
    const updatedNote = formData.get("updatedNote") as string;
    if (!noteId || !updatedNote) {
      return {
        status: "error",
        message: "Note ID and updated note are required.",
      };
    }
    await supabase.from("notes").update({ note: updatedNote }).eq("id", noteId);

    return { status: "success", message: "Note updated successfully!" };
  } catch (error) {
    return renderError(error);
  }
};
