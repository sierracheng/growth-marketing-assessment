/**
 * Shared waveform bars component.
 * - Idle  (playing=false): faster sage-tinted wave rippling left→right — attracts clicks
 * - Active (playing=true): energetic bright wave — confirms audio is live
 *
 * Requires @keyframes waveBar, waveIdle, voicePulse defined in globals.css.
 */

interface WaveformBarsProps {
  playing: boolean;
  bars?: number;
  height?: number;
}

export default function WaveformBars({
  playing,
  bars = 10,
  height = 16,
}: WaveformBarsProps) {
  const period = playing ? 0.5 : 0.75;
  const gap    = playing ? 0.04 : 0.055;

  return (
    <div
      className="flex items-end gap-[3px] flex-shrink-0"
      style={{ height }}
      aria-hidden
    >
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="rounded-full flex-shrink-0"
          style={{
            width: 2.5,
            height: "100%",
            backgroundColor: playing
              ? "var(--color-sage)"
              : "rgba(107,140,120,0.55)",
            transformOrigin: "bottom",
            animationName: playing ? "waveBar" : "waveIdle",
            animationDuration: `${period}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDirection: playing ? "alternate" : "normal",
            animationDelay: `${i * gap}s`,
            transition: "background-color 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}
