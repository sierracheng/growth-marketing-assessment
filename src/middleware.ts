import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VISITOR_COOKIE = "aura_vid";

// Sets a persistent visitor ID cookie before the page renders.
// This lets the server (page.tsx) and client (PostHogProvider) share
// the same distinct_id so experiment exposure events are linked to
// the same user as pageviews and conversions.
export function middleware(request: NextRequest) {
  const existingId = request.cookies.get(VISITOR_COOKIE)?.value;

  if (existingId) {
    return NextResponse.next();
  }

  // First visit: generate a new visitor ID and forward it as a request header
  // so page.tsx can read it server-side before the Set-Cookie reaches the browser.
  const visitorId = crypto.randomUUID();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-visitor-id", visitorId);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.cookies.set(VISITOR_COOKIE, visitorId, {
    httpOnly: false, // must be readable by client-side JS for PostHog bootstrap
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
