"use client";

import { MatchPrediction } from "../FootballPredictionDetailsTable";
import { formatMatchDate } from "./PredictionFallbackNotice";

/**
 * Shown on a market page that has no picks of its own for any recent day.
 *
 * The market's own fallback still runs first and wins whenever that market has
 * published; this is the last resort, so the page carries a real table instead
 * of only an explanation. It is labelled as the general free expert tips card,
 * not as the market the page is about — presenting these as, say, 1X2 picks
 * would be wrong.
 */

type ExpertTipsFallbackProps = {
  predictions: MatchPrediction[];
  /** Day these were published for. */
  servedDate: string;
};

export default function ExpertTipsFallback({
  predictions,
  servedDate,
}: ExpertTipsFallbackProps) {
  if (!predictions.length) {
    return null;
  }

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold text-gray-900">
        Our latest free expert tips
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Published {formatMatchDate(servedDate)}. These are our general expert
        selections, not picks for this market.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full overflow-hidden">
          <thead>
            <tr>
              <th className="text-left py-3 border border-white/50 sm:py-4 px-3 sm:px-6 text-white text-xs sm:text-sm font-bold bg-[#455DBF]">
                Home Team
              </th>
              <th className="text-left py-3 border border-white/50 sm:py-4 px-3 sm:px-6 text-white text-xs sm:text-sm font-bold bg-[#455DBF]">
                Away Team
              </th>
              <th className="text-left py-3 border border-white/50 sm:py-4 px-3 sm:px-6 text-white text-xs sm:text-sm font-bold bg-[#455DBF]">
                Prediction
              </th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((match, index) => (
              <tr
                key={`${match.home_team_name}-${index}`}
                className="border-b border-x border-gray-500 hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-3 sm:px-6 bg-[#F4F6FB] text-center text-xs sm:text-sm py-3">
                  {match.home_team_name}
                </td>
                <td className="px-3 sm:px-6 bg-[#EDF0F9] text-center text-xs sm:text-sm py-3">
                  {match.away_team_name}
                </td>
                <td className="text-center py-3 px-3 sm:px-6 bg-[#F4F6FB]">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    {match.prediction}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
