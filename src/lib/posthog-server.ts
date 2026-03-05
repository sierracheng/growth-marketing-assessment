import { PostHog } from "posthog-node";

// Creates a fresh PostHog client per request — correct pattern for serverless.
// We call client.shutdown() before redirecting to flush the $feature_flag_called
// event before the function exits. shutdown() disables the client instance so
// it cannot be reused, which is fine since we create a new one each invocation.
export function getPostHogServerClient(): PostHog | null {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const personalApiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  if (!key) {
    console.warn("[posthog-server] NEXT_PUBLIC_POSTHOG_KEY not set");
    return null;
  }
  if (!personalApiKey) {
    console.warn("[posthog-server] POSTHOG_PERSONAL_API_KEY not set — flag evaluation will not work");
    return null;
  }

  return new PostHog(key, { host, personalApiKey, flushAt: 1, flushInterval: 0 });
}
