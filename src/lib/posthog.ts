import posthog from "posthog-js";

export function initPostHog(onLoaded?: () => void) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  if (!key || typeof window === "undefined") return;

  posthog.init(key, {
    api_host: host,
    person_profiles: "always",
    capture_pageview: false, // manual pageview control
    loaded: (ph) => {
      if (process.env.NODE_ENV === "development") {
        ph.debug();
      }
      onLoaded?.();
    },
  });
}

export function captureSignup(variantId: string, referralCode: string) {
  if (typeof window === "undefined") return;
  posthog.capture("signed_up", {
    variant: variantId,
    referral_code: referralCode,
  });
}
