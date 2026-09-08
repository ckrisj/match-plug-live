import { DateTime } from "luxon";

import { getMarketPredictions } from "@/app/Hooks/getMarketPredictions";

/**
 * Reports whether today's picks have actually been published, per market.
 *
 * The site now falls back to the most recent published day rather than
 * rendering an empty table, which fixes the thin-page problem but also hides a
 * publishing gap from anyone looking at the site. Point an uptime check at this
 * route so a missed morning publish raises an alert instead of going unnoticed:
 * it returns 503 when nothing at all is up for today.
 */

/** Markets treated as must-publish for the daily check. */
const CORE_MARKETS = [
  "Straight Win",
  "Over 2.5 Goals",
  "Under 2.5 Goals",
  "BTTS/GG",
  "Draw",
  "Correct Score",
  "Handicap",
  "Mix Chance",
  "HT / FT",
  "Goal First Half",
  "Bet Builder",
  "Cards",
  "Corners",
];

export const revalidate = 300;

export async function GET() {
  const today = DateTime.now().toISODate() ?? "";

  const results = await Promise.all(
    CORE_MARKETS.map(async (market) => {
      const { predictions, servedDate, isFallback } =
        await getMarketPredictions(market, today);

      return {
        market,
        publishedToday: !isFallback && predictions.length > 0,
        rows: predictions.length,
        servingDate: servedDate,
      };
    }),
  );

  const publishedToday = results.filter((r) => r.publishedToday);
  const missing = results.filter((r) => !r.publishedToday).map((r) => r.market);

  // Nothing at all for today is the condition worth paging on; a handful of
  // quiet markets on an international break is not.
  const healthy = publishedToday.length > 0;

  return Response.json(
    {
      date: today,
      healthy,
      marketsPublishedToday: publishedToday.length,
      marketsChecked: results.length,
      missing,
      markets: results,
    },
    {
      status: healthy ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
