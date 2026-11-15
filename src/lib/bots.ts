import { randomUUID } from "crypto";
import { PRODUCT, SHARE_PREFIX } from "./config";
import { reserveGeneration } from "./spend";
import { saveDream, updateDream } from "./store";
import { Dream } from "./types";

function hashSeed(text: string): string {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h * 31 + text.charCodeAt(i)) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

export type IntakeInput = {
  text: string;
  anonymous: boolean;
  displayName?: string;
};

export type IntakeResult =
  | { ok: true; dream: Dream }
  | { ok: false; error: string; code: "validation" | "cap_reached" };

/** intake-bot: validate + persist a founder dream write. */
export async function intakeBot(input: IntakeInput): Promise<IntakeResult> {
  const text = input.text.trim().replace(/\s+/g, " ");
  if (text.length < PRODUCT.minDreamLength) {
    return {
      ok: false,
      code: "validation",
      error: `Dream needs at least ${PRODUCT.minDreamLength} characters.`,
    };
  }
  if (text.length > PRODUCT.maxDreamLength) {
    return {
      ok: false,
      code: "validation",
      error: `Keep it to ${PRODUCT.maxDreamLength} characters.`,
    };
  }

  const reserved = await reserveGeneration();
  if (!reserved.ok) {
    return {
      ok: false,
      code: "cap_reached",
      error: `Today’s $${PRODUCT.dailyAiCapUsd} AI budget is used. Come back tomorrow — or unlock a premiere credit soon.`,
    };
  }

  const anonymous = input.anonymous || !input.displayName?.trim();
  const dream: Dream = {
    id: randomUUID(),
    text,
    anonymous,
    displayName: anonymous ? null : input.displayName!.trim().slice(0, 40),
    status: "generating",
    createdAt: new Date().toISOString(),
    shareLine: `${SHARE_PREFIX} “${text}”`,
    visualSeed: hashSeed(text),
    estimatedCostUsd: reserved.costUsd,
  };

  await saveDream(dream);
  // Fire-and-forget render in serverless-safe sync path for MVP
  await renderBot(dream.id);
  return { ok: true, dream: (await updateDream(dream.id, {})) ?? dream };
}

/** render-bot: stub cinematic visualization until real video API is wired. */
export async function renderBot(id: string): Promise<Dream | null> {
  // Simulated render latency for UX
  await new Promise((r) => setTimeout(r, 900));
  return updateDream(id, { status: "live" });
}

/** notify-bot: payload for “your dream is live” (email/push later). */
export function notifyBot(dream: Dream) {
  return {
    channel: "share_card",
    title: "It’s on the wall.",
    body: "Someone out there needed to see this.",
    shareText: dream.shareLine,
    dreamId: dream.id,
  };
}

/** mod-bot: lightweight abuse filter before public wall. */
export function modBot(text: string): { ok: true } | { ok: false; reason: string } {
  const blocked = [
    /\b(kill|suicide|bomb|terror)\b/i,
    /\b(nazi|rape)\b/i,
    /https?:\/\//i,
  ];
  if (blocked.some((re) => re.test(text))) {
    return { ok: false, reason: "That dream can’t be shown on the public wall." };
  }
  return { ok: true };
}

/** calendar-bot: founder-week caption helper from day index. */
export function calendarBot(dayOfMonth: number) {
  const founders = [
    {
      caption:
        "Your business exists. The world just can’t see it yet.",
      cta: "Put the business on the wall",
      prompt:
        "Hand writes a founder dream; ink becomes a glowing storefront; plaza Dreamwall premiere; cinematic, hopeful; vertical 9:16.",
    },
    {
      caption: "Public commitment > private overthinking.",
      cta: "Make the company visible",
      prompt:
        "Founder writes one sentence → first customer vision → Dreamwall premiere; urgent but warm; vertical 9:16.",
    },
    {
      caption: "Pitch decks can wait. Your dream shouldn’t.",
      cta: "Put it on the wall today",
      prompt:
        "Laptop closes; one line becomes a tiny brand world; strangers watch it appear on Dreamwall; vertical 9:16.",
    },
  ];
  return founders[dayOfMonth % founders.length];
}
