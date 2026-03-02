"use client";

import { useEffect, useRef, useState } from "react";
import CTAButton from "./CTAButton";
import type { VariantConfig } from "@/lib/variants";

// Member avatars for variant-2 hero social proof cluster
const MEMBER_AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&h=80&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&h=80&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=80&h=80&q=80",
];

interface HeroProps {
  config: VariantConfig;
}

export default function Hero({ config }: HeroProps) {
  const { hero, id, referralCode } = config;
  const isVideo = hero.bgType === "video";
  const isImage = hero.bgType === "image";
  const isSolid = hero.bgType === "solid";

  // Parallax wrapper ref (video only — keeps parallax translateY separate from CSS anims)
  const bgWrapRef = useRef<HTMLDivElement>(null);
  // Scroll-triggered defocus overlay ref (video only)
  const defocusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVideo) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Parallax: background moves at 35% of scroll speed
      if (bgWrapRef.current) {
        bgWrapRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
      // Defocus: Gaussian blur 0→10px over the first 50vh of scroll
      if (defocusRef.current) {
        const blur = Math.min((scrollY / (window.innerHeight * 0.5)) * 10, 10);
        defocusRef.current.style.backdropFilter = `blur(${blur}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVideo]);

  // "Practised today" ambient counter — all variants
  const [practisedCount, setPractisedCount] = useState(0);
  useEffect(() => {
    const target = 318;
    const duration = 1400;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPractisedCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  // Number ticker: counts down from 189 → spotsLeft on mount (variant-1)
  const [displaySpots, setDisplaySpots] = useState(() =>
    hero.showSpotCounter ? 189 : 0
  );
  useEffect(() => {
    if (!hero.showSpotCounter || hero.spotsLeft === undefined) return;
    const start = 189;
    const target = hero.spotsLeft;
    const duration = 1600;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplaySpots(Math.round(start - (start - target) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [hero.showSpotCounter, hero.spotsLeft]);

  return (
    <section
      className={`relative flex items-center justify-center min-h-screen px-5 sm:px-8 overflow-hidden ${
        isSolid ? "pt-28 pb-20 bg-cream-dark" : "pt-0"
      }`}
    >
      {/* ── Video background (control) ── */}
      {isVideo && hero.bgSrc && (
        <div
          ref={bgWrapRef}
          className="absolute inset-0 will-change-transform overflow-hidden"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={hero.bgPoster}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ animation: "heroFloat 16s ease-in-out infinite" }}
          >
            <source src={hero.bgSrc} type="video/mp4" />
          </video>

          {/* Dark overlay — brightens on inhale in sync with scale */}
          {hero.overlay && (
            <div
              className="absolute inset-0 bg-[rgba(20,18,16,0.52)]"
              style={{ animation: "heroOverlayBreathe 16s ease-in-out infinite" }}
            />
          )}

          {/* Scroll-triggered defocus */}
          <div
            ref={defocusRef}
            className="absolute inset-0 pointer-events-none"
            style={{ backdropFilter: "blur(0px)" }}
          />
        </div>
      )}

      {/* ── Image background (control / variant-1) ── */}
      {isImage && hero.bgSrc && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${hero.bgSrc})`,
            animation: "heroFloat 22s ease-in-out infinite",
          }}
        />
      )}
      {isImage && hero.overlay && (
        <div className="absolute inset-0 bg-[rgba(20,18,16,0.52)]" />
      )}

      {/* ── Content ── */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Variant-2: member avatar cluster */}
        {isSolid && (
          <div className="flex justify-center items-center gap-3 mb-8">
            <div className="flex -space-x-2.5">
              {MEMBER_AVATARS.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-9 h-9 rounded-full border-2 border-cream-dark object-cover"
                />
              ))}
            </div>
            <p className="text-xs text-warm-gray">
              <span className="text-charcoal font-medium">10,000+</span> members worldwide
            </p>
          </div>
        )}

        {/* Badge */}
        {hero.badge && (
          <div
            className={`inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase ${
              isVideo || isImage
                ? "bg-white/15 text-white/90 border border-white/20"
                : "bg-sage/10 text-sage-dark border border-sage/20"
            }`}
          >
            <span className="w-1 h-1 rounded-full bg-current opacity-70" />
            {hero.badge}
          </div>
        )}

        {/* Headline */}
        <h1
          className={`font-heading text-5xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight mb-6 ${
            isVideo || isImage ? "text-white" : "text-charcoal"
          }`}
        >
          {hero.headline}
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg sm:text-xl leading-relaxed max-w-xl mx-auto mb-10 ${
            isVideo || isImage ? "text-white/80" : "text-warm-gray"
          }`}
        >
          {hero.subheadline}
        </p>

        {/* ── Spot counter — typographic style (variant-1) ── */}
        {hero.showSpotCounter && hero.spotsLeft !== undefined && hero.spotsTotal && (
          <div className="mb-10 inline-flex flex-col items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-5xl text-white tabular-nums leading-none">
                {displaySpots}
              </span>
              <span className="text-white/35 text-2xl font-light">/</span>
              <span className="text-white/35 text-2xl font-light">{hero.spotsTotal}</span>
              <span className="text-white/60 text-sm ml-1 tracking-wide">spots remaining</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-terracotta" />
              </span>
              <span className="text-white/50 text-xs tracking-widest uppercase">
                Filling now
              </span>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <CTAButton
            variantId={id}
            referralCode={referralCode}
            label={hero.ctaLabel}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all ${
              isVideo || isImage
                ? "bg-white text-charcoal hover:bg-cream-dark"
                : "bg-charcoal text-cream hover:bg-charcoal/80"
            }`}
          />
          {!hero.showSpotCounter && (
            <a
              href="#features"
              className={`w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-medium tracking-wide border transition-all text-center ${
                isVideo || isImage
                  ? "border-white/30 text-white/90 hover:bg-white/10"
                  : "border-cream-border text-warm-gray hover:border-sage/40"
              }`}
            >
              See how it works
            </a>
          )}
        </div>

        {/* Trust badges */}
        {!hero.showSpotCounter && (
          <div
            className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs tracking-wide ${
              isVideo || isImage ? "text-white/60" : "text-warm-gray-light"
            }`}
          >
            {["7-day free trial", "No credit card", "Cancel anytime"].map(
              (badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <span className="text-sage-light">✓</span> {badge}
                </span>
              )
            )}
          </div>
        )}

        {/* Practised today — ambient social proof for all variants */}
        <div className="mt-5 flex items-center justify-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-light opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sage-light" />
          </span>
          <p className={`text-xs tracking-wide ${isVideo || isImage ? "text-white/45" : "text-warm-gray-light"}`}>
            <span className="tabular-nums">{practisedCount}</span> members practised today
          </p>
        </div>
      </div>
    </section>
  );
}
