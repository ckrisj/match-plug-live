"use client";

import Link from "next/link";

import Button from "@/components/ui/Button";

import { formatMatchDate } from "./PredictionFallbackNotice";

/**
 * Shown when there is nothing to display for a market, so the page still
 * carries content and crawlable links instead of an empty table. Shared by the
 * market pages and the homepage prediction block.
 */

const RELATED_MARKETS = [
  { href: "/free-football-predictions-1x2", label: "Win Draw Win" },
  { href: "/free-football-prediction-over-2.5-goals", label: "Over 2.5 Goals" },
  { href: "/free-football-predictions-both-team-to-score", label: "BTTS" },
  { href: "/free-football-predictions-draw-predictions-and-tips", label: "Draw" },
  {
    href: "/free-football-predictions-correct-score-and-tips",
    label: "Correct Score",
  },
  { href: "/free-football-predictions-handicap-predictions", label: "Handicap" },
  { href: "/free-football-predictions-mix-chance", label: "Double Chance" },
];

type EmptyPredictionStateProps = {
  /** Market name as shown to users, e.g. "Correct Score". */
  marketLabel: string;
  /** Day the visitor asked for. */
  requestedDate: string;
  /** Current page's own path, so it isn't listed as somewhere else to go. */
  currentHref?: string;
  /**
   * Overrides the default "Selections go up each morning" sentence — the
   * homepage's Tomorrow tab needs different wording.
   */
  message?: string;
};

export default function EmptyPredictionState({
  marketLabel,
  requestedDate,
  currentHref,
  message,
}: EmptyPredictionStateProps) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-12 w-full text-center">
      <p className="text-gray-700">
        {message ??
          `No ${marketLabel} picks have been published for ${formatMatchDate(
            requestedDate,
          )} yet. Selections go up each morning and are updated as team news lands.`}
      </p>
      <p className="text-sm text-gray-600">In the meantime, try another market:</p>
      <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
        {RELATED_MARKETS.filter((market) => market.href !== currentHref).map(
          (market) => (
            <Link
              key={market.href}
              href={market.href}
              className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:border-[#455DBF] hover:text-[#455DBF]"
            >
              {market.label}
            </Link>
          ),
        )}
      </div>
      <Link href="https://user.matchplug.com/auth/login">
        <Button className="cursor-pointer">Subscribe Now</Button>
      </Link>
    </div>
  );
}
