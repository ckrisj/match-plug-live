import React from "react";
import { DateTime } from "luxon";

import ResultsSlider, {
  ResultCardData,
  ResultsTabData,
} from "@/components/sections/ResultsSlider";
import { RESULTS_PACKAGES, getPackageResults } from "@/app/Hooks/getResults";
import { SettledTip } from "@/components/utils/results";

const TABS = [
  { key: "vip", label: "VIP", name: "VIP", singleId: RESULTS_PACKAGES.vip },
  {
    key: "elite",
    label: "ELITE",
    name: "Elite",
    singleId: RESULTS_PACKAGES.elite,
  },
] as const;

const toCard = (tip: SettledTip, index: number): ResultCardData => ({
  id: `${tip.date}-${index}`,
  dateLabel: DateTime.fromISO(tip.date).toFormat("ccc d LLL"),
  league: tip.league,
  match: `${tip.home} v ${tip.away}`,
  tip: tip.tip,
  odds: tip.odds.toFixed(2),
  score: tip.final_score,
  result: tip.result,
});

/* Rough, torn-paper edge rendered with a turbulence-displaced rectangle. */
const TornEdge: React.FC<{ position: "top" | "bottom" }> = ({ position }) => {
  const filterId = `results-torn-${position}`;
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${
        position === "top" ? "top-0" : "bottom-0"
      } h-[22px]`}
    >
      <svg
        className="h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 30"
      >
        <defs>
          <filter id={filterId} x="-5%" y="-100%" width="110%" height="300%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.009 0.32"
              numOctaves="2"
              seed={position === "top" ? 8 : 17}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <rect
          x="-40"
          y={position === "top" ? -46 : 16}
          width="1280"
          height="60"
          fill="#FFFFFF"
          filter={`url(#${filterId})`}
        />
      </svg>
    </div>
  );
};

/**
 * VIP and Elite results from the tips backend, including the losses. Rendered
 * on the server so the stats line and first cards are in the HTML crawlers
 * read. Renders nothing when there is no data — never dummy numbers.
 */
const ResultsSection = async ({
  recordHref = "/vip#results",
  joinHref = "/vip",
}: {
  /** "See full record" target; null hides it. */
  recordHref?: string | null;
  joinHref?: string;
}) => {
  const results = await Promise.all(
    TABS.map((tab) => getPackageResults(tab.singleId)),
  );

  const tabs: ResultsTabData[] = TABS.flatMap((tab, index) => {
    const result = results[index];

    return result
      ? [
          {
            key: tab.key,
            label: tab.label,
            name: tab.name,
            stats: result.stats,
            cards: result.tips.map(toCard),
            month: result.month,
          },
        ]
      : [];
  });

  if (!tabs.length) {
    return null;
  }

  return (
    <section
      id="results"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#455DBD] to-[#20358A] py-20"
    >
      <TornEdge position="top" />
      <TornEdge position="bottom" />
      <div className="relative z-10 mx-auto max-w-[1400px] px-4">
        <p className="mb-2 text-center text-sm font-bold uppercase tracking-[0.2em] text-[#03DD3C]">
          Verified results
        </p>
        <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
          VIP & Elite Results — Last 30 Days
        </h2>
        <ResultsSlider tabs={tabs} recordHref={recordHref} joinHref={joinHref} />
      </div>
    </section>
  );
};

export default ResultsSection;
