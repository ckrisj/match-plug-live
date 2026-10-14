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

/**
 * The grid and both of its stats lines cover this many days, so every win
 * figure on the page is the same number.
 */
const WINDOW_DAYS = 30;

/**
 * Outcomes are graded by hand in the admin, often for days already past, and
 * should show on the site soon after. A refresh is 30 calls per package, made
 * in the background, so a minute keeps it close without hammering the API.
 */
const RESULTS_REVALIDATE_SECONDS = 60;

/** Each call takes about a second, so fan out, but not all at once. */
const CONCURRENCY = 8;

/** A row from /api/predictions/. */
interface PredictionRow {
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

export interface PackageResults {
  /**
   * Every one of the last 30 days, oldest first, with that day's tips — empty
   * on a day without one, so the grid shows each day in its place.
   */
  days: { date: string; tips: SettledTip[] }[];
  /** Stats for the last 30 days. */
  stats: ResultsStats;
}

type DayResponse = { rows: PredictionRow[] } | { error: string };

/**
 * Not cached on its own: the whole result is cached once in
 * `getPackageResults`, which runs fetches uncached anyway. The trailing slash
 * is because the backend 308s the bare path.
 */
async function fetchDay(market: string, date: string): Promise<DayResponse> {
  const base = process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL;

  if (!base) {
    return { error: "NEXT_PUBLIC_BLOG_ADMIN_API_URL is not set" };
  }

  const url = new URL(`${base}/api/predictions/`);
  url.searchParams.set("date", date);
  url.searchParams.set("market", market);

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
function toSettledTip(
  row: PredictionRow,
  date: string,
  now: DateTime,
): SettledTip | null {
  const tip = row.prediction?.trim();

  if (!row.home_team_name || !row.away_team_name || !tip) {
    return null;
  }

  const kickoff = parseFixtureDate(row.fixture_date);

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

async function mapInBatches<T, R>(
  items: T[],
  size: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];

  for (let start = 0; start < items.length; start += size) {
    results.push(...(await Promise.all(items.slice(start, start + size).map(fn))));
  }

  return results;
}

/**
 * Settled results for one package. Returns null when the last 30 days have no
 * won or lost tips, or the API fails, so the block is hidden rather than ever
 * falling back to made-up numbers.
 *
 * Today is never requested: its picks may not have kicked off yet.
 */
async function loadPackageResults(
  market: string,
): Promise<PackageResults | null> {
  const now = DateTime.now();
  const today = now.startOf("day");
  const yesterday = today.minus({ days: 1 });

  const windowStart = yesterday.minus({ days: WINDOW_DAYS - 1 });

  // One request per day of the window, newest first.
  const days: DateTime[] = [];

  for (let day = yesterday; day >= windowStart; day = day.minus({ days: 1 })) {
    days.push(day);
  }

  const responses = await mapInBatches(days, CONCURRENCY, (day) =>
    fetchDay(market, day.toISODate() ?? ""),
  );

  const failures = responses.filter(
    (response): response is { error: string } => "error" in response,
  );

  if (failures.length) {
    console.error(
      `Results for "${market}": ${failures.length} of ${days.length} days failed (first: ${failures[0].error})`,
    );
  }

  const tips = responses
    .flatMap((response, index) =>
      "rows" in response
        ? response.rows.map((row) =>
            toSettledTip(row, days[index].toISODate() ?? "", now),
          )
        : [],
    )
    .filter((tip): tip is SettledTip => tip !== null)
    // Oldest first, as the grid reads; within a day, earliest kickoff first.
    .sort(
      (a, b) =>
        a.date.localeCompare(b.date) ||
        (a.kickoff ?? "").localeCompare(b.kickoff ?? ""),
    );

  const stats = summarize(tips);

  if (!hasDecidedTips(stats)) {
    return null;
  }

  const calendar: PackageResults["days"] = [];

  for (let day = windowStart; day <= yesterday; day = day.plus({ days: 1 })) {
    const date = day.toISODate() ?? "";

    calendar.push({
      date,
      tips: tips.filter((tip) => tip.date === date),
    });
  }

  return { days: calendar, stats };
}

/**
 * The whole result is cached for a minute, an empty one included. Next only
 * caches successful fetches, so while the API errors every render would repeat
 * all 30 day requests, and /vip renders on every request. `cache` on top
 * dedupes repeat lookups within a single render.
 */
export const getPackageResults = cache(
  unstable_cache(loadPackageResults, ["package-results"], {
    revalidate: RESULTS_REVALIDATE_SECONDS,
  }),
);
