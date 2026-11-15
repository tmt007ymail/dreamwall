import { promises as fs } from "fs";
import { Dream } from "./types";
import { DATA_DIR, DREAMS_FILE } from "./paths";

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readDreams(): Promise<Dream[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(DREAMS_FILE, "utf8");
    return JSON.parse(raw) as Dream[];
  } catch {
    return [];
  }
}

async function writeDreams(dreams: Dream[]) {
  await ensureDataDir();
  await fs.writeFile(DREAMS_FILE, JSON.stringify(dreams, null, 2), "utf8");
}

export async function listDreams(limit = 40): Promise<Dream[]> {
  const dreams = await readDreams();
  return dreams
    .filter((d) => d.status === "live" || d.status === "generating")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export async function getDream(id: string): Promise<Dream | null> {
  const dreams = await readDreams();
  return dreams.find((d) => d.id === id) ?? null;
}

export async function saveDream(dream: Dream): Promise<Dream> {
  const dreams = await readDreams();
  dreams.unshift(dream);
  await writeDreams(dreams);
  return dream;
}

export async function updateDream(
  id: string,
  patch: Partial<Dream>,
): Promise<Dream | null> {
  const dreams = await readDreams();
  const idx = dreams.findIndex((d) => d.id === id);
  if (idx < 0) return null;
  dreams[idx] = { ...dreams[idx], ...patch };
  await writeDreams(dreams);
  return dreams[idx];
}

export async function seedIfEmpty(seed: Dream[]) {
  const dreams = await readDreams();
  if (dreams.length === 0) {
    await writeDreams(seed);
  }
}
