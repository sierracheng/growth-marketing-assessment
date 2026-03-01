const members = [
  {
    photo:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=600&h=600&q=80",
    name: "Mia K.",
    city: "Chicago",
  },
  {
    photo:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&h=600&q=80",
    name: "Priya S.",
    city: "Singapore",
  },
  {
    photo:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&h=600&q=80",
    name: "James T.",
    city: "New York",
  },
  {
    photo:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&h=600&q=80",
    name: "Emma R.",
    city: "London",
  },
  {
    photo:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&h=600&q=80",
    name: "Daniel O.",
    city: "Cape Town",
  },
  {
    photo:
      "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?auto=format&fit=crop&w=600&h=600&q=80",
    name: "Sophia L.",
    city: "Melbourne",
  },
];

export default function UGCGrid() {
  return (
    <section className="py-20 px-5 sm:px-8 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sage text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Our Community
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-4">
            Real Members. Real Results.
          </h2>
          <p className="text-warm-gray text-lg max-w-md mx-auto">
            No filters. No perfection. Just people showing up for themselves — and each other.
          </p>
        </div>

        {/* Community stats bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 text-center">
          {[
            { value: "10,000+", label: "active members" },
            { value: "41", label: "countries" },
            { value: "2.3M", label: "sessions completed" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-heading text-3xl text-charcoal">
                {stat.value}
              </div>
              <div className="text-warm-gray text-xs tracking-wide mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {members.map((member) => (
            <div
              key={member.name}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.photo}
                alt={`${member.name} from ${member.city}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Member tag */}
              <div className="absolute bottom-3 left-3 bg-cream/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sage" />
                <span className="text-charcoal text-xs font-medium">
                  {member.name}
                </span>
                <span className="text-warm-gray-light text-xs">
                  {member.city}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-warm-gray-light mt-6">
          Photos shared with consent by Aura community members.
        </p>
      </div>
    </section>
  );
}
