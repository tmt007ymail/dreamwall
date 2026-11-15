"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { DreamVisual } from "./DreamVisual";
import type { Dream } from "@/lib/types";

type SpendInfo = {
  dailyCapUsd: number;
  remainingUsd: number;
  day: { spentUsd: number; generations: number; date: string };
};

type Phase = "idle" | "submitting" | "generating" | "live";

export function DreamwallApp() {
  const [text, setText] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [spend, setSpend] = useState<SpendInfo | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [current, setCurrent] = useState<Dream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const refresh = useCallback(async () => {
    const [dreamRes, spendRes] = await Promise.all([
      fetch("/api/dreams", { cache: "no-store" }),
      fetch("/api/spend", { cache: "no-store" }),
    ]);
    const dreamJson = await dreamRes.json();
    const spendJson = await spendRes.json();
    setDreams(dreamJson.dreams ?? []);
    setSpend(spendJson);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const charsLeft = 180 - text.length;
  const canSubmit = text.trim().length >= 8 && phase !== "submitting";

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined" || !current) return "";
    return `${window.location.origin}/#dream-${current.id}`;
  }, [current]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPhase("submitting");
    try {
      const res = await fetch("/api/dreams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          anonymous,
          displayName: anonymous ? undefined : displayName,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Something went wrong.");
        setPhase("idle");
        await refresh();
        return;
      }
      setPhase("generating");
      setCurrent(json.dream);
      // Brief cinematic beat, then reveal
      await new Promise((r) => setTimeout(r, 1200));
      setCurrent(json.dream);
      setPhase("live");
      setText("");
      await refresh();
      document.getElementById("reveal")?.scrollIntoView({ behavior: "smooth" });
    } catch {
      setError("Network error. Try again.");
      setPhase("idle");
    }
  }

  async function copyShare() {
    if (!current) return;
    const payload = `${current.shareLine}\n${shareUrl}`;
    await navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-paper">
      <HeroBackdrop />

      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <a href="#top" className="font-display text-2xl tracking-tight text-paper">
          Dreamwall
        </a>
        <nav className="flex items-center gap-4 text-sm text-mist/80">
          <a href="#wall" className="hover:text-amber transition">
            Watch the wall
          </a>
          <a
            href="#write"
            className="rounded-full bg-amber px-4 py-2 font-medium text-ink transition hover:bg-amber-hot"
          >
            Write my dream
          </a>
        </nav>
      </header>

      <main id="top" className="relative z-10">
        {/* HERO */}
        <section className="relative mx-auto grid min-h-[88vh] max-w-6xl items-end gap-10 px-5 pb-16 pt-10 md:grid-cols-12 md:px-8 md:pb-20">
          <div className="md:col-span-7">
            <p className="animate-rise mb-4 font-sans text-sm uppercase tracking-[0.22em] text-amber">
              For founders who aren’t public yet
            </p>
            <h1 className="animate-rise-delay font-display text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.95] text-paper">
              Dreamwall
            </h1>
            <p className="animate-rise-delay-2 mt-5 max-w-xl text-lg text-mist/90 md:text-xl">
              Make the company visible before the logo exists. Write one
              sentence — we turn it into a short film on a public wall.
            </p>
            <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
              <a
                href="#write"
                className="rounded-full bg-amber px-6 py-3 text-base font-semibold text-ink shadow-glow transition hover:bg-amber-hot"
              >
                Write my dream
              </a>
              <a
                href="#wall"
                className="rounded-full border border-mist/25 px-6 py-3 text-base text-paper/90 transition hover:border-amber/50 hover:text-amber"
              >
                Watch live dreams
              </a>
            </div>
            <p className="mt-5 text-sm text-mist/60">
              Free · 10 seconds · Anonymous OK · Still monetizable via credits
              &amp; premieres
            </p>
          </div>

          <div className="relative md:col-span-5">
            <div className="animate-drift absolute -inset-6 rounded-[2rem] bg-amber/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 shadow-glow">
              <DreamVisual
                seed="hero0001"
                text="Ship the product the pitch deck only describes."
                className="aspect-[4/5] min-h-[320px]"
              />
              <div className="pointer-events-none absolute left-1/2 top-[42%] h-[2px] -translate-x-1/2 rounded-full bg-amber glow-line" />
            </div>
          </div>
        </section>

        {/* WRITE */}
        <section
          id="write"
          className="relative border-t border-white/5 bg-ink-soft/80 px-5 py-20 md:px-8"
        >
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl">
              What’s the company the world can’t see yet?
            </h2>
            <p className="mt-3 text-mist/75">
              Be specific. Be honest. One sentence is enough.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <label className="block">
                <span className="sr-only">Your dream</span>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 180))}
                  rows={3}
                  placeholder='e.g. “Open a tiny bookstore café that funds local writers.”'
                  className="w-full resize-none rounded-2xl border border-white/10 bg-ink px-5 py-4 text-lg text-paper outline-none ring-amber/40 placeholder:text-mist/35 focus:ring-2"
                />
                <span className="mt-2 block text-right text-xs text-mist/50">
                  {charsLeft}
                </span>
              </label>

              <div className="flex flex-wrap items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-mist/80">
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="size-4 accent-amber"
                  />
                  Stay anonymous
                </label>
                {!anonymous && (
                  <input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="First name"
                    className="rounded-full border border-white/10 bg-ink px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-amber/40"
                  />
                )}
              </div>

              {error && (
                <p className="rounded-xl border border-amber/30 bg-amber/10 px-4 py-3 text-sm text-amber-hot">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full rounded-full bg-amber py-3.5 text-base font-semibold text-ink transition hover:bg-amber-hot disabled:cursor-not-allowed disabled:opacity-40 md:w-auto md:px-10"
              >
                {phase === "submitting" || phase === "generating"
                  ? "Making it visible…"
                  : "Make it visible"}
              </button>
              <p className="text-xs text-mist/50">
                By sharing, your dream can appear on the public wall. AI
                generation capped at ${spend?.dailyCapUsd ?? 10}/day (
                {spend
                  ? `$${spend.remainingUsd.toFixed(2)} left today`
                  : "loading budget…"}
                ).
              </p>
            </form>
          </div>
        </section>

        {/* GENERATING / REVEAL */}
        {(phase === "generating" || (phase === "live" && current)) && (
          <section
            id="reveal"
            className="border-t border-white/5 px-5 py-16 md:px-8"
          >
            <div className="mx-auto max-w-3xl text-center">
              {phase === "generating" && (
                <>
                  <h2 className="font-display text-3xl">
                    Your dream is becoming a film…
                  </h2>
                  <p className="mt-2 text-mist/70">Stay a moment — this is the magic.</p>
                  <div className="mx-auto mt-8 h-2 w-48 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-2/3 animate-pulse rounded-full bg-amber" />
                  </div>
                </>
              )}

              {phase === "live" && current && (
                <>
                  <h2 className="font-display text-3xl md:text-4xl">
                    It’s on the wall.
                  </h2>
                  <p className="mt-2 text-mist/75">
                    Someone out there needed to see this.
                  </p>
                  <div className="mx-auto mt-8 overflow-hidden rounded-[1.25rem] border border-white/10 text-left shadow-glow">
                    <DreamVisual
                      seed={current.visualSeed}
                      text={current.text}
                      className="aspect-video"
                    />
                  </div>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => void copyShare()}
                      className="rounded-full bg-amber px-6 py-3 font-semibold text-ink hover:bg-amber-hot"
                    >
                      {copied ? "Copied" : "Share my dream"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPhase("idle");
                        setCurrent(null);
                        document
                          .getElementById("write")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="rounded-full border border-white/15 px-6 py-3 text-paper/90 hover:border-amber/40"
                    >
                      Write another
                    </button>
                    <a
                      href="#wall"
                      className="rounded-full border border-white/15 px-6 py-3 text-paper/90 hover:border-amber/40"
                    >
                      Invite 3 friends
                    </a>
                  </div>
                  <p className="mt-4 text-sm text-mist/55">
                    Share caption: {current.shareLine}
                  </p>
                </>
              )}
            </div>
          </section>
        )}

        {/* LIVE WALL */}
        <section id="wall" className="border-t border-white/5 px-5 py-20 md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl md:text-4xl">
                  Dreams happening now
                </h2>
                <p className="mt-2 text-mist/70">
                  Founder dreams, made visible. Watch — then write yours.
                </p>
              </div>
              {spend && (
                <p className="rounded-full border border-white/10 px-4 py-2 text-xs text-mist/60">
                  AI budget {spend.day.date}: ${spend.day.spentUsd.toFixed(2)} / $
                  {spend.dailyCapUsd}
                </p>
              )}
            </div>

            {dreams.length === 0 ? (
              <p className="mt-12 text-mist/60">
                The wall is waiting for the next one.
              </p>
            ) : (
              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {dreams.map((d) => (
                  <li
                    key={d.id}
                    id={`dream-${d.id}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-soft/40 transition hover:border-amber/35"
                  >
                    <DreamVisual
                      seed={d.visualSeed}
                      text={d.text}
                      className="aspect-[4/3]"
                    />
                    <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                      <span className="text-mist/55">
                        {d.anonymous ? "Anonymous" : d.displayName}
                      </span>
                      <a
                        href="#write"
                        className="text-amber opacity-0 transition group-hover:opacity-100"
                      >
                        This inspired me
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="border-t border-white/5 px-5 py-16 text-center md:px-8">
          <p className="font-display text-2xl md:text-3xl">
            Don’t keep it in your head.
          </p>
          <a
            href="#write"
            className="mt-6 inline-block rounded-full bg-amber px-8 py-3.5 font-semibold text-ink hover:bg-amber-hot"
          >
            Put it on the wall
          </a>
        </section>
      </main>

      <footer className="border-t border-white/5 px-5 py-8 text-center text-xs text-mist/45 md:px-8">
        <p>
          Dreamwall · Founders beachhead · Anonymous writes on · ${" "}
          {spend?.dailyCapUsd ?? 10}/day AI cap · Credits &amp; premieres unlock
          monetization without forcing identity
        </p>
      </footer>
    </div>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="animate-drift absolute -left-1/4 top-[-10%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(232,165,75,0.22),transparent_60%)]" />
      <div className="absolute right-[-20%] top-[10%] h-[60vh] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(110,200,192,0.14),transparent_62%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,18,24,0.2)_0%,rgba(12,18,24,0.55)_55%,#0c1218_100%)]" />
      <div className="absolute inset-0 opacity-[0.35] mix-blend-soft-light bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.45%22/%3E%3C/svg%3E')]" />
    </div>
  );
}
