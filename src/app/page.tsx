"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getOrAssignVariant } from "@/lib/experiment";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const variant = getOrAssignVariant();
    router.replace(`/${variant}`);
  }, [router]);

  // Minimal loading state — replaced almost instantly
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-1 h-1 rounded-full bg-warm-gray-light animate-pulse" />
    </div>
  );
}
