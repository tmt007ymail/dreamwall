import { promises as fs } from "fs";
import { PRODUCT } from "./config";
import { todayKey } from "./date";
import { DATA_DIR, SPEND_FILE } from "./paths";
import { SpendDay } from "./types";

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readAll(): Promise<Record<string, SpendDay>> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(SPEND_FILE, "utf8");
    return JSON.parse(raw) as Record<string, SpendDay>;
  } catch {
    return {};
  }
}

async function writeAll(data: Record<string, SpendDay>) {
  await ensureDataDir();
  await fs.writeFile(SPEND_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function getTodaySpend(): Promise<SpendDay> {
  const key = todayKey();
  const all = await readAll();
  return (
    all[key] ?? {
      date: key,
      spentUsd: 0,
      capUsd: PRODUCT.dailyAiCapUsd,
      generations: 0,
    }
  );
}

export type ReserveResult =
  | { ok: true; day: SpendDay; costUsd: number }
  | { ok: false; reason: "cap_reached"; day: SpendDay; costUsd: number };

/** Reserve budget for one generation under the $10/day hard cap. */
export async function reserveGeneration(
  costUsd = PRODUCT.costPerGenerationUsd,
): Promise<ReserveResult> {
  const key = todayKey();
  const all = await readAll();
  const day =
    all[key] ??
    ({
      date: key,
      spentUsd: 0,
      capUsd: PRODUCT.dailyAiCapUsd,
      generations: 0,
    } satisfies SpendDay);

  if (day.spentUsd + costUsd > day.capUsd + 1e-9) {
    return { ok: false, reason: "cap_reached", day, costUsd };
  }

  day.spentUsd = Number((day.spentUsd + costUsd).toFixed(4));
  day.generations += 1;
  all[key] = day;
  await writeAll(all);
  return { ok: true, day, costUsd };
}
