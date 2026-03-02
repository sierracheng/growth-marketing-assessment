"use client";

import { useEffect, useRef, useState } from "react";
import CTAButton from "./CTAButton";
import type { VariantConfig } from "@/lib/variants";

// ── Photos ────────────────────────────────────────────────────────────────────
const GRID_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    alt: "Morning meditation",
  },
  {
    src: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80",
    alt: "Yoga flow",
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    alt: "Community session",
  },
  {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    alt: "Wellness journal",
  },
];

// ── Notification bubbles ──────────────────────────────────────────────────────
const BUBBLES = [
  {
    initials: "ER",
    name: "Emma R.",
    location: "London",
    quote: "I actually look forward to waking up now.",
    delay: "0.6s",
    className: "top-[4%] -left-8",
  },
  {
    initials: "PS",
    name: "Priya S.",
    location: "Singapore",
    quote: "This community changed everything for me.",
    delay: "0.9s",
    className: "top-[46%] -right-8",
  },
  {
    initials: "MK",
    name: "Mia K.",
    location: "Chicago",
    quote: "Real people who actually show up.",
    delay: "1.2s",
    className: "bottom-[8%] left-[12%]",
  },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const STATS = [
  {
    target: 10000,
    format: (n: number) => (n >= 10000 ? "10,000+" : n.toLocaleString()),
    label: "Members",
  },
  {
    target: 49,
    format: (n: number) => `${(n / 10).toFixed(1)}/5`,
    label: "Avg Rating",
  },
  {
    target: 94,
    format: (n: number) => `${n}%`,
    label: "Less Stressed",
  },
];

// ── Notification bubble ───────────────────────────────────────────────────────
function NotificationBubble({
  initials,
  name,
  location,
  quote,
  delay,
  className,
}: (typeof BUBBLES)[0]) {
  return (
    <div
      className={`absolute ${className} z-10 w-52 bg-white rounded-2xl border border-black/[0.06] pointer-events-none`}
      style={{
        boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        opacity: 0,
        animation: `bubbleFadeIn 0.5s ease forwards`,
        animationDelay: delay,
      }}
    >
      <div className="px-3.5 pt-3 pb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-sage-light/40 text-sage-dark text-[10px] font-semibold flex items-center justify-center flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-charcoal leading-none">{name}</div>
            <div className="text-[10px] text-warm-gray-light mt-0.5">{location}</div>
          </div>
          <div className="flex gap-px flex-shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-terracotta" style={{ fontSize: "9px" }}>★</span>
            ))}
          </div>
        </div>
        <p className="text-xs text-warm-gray leading-snug italic border-t border-black/[0.05] pt-2">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Variant2Hero({ config }: { config: VariantConfig }) {
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const duration = 1600;
        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCounts(STATS.map(({ target }) => Math.round(target * eased)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Keyframe for bubble fade-in */}
      <style>{`
        @keyframes bubbleFadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>

      <section className="min-h-screen bg-white px-5 sm:px-8 pt-20 pb-16 overflow-x-clip">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 min-h-[calc(100vh-5rem)]">

          {/* ── Left: copy ──────────────────────────────────────────────── */}
          <div className="flex-1 lg:max-w-[480px]">

            {/* Kicker badge */}
            <div className="inline-flex items-center gap-3 bg-[#f5f1ea] px-4 py-2 rounded-full mb-8">
              <span className="flex -space-x-1.5">
                {["#a8c4a7", "#c17f5e", "#b5b2ae"].map((c, i) => (
                  <span
                    key={i}
                    className="w-5 h-5 rounded-full border-2 border-[#f5f1ea]"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </span>
              <span className="text-xs text-warm-gray tracking-wide">
                Join <span className="text-charcoal font-semibold">10,000+</span> women moving mindfully
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-heading text-charcoal leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.5rem)" }}
            >
              Join 10,000+<br />Women Moving<br />Mindfully.
            </h1>

            {/* Subheadline */}
            <p
              className="text-warm-gray leading-relaxed mb-10"
              style={{ fontSize: "1.0625rem" }}
            >
              Real people. Real results. A community that keeps you accountable,
              supported, and coming back, day after day.
            </p>

            {/* Count-up stats */}
            <div ref={statsRef} className="flex gap-8 mb-10">
              {STATS.map((stat, i) => (
                <div key={stat.label}>
                  <div className="font-heading text-3xl text-charcoal tabular-nums leading-none">
                    {stat.format(counts[i])}
                  </div>
                  <div
                    className="text-warm-gray-light uppercase tracking-[0.14em] mt-1.5"
                    style={{ fontSize: "0.65rem" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col items-start gap-3">
              <CTAButton
                variantId={config.id}
                referralCode={config.referralCode}
                label={config.hero.ctaLabel}
                className="px-10 py-4 rounded-full bg-charcoal text-cream text-sm font-medium tracking-wide hover:bg-charcoal/80 transition-colors"
              />
              <p className="text-warm-gray-light text-xs tracking-wide">
                7-day free trial · No credit card · Cancel anytime
              </p>
            </div>
          </div>

          {/* ── Right: masonry grid + notification bubbles ──────────────── */}
          <div className="relative flex-1 hidden lg:block select-none">

            {/* 2-column staggered masonry */}
            <div className="grid grid-cols-2 gap-3">
              {/* Column 1 */}
              <div className="flex flex-col gap-3">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-cream-dark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={GRID_PHOTOS[0].src}
                    alt={GRID_PHOTOS[0].alt}
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden bg-cream-dark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={GRID_PHOTOS[2].src}
                    alt={GRID_PHOTOS[2].alt}
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>
              {/* Column 2 — offset for stagger */}
              <div className="flex flex-col gap-3 mt-10">
                <div className="aspect-square rounded-2xl overflow-hidden bg-cream-dark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={GRID_PHOTOS[1].src}
                    alt={GRID_PHOTOS[1].alt}
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-cream-dark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={GRID_PHOTOS[3].src}
                    alt={GRID_PHOTOS[3].alt}
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Floating notification bubbles */}
            {BUBBLES.map((bubble) => (
              <NotificationBubble key={bubble.name} {...bubble} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
