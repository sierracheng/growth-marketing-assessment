import type { VariantId } from "./variants";
import posthog from "posthog-js";

const VARIANT_IDS: VariantId[] = ["control", "variant-1", "variant-2"];
const STORAGE_KEY = "aura_experiment_variant";

// Must match the feature flag key configured in PostHog dashboard
const POSTHOG_FLAG = "aura-landing-variant";

export function getOrAssignVariant(): VariantId {
  if (typeof window === "undefined") return "control";

  // Primary: use PostHog feature flag when key is configured and SDK is ready
  const flag = posthog.getFeatureFlag(POSTHOG_FLAG);
  console.log("get posthost feature flag", flag);
  if (flag && VARIANT_IDS.includes(flag as VariantId)) {
    return flag as VariantId;
  }

  // Fallback: deterministic localStorage assignment (used when PostHog key
  // is not yet set or flag hasn't loaded)
  const stored = localStorage.getItem(STORAGE_KEY) as VariantId | null;
  if (stored && VARIANT_IDS.includes(stored)) return stored;

  const assigned = VARIANT_IDS[Math.floor(Math.random() * VARIANT_IDS.length)];
  localStorage.setItem(STORAGE_KEY, assigned);
  return assigned;
}
