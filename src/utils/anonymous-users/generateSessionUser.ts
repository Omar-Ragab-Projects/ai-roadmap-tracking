"use server";
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

export default async function generateSessionUser() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const existingToken = cookieStore.get("sessionToken")?.value;

  if (existingToken) {
    try {
      const { data } = await supabase
        .from("anonymous_users")
        .select("id")
        .eq("session_token", existingToken)
        .single();

      if (data?.id) {
        return true; // Valid session exists
      }
    } catch (error) {
      console.log("Error checking existing session:", error);
    }
  }

  // Generate new session if no valid token exists
  const sessionToken = crypto.randomUUID();

  const generateNewUser = async () => {
    try {
      await supabase
        .from("anonymous_users")
        .insert({ session_token: sessionToken })
        .select()
        .single();
      cookieStore.set("sessionToken", sessionToken);
    } catch (error) {
      console.log("Error generating session user:", error);
    }
    return true;
  };

  return await generateNewUser();
}
