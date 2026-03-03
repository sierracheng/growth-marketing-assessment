"use client";

import { useEffect, useRef, useState } from "react";
import CTAButton from "./CTAButton";
import type { VariantConfig } from "@/lib/variants";

export default function Variant1CTA({ config }: { config: VariantConfig }) {
  const { ctaSection, id, referralCode, hero } = config;
  const spotsLeft  = hero.spotsLeft  ?? 127;
  const spotsTotal = hero.spotsTotal ?? 200;

  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="cta"
      className="relative flex flex-col items-center justify-center min-h-[100svh] px-5 sm:px-8 bg-cream overflow-hidden"
    >
      {/* Ambient radial wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sage/[0.05] pointer-events-none" />

      <div
        className="relative max-w-xl mx-auto text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(44px)",
          transition: "opacity 1.4s ease, transform 1.4s ease",
        }}
      >
        {/* Opening rule */}
        <div className="w-10 h-px bg-cream-border mx-auto mb-10 sm:mb-16" />

        {/* Overline */}
        <p
          className="text-sage font-medium uppercase tracking-[0.28em] mb-8"
          style={{ fontSize: "0.63rem" }}
        >
          Final Call
        </p>

        {/* Typographic spot counter */}
        <div className="flex items-baseline justify-center gap-2.5 mb-5">
          <span
            className="font-heading text-charcoal tabular-nums leading-none"
            style={{ fontSize: "clamp(3rem, 7vw, 4.5rem)" }}
          >
            {spotsLeft}
          </span>
          <span
            className="font-heading text-warm-gray-light leading-none"
            style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
          >
            / {spotsTotal}
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-heading text-charcoal leading-[1.1] tracking-tight mb-7"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
        >
          {ctaSection.headline}
        </h2>

        {/* Subheadline */}
        <p
          className="text-warm-gray leading-[1.9] max-w-sm mx-auto mb-14"
          style={{ fontSize: "0.9375rem" }}
        >
          {ctaSection.subheadline}
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <CTAButton
            variantId={id}
            referralCode={referralCode}
            label={ctaSection.ctaLabel}
            className="inline-block px-8 py-3.5 sm:px-12 sm:py-4 rounded-full bg-charcoal text-cream text-sm font-medium tracking-wide hover:bg-charcoal/80 transition-colors"
          />
          <p
            className="text-warm-gray-light uppercase tracking-[0.1em]"
            style={{ fontSize: "0.68rem" }}
          >
            7-day free trial &middot; No credit card &middot; Cancel anytime
          </p>
        </div>

        {/* Closing rule */}
        <div className="w-10 h-px bg-cream-border mx-auto mt-10 sm:mt-16" />
      </div>
    </section>
  );
}
