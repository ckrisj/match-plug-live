import { cache } from "react";
import { unstable_cache } from "next/cache";
import { DateTime } from "luxon";

import {
  ResultsStats,
  SettledTip,
  TipOutcome,
  hasDecidedTips,
  summarize,
} from "@/components/utils/results";

/**
 * Predictions-API markets for the VIP (single ID 182) and Elite (single ID 178)
 * packages. The API filters by market name, not by ID.
 */
export const RESULTS_PACKAGES = {
  vip: "VIP SINGLE",
  elite: "ELITE SINGLE",
} as const;

/** Each page of the results slider, and its stats lines, covers this many days. */
const PERIOD_DAYS = 30;

/**
 * Pages in the slider: the last 30 days and the 30 before. The API returns at
 * most 62 days per request, so both fit in one call.
 */
const PERIOD_COUNT = 2;

/**
 * Outcomes are graded by hand in the admin, often for days already past, and
 * should show on the site soon after. A refresh is one call per package, but it
 * also rebuilds the page around it, so a minute keeps that rebuild occasional.
 */
const RESULTS_REVALIDATE_SECONDS = 60;

/** A row from /api/predictions/. */
interface PredictionRow {
  /** The day the tip was published for, YYYY-MM-DD. */
  date?: string | null;
  league_name?: string;
  home_team_name?: string;
  away_team_name?: string;
  prediction?: string;
  odds?: number | string | null;
  /** WON / LOST / CANCELLED once graded, null before. */
  outcome?: string | null;
  /** Kickoff, sent as a timestamp. */
  fixture_date?: number | string | null;
}

/** One page of the slider: 30 days and the stats counted from them. */
export interface ResultsPeriod {
  /**
   * Every day of the period, oldest first, with that day's tips — empty on a
   * day without one, so the grid shows each day in its place.
   */
  days: { date: string; tips: SettledTip[] }[];
  stats: ResultsStats;
}

export interface PackageResults {
  /** Newest first: the last 30 days, then the 30 before. */
  periods: ResultsPeriod[];
}

type RangeResponse = { rows: PredictionRow[] } | { error: string };

/**
 * Not cached on its own: the whole result is cached once in
 * `getPackageResults`, which runs fetches uncached anyway. The trailing slash
 * is because the backend 308s the bare path.
 */
