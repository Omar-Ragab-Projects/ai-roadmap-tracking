"use server";

import { createClient } from "../supabase/server";
import { cookies } from "next/headers";

export default async function getAnonymousUser() {
  const supabase = await createClient();
  const sessionToken = (await cookies()).get("sessionToken")?.value;
  if (!sessionToken) return null;
  const { data: user } = await supabase
    .from("anonymous_users")
    .select("*")
    .eq("session_token", sessionToken)
    .single();

  return user;
}
