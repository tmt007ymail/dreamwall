export type DreamStatus = "queued" | "generating" | "live" | "failed";

export type Dream = {
  id: string;
  text: string;
  displayName: string | null;
  anonymous: boolean;
  status: DreamStatus;
  createdAt: string;
  shareLine: string;
  visualSeed: string;
  estimatedCostUsd: number;
};

export type SpendDay = {
  date: string; // YYYY-MM-DD in America/Vancouver
  spentUsd: number;
  capUsd: number;
  generations: number;
};
