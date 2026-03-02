"use client";

import { useRef } from "react";
import { captureSignup } from "@/lib/posthog";
import { getSignupUrl } from "@/lib/variants";

interface CTAButtonProps {
  variantId: string;
  referralCode: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function CTAButton({
  variantId,
  referralCode,
  label,
  className,
  style,
}: CTAButtonProps) {
  const fired = useRef(false);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (fired.current) return;
    fired.current = true;

    captureSignup(variantId, referralCode);

    // Small delay so PostHog can flush the event before navigation
    setTimeout(() => {
      window.location.href = getSignupUrl(referralCode);
    }, 300);
  }

  return (
    <a
      href={getSignupUrl(referralCode)}
      onClick={handleClick}
      className={className}
      style={style}
    >
      {label}
    </a>
  );
}
