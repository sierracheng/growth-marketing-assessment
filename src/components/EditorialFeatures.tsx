"use client";

import { useEffect, useRef, useState } from "react";
import CTAButton from "./CTAButton";
import type { VariantConfig } from "@/lib/variants";

// ── Four editorial chapters — one per product pillar ─────────────────────────
const CHAPTERS = [
  {
    number: "01",
    overline: "Movement",
    headline: "The 6am Room",
    prose: [
      "Before the world asks anything of you, there is a window. Twenty minutes, sometimes forty. The living room before the house wakes up.",
      "Our movement library was built for that window, not for the athlete, but for the person who simply wants to feel at home in their body again. 500+ sessions, from 10-minute resets to 90-minute deep practices, taught by instructors who have spent their lives in this work.",
      "You do not need a studio. You need a mat, a little space, and the quiet conviction that showing up matters.",
    ],
    image:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Woman in a morning yoga flow",
    ctaText: "Explore the movement library",
    imageLeft: true,
  },
  {
    number: "02",
    overline: "Breathwork & Meditation",
    headline: "When the Mind Goes Still",
    prose: [
      "The nervous system does not respond to willpower. It responds to breath.",
      "Our daily breathwork rituals and guided meditations are not productivity tools, they are invitations. To slow down. To regulate. To find, in the space of a single exhale, a quality of stillness that no amount of efficiency can manufacture.",
      "Three minutes in the morning. Ten at noon. A long, held silence before sleep. Each session is designed to meet you exactly where the day finds you.",
    ],
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Person sitting in stillness, morning light",
    ctaText: "Begin a breathing practice",
    imageLeft: false,
  },
  {
    number: "03",
    overline: "Live Sessions",
    headline: "Practice Among People",
    prose: [
      "There is something a recorded session cannot give you: the experience of being witnessed.",
      "Our live weekly classes are held in real time, with instructors who learn your name, notice your progress, and ask where you were last week. It is the closest thing to a neighbourhood studio without the commute, the parking, the pre-class anxiety.",
      "The room fills quickly. That, in itself, says something.",
    ],
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Group movement session, connection and community",
    ctaText: "See the live schedule",
    imageLeft: true,
  },
  {
    number: "04",
    overline: "Wellness Journal",
    headline: "The Space Between Sessions",
    prose: [
      "Progress is rarely visible in the moment. It lives in the accumulation of small, honest observations, a mood noted, an intention set, a day marked as good even when it was hard.",
      "The Aura journal is your private record of the practice. Not a tracker, not a streak counter. A space to reflect without audience, capture without performance.",
      "Over months, it becomes something remarkable: evidence of a person who chose, again and again, to show up.",
    ],
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Quiet morning light and journal",
    ctaText: "Start your journal today",
    imageLeft: false,
  },
];

// ── Single Z-pattern block ────────────────────────────────────────────────────
function EditorialBlock({
  chapter,
  variantId,
  referralCode,
  ctaLabel,
  index,
}: {
  chapter: (typeof CHAPTERS)[0];
  variantId: string;
  referralCode: string;
  ctaLabel: string;
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isLast = index === CHAPTERS.length - 1;
  const textDelay = chapter.imageLeft ? "180ms" : "0ms";

  const textBlock = (
    <div
      className="flex flex-col justify-center py-8 lg:py-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 1s ease ${textDelay}, transform 1s ease ${textDelay}`,
      }}
    >
      {/* Ghosted chapter number — decorative only */}
      <div className="relative mb-7">
        <span
          className="absolute font-heading leading-none text-sage/[0.07] select-none pointer-events-none tabular-nums"
          style={{ fontSize: "7rem", top: "-3.5rem", left: "-0.5rem" }}
          aria-hidden
        >
          {chapter.number}
        </span>
        <p className="relative text-sage font-medium uppercase tracking-[0.26em]"
          style={{ fontSize: "0.65rem" }}>
          {chapter.overline}
        </p>
      </div>

      {/* Headline */}
      <h2 className="font-heading text-charcoal leading-[1.12] tracking-tight mb-7"
        style={{ fontSize: "clamp(2.1rem, 4vw, 2.75rem)" }}>
        {chapter.headline}
      </h2>

      {/* Prose */}
      <div className="space-y-[1.15rem]">
        {chapter.prose.map((para, i) => (
          <p key={i} className="text-warm-gray leading-[1.9]"
            style={{ fontSize: "0.9375rem" }}>
            {para}
          </p>
        ))}
      </div>

      {/* Organic CTA */}
      <div className="mt-10">
        {isLast ? (
          // Final block: the journey begins here
          <div className="flex flex-col items-start gap-3">
            <CTAButton
              variantId={variantId}
              referralCode={referralCode}
              label={ctaLabel}
              className="inline-block px-9 py-3.5 rounded-full bg-charcoal text-cream text-sm font-medium tracking-wide hover:bg-charcoal/80 transition-colors"
            />
            <p className="text-warm-gray-light uppercase tracking-[0.1em]"
              style={{ fontSize: "0.68rem" }}>
              7-day free trial &middot; No credit card &middot; Cancel anytime
            </p>
          </div>
        ) : (
          // Intermediate blocks: understated editorial link
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group inline-flex items-center gap-2.5 text-charcoal hover:text-sage transition-colors duration-300"
            style={{ fontSize: "0.8125rem" }}
          >
            <span className="border-b border-charcoal/20 group-hover:border-sage pb-px tracking-[0.04em] transition-colors duration-300">
              {chapter.ctaText}
            </span>
            <span className="text-sage transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </a>
        )}
      </div>
    </div>
  );

  const imageBlock = (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.984)",
        transition: "opacity 1.2s ease, transform 1.2s ease",
      }}
    >
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={chapter.image}
          alt={chapter.imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div ref={ref} className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
        {chapter.imageLeft ? (
          <>{imageBlock}{textBlock}</>
        ) : (
          <>{textBlock}{imageBlock}</>
        )}
      </div>
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
interface EditorialFeaturesProps {
  config: VariantConfig;
}

export default function EditorialFeatures({ config }: EditorialFeaturesProps) {
  return (
    <section id="features" className="px-5 sm:px-8 bg-cream">
      {/* Opening rule */}
      <div className="max-w-6xl mx-auto">
        <div className="w-full h-px bg-cream-border" />
      </div>

      {CHAPTERS.map((chapter, i) => (
        <div key={chapter.number}>
          <EditorialBlock
            chapter={chapter}
            variantId={config.id}
            referralCode={config.referralCode}
            ctaLabel={config.hero.ctaLabel}
            index={i}
          />
          {/* Chapter divider with centred diamond — not after the last block */}
          {i < CHAPTERS.length - 1 && (
            <div className="max-w-6xl mx-auto flex items-center gap-4">
              <div className="flex-1 h-px bg-cream-border" />
              <span className="text-cream-border" style={{ fontSize: "0.5rem" }}>◆</span>
              <div className="flex-1 h-px bg-cream-border" />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
