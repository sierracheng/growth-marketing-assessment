"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initPostHog } from "@/lib/posthog";
import posthog from "posthog-js";

function getVariantFromPath(path: string): string | null {
  if (path.startsWith("/control")) return "control";
  if (path.startsWith("/variant-1")) return "variant-1";
  if (path.startsWith("/variant-2")) return "variant-2";
  return null;
}

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Capture initial pageview inside `loaded` callback — guarantees PostHog is ready
    initPostHog((ph) => {
      const variant = getVariantFromPath(pathname);
      ph.capture("$pageview", {
        path: pathname,
        ...(variant && { variant }),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Subsequent client-side navigations only
    if (!posthog.__loaded) return;
    const variant = getVariantFromPath(pathname);
    posthog.capture("$pageview", {
      path: pathname,
      ...(variant && { variant }),
    });
  }, [pathname]);

  return <>{children}</>;
}
