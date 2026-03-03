interface UrgencyBannerProps {
  spotsLeft: number;
}

export default function UrgencyBanner({ spotsLeft }: UrgencyBannerProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-terracotta text-cream text-xs text-center py-2.5 px-4 tracking-wide">
      {/* Mobile: condensed to one line */}
      <span className="sm:hidden font-medium">
        🔒 Only {spotsLeft} founding spots remaining
      </span>
      {/* sm+: full version */}
      <span className="hidden sm:inline">
        <span className="opacity-80">🔒 Founding Member Program</span>
        <span className="mx-3 opacity-40">·</span>
        <span className="font-medium">Only {spotsLeft} spots remaining</span>
        <span className="mx-3 opacity-40">·</span>
        <span className="opacity-80">Doors close when spots fill</span>
      </span>
    </div>
  );
}
