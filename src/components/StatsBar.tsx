"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: "10,000+", label: "Active Members" },
  { value: "41",      label: "Countries Represented" },
  { value: "2.3M",    label: "Sessions Completed" },
  { value: "94%",     label: "Member Satisfaction" },
];

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="bg-charcoal px-5 sm:px-8 py-10">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="flex flex-col items-center text-center gap-1.5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="font-heading leading-none tabular-nums"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#f5ede0" }}
            >
              {stat.value}
            </span>
            <span
              className="text-xs uppercase tracking-[0.18em] font-medium"
              style={{ color: "rgba(245,237,220,0.45)" }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
