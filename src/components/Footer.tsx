const links = {
  Practice: ["Yoga", "Pilates", "Breathwork", "Meditation"],
  Community: ["Member Stories", "Live Sessions", "Circles", "Events"],
  Resources: ["Journal", "Guides", "Blog", "FAQ"],
  Legal: ["Privacy", "Terms", "Cookie Policy", "Accessibility"],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-warm-gray-light py-16 px-5 sm:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-heading text-xl text-cream mb-3">Aura</div>
            <p className="text-sm leading-relaxed text-warm-gray-light/70">
              Premium wellness for the modern pace of life.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-cream text-xs font-medium uppercase tracking-[0.15em] mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm hover:text-cream transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-gray-light/50">
          <p>© {new Date().getFullYear()} Aura Wellness. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-cream transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-cream transition-colors">
              TikTok
            </a>
            <a href="#" className="hover:text-cream transition-colors">
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
