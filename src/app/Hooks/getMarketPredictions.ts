import { DateTime } from "luxon";

import { MatchPrediction } from "@/components/sections/FootballPredictionDetailsTable";

/**
 * Picks are published each morning. A page rendered during a publishing gap
 * used to show an empty table, which is a thin page to a crawler — and with 23
 * market pages that was the whole commercial surface of the site. Instead of
 * rendering nothing we walk back to the most recent day that does have picks
 * and tell the reader which day they are looking at.
 */
const LOOKBACK_DAYS = 10;

/** How far ahead to look for the next day that already has picks. */
const LOOKAHEAD_DAYS = 5;

/**
 * Seconds before a cached predictions response is refetched. Short enough that
 * a morning publish and later team-news edits land quickly, long enough that
 * crawling all 23 market pages does not trigger a fresh upstream call for each.
 */
const REVALIDATE_SECONDS = 300;

export interface MarketPredictions {
  /** Rows to render. Empty only if no day in the window had any. */
  predictions: MatchPrediction[];
  /** ISO date the returned rows were actually published for. */
  servedDate: string;
  /** ISO date the visitor asked for. */
  requestedDate: string;
  /** True when `servedDate` is an earlier day than the one requested. */
  isFallback: boolean;
  /** Next day after the requested one that already has picks, if any. */
  nextDate: string | null;
}

/**
 * Fetched with `fetch` rather than axios so Next can cache the response.
 * The market key can contain spaces ("Mix Chance"), hence URLSearchParams.
 */
async function fetchPredictions(
  market: string,
  date: string,
): Promise<MatchPrediction[]> {
  const base = process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL;

  if (!base) {
    console.error("NEXT_PUBLIC_BLOG_ADMIN_API_URL is not set");
    return [];
  }

  const url = new URL(`${base}/api/predictions`);
  url.searchParams.set("date", date);
  url.searchParams.set("market", market);

  try {
    const response = await fetch(url, {
      headers: {
        "MATCHPLUG-API-KEY": process.env.NEXT_PUBLIC_BLOG_ADMIN_API_KEY ?? "",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error(
        `Predictions responded ${response.status} for "${market}" on ${date}`,
      );
      return [];
    }

    const body = await response.json();

    return Array.isArray(body) ? (body as MatchPrediction[]) : [];
  } catch (error) {
    console.error(
      `Predictions request failed for "${market}" on ${date}:`,
      error,
    );
    return [];
  }
}

const shiftDays = (date: string, days: number) =>
  DateTime.fromISO(date).plus({ days }).toISODate() ?? date;

/**
 * Resolves the rows to show for a market on a given day, falling back to the
 * most recent published day when that day is empty.
 */
export async function getMarketPredictions(
  market: string,
  requestedDate: string,
): Promise<MarketPredictions> {
  const onTheDay = await fetchPredictions(market, requestedDate);

  if (onTheDay.length) {
    return {
      predictions: onTheDay,
      servedDate: requestedDate,
      requestedDate,
      isFallback: false,
      nextDate: null,
    };
  }

  // Nothing for the requested day. Probe the surrounding days in parallel — a
  // sequential walk would add a round trip for every empty day in the gap.
  const earlier = Array.from({ length: LOOKBACK_DAYS }, (_, index) =>
    shiftDays(requestedDate, -(index + 1)),
  );
  const later = Array.from({ length: LOOKAHEAD_DAYS }, (_, index) =>
    shiftDays(requestedDate, index + 1),
  );

  const [earlierResults, laterResults] = await Promise.all([
    Promise.all(earlier.map((date) => fetchPredictions(market, date))),
    Promise.all(later.map((date) => fetchPredictions(market, date))),
  ]);

  // Both windows are ordered nearest-first, so the first hit is the closest day.
  const mostRecent = earlierResults.findIndex((rows) => rows.length);
  const upcoming = laterResults.findIndex((rows) => rows.length);

  return {
    predictions: mostRecent === -1 ? [] : earlierResults[mostRecent],
    servedDate: mostRecent === -1 ? requestedDate : earlier[mostRecent],
    requestedDate,
    isFallback: mostRecent !== -1,
    nextDate: upcoming === -1 ? null : later[upcoming],
  };
}
