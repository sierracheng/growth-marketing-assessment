import type { VariantId } from "./variants";

const VARIANT_IDS: VariantId[] = ["control", "variant-1", "variant-2"];
const STORAGE_KEY = "aura_experiment_variant";

export function getOrAssignVariant(): VariantId {
  if (typeof window === "undefined") return "control";

  const stored = localStorage.getItem(STORAGE_KEY) as VariantId | null;
  if (stored && VARIANT_IDS.includes(stored)) return stored;

  const assigned = VARIANT_IDS[Math.floor(Math.random() * VARIANT_IDS.length)];
  localStorage.setItem(STORAGE_KEY, assigned);
  return assigned;
}
