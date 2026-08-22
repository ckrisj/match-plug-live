"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Activity,
  BellRing,
  Check,
  CircleDollarSign,
  Crown,
  Lock,
  Radio,
  TrendingUp,
  Trophy,
  Wallet,
} from "lucide-react";
import {
  CHANNEL_STATS,
  LIVE_MATCHES,
  TELEGRAM_CHANNEL_URL,
  type InplayMatch,
  type InplayTeam,
} from "@/components/utils/inplayData";

const MAX_MINUTE: Record<InplayMatch["status"], number> = {
  "1H": 45,
  HT: 45,
  "2H": 90,
};

const VIP_FEATURES = [
  {
    icon: Activity,
    title: "Pre Game\n& Live Bets",
    note: "",
    tagline: "Bet in-play, stay ahead",
  },
  {
    icon: Trophy,
    title: "Match Of\nThe Day",
    note: "(Pre Game)",
    tagline: "Expert picks, daily edge",
  },
  {
    icon: CircleDollarSign,
    title: "Money\nRace",
    note: "",
    tagline: "More bets, bigger rewards",
  },
  {
    icon: TrendingUp,
    title: "High\nWin Rate",
    note: "",
    tagline: "Consistency. Profit. Success.",
  },
] as const;

const BENEFITS = [
  { icon: BellRing, label: "Instant in-play alerts" },
  { icon: Wallet, label: "Free — no card needed" },
  { icon: Check, label: `${CHANNEL_STATS.hitRate} in-play hit rate` },
] as const;

const TelegramIcon: React.FC<{ className?: string }> = ({
  className = "w-6 h-6",
}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12.0773 2.00105C13.3972 2.01117 14.702 2.28274 15.9164 2.80012C17.1309 3.31749 18.2311 4.07042 19.1535 5.01549C20.0759 5.96057 20.8023 7.07909 21.2907 8.30655C21.7792 9.53401 22.0201 10.8461 21.9995 12.1672C21.3218 25.3588 2.44397 25.2476 1.99953 12.0115C1.99051 10.6878 2.2456 9.37566 2.74984 8.15196C3.25408 6.92825 3.99732 5.81765 4.93597 4.88527C5.87462 3.95289 6.98978 3.2175 8.21608 2.72223C9.44237 2.22696 10.7551 1.98178 12.0773 2.00105ZM13.8945 10.3765C13.8945 10.3765 13.9106 10.3876 13.7884 10.5433C13.6662 10.699 13.4218 10.9437 13.2995 11.055L10.7551 13.5242C10.2106 14.0692 10.2218 14.4029 10.8551 14.8589C11.6662 15.4373 12.4884 15.9712 13.3218 16.5385C14.1551 17.1057 15.1773 17.9399 15.5995 16.7164C15.7071 16.3897 15.7888 16.055 15.844 15.7154C16.0218 14.7366 16.1995 13.7578 16.3551 12.7679C16.5662 11.3775 16.7662 9.98719 16.944 8.58572C17.0329 7.89611 16.6662 7.58467 15.9773 7.75151C15.693 7.81843 15.4143 7.90768 15.144 8.01846L7.88842 11.0772C7.19953 11.3664 6.51064 11.6778 5.83286 12.0115C5.6662 12.1005 5.45508 12.3452 5.4662 12.512C5.47731 12.6789 5.71064 12.868 5.89953 12.9458C6.3662 13.1349 6.8662 13.2684 7.35508 13.4241C7.72694 13.5516 8.12456 13.5847 8.51236 13.5207C8.90017 13.4566 9.26606 13.2973 9.57731 13.0571C10.4995 12.3897 11.444 11.7668 12.3884 11.144C12.8329 10.8436 13.144 10.6768 13.5773 10.3765C13.7995 10.2653 13.8501 10.2145 13.8945 10.2812V10.3765Z"
      fill="currentColor"
    />
  </svg>
);

const TeamRow: React.FC<{ team: InplayTeam }> = ({ team }) => (
  <div className="flex items-center justify-between gap-3">
    <div className="flex min-w-0 items-center gap-3">
      {team.logo ? (
        <img
          src={team.logo}
          alt={`${team.name} logo`}
          width={32}
          height={32}
          className="h-8 w-8 flex-shrink-0 rounded object-contain"
        />
      ) : (
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white/80">
          {team.short}
        </span>
      )}
      <span className="truncate text-sm font-medium text-white">
        {team.name}
      </span>
    </div>
    <span className="text-xl font-bold tabular-nums text-white">
      {team.score}
    </span>
  </div>
);

