import CTAButton from "./CTAButton";
import type { VariantConfig } from "@/lib/variants";

interface HeroProps {
  config: VariantConfig;
}

export default function Hero({ config }: HeroProps) {
  const { hero, id, referralCode } = config;
  const isVideo = hero.bgType === "video";
  const isImage = hero.bgType === "image";
  const isSolid = hero.bgType === "solid";

  return (
    <section
      className={`relative flex items-center justify-center min-h-screen px-5 sm:px-8 ${
        isSolid ? "pt-28 pb-20 bg-cream-dark" : "pt-0"
      }`}
    >
      {/* Video background */}
      {isVideo && hero.bgSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={hero.bgPoster}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={hero.bgSrc} type="video/mp4" />
        </video>
      )}

      {/* Image background */}
      {isImage && hero.bgSrc && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero.bgSrc})` }}
        />
      )}

      {/* Dark overlay for video/image */}
      {(isVideo || isImage) && hero.overlay && (
        <div className="absolute inset-0 bg-[rgba(20,18,16,0.52)]" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        {hero.badge && (
          <div
            className={`inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase ${
              isVideo || isImage
                ? "bg-white/15 text-white/90 border border-white/20"
                : "bg-sage/10 text-sage-dark border border-sage/20"
            }`}
          >
            <span className="w-1 h-1 rounded-full bg-current opacity-70" />
            {hero.badge}
          </div>
        )}

        {/* Headline */}
        <h1
          className={`font-heading text-5xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight mb-6 ${
            isVideo || isImage ? "text-white" : "text-charcoal"
          }`}
        >
          {hero.headline}
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg sm:text-xl leading-relaxed max-w-xl mx-auto mb-10 ${
            isVideo || isImage ? "text-white/80" : "text-warm-gray"
          }`}
        >
          {hero.subheadline}
        </p>

        {/* Spot counter (variant-1) */}
        {hero.showSpotCounter && hero.spotsLeft !== undefined && hero.spotsTotal && (
          <div className="mb-8 inline-flex flex-col items-center gap-2">
            <div className="text-white/90 text-sm font-medium tracking-wide">
              {hero.spotsLeft} of {hero.spotsTotal} founding spots remaining
            </div>
            <div className="w-64 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-terracotta rounded-full"
                style={{
                  width: `${((hero.spotsTotal - hero.spotsLeft) / hero.spotsTotal) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <CTAButton
            variantId={id}
            referralCode={referralCode}
            label={hero.ctaLabel}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all ${
              isVideo || isImage
                ? "bg-white text-charcoal hover:bg-cream-dark"
                : "bg-charcoal text-cream hover:bg-charcoal/80"
            }`}
          />
          {!hero.showSpotCounter && (
            <a
              href="#features"
              className={`w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-medium tracking-wide border transition-all text-center ${
                isVideo || isImage
                  ? "border-white/30 text-white/90 hover:bg-white/10"
                  : "border-cream-border text-warm-gray hover:border-sage/40"
              }`}
            >
              See how it works
            </a>
          )}
        </div>

        {/* Trust badges */}
        {!hero.showSpotCounter && (
          <div
            className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs tracking-wide ${
              isVideo || isImage ? "text-white/60" : "text-warm-gray-light"
            }`}
          >
            {["7-day free trial", "No credit card", "Cancel anytime"].map(
              (badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <span className="text-sage-light">✓</span> {badge}
                </span>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
