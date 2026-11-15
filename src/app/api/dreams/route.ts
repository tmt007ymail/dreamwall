import { NextResponse } from "next/server";
import { intakeBot, modBot, notifyBot } from "@/lib/bots";
import { SEED_DREAMS } from "@/lib/seed";
import { getDream, listDreams, seedIfEmpty } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await seedIfEmpty(SEED_DREAMS);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const dream = await getDream(id);
    if (!dream) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ dream, notify: notifyBot(dream) });
  }
  const dreams = await listDreams();
  return NextResponse.json({ dreams });
}

export async function POST(request: Request) {
  await seedIfEmpty(SEED_DREAMS);
  let body: { text?: string; anonymous?: boolean; displayName?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const text = body.text ?? "";
  const mod = modBot(text);
  if (!mod.ok) {
    return NextResponse.json({ error: mod.reason }, { status: 400 });
  }

  const result = await intakeBot({
    text,
    anonymous: Boolean(body.anonymous ?? true),
    displayName: body.displayName,
  });

  if (!result.ok) {
    const status = result.code === "cap_reached" ? 429 : 400;
    return NextResponse.json(
      { error: result.error, code: result.code },
      { status },
    );
  }

  return NextResponse.json({
    dream: result.dream,
    notify: notifyBot(result.dream),
  });
}
