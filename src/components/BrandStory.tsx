export default function BrandStory() {
  return (
    <section className="py-24 px-5 sm:px-8 bg-cream border-y border-cream-border">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

        {/* Left: Pull quote */}
        <div>
          <div className="w-8 h-px bg-sage mb-10" />
          <blockquote className="font-heading text-4xl sm:text-5xl text-charcoal leading-[1.2] tracking-tight">
            &ldquo;The studio was always a sanctuary.
            <br />
            We brought it home.&rdquo;
          </blockquote>
          <p className="mt-8 text-sage text-xs tracking-[0.22em] uppercase">
            — The Aura Ethos
          </p>
        </div>

        {/* Right: Editorial prose */}
        <div className="space-y-6 text-warm-gray text-base leading-[1.8]">
          <p>
            Modern life accelerated faster than our nervous systems were designed for.
            Studio classes became a luxury of time, not money, and the result was a
            generation practising nothing at all.
          </p>
          <p>
            Aura was built for the in-between: the 6am living room, the lunch break
            reclaimed from a screen, the Sunday morning that became your only quiet hour.
            Studio-grade instruction. Your timeline. Your space.
          </p>
          <p>
            We did not build another content library. We built a practice, 
            one that meets you exactly where you are, and grows with you.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sage text-sm">✦</span>
            </div>
            <span className="text-xs tracking-[0.14em] uppercase text-warm-gray-light">
              Founded 2022 &middot; 10,000+ members &middot; 41 countries
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
