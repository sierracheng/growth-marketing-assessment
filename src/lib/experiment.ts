import type { VariantId } from "./variants";
import posthog from "./posthog";

const VARIANT_IDS: VariantId[] = ["control", "variant-1", "variant-2"];
const STORAGE_KEY = "aura_experiment_variant";

// Must match the feature flag key configured in PostHog dashboard
const POSTHOG_FLAG = "aura-landing-variant";

export function getOrAssignVariant(): VariantId {
  if (typeof window === "undefined") return "control";

  // Primary: use PostHog feature flag — only when SDK is fully initialized.
  if (posthog.__loaded) {
    const flag = posthog.getFeatureFlag(POSTHOG_FLAG);
    console.log("[experiment] PostHog feature flag value:", flag);
    if (flag && VARIANT_IDS.includes(flag as VariantId)) {
      console.log("[experiment] Using PostHog feature flag variant:", flag);
      return flag as VariantId;
    }
    console.warn(
      "[experiment] Feature flag missing or invalid value:",
      flag,
      "— falling back to default layout"
    );
  } else {
    console.warn(
      "[experiment] PostHog not yet initialized — falling back to default layout"
    );
  }

  // Fallback: deterministic localStorage assignment (used when PostHog key
  // is not yet set or flag hasn't loaded)
  const stored = localStorage.getItem(STORAGE_KEY) as VariantId | null;
  if (stored && VARIANT_IDS.includes(stored)) {
    console.log("[experiment] Using stored variant from localStorage:", stored);
    return stored;
  }

  const assigned = VARIANT_IDS[Math.floor(Math.random() * VARIANT_IDS.length)];
  localStorage.setItem(STORAGE_KEY, assigned);
  console.log("[experiment] Assigned new random variant:", assigned);
  return assigned;
}
