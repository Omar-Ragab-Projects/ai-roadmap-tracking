import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import generateSessionUser from "./utils/anonymous-users/generateSessionUser";

export async function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("sessionToken")?.value;

  if (!sessionToken) {
    await generateSessionUser();
    return NextResponse.redirect(new URL(request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
