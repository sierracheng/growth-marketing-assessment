const PERKS = [
  {
    icon: "◎",
    title: "Lifetime Price Lock",
    desc: "$19/month, guaranteed forever. Every member who joins after the 200 spots fill pays the standard rate — which rises to $29/month the moment this tier closes.",
  },
  {
    icon: "✦",
    title: "Founding Member Circle",
    desc: "Permanent access to an exclusive accountability pod with the original 200. This inner circle never opens to standard members — once it's closed, it's closed.",
  },
  {
    icon: "◇",
    title: "Personal Intake Call",
    desc: "A one-on-one session with a lead instructor to build a practice tailored to your life. Founding members only — not available at any price after the 200 spots are filled.",
  },
];

export default function ExclusiveBenefits() {
  return (
    <section className="py-20 px-5 sm:px-8 bg-cream-dark">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-terracotta text-xs font-medium uppercase tracking-[0.22em] mb-4">
            Founding Members Only
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-4">
            What You&apos;re Locking In
          </h2>
          <p className="text-warm-gray text-sm max-w-sm mx-auto leading-relaxed">
            These three perks exist only for the first 200 members. They disappear the moment this tier closes.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PERKS.map((perk) => (
            <div
              key={perk.title}
              className="bg-cream border border-cream-border rounded-2xl p-7 flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Founding Only badge */}
              <div className="inline-flex items-center gap-1.5 self-start">
                <span className="w-1 h-1 rounded-full bg-terracotta flex-shrink-0" />
                <span className="text-terracotta text-[0.6rem] font-medium uppercase tracking-[0.18em]">
                  Founding Only
                </span>
              </div>

              {/* Icon */}
              <div className="text-sage text-2xl">{perk.icon}</div>

              {/* Content */}
              <div>
                <h3 className="font-heading text-lg text-charcoal mb-2">{perk.title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed">{perk.desc}</p>
              </div>

              {/* Footer */}
              <p className="text-warm-gray-light text-xs mt-auto pt-4 border-t border-cream-border">
                Closes when all 200 spots are filled
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
