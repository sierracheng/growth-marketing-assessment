"use client";

import { useEffect, useRef, useState } from "react";
import type { VariantConfig } from "@/lib/variants";
import WaveformBars from "./WaveformBars";

interface SocialProofProps {
  config: VariantConfig;
}

// Parse a stat string into an animatable target + display formatter.
// Returns null for values that can't cleanly animate (e.g. "4.9/5").
function parseStatValue(
  value: string
): { target: number; format: (n: number) => string } | null {
  if (value.includes("/")) return null;
  if (value.endsWith("%")) {
    const n = parseInt(value);
    return { target: n, format: (v) => `${v}%` };
  }
  if (value.endsWith("+")) {
    const n = parseInt(value.replace(/,/g, "").slice(0, -1));
    return { target: n, format: (v) => `${v.toLocaleString()}+` };
  }
  if (value.endsWith("M")) {
    const n = Math.round(parseFloat(value) * 10);
    return { target: n, format: (v) => `${(v / 10).toFixed(1)}M` };
  }
  const n = parseInt(value.replace(/,/g, ""));
  if (!isNaN(n)) return { target: n, format: (v) => String(v) };
  return null;
}


export default function SocialProof({ config }: SocialProofProps) {
  const { stats, testimonials } = config.socialProof;

  // ── Count-up animation ───────────────────────────────────────────────────
  const statConfigs = stats.map((s) => parseStatValue(s.value));
  const [counts, setCounts] = useState(statConfigs.map(() => 0));
  const [animated, setAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated) return;
        setAnimated(true);
        obs.disconnect();
        const duration = 1800;
        const startTime = performance.now();
        const targets = statConfigs.map((cfg) => cfg?.target ?? 0);
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCounts(targets.map((t) => Math.round(t * eased)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Web Speech API voice notes ───────────────────────────────────────────
  const [speechSupported, setSpeechSupported] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    setSpeechSupported(
      typeof window !== "undefined" && "speechSynthesis" in window
    );
  }, []);

  function handlePlay(index: number, quote: string) {
    if (playingIndex === index) {
      window.speechSynthesis.cancel();
      setPlayingIndex(null);
      return;
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(quote);
    utterance.rate = 0.88;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    // Prefer a natural-sounding voice when available
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) =>
        v.name.includes("Samantha") ||
        v.name.includes("Karen") ||
        v.name.includes("Google UK English Female") ||
        (v.lang.startsWith("en") && v.name.toLowerCase().includes("female"))
    );
    if (preferred) utterance.voice = preferred;

    utterance.onend = () => setPlayingIndex(null);
    utterance.onerror = () => setPlayingIndex(null);

    setPlayingIndex(index);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <section id="testimonials" className="py-24 px-5 sm:px-8 bg-cream-dark">
      <div className="max-w-6xl mx-auto">

        {/* ── Stats ─────────────────────────────────────────────────── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-6"
        >
          {stats.map((stat, i) => {
            const cfg = statConfigs[i];
            const display = cfg ? cfg.format(counts[i]) : stat.value;
            return (
              <div key={stat.label} className="text-center flex flex-col items-center">
                <div className="w-7 h-px bg-sage mb-5" />
                <div className="font-heading text-5xl sm:text-6xl text-charcoal leading-none mb-3 tabular-nums">
                  {display}
                </div>
                <div className="text-warm-gray text-xs tracking-[0.14em] uppercase leading-relaxed">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-warm-gray-light mb-20">
          Based on member surveys, 2024
        </p>

        {/* ── Testimonials header ───────────────────────────────────── */}
        <div className="text-center mb-12">
          <p className="text-sage text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Member Stories
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal">
            What our community says
          </h2>
        </div>

        {/* ── Testimonial cards ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => {
            const isPlaying = playingIndex === i;
            return (
              <div
                key={t.name}
                className="bg-cream rounded-2xl p-7 border border-cream-border flex flex-col gap-5 relative overflow-hidden"
              >
                {/* Decorative quote mark */}
                <span
                  className="font-heading text-8xl text-sage/10 leading-none absolute -top-2 right-5 select-none pointer-events-none"
                  aria-hidden
                >
                  &ldquo;
                </span>

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-terracotta text-sm">★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-charcoal text-sm leading-relaxed flex-1 italic relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Voice note button */}
                {speechSupported && (
                  <button
                    onClick={() => handlePlay(i, t.quote)}
                    className="self-start flex items-center gap-2 hover:opacity-70 transition-opacity active:scale-95"
                    aria-label={isPlaying ? `Stop voice note from ${t.name}` : `Hear from ${t.name}`}
                  >
                    <WaveformBars playing={isPlaying} bars={12} height={20} />
                    <span
                      className="tracking-wide text-xs transition-colors duration-300"
                      style={{ color: isPlaying ? "var(--color-sage)" : "rgba(107,140,120,0.9)" }}
                    >
                      {isPlaying ? "Stop" : `Click to Hear from ${t.name.split(" ")[0]}`}
                    </span>
                  </button>
                )}

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-cream-border">
                  <div className="w-9 h-9 rounded-full bg-sage-light/30 text-sage-dark text-xs font-medium flex items-center justify-center flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-charcoal">{t.name}</div>
                    <div className="text-xs text-warm-gray-light">{t.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
