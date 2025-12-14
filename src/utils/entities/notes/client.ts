import renderError from "@/utils/renderError";
import { createClient } from "@/utils/supabase/client";
import { NotesResponseTypes } from "@/types/notes";

const supabase = createClient();

export const fetchNotesClient = async (): Promise<NotesResponseTypes> => {
  const { data, error } = await supabase
    .from("notes")
    .select("*, goal:goals(*, roadmap:roadmaps(*))")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
