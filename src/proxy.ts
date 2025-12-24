import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import generateSessionUser from "./utils/anonymous-users/generateSessionUser";

export async function proxy(request: NextRequest) {
  await generateSessionUser();
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
