import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { PostHog } from "posthog-node";
import { getPostHogServerClient } from "@/lib/posthog-server";

const VARIANT_IDS = ["control", "variant-1", "variant-2"] as const;
type VariantId = (typeof VARIANT_IDS)[number];
const POSTHOG_FLAG = "aura-landing-variant";

async function fetchVariantFromPostHog(
  distinctId: string
): Promise<{ variant: VariantId | null; client: PostHog | null }> {
  const client = getPostHogServerClient();
  if (!client) {
    console.warn("[page/server] No PostHog client — key not configured");
    return { variant: null, client: null };
  }

  console.log(`[page/server] Fetching flag for distinct_id: ${distinctId}`);

  try {
    const flag = await client.getFeatureFlag(POSTHOG_FLAG, distinctId);
    console.log(`[page/server] Flag "${POSTHOG_FLAG}" value:`, flag);

    if (flag && VARIANT_IDS.includes(flag as VariantId)) {
      return { variant: flag as VariantId, client };
    }

    console.warn(`[page/server] Flag value "${flag}" is not a valid variant — falling back`);
    return { variant: null, client };
  } catch (err) {
    console.error("[page/server] posthog-node error:", err);
    return { variant: null, client };
  }
}

export default async function Home() {
  const cookieStore = await cookies();
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  // Use the visitor ID set by middleware — this is the same ID the client
  // PostHog SDK will be bootstrapped with, so server exposure events and
  // client pageview/conversion events all share one identity in PostHog.
  const distinctId = cookieStore.get("aura_vid")?.value ?? crypto.randomUUID();
  console.log("[page/server] Using distinct_id:", distinctId);

  const { variant, client } = await fetchVariantFromPostHog(distinctId);

  // shutdown() flushes all queued events (including $feature_flag_called) and
  // must be called BEFORE redirect() — redirect() throws internally which would
  // abort the function before any pending events are sent.
  if (client) await client.shutdown();

  if (variant) {
    console.log("[page/server] Redirecting to variant:", variant);
    redirect(`/${variant}`);
  }

  console.warn("[page/server] No valid flag — redirecting to default layout (control)");
  redirect("/control");
}
