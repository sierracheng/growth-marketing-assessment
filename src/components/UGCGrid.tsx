"use client";

import { useEffect, useRef, useState } from "react";

// ── Member video data ─────────────────────────────────────────────────────────
// All wellness movement / meditation / live session content. Poster = buffering fallback.
const members = [
  {
    video: "https://assets.mixkit.co/videos/1053/1053-720.mp4",       // yoga flow on beachside deck
    photo: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80",
    name: "Mia K.", city: "Chicago",
  },
  {
    video: "https://assets.mixkit.co/videos/43735/43735-720.mp4",     // close portrait, seated meditation eyes closed
    photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
    name: "Priya S.", city: "Singapore",
  },
  {
    video: "https://assets.mixkit.co/videos/32081/32081-720.mp4",     // breathwork by the lake, outdoors
    photo: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    name: "Jamie T.", city: "New York",
  },
  {
    video: "https://assets.mixkit.co/videos/43737/43737-720.mp4",     // group yoga session, three people in sync
    photo: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
    name: "Emma R.", city: "London",
  },
  {
    video: "https://assets.mixkit.co/videos/1094/1094-720.mp4",       // stretching flow on beach at sunset
    photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
    name: "Dana O.", city: "Cape Town",
  },
  {
    video: "https://assets.mixkit.co/videos/4420/4420-720.mp4",       // silhouette meditation at sunset, cinematic
    photo: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?auto=format&fit=crop&w=800&q=80",
    name: "Sophia L.", city: "Melbourne",
  },
];

// ── Stats count-up ───────────────────────────────────────────────────────────
const STATS: { target: number; format: (n: number) => string; label: string }[] = [
  { target: 10000, format: (n) => n.toLocaleString() + "+", label: "active members" },
  { target: 41,    format: (n) => String(n),                 label: "countries" },
  { target: 23,    format: (n) => (n / 10).toFixed(1) + "M", label: "sessions completed" },
];

// ── Identity archetypes ──────────────────────────────────────────────────────
const IDENTITY_ARCHETYPES = [
  { icon: "◎", title: "The Busy Professional",      desc: "Lost her routine to back-to-back calendars. Found it again in 20-minute sessions before the day takes over." },
  { icon: "◇", title: "The New Mum",                desc: "Carving out mornings before the house wakes up. Reclaiming herself — one breath at a time." },
  { icon: "⬡", title: "The Burnout Survivor",       desc: "Rebuilding slowly. Learning that rest is part of the practice, not the opposite of it." },
  { icon: "✦", title: "The Consistent Practitioner", desc: "Already shows up every day. Now has a community worthy of that dedication." },
];

// ── Bento cell descriptor ────────────────────────────────────────────────────
type BentoCell =
  | { kind: "photo"; member: (typeof members)[0]; col: string; row: string }
  | { kind: "stat";  col: string; row: string }
  | { kind: "quote"; col: string; row: string };

