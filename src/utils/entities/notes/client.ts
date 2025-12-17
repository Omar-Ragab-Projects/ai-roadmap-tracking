import renderError from "@/utils/renderError";
import { createClient } from "@/utils/supabase/client";
import { NotesResponseTypes } from "@/types/notes";
import getAnonymousUser from "@/utils/anonymous-users/getAnonymousUser";

const supabase = createClient();

export const fetchNotesClient = async (): Promise<NotesResponseTypes> => {
  const user = await getAnonymousUser();

  const { data, error } = await supabase
    .from("notes")
    .select("*, goal:goals(*, roadmap:roadmaps(*))")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