async function fetchRange(
  market: string,
  from: string,
  to: string,
): Promise<RangeResponse> {
  const base = process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL;

  if (!base) {
    return { error: "NEXT_PUBLIC_BLOG_ADMIN_API_URL is not set" };
  }

  const url = new URL(`${base}/api/predictions/`);
  url.searchParams.set("market", market);
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);

  try {
    const response = await fetch(url, {
      headers: {
        "MATCHPLUG-API-KEY": process.env.NEXT_PUBLIC_BLOG_ADMIN_API_KEY ?? "",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { error: `responded ${response.status}` };
    }

    const body = await response.json();

    return Array.isArray(body)
      ? { rows: body as PredictionRow[] }
      : { error: "did not return a list" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

/**
 * fixture_date arrives as a timestamp: Unix seconds, or milliseconds when it
 * is too large to be seconds. An ISO or SQL date string is accepted too.
 */
function parseFixtureDate(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numeric =
    typeof value === "number"
      ? value
      : /^\d+(\.\d+)?$/.test(value.trim())
        ? Number(value)
        : NaN;

  if (Number.isFinite(numeric)) {
    const date =
      numeric > 1e12
        ? DateTime.fromMillis(numeric)
        : DateTime.fromSeconds(numeric);

    return date.isValid ? date : null;
  }

  const iso = DateTime.fromISO(String(value), { setZone: true });

  if (iso.isValid) {
    return iso;
  }

  const sql = DateTime.fromSQL(String(value), { setZone: true });

  return sql.isValid ? sql : null;
}

/**
 * The backend sends WON, LOST or CANCELLED, or null while a tip is ungraded.
 * A cancelled tip is shown as void; anything else as NA.
 */
const OUTCOMES: Record<string, TipOutcome> = {
  won: "won",
  lost: "lost",
  cancelled: "void",
  canceled: "void",
  void: "void",
};

/**
 * A graded tip has been played. An ungraded one is shown as NA, but only once
 * its kickoff is known to have passed: before that it may be a paid pick still
 * to come, and showing it would hand it out for free.
 */
function toSettledTip(row: PredictionRow, now: DateTime): SettledTip | null {
  const tip = row.prediction?.trim();

  if (!row.home_team_name || !row.away_team_name || !tip) {
    return null;
  }

  const kickoff = parseFixtureDate(row.fixture_date);

  // The published day files the tip in the grid; kickoff is the fallback.
  const date = /^\d{4}-\d{2}-\d{2}/.test(row.date ?? "")
    ? (row.date ?? "").slice(0, 10)
    : kickoff?.toISODate();

  if (!date) {
    return null;
  }

  if (kickoff && kickoff > now) {
    return null;
  }

  const result =
    OUTCOMES[String(row.outcome ?? "").trim().toLowerCase()] ?? "na";

  if (result === "na" && !kickoff) {
    return null;
  }

  // Missing odds leave the tip on the record and drop only the units figure.
  const odds = Number(row.odds);

  return {
    date,
    kickoff: kickoff?.toISO() ?? null,
    league: row.league_name ?? "",
    home: row.home_team_name,
    away: row.away_team_name,
    tip,
    odds: Number.isFinite(odds) && odds > 1 ? odds : null,
    result,
  };
}

/**
 * Settled results for one package, in 30-day pages. Returns null when no page
 * has a won or lost tip, or the API fails, so the block is hidden rather than
 * ever falling back to made-up numbers.
 *
 * Today is never requested: its picks may not have kicked off yet.
 */
async function loadPackageResults(
  market: string,
): Promise<PackageResults | null> {
  const now = DateTime.now();
  const yesterday = now.startOf("day").minus({ days: 1 });
  const from = yesterday.minus({ days: PERIOD_DAYS * PERIOD_COUNT - 1 });

  const response = await fetchRange(
    market,
    from.toISODate() ?? "",
    yesterday.toISODate() ?? "",
  );

  if ("error" in response) {
    console.error(`Results for "${market}" failed: ${response.error}`);

    return null;
  }

  const tips = response.rows
    .map((row) => toSettledTip(row, now))
    .filter((tip): tip is SettledTip => tip !== null)
    // Oldest first, as the grid reads; within a day, earliest kickoff first.
    .sort(
      (a, b) =>
        a.date.localeCompare(b.date) ||
        (a.kickoff ?? "").localeCompare(b.kickoff ?? ""),
    );

  const periods: ResultsPeriod[] = [];

  for (let index = 0; index < PERIOD_COUNT; index++) {
    const periodEnd = yesterday.minus({ days: PERIOD_DAYS * index });
    const periodStart = periodEnd.minus({ days: PERIOD_DAYS - 1 });
    const days: ResultsPeriod["days"] = [];

    for (let day = periodStart; day <= periodEnd; day = day.plus({ days: 1 })) {
      const date = day.toISODate() ?? "";

      days.push({ date, tips: tips.filter((tip) => tip.date === date) });
    }

    periods.push({
      days,
      stats: summarize(days.flatMap((day) => day.tips)),
    });
  }

  if (!periods.some((period) => hasDecidedTips(period.stats))) {
    return null;
  }

  return { periods };
}

/**
 * The whole result is cached for a minute, an empty one included. Next only
 * caches successful fetches, so while the API errors every render would repeat
 * the request, and /vip renders on every request. `cache` on top dedupes
 * repeat lookups within a single render. The key carries a version so a result
 * cached in the old shape is never served to the new grid.
 */
export const getPackageResults = cache(
  unstable_cache(loadPackageResults, ["package-results-v2"], {
    revalidate: RESULTS_REVALIDATE_SECONDS,
  }),
);
