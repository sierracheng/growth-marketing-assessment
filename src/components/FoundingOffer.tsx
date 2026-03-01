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
  return (
    <section className="py-20 px-5 sm:px-8 bg-cream">
      <div className="max-w-2xl mx-auto">
        {/* Offer card */}
        <div className="border border-cream-border rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-cream-dark px-8 py-7 border-b border-cream-border">
            <p className="text-sage text-xs font-medium uppercase tracking-[0.2em] mb-2">
              Founding Member Offer
            </p>
            <h2 className="font-heading text-3xl text-charcoal mb-1">
              Lock in your rate. Forever.
            </h2>
            <p className="text-warm-gray text-sm">
              Founding members pay $19/month for life — even when the price rises to $29/month.
            </p>
          </div>

          {/* Pricing */}
          <div className="px-8 py-6 border-b border-cream-border bg-cream flex items-baseline gap-3">
            <span className="font-heading text-5xl text-charcoal">$19</span>
            <span className="text-warm-gray text-sm">/month</span>
            <span className="ml-1 text-warm-gray-light text-sm line-through">
              $29/month
            </span>
            <span className="ml-auto text-xs text-terracotta font-medium bg-terracotta/10 px-3 py-1 rounded-full">
              Save 35%
            </span>
          </div>

          {/* Benefits */}
          <div className="px-8 py-7 bg-cream">
            <ul className="space-y-3.5">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-charcoal">
                  <span className="text-sage mt-0.5 flex-shrink-0">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="px-8 py-7 bg-cream-dark border-t border-cream-border">
            <CTAButton
              variantId={config.id}
              referralCode={config.referralCode}
              label="Claim Your Founding Spot"
              className="block w-full text-center bg-charcoal text-cream py-4 rounded-full text-sm font-medium tracking-wide hover:bg-charcoal/80 transition-colors"
            />
            <p className="text-center text-xs text-warm-gray-light mt-4">
              7-day free trial included. Cancel before then and you won&apos;t be charged.
            </p>
          </div>
        </div>

        {/* Guarantee note */}
        <p className="text-center text-xs text-warm-gray-light mt-6 leading-relaxed">
          🔒 Price lock guarantee — your $19/month rate is locked for the lifetime of your membership.
        </p>
      </div>
    </section>
  );
}
