import { NextResponse } from "next/server";
import { PRODUCT } from "@/lib/config";
import { getTodaySpend } from "@/lib/spend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const day = await getTodaySpend();
  const remaining = Math.max(0, Number((day.capUsd - day.spentUsd).toFixed(4)));
  return NextResponse.json({
    timezone: PRODUCT.timezone,
    dailyCapUsd: PRODUCT.dailyAiCapUsd,
    costPerGenerationUsd: PRODUCT.costPerGenerationUsd,
    day,
    remainingUsd: remaining,
  });
}
