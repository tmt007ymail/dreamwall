type Props = {
  seed: string;
  text: string;
  className?: string;
};

/** Deterministic abstract “dream film” frame from seed — stands in for video API. */
export function DreamVisual({ seed, text, className = "" }: Props) {
  const n = parseInt(seed.slice(0, 8), 16) || 1;
  const a = 20 + (n % 50);
  const b = 40 + ((n >> 4) % 40);
  const c = 10 + ((n >> 8) % 60);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `
          radial-gradient(circle at ${a}% ${b}%, rgba(232,165,75,0.55), transparent 42%),
          radial-gradient(circle at ${100 - a}% ${c}%, rgba(110,200,192,0.35), transparent 45%),
          linear-gradient(160deg, #0c1218 0%, #1a2733 48%, #0f1a22 100%)
        `,
      }}
    >
      <div className="dream-shimmer absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.08%22/%3E%3C/svg%3E')] opacity-60" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <p className="font-display text-lg leading-snug text-paper/95 md:text-xl">
          “{text}”
        </p>
      </div>
    </div>
  );
}
