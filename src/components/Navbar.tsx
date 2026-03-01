"use client";

import { useState } from "react";
import CTAButton from "./CTAButton";
import type { VariantConfig } from "@/lib/variants";

const navLinks = [
  { label: "Practices", href: "#features" },
  { label: "Community", href: "#testimonials" },
  { label: "Journal", href: "#" },
];

interface NavbarProps {
  config: VariantConfig;
  topOffset?: number;
}

export default function Navbar({ config, topOffset = 0 }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-cream-border"
      style={{ top: topOffset }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="font-heading text-xl tracking-wide text-charcoal">
          Aura
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-warm-gray hover:text-charcoal transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={`https://ads.axon.ai/auth/signup?referralCode=${config.referralCode}`}
            className="text-sm text-warm-gray hover:text-charcoal transition-colors"
          >
            Sign in
          </a>
          <CTAButton
            variantId={config.id}
            referralCode={config.referralCode}
            label={config.navCtaLabel}
            className="text-sm bg-charcoal text-cream px-5 py-2 rounded-full hover:bg-charcoal/80 transition-colors tracking-wide"
          />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-warm-gray hover:text-charcoal"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-cream-border bg-cream px-5 py-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-warm-gray hover:text-charcoal tracking-wide"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <CTAButton
            variantId={config.id}
            referralCode={config.referralCode}
            label={config.navCtaLabel}
            className="text-sm bg-charcoal text-cream px-5 py-2.5 rounded-full text-center hover:bg-charcoal/80 transition-colors tracking-wide"
          />
        </div>
      )}
    </header>
  );
}
