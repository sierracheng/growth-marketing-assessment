export default function AuthenticityBlock() {
  return (
    <section className="py-20 px-5 sm:px-8 bg-cream">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sage text-xs font-medium uppercase tracking-[0.22em] mb-4">
            A message from our founder
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal">
            Why only 200?
          </h2>
        </div>

        {/* Profile card */}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-14 items-start">

          {/* Left — photo + identity */}
          <div className="flex flex-col items-center sm:items-start gap-4 flex-shrink-0">
            {/* Portrait */}
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-cream-border"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=280&q=80"
                alt="Maya Chen, Co-founder & CEO of Aura"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name + role */}
            <div className="text-center sm:text-left">
              <p className="text-charcoal text-sm font-semibold">Maya Chen</p>
              <p className="text-warm-gray-light text-xs tracking-wide mt-0.5">
                Co-founder & CEO, Aura
              </p>
            </div>

            {/* Verified badge */}
            <div className="inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-sage flex-shrink-0" />
              <span className="text-sage text-[0.6rem] font-medium uppercase tracking-[0.18em]">
                Founding Team
              </span>
            </div>
          </div>

          {/* Vertical divider */}
          <div
            className="hidden sm:block w-px self-stretch flex-shrink-0"
            style={{ backgroundColor: "rgba(160,155,140,0.20)" }}
          />

          {/* Right — quote */}
          <div className="flex flex-col justify-center gap-6">
            {/* Opening quote mark */}
            <span
              className="font-heading text-sage/25 leading-none select-none"
              style={{ fontSize: "4rem", lineHeight: 0.8 }}
              aria-hidden
            >
              &ldquo;
            </span>

            <p
              className="font-heading text-charcoal leading-[1.6] tracking-tight -mt-2"
              style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)" }}
            >
              We cap founding membership at 200 so that every single member
              receives a personal intake call, guaranteed priority access to every
              live session, and a lead instructor who actually knows their name.
              Past 200, that level of attention becomes impossible, so the tier
              closes, and the price increases permanently.
            </p>

            {/* Signature line */}
            <div className="flex items-center gap-3 pt-2 border-t border-cream-border">
              <div className="w-5 h-px bg-sage/40" />
              <p className="text-warm-gray-light text-xs tracking-wide italic">
                Written personally to the first 200 members
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
