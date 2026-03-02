"use client";

import { useEffect, useRef, useState } from "react";
import type { VariantConfig } from "@/lib/variants";

interface FeaturesProps {
  config: VariantConfig;
}

export default function Features({ config }: FeaturesProps) {
  const { features } = config;
  const [revealed, setRevealed] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" className="py-24 px-5 sm:px-8 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sage text-xs font-medium uppercase tracking-[0.2em] mb-4">
            {features.sectionLabel}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-charcoal mb-5 leading-tight">
            {features.headline}
          </h2>
          {features.subheadline && (
            <p className="text-warm-gray text-lg max-w-xl mx-auto leading-relaxed">
              {features.subheadline}
            </p>
          )}
        </div>

        {/* Feature grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-cream-border rounded-2xl overflow-hidden border border-cream-border"
        >
          {features.items.map((item, index) => (
            <div
              key={item.title}
              className="group bg-cream p-8 sm:p-10"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 120}ms`,
              }}
            >
              {/* Icon scales up on hover — contained within fixed wrapper */}
              <div className="w-10 h-10 flex items-center justify-center mb-5">
                <span className="text-2xl transition-transform duration-300 ease-out group-hover:scale-125 inline-block">
                  {item.icon}
                </span>
              </div>

              {/* Title with an expanding sage underline on hover */}
              <h3 className="font-heading text-xl text-charcoal mb-2 inline-flex flex-col">
                {item.title}
                <span
                  className="block h-px mt-1.5 bg-sage transition-all duration-400 ease-out"
                  style={{ width: 0 }}
                  ref={(el) => {
                    if (!el) return;
                    el.style.width = "0%";
                    const card = el.closest(".group");
                    if (!card) return;
                    const onEnter = () => { el.style.width = "100%"; };
                    const onLeave = () => { el.style.width = "0%"; };
                    card.addEventListener("mouseenter", onEnter);
                    card.addEventListener("mouseleave", onLeave);
                  }}
                />
              </h3>

              <p className="text-warm-gray text-sm leading-relaxed mt-3">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
