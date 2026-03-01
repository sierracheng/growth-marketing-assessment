import CTAButton from "./CTAButton";
import type { VariantConfig } from "@/lib/variants";

interface CTASectionProps {
  config: VariantConfig;
}

export default function CTASection({ config }: CTASectionProps) {
  const { ctaSection, id, referralCode } = config;

  return (
    <section id="cta" className="py-24 px-5 sm:px-8 bg-charcoal">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sage-light text-xs font-medium uppercase tracking-[0.2em] mb-6">
          Get Started
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-cream leading-tight mb-5">
          {ctaSection.headline}
        </h2>
        <p className="text-warm-gray-light text-lg mb-10 leading-relaxed">
          {ctaSection.subheadline}
        </p>

        <CTAButton
          variantId={id}
          referralCode={referralCode}
          label={ctaSection.ctaLabel}
          className="inline-block bg-cream text-charcoal px-10 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-cream-dark transition-colors"
        />

        <p className="mt-6 text-warm-gray-light/60 text-xs tracking-wide">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </section>
  );
}