const MatchCard: React.FC<{ match: InplayMatch; minute: number }> = ({
  match,
  minute,
}) => (
  <div
    className={`flex flex-col overflow-hidden rounded-2xl border bg-[#161B27] ${
      match.locked ? "border-white/10" : "border-[#03DD3C]/40"
    }`}
  >
    {/* Status bar */}
    <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5">
      <span className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          {match.status !== "HT" && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#03DD3C] opacity-75" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#03DD3C]" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wide text-[#03DD3C]">
          {match.status === "HT" ? "Half Time" : "Live"}
        </span>
      </span>
      <span className="truncate text-[11px] font-medium text-white/50">
        {match.league}
      </span>
      <span className="flex-shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold tabular-nums text-white">
        {match.status === "HT" ? "HT" : `${minute}'`}
      </span>
    </div>

    {/* Score */}
    <div className="flex flex-col gap-3 px-4 py-4">
      <TeamRow team={match.home} />
      <TeamRow team={match.away} />
    </div>

    {/* Tip — locked or shown as proof */}
    <div className="mt-auto border-t border-white/10 px-4 py-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wide text-white/40">
          In-play tip
        </span>
        <span className="flex items-center gap-1 text-[11px] font-medium text-white/40">
          <TelegramIcon className="h-3.5 w-3.5" />
          sent {match.sentAt}&apos;
        </span>
      </div>

      {match.locked ? (
        <>
          <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-white/5 py-3">
            <span
              aria-hidden="true"
              className="select-none blur-[6px] text-sm font-semibold text-white"
            >
              {match.tip} @ {match.odds}
            </span>
            <span className="absolute inset-0 flex items-center justify-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-[#03DD3C]" />
              <span className="text-[11px] font-bold uppercase tracking-wide text-white">
                Members only
              </span>
            </span>
          </div>
          <span className="sr-only">
            Tip hidden. Join the free Telegram channel to unlock.
          </span>
          <Link
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#03DD3C]/50 py-2.5 text-xs font-bold text-[#03DD3C] transition-colors duration-200 hover:bg-[#03DD3C] hover:text-black"
          >
            <TelegramIcon className="h-4 w-4" />
            UNLOCK ON TELEGRAM
          </Link>
        </>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block rounded-full bg-[#03DD3C] px-3 py-1 text-xs font-bold text-black">
              {match.tip}
            </span>
            <span className="text-xs font-medium text-white/70">
              @ {match.odds}
            </span>
            {match.outcome === "won" && (
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#03DD3C]/15 px-2.5 py-1 text-[10px] font-bold uppercase text-[#03DD3C]">
                <Check className="h-3 w-3" />
                Landed
              </span>
            )}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-white/50">
            Posted to the channel at {match.sentAt}&apos; — before the score
            moved.
          </p>
        </>
      )}
    </div>
  </div>
);

const LiveInplaySection: React.FC = () => {
  const matches = LIVE_MATCHES;

  // One of each is shown as a sample: the first settled call as proof the tips
  // are real, and the first locked call as the thing the channel unlocks.
  const proof = matches.find((match) => !match.locked);
  const locked = matches.find((match) => match.locked);
  const samples = [proof, locked].filter(Boolean) as InplayMatch[];

  // Mock fixtures carry a fixed kick-off minute; advance it so the section reads
  // as genuinely live. Replace with the API's own minute once wired up.
  const [minutes, setMinutes] = useState<Record<string, number>>(() =>
    Object.fromEntries(samples.map((match) => [match.id, match.minute]))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setMinutes((prev) => {
        const next: Record<string, number> = {};
        for (const match of samples) {
          const current = prev[match.id] ?? match.minute;
          next[match.id] =
            match.status === "HT" || current >= MAX_MINUTE[match.status]
              ? current
              : current + 1;
        }
        return next;
      });
    }, 60_000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  const liveCount = matches.filter((match) => match.status !== "HT").length;
  const lockedCount = matches.filter((match) => match.locked).length;

  return (
    <section id="live-inplay" className="bg-[#0E121B] py-12 sm:py-24">
      <div className="mx-auto max-w-5xl px-3 sm:px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5">
            <Radio className="h-4 w-4 text-[#03DD3C]" />
            <span className="text-[11px] font-bold uppercase tracking-wide text-white">
              {liveCount} matches in play right now
            </span>
          </span>
          <h2 className="mb-2 max-w-2xl text-xl font-bold uppercase leading-tight text-white sm:text-2xl md:text-3xl">
            Live In-Play Soccer Tips
          </h2>
          <p className="mb-3 max-w-2xl text-base font-bold uppercase leading-tight text-[#03DD3C] sm:text-lg md:text-xl">
            Join the Matchplug Telegram Community
          </p>
          <p className="max-w-xl text-sm text-white/70 sm:text-base">
            Our analysts call the bet the moment the odds move mid-match. Every
            alert lands in the free channel before the goal, not after it.
          </p>
        </div>

        {/* Two samples: one landed call, one locked call */}
        {samples.length > 0 && (
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {samples.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                minute={minutes[match.id] ?? match.minute}
              />
            ))}
          </div>
        )}

        {/* Telegram join panel */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-[#03DD3C]/30 bg-gradient-to-br from-[#03DD3C]/15 to-transparent px-5 py-8 sm:mt-12 sm:px-10 sm:py-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#03DD3C] text-black">
              <TelegramIcon className="h-8 w-8" />
            </span>

            <div>
              <h3 className="text-lg font-bold uppercase text-white sm:text-2xl">
                {lockedCount === 1
                  ? "1 in-play tip is locked right now"
                  : `${lockedCount} in-play tips are locked right now`}
              </h3>
              <p className="mt-2 max-w-lg text-sm text-white/70 sm:text-base">
                Join the free channel and every one unlocks instantly — plus
                each new call for the rest of today&apos;s fixtures.
              </p>
            </div>

            <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {BENEFITS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2"
                >
                  <Icon className="h-4 w-4 text-[#03DD3C]" />
                  <span className="text-[11px] font-medium text-white sm:text-xs">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full max-w-sm items-center justify-center gap-3 rounded-full bg-[#03DD3C] py-4 text-base font-bold text-black transition-transform duration-300 hover:scale-105 sm:text-lg"
            >
              <TelegramIcon className="h-6 w-6" />
              JOIN FREE TELEGRAM CHANNEL
            </Link>

            <p className="text-xs text-white/50 sm:text-sm">
              {CHANNEL_STATS.members} bettors already inside ·{" "}
              {CHANNEL_STATS.tipsToday} tips posted today
            </p>
          </div>
        </div>

        {/* Matchplug Telegram VIP access */}
        <div className="relative mt-6 overflow-hidden rounded-3xl border border-[#03DD3C]/25 bg-[#070B12] px-4 py-9 sm:mt-8 sm:px-10 sm:py-12">
          {/* Stadium-light glow, echoing the VIP key art */}
          <span className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-[#03DD3C]/12 blur-3xl" />
          <span className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#03DD3C]/10 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            {/* Circular VIP crest */}
            <span className="flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-full border-2 border-white/15 bg-[#0A0F17] shadow-[0_0_45px_rgba(3,221,60,0.22)] sm:h-36 sm:w-36">
              <img
                src="/logo.png"
                alt="Matchplug"
                width={80}
                height={26}
                className="w-14 sm:w-20"
              />
              <span className="flex flex-col items-center">
                <span className="text-[11px] font-black uppercase italic tracking-[0.25em] text-white sm:text-sm">
                  VIP
                </span>
                <Crown className="h-3 w-3 text-[#03DD3C] sm:h-3.5 sm:w-3.5" />
              </span>
            </span>

            <h3 className="mt-6 text-lg font-black uppercase italic leading-tight text-white sm:text-2xl md:text-3xl">
              Matchplug Telegram VIP Access
            </h3>
            <p className="mt-2 max-w-lg text-sm text-white/70 sm:text-base">
              Everything the channel sends you — in-play calls, pre-game picks
              and the daily edge, all in one place.
            </p>

            {/* Feature grid */}
            <ul className="mt-9 grid w-full gap-5 sm:mt-11 sm:grid-cols-2 sm:gap-6">
              {VIP_FEATURES.map(({ icon: Icon, title, note, tagline }) => (
                <li
                  key={title}
                  className="relative rounded-2xl border border-[#03DD3C]/45 bg-[#0B111A] px-4 pb-4 pt-5 text-left shadow-[inset_0_0_30px_rgba(3,221,60,0.06)] sm:px-5"
                >
                  {/* Tick badge notched over the corner, as in the key art */}
                  <span className="absolute -left-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#1E9E33] ring-4 ring-[#070B12] sm:h-10 sm:w-10">
                    <Check className="h-5 w-5 text-white" strokeWidth={3.5} />
                  </span>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <Icon
                      className="h-12 w-12 flex-shrink-0 text-[#03DD3C] sm:h-16 sm:w-16"
                      strokeWidth={1.5}
                    />
                    <span className="min-w-0">
                      <span className="block whitespace-pre-line text-lg font-black uppercase italic leading-[1.05] text-white sm:text-2xl">
                        {title}
                      </span>
                      {note && (
                        <span className="block text-xs font-bold uppercase italic leading-tight text-white/80 sm:text-sm">
                          {note}
                        </span>
                      )}
                    </span>
                  </div>

                  <span className="mt-3 block text-[10px] font-bold uppercase italic tracking-wide text-[#03DD3C] sm:text-xs">
                    {tagline}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="https://user.matchplug.com/auth/login"
              className="mt-9 flex w-full max-w-sm items-center justify-center gap-3 rounded-full bg-[#03DD3C] py-4 text-base font-bold uppercase text-black transition-transform duration-300 hover:scale-105 sm:mt-11 sm:text-lg"
            >
              <Crown className="h-6 w-6" />
              Subscribe To VIP
            </Link>

            <p className="mt-3 text-xs text-white/50 sm:text-sm">
              Cancel anytime · Instant Telegram VIP group access
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveInplaySection;
