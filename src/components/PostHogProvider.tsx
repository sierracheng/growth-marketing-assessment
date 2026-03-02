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
    initPostHog();
  }, []);

  useEffect(() => {
    const variant = getVariantFromPath(pathname);
    posthog.capture("$pageview", {
      path: pathname,
      ...(variant && { variant }),
    });
  }, [pathname]);

  return <>{children}</>;
}
