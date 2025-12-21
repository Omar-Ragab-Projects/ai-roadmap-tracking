"use server";
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

export default async function generateSessionUser() {
  const supabase = await createClient();
  const sessionToken = crypto.randomUUID();

  try {
    await supabase
      .from("anonymous_users")
      .insert({ session_token: sessionToken })
      .select()
      .single();
    (await cookies()).set("sessionToken", sessionToken);
  } catch (error) {
    console.log("Error generating session user:", error);
  }

  return true;
}
