import React from "react";

import { RESULTS_PACKAGES, getPackageResults } from "@/app/Hooks/getResults";
import { formatUnits, hasDecidedTips } from "@/components/utils/results";

/**
 * One line of proof under the hero, linking down to the full results slider.
 * Hidden when the last 7 days have nothing settled to report.
 */
const ResultsStrip = async () => {
  const vip = await getPackageResults(RESULTS_PACKAGES.vip);

  if (!vip || !hasDecidedTips(vip.week)) {
    return null;
  }

  return (
    <div className="border-b border-white/10 bg-[#0C1636] px-4 py-3 text-center text-sm text-white sm:text-base">
      <a href="#results" className="group inline-flex flex-wrap items-center justify-center gap-x-1.5">
        <span className="font-bold">VIP last 7 days:</span>
        <span>
          <span className="font-bold text-[#03DD3C]">{vip.week.won} won</span>
          {" · "}
          <span className="font-bold text-[#FF6B76]">{vip.week.lost} lost</span>
          {vip.week.units !== null && (
            <>
              {" · "}
              <span className="font-bold">{formatUnits(vip.week.units)}u</span>
            </>
          )}
        </span>
        <span className="font-semibold text-[#03DD3C] underline-offset-4 group-hover:underline">
          → See results
        </span>
      </a>
    </div>
  );
};

export default ResultsStrip;
