"use client";

import { useEffect, useRef, useState } from "react";
import WaveformBars from "./WaveformBars";

// ── Testimonial data ──────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    initials: "SR",
    name: "Sarah R.",
    location: "Austin, TX",
    quote:
      "I've tried every wellness app. Nothing made me stay until Aura. The community keeps me accountable in a way no streak counter ever could.",
    duration: "0:08",
  },
  {
    initials: "CM",
    name: "Chloe M.",
    location: "Toronto, CA",
    quote:
      "The instructors remember your name. That changes everything. It doesn't feel like an app — it feels like a studio that actually knows you.",
    duration: "0:08",
  },
  {
    initials: "AP",
    name: "Anika P.",
    location: "Berlin, DE",
    quote:
      "I started for the yoga. I stayed for the community. Two years in, these are genuinely my people.",
    duration: "0:06",
  },
];


// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({
  playing,
  durationMs,
}: {
  playing: boolean;
  durationMs: number;
}) {
  const [width, setWidth] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (playing) {
      startRef.current = null;
      setWidth(0);
      const tick = (now: number) => {
        if (!startRef.current) startRef.current = now;
        const progress = Math.min((now - startRef.current) / durationMs, 1);
        setWidth(progress * 100);
        if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setWidth(0);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, durationMs]);

  return (
    <div className="h-px w-full bg-cream-border rounded-full overflow-hidden">
      <div
        className="h-full bg-sage rounded-full"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function VoiceTestimonials() {
  const [speechSupported, setSpeechSupported] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [durationMs, setDurationMs] = useState(6000);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Keep a ref to playCard so onend can call the latest version without stale closure
  const playCardRef = useRef<(index: number) => void>(() => {});

  useEffect(() => {
    setSpeechSupported(
      typeof window !== "undefined" && "speechSynthesis" in window
    );
  }, []);

  function stopCurrent() {
    window.speechSynthesis.cancel();
    if (utteranceRef.current) {
      utteranceRef.current.onend = null;
      utteranceRef.current.onerror = null;
    }
    utteranceRef.current = null;
    setPlayingIndex(null);
  }

  function playCard(index: number) {
    const t = TESTIMONIALS[index];

    // Scroll card into view
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

    const utterance = new SpeechSynthesisUtterance(t.quote);
    utterance.rate = 0.88;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    // Estimate duration from quote length at rate 0.88 (~14 chars/sec)
    const estimated = Math.max(4000, Math.round((t.quote.length / 14) * 1000));
    setDurationMs(estimated);

    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) =>
        v.name.includes("Samantha") ||
        v.name.includes("Karen") ||
        v.name.includes("Google UK English Female") ||
        (v.lang.startsWith("en") && v.name.toLowerCase().includes("female"))
    );
    if (preferred) utterance.voice = preferred;

    utterance.onend = () => {
      if (index + 1 < TESTIMONIALS.length) {
        // Brief pause then auto-advance
        setTimeout(() => playCardRef.current(index + 1), 700);
      } else {
        setPlayingIndex(null);
      }
    };
    utterance.onerror = () => setPlayingIndex(null);

    utteranceRef.current = utterance;
    setPlayingIndex(index);
    window.speechSynthesis.speak(utterance);
  }

  // Keep ref in sync with latest playCard
  playCardRef.current = playCard;

  function handlePlay(index: number) {
    if (playingIndex === index) {
      stopCurrent();
      return;
    }
    stopCurrent();
    playCard(index);
  }

  return (
    <section className="py-20 bg-cream overflow-hidden">

      {/* Header */}
      <div className="px-5 sm:px-8 text-center mb-12">
        <p className="text-sage text-xs font-medium uppercase tracking-[0.2em] mb-4">
          Member Stories
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-4">
          In Their Own Words
        </h2>
        <p className="text-warm-gray text-sm max-w-xs mx-auto leading-relaxed">
          Tap play to hear directly from our community.
        </p>
      </div>

      {/* Horizontal scroll strip */}
      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: "none", paddingLeft: "max(1.25rem, calc((100vw - 72rem) / 2))", paddingRight: "max(1.25rem, calc((100vw - 72rem) / 2))" }}
      >
        {TESTIMONIALS.map((t, i) => {
          const isPlaying = playingIndex === i;
          const isDimmed = playingIndex !== null && !isPlaying;

          return (
            <div
              key={t.name}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="flex-shrink-0 snap-center rounded-2xl border border-cream-border flex flex-col cursor-pointer select-none"
              style={{
                width: "clamp(240px, 85vw, 320px)",
                backgroundColor: isPlaying ? "var(--color-cream-dark)" : "white",
                opacity: isDimmed ? 0.42 : 1,
                transform: isPlaying ? "scale(1.035)" : "scale(1)",
                boxShadow: isPlaying
                  ? "0 0 0 1.5px var(--color-sage), 0 8px 32px rgba(0,0,0,0.08)"
                  : "0 1px 4px rgba(0,0,0,0.04)",
                transition:
                  "opacity 0.4s ease, transform 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease",
              }}
              onClick={() => handlePlay(i)}
            >
              {/* Avatar + name + stars */}
              <div className="px-5 pt-5 pb-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-sage-light/30 text-sage-dark text-xs font-semibold flex items-center justify-center flex-shrink-0">
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-charcoal leading-none">
                    {t.name}
                  </div>
                  <div className="text-xs text-warm-gray-light mt-0.5">
                    {t.location}
                  </div>
                  <div className="flex gap-0.5 mt-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className="text-terracotta" style={{ fontSize: "10px" }}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Play / Stop */}
                {speechSupported && (
                  <button
                    aria-label={
                      isPlaying
                        ? `Stop ${t.name}`
                        : `Play voice note from ${t.name}`
                    }
                    className="flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center"
                    style={{
                      borderColor: isPlaying
                        ? "var(--color-sage)"
                        : "var(--color-cream-border)",
                      backgroundColor: isPlaying
                        ? "var(--color-sage)"
                        : "transparent",
                      transition: "border-color 0.3s ease, background-color 0.3s ease",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(i);
                    }}
                  >
                    {isPlaying ? (
                      <span
                        className="rounded-sm"
                        style={{
                          width: 7,
                          height: 7,
                          backgroundColor: "white",
                          display: "inline-block",
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          display: "inline-block",
                          width: 0,
                          height: 0,
                          marginLeft: 2,
                          borderTop: "4px solid transparent",
                          borderBottom: "4px solid transparent",
                          borderLeft: "7px solid var(--color-sage)",
                        }}
                      />
                    )}
                  </button>
                )}
              </div>

              {/* Divider */}
              <div className="mx-5 h-px bg-cream-border" />

              {/* Waveform + progress + duration */}
              <div className="px-5 py-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-3">
                  <WaveformBars playing={isPlaying} bars={15} height={28} />
                  <span
                    className="text-warm-gray-light tabular-nums flex-shrink-0"
                    style={{ fontSize: "0.63rem", letterSpacing: "0.06em" }}
                  >
                    {t.duration}
                  </span>
                </div>
                <ProgressBar playing={isPlaying} durationMs={durationMs} />
              </div>

              {/* Divider */}
              <div className="mx-5 h-px bg-cream-border" />

              {/* Quote + up-next hint */}
              <div className="px-5 py-4 flex flex-col flex-1">
                <p
                  className="text-sm leading-relaxed italic flex-1"
                  style={{
                    color: isPlaying
                      ? "var(--color-charcoal)"
                      : "var(--color-warm-gray)",
                    transition: "color 0.5s ease",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Up next label — appears only on the currently playing card if not last */}
                <div
                  style={{
                    marginTop: 12,
                    height: 16,
                    opacity: isPlaying && i < TESTIMONIALS.length - 1 ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }}
                >
                  <p
                    className="flex items-center gap-1 text-warm-gray-light uppercase tracking-[0.1em]"
                    style={{ fontSize: "0.6rem" }}
                  >
                    <span>Up next</span>
                    <span className="text-charcoal font-medium">
                      {i < TESTIMONIALS.length - 1
                        ? TESTIMONIALS[i + 1].name.split(" ")[0]
                        : ""}
                    </span>
                    <span>→</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-warm-gray-light mt-6 px-5">
        Voice notes shared with consent. Synthesised for web playback.
      </p>
    </section>
  );
}
