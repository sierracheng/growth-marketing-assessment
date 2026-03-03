"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import CTAButton from "./CTAButton";
import LiveActivity from "./LiveActivity";
import type { VariantConfig } from "@/lib/variants";

const SPOTS_START = 189;

export default function Variant1Hero({ config }: { config: VariantConfig }) {
  const { hero, id, referralCode } = config;
  const spotsEnd   = hero.spotsLeft  ?? 127;
  const spotsTotal = hero.spotsTotal ?? 200;

  const count   = useMotionValue(SPOTS_START);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const timeout = setTimeout(() => {
      const controls = animate(count, spotsEnd, {
        duration: 1.8,
        ease: "easeOut",
      });
      return controls.stop;
    }, 600);
    return () => clearTimeout(timeout);
  }, [count, spotsEnd]);

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-5 sm:px-8 pt-24 sm:pt-28 pb-0 text-center overflow-hidden bg-cream">

      {/* ── Background video ──────────────────────────────────────────── */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      {/* 51662 — dawn mist rising over a still creek at first light     */}
      {/* Evokes: peaceful, belonging to nature, morning ritual, breathe */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(1.10) saturate(0.85)" }}
      >
        <source src="https://assets.mixkit.co/videos/51662/51662-720.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/41574/41574-720.mp4" type="video/mp4" />
      </video>

      {/* Centered dark scrim — creates a readable zone without killing the video */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 80% at 50% 48%, rgba(18,14,8,0.48) 0%, rgba(18,14,8,0.18) 65%, transparent 100%)",
        }}
      />

      {/* ── Content stack ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Top rule */}
        <div className="w-10 h-px mb-11" style={{ backgroundColor: "rgba(245,238,225,0.45)" }} />

        {/* Kicker badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          style={{
            backgroundColor: "rgba(245, 237, 224, 0.18)",
            border: "1px solid rgba(245, 237, 224, 0.50)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <span className="w-1 h-1 rounded-full bg-terracotta flex-shrink-0" />
          <span
            className="font-semibold uppercase tracking-widest"
            style={{ fontSize: "0.6rem", color: "#f5ede0" }}
          >
            Founding Member Invitation
          </span>
        </div>

        {/* H1 */}
        <h1
          className="font-heading leading-[1.1] tracking-tight mb-5 max-w-lg"
          style={{
            fontSize: "clamp(2rem, 4.8vw, 3.25rem)",
            color: "#f5ede0",
          }}
        >
          You&apos;ve Been Selected<br />to Join Aura
        </h1>

        {/* Subtitle */}
        <p
          className="leading-[1.8] mb-10 max-w-sm"
          style={{ fontSize: "0.9375rem", color: "rgba(245,232,210,0.92)" }}
        >
          {hero.subheadline}
        </p>

        {/* Hairline divider */}
        <div className="w-14 h-px mb-6" style={{ backgroundColor: "rgba(245,238,225,0.22)" }} />

        {/* Live availability row */}
        <div className="flex items-center gap-2 mb-3.5">
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-50"
              style={{ animationDuration: "2.4s" }}
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-terracotta" />
          </span>
          <span
            className="font-medium uppercase tracking-[0.20em]"
            style={{ fontSize: "0.6rem", color: "rgba(245,232,210,0.85)" }}
          >
            Live Availability
          </span>
        </div>

        {/* Foreground counter */}
        <div className="flex items-baseline gap-2 mb-2">
          <motion.span
            className="font-heading tabular-nums leading-none"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 3.5rem)", color: "#f5ede0" }}
          >
            {rounded}
          </motion.span>
          <span
            className="font-heading leading-none"
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.4rem)",
              color: "rgba(245,232,210,0.65)",
            }}
          >
            / {spotsTotal}
          </span>
        </div>

        <p
          className="font-medium uppercase tracking-[0.20em] mb-10"
          style={{ fontSize: "0.6rem", color: "rgba(245,232,210,0.80)" }}
        >
          Founding Spots Remaining
        </p>

        {/* CTA */}
        <CTAButton
          variantId={id}
          referralCode={referralCode}
          label={hero.ctaLabel}
          className="px-10 py-4 rounded-full text-sm font-medium tracking-wide active:scale-[0.98] transition-all mb-3"
          style={{ backgroundColor: "#f5ede0", color: "#1a1710" }}
        />
        <p
          className="tracking-wide"
          style={{ fontSize: "0.7rem", color: "rgba(245,232,210,0.75)" }}
        >
          7-day free trial · No credit card · Cancel anytime
        </p>

        {/* Bottom rule */}
        <div className="w-10 h-px mt-11" style={{ backgroundColor: "rgba(245,238,225,0.35)" }} />
      </div>

      {/* Live activity ticker — pinned to bottom edge of hero */}
      <div className="absolute bottom-0 left-0 right-0">
        <LiveActivity />
      </div>

    </section>
  );
}
