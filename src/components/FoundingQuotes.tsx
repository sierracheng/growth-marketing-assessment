const QUOTES = [
  {
    quote:
      "I almost waited for the next cohort. My spot number is 94. Every time I log in I think about how close I came to missing this.",
    name: "Sarah R.",
    detail: "Spot #94 · Chicago",
    initials: "SR",
  },
  {
    quote:
      "The price lock alone made me commit within five minutes of reading the page. The practice has given me back my mornings.",
    name: "Emma T.",
    detail: "Spot #31 · London",
    initials: "ET",
  },
  {
    quote:
      "I saw '200 spots' and assumed it was a marketing line. When I joined, my number was 61. I screenshot it. That was my sign.",
    name: "Priya M.",
    detail: "Spot #61 · Singapore",
    initials: "PM",
  },
];

export default function FoundingQuotes() {
  return (
    <section className="py-20 px-5 sm:px-8 bg-cream-dark">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sage text-xs font-medium uppercase tracking-[0.22em] mb-4">
            From the First 200
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal">
            They almost waited.
          </h2>
        </div>

        {/* Quote cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {QUOTES.map((q) => (
            <div
              key={q.name}
              className="bg-cream rounded-2xl p-7 border border-cream-border flex flex-col gap-5 relative overflow-hidden"
            >
              {/* Decorative large quote mark */}
              <span
                className="font-heading absolute -top-2 right-5 select-none pointer-events-none text-sage/10"
                style={{ fontSize: "6rem", lineHeight: 1 }}
                aria-hidden
              >
                &ldquo;
              </span>

              {/* Quote */}
              <p className="text-charcoal text-sm leading-relaxed italic relative z-10 flex-1">
                &ldquo;{q.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-cream-border">
                <div className="w-8 h-8 rounded-full bg-sage-light/30 text-sage-dark text-xs font-semibold flex items-center justify-center flex-shrink-0">
                  {q.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-charcoal">{q.name}</div>
                  <div className="text-xs text-warm-gray-light">{q.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
