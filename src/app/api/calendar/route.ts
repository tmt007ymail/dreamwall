import { NextResponse } from "next/server";
import { calendarBot } from "@/lib/bots";
import { todayKey } from "@/lib/date";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const key = todayKey();
  const day = Number(key.slice(-2));
  return NextResponse.json({
    date: key,
    post: calendarBot(day),
  });
}
