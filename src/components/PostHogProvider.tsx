"use client";

import { useEffect, useRef } from "react";
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
  const pathnameRef = useRef(pathname);

  // Keep ref pointing to latest pathname so the loaded callback captures the
  // correct route even after the / → /variant redirect fires before PostHog loads.
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  console.log("PostHog Key Loaded:", !!process.env.NEXT_PUBLIC_POSTHOG_KEY);

  useEffect(() => {
    initPostHog(() => {
      const currentPath = pathnameRef.current;
      const variant = getVariantFromPath(currentPath);
      posthog.capture("$pageview", {
        path: currentPath,
        ...(variant && { variant }),
      });
      console.log("report posthog pageview")
    });
  }, []);

  useEffect(() => {
    // Subsequent client-side navigations (layout persists across routes)
    if (!posthog.__loaded) return;
    const variant = getVariantFromPath(pathname);
    posthog.capture("$pageview", {
      path: pathname,
      ...(variant && { variant }),
    });
  }, [pathname]);

  return <>{children}</>;
}
