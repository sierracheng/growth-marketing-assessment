"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initPostHog } from "@/lib/posthog";
import posthog from "posthog-js";

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
    posthog.capture("$pageview", { path: pathname });
  }, [pathname]);

  return <>{children}</>;
}
