"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import CTAButton from "./CTAButton";
import type { VariantConfig } from "@/lib/variants";

interface FoundingOfferProps {
  config: VariantConfig;
}

const benefits = [
  "Full access to 500+ movement, breathwork & meditation sessions",
  "Priority booking for all live weekly sessions",
  "Lifetime access to the Founding Member Circle",
  "Personal wellness intake call with a lead instructor",
  "Price locked at $19/month — forever, even as rates increase",
  "Early access to all new features and programmes",
];

export default function FoundingOffer({ config }: FoundingOfferProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Price count-down: 29 → 19 on scroll entry
  const price = useMotionValue(29);
  const priceRounded = useTransform(price, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(price, 19, { duration: 1.2, ease: "easeOut", delay: 0.5 });
    return controls.stop;
  }, [isInView, price]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-5 sm:px-8 overflow-hidden"
    >
      {/* ── Video background ─────────────────────────────────────────── */}
      {/* 43605 — slow aerial glide over a calm river through forest     */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.72) saturate(0.80)" }}
      >
        <source src="https://assets.mixkit.co/videos/43605/43605-720.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/41398/41398-720.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay — heavier at edges, lighter at center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(10,14,12,0.45) 0%, rgba(10,14,12,0.68) 100%)",
        }}
      />

      {/* ── Card ─────────────────────────────────────────────────────── */}
      <motion.div
        className="relative max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glassmorphism card */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          {/* Header */}
          <motion.div
            className="px-8 py-7"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] mb-2 text-sage-light">
              Founding Member Offer
            </p>
            <h2 className="font-heading text-3xl text-white mb-1">
              Lock in your rate. Forever.
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.52)" }}>
              Founding members pay $19/month for life — even when the price rises to $29/month.
            </p>
          </motion.div>

          {/* Pricing — animated count-up */}
          <motion.div
            className="px-8 py-6 flex items-baseline gap-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          >
            <span className="font-heading text-5xl text-white flex items-baseline gap-0.5">
              $<motion.span>{priceRounded}</motion.span>
            </span>
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.42)" }}>
              /month
            </span>
            <span
              className="ml-1 text-sm line-through"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              $29/month
            </span>
            <motion.span
              className="ml-auto text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                color: "#1a1710",
                backgroundColor: "#e8c97a",
                border: "none",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.9, type: "spring", stiffness: 260, damping: 18 }}
            >
              Save 35%
            </motion.span>
          </motion.div>

          {/* Benefits — staggered reveal */}
          <div className="px-8 py-7">
            <ul className="space-y-3.5">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={benefit}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "rgba(255,255,255,0.70)" }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.45,
                    delay: 0.55 + i * 0.08,
                    ease: "easeOut",
                  }}
                >
                  <motion.span
                    className="mt-0.5 flex-shrink-0 text-sage-light"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: 0.60 + i * 0.08,
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    ✓
                  </motion.span>
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <motion.div
            className="px-8 py-7"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
          >
            <CTAButton
              variantId={config.id}
              referralCode={config.referralCode}
              label="Claim Your Founding Spot"
              className="block w-full text-center bg-white text-charcoal py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-white/90 active:scale-[0.98] transition-all"
            />
            <p
              className="text-center text-xs mt-4"
              style={{ color: "rgba(255,255,255,0.30)" }}
            >
              7-day free trial included. Cancel before then and you won&apos;t be charged.
            </p>
          </motion.div>
        </div>

        {/* Guarantee note */}
        <motion.p
          className="text-center text-xs mt-6 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.35)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          🔒 Price lock guarantee — your $19/month rate is locked for the lifetime of your membership.
        </motion.p>
      </motion.div>
    </section>
  );
}