const BENTO_CELLS: BentoCell[] = [
  { kind: "photo", member: members[0], col: "1 / 3", row: "1 / 3" },
  { kind: "photo", member: members[1], col: "3 / 4", row: "1 / 2" },
  { kind: "photo", member: members[2], col: "3 / 4", row: "2 / 3" },
  { kind: "stat",                       col: "1 / 2", row: "3 / 4" },
  { kind: "photo", member: members[3], col: "2 / 3", row: "3 / 4" },
  { kind: "photo", member: members[4], col: "3 / 4", row: "3 / 4" },
  { kind: "photo", member: members[5], col: "1 / 3", row: "4 / 5" },
  { kind: "quote",                      col: "3 / 4", row: "4 / 5" },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function UGCGrid() {
  const [counts, setCounts] = useState([0, 0, 0]);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const duration = 1800;
        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCounts(STATS.map(({ target }) => Math.round(target * eased)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 px-5 sm:px-8 bg-cream">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sage text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Our Community
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-4">
            Real Members. Real Results.
          </h2>
          <p className="text-warm-gray text-lg max-w-md mx-auto">
            No filters. No perfection. Just people showing up for themselves — and each other.
          </p>
        </div>

        {/* Count-up stats bar */}
        <div ref={statsRef} className="flex flex-wrap justify-center gap-10 mb-12 text-center">
          {STATS.map((stat, i) => (
            <div key={stat.label}>
              <div className="w-6 h-px bg-sage mx-auto mb-3" />
              <div className="font-heading text-4xl text-charcoal tabular-nums">{stat.format(counts[i])}</div>
              <div className="text-warm-gray text-xs tracking-[0.14em] uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── Mobile: simple 2-col grid ─────────────────────────────── */}
        <div className="sm:hidden grid grid-cols-2 gap-3">
          {members.map((m) => (
            <div key={m.name} className="relative aspect-square rounded-2xl overflow-hidden group">
              <video
                src={m.video}
                poster={m.photo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-cream/85 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0" />
                <span className="text-charcoal text-xs font-medium">{m.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Desktop: Bento Box grid ───────────────────────────────── */}
        <div
          className="hidden sm:grid grid-cols-3 gap-3"
          style={{ gridTemplateRows: "repeat(4, 180px)" }}
        >
          {BENTO_CELLS.map((cell, i) => {
            const sharedStyle: React.CSSProperties = {
              gridColumn: cell.col,
              gridRow: cell.row,
            };

            if (cell.kind === "photo") {
              return (
                <div
                  key={i}
                  className="relative rounded-2xl overflow-hidden group"
                  style={sharedStyle}
                >
                  <video
                    src={cell.member.video}
                    poster={cell.member.photo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-cream/80 group-hover:bg-cream/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2 transition-colors duration-300">
                    <span className="w-2 h-2 rounded-full bg-sage flex-shrink-0" />
                    <span className="text-charcoal text-xs font-medium">{cell.member.name}</span>
                    <span className="text-warm-gray-light text-xs opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {cell.member.city}
                    </span>
                  </div>
                </div>
              );
            }

            if (cell.kind === "stat") {
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-cream-border bg-cream-dark flex flex-col items-center justify-center gap-1 p-4"
                  style={sharedStyle}
                >
                  <div className="w-5 h-px bg-sage mb-2" />
                  <div className="font-heading text-3xl text-charcoal tabular-nums text-center">
                    {STATS[2].format(counts[2])}
                  </div>
                  <div className="text-warm-gray text-xs tracking-[0.12em] uppercase text-center leading-snug">
                    {STATS[2].label}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={i}
                className="rounded-2xl border border-cream-border bg-cream flex flex-col justify-between p-5 relative overflow-hidden"
                style={sharedStyle}
              >
                <span className="font-heading text-6xl text-sage/10 leading-none absolute -top-1 right-4 select-none" aria-hidden>
                  &ldquo;
                </span>
                <p className="text-charcoal text-sm leading-relaxed italic relative z-10 flex-1 flex items-center">
                  Aura changed my mornings. I actually look forward to waking up now.
                </p>
                <div className="flex items-center gap-2 pt-3 border-t border-cream-border mt-3">
                  <div className="w-7 h-7 rounded-full bg-sage-light/30 text-sage-dark text-xs font-medium flex items-center justify-center flex-shrink-0">
                    SR
                  </div>
                  <div>
                    <div className="text-xs font-medium text-charcoal">Sarah R.</div>
                    <div className="text-xs text-warm-gray-light">Member since 2023</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-warm-gray-light mt-4 mb-20">
          Photos shared with consent by Aura community members.
        </p>

        {/* ── Identity alignment section ───────────────────────────── */}
        <div className="pt-16 border-t border-cream-border">
          <div className="text-center mb-10">
            <p className="text-sage text-xs font-medium uppercase tracking-[0.2em] mb-3">
              Who Joins Aura
            </p>
            <h3 className="font-heading text-2xl sm:text-3xl text-charcoal">
              Made for women at every chapter.
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {IDENTITY_ARCHETYPES.map((a) => (
              <div
                key={a.title}
                className="p-6 rounded-xl border border-cream-border bg-cream hover:bg-cream-dark transition-colors"
              >
                <div className="text-sage text-xl mb-4">{a.icon}</div>
                <h4 className="font-heading text-base text-charcoal mb-2">{a.title}</h4>
                <p className="text-warm-gray text-xs leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
