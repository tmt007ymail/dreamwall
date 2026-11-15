/** Hard product caps — keep AI spend inside the $1000 envelope. */
export const PRODUCT = {
  name: "Dreamwall",
  tagline: "Make the company visible before the logo exists.",
  supportLine:
    "Write one sentence. We turn your founder dream into a short film the world can feel.",
  beachhead: "founders" as const,
  dailyAiCapUsd: 10,
  /** Stub cost per generation until a real video API is wired. */
  costPerGenerationUsd: 0.35,
  timezone: "America/Vancouver",
  maxDreamLength: 180,
  minDreamLength: 8,
} as const;

export const SHARE_PREFIX = "I put my founder dream on Dreamwall.";
