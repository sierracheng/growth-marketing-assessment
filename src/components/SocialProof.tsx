import type { VariantConfig } from "@/lib/variants";

interface SocialProofProps {
  config: VariantConfig;
}

export default function SocialProof({ config }: SocialProofProps) {
  const { stats, testimonials } = config.socialProof;

  return (
    <section id="testimonials" className="py-24 px-5 sm:px-8 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-4xl sm:text-5xl text-charcoal mb-2">
                {stat.value}
              </div>
              <div className="text-warm-gray text-sm tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials header */}
        <div className="text-center mb-12">
          <p className="text-sage text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Member Stories
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal">
            What our community says
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-cream rounded-2xl p-7 border border-cream-border flex flex-col gap-5"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-terracotta text-sm">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-charcoal text-sm leading-relaxed flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-cream-border">
                <div className="w-9 h-9 rounded-full bg-sage-light/30 text-sage-dark text-xs font-medium flex items-center justify-center flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-charcoal">
                    {t.name}
                  </div>
                  <div className="text-xs text-warm-gray-light">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
