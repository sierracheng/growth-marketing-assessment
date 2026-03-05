import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VISITOR_COOKIE = "aura_vid";

// Sets a persistent visitor ID cookie before the page renders.
// This lets the server (page.tsx) and client (PostHogProvider) share
// the same distinct_id so experiment exposure events are linked to
// the same user as pageviews and conversions.
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.has(VISITOR_COOKIE)) {
    const visitorId = crypto.randomUUID();
    response.cookies.set(VISITOR_COOKIE, visitorId, {
      httpOnly: false, // must be readable by client-side JS for PostHog bootstrap
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
