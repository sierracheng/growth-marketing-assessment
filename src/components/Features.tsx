import type { VariantConfig } from "@/lib/variants";

interface FeaturesProps {
  config: VariantConfig;
}

export default function Features({ config }: FeaturesProps) {
  const { features } = config;

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-cream-border rounded-2xl overflow-hidden border border-cream-border">
          {features.items.map((item) => (
            <div
              key={item.title}
              className="bg-cream p-8 sm:p-10 hover:bg-cream-dark transition-colors"
            >
              <div className="text-sage text-2xl mb-5">{item.icon}</div>
              <h3 className="font-heading text-xl text-charcoal mb-3">
                {item.title}
              </h3>
              <p className="text-warm-gray text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
