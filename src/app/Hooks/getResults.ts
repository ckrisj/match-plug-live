import { cache } from "react";
import { unstable_cache } from "next/cache";
import { DateTime } from "luxon";

import {
  ResultsStats,
  SettledTip,
  TIP_OUTCOMES,
  TipOutcome,
  hasDecidedTips,
  summarize,
} from "@/components/utils/results";

/** Package single IDs on the tips backend, sent as the predictions market_id. */
export const RESULTS_PACKAGES = {
  vip: 182,
  elite: 178,
} as const;

/** The slider and its stats line cover this many days. */
const WINDOW_DAYS = 30;

/** The strip under the hero covers this many days. */
const STRIP_DAYS = 7;

/**
 * Days this recent can still be settled or corrected, so they are refetched
 * every 10 minutes as the brief asks.
 */
const RECENT_DAYS = 3;
const RECENT_REVALIDATE_SECONDS = 600;

/**
 * Older days are settled. The API only answers one day at a time, so
 * refetching them all every 10 minutes would mean ~120 upstream calls a cycle.
 */
const SETTLED_REVALIDATE_SECONDS = 6 * 60 * 60;

/** Each call takes about a second, so fan out, but not all at once. */
const CONCURRENCY = 8;

/** A row from /api/predictions/. odds, status and kickoff are required here. */
interface PredictionRow {
  league_name?: string;
  home_team_name?: string;
  away_team_name?: string;
  prediction?: string;
  /** The final score, e.g. "3-1". */
  result?: string;
  odds?: number | string;
  status?: string;
  kickoff?: string;
}

export interface PackageResults {
  /** Settled tips in the last 30 days, newest first. */
  tips: SettledTip[];
  /** Stats for `tips`. */
  stats: ResultsStats;
  /** Stats for the last 7 days. */
  week: ResultsStats;
  /** The previous calendar month, if it has any won or lost tips. */
  month: { name: string; stats: ResultsStats } | null;
}

type DayResponse = { rows: PredictionRow[] } | { error: string };

/**
 * Fetched with `fetch` rather than axios so Next can cache the response, and
 * with a trailing slash because the backend 308s the bare path.
 */
async function fetchDay(
  singleId: number,
  date: string,
  revalidate: number,
): Promise<DayResponse> {
  const base = process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL;

  if (!base) {
    return { error: "NEXT_PUBLIC_BLOG_ADMIN_API_URL is not set" };
  }

  const url = new URL(`${base}/api/predictions/`);
  url.searchParams.set("date", date);
  url.searchParams.set("market_id", String(singleId));

  try {
    const response = await fetch(url, {
      headers: {
        "MATCHPLUG-API-KEY": process.env.NEXT_PUBLIC_BLOG_ADMIN_API_KEY ?? "",
      },
      next: { revalidate },
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

function parseKickoff(value: string | undefined) {
  if (!value) {
    return null;
  }

  const iso = DateTime.fromISO(value, { setZone: true });

  if (iso.isValid) {
    return iso;
  }

  const sql = DateTime.fromSQL(value, { setZone: true });

  return sql.isValid ? sql : null;
}

/**
 * Only a tip with a final won / lost / void status is shown. Anything else is
 * still in play, and showing it would hand a paid pick out for free.
 */
function toSettledTip(
  row: PredictionRow,
  date: string,
  now: DateTime,
): SettledTip | null {
  const result = row.status?.trim().toLowerCase() as TipOutcome | undefined;

  if (!result || !TIP_OUTCOMES.includes(result)) {
    return null;
  }

  const odds = Number(row.odds);

  if (!Number.isFinite(odds) || odds <= 1) {
    return null;
  }

  if (!row.home_team_name || !row.away_team_name || !row.prediction) {
    return null;
  }

  const kickoff = parseKickoff(row.kickoff);

  if (kickoff && kickoff > now) {
    return null;
  }

  return {
    date,
    kickoff: kickoff?.toISO() ?? null,
    league: row.league_name ?? "",
    home: row.home_team_name,
    away: row.away_team_name,
    tip: row.prediction,
    odds,
    result,
    final_score: row.result ?? "",
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

const inRange = (tip: SettledTip, from: DateTime, to: DateTime) => {
  const date = DateTime.fromISO(tip.date);

  return date >= from && date <= to;
};

/**
 * Settled results for one package. Returns null when the last 30 days have no
 * won or lost tips, or the API fails, so the block is hidden rather than ever
 * falling back to made-up numbers.
 *
 * Today is never requested: its picks may not have kicked off yet.
 */
async function loadPackageResults(
  singleId: number,
): Promise<PackageResults | null> {
  const now = DateTime.now();
  const today = now.startOf("day");
  const yesterday = today.minus({ days: 1 });

  const windowStart = yesterday.minus({ days: WINDOW_DAYS - 1 });
  const weekStart = yesterday.minus({ days: STRIP_DAYS - 1 });
  const monthStart = today.minus({ months: 1 }).startOf("month");
  const monthEnd = monthStart.endOf("month");

  // One request per day, newest first, back far enough to cover both the
  // 30-day window and the whole of last month.
  const from = DateTime.min(windowStart, monthStart);
  const days: DateTime[] = [];

  for (let day = yesterday; day >= from; day = day.minus({ days: 1 })) {
    days.push(day);
  }

  const responses = await mapInBatches(days, CONCURRENCY, (day) =>
    fetchDay(
      singleId,
      day.toISODate() ?? "",
      today.diff(day, "days").days <= RECENT_DAYS
        ? RECENT_REVALIDATE_SECONDS
        : SETTLED_REVALIDATE_SECONDS,
    ),
  );

  const failures = responses.filter(
    (response): response is { error: string } => "error" in response,
  );

  if (failures.length) {
    console.error(
      `Results for single ID ${singleId}: ${failures.length} of ${days.length} days failed (first: ${failures[0].error})`,
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
    // Days are already newest first; within a day, latest kickoff first.
    .sort(
      (a, b) =>
        b.date.localeCompare(a.date) ||
        (b.kickoff ?? "").localeCompare(a.kickoff ?? ""),
    );

  const windowTips = tips.filter((tip) => inRange(tip, windowStart, yesterday));
  const stats = summarize(windowTips);

  if (!hasDecidedTips(stats)) {
    return null;
  }

  const monthStats = summarize(
    tips.filter((tip) => inRange(tip, monthStart, monthEnd)),
  );

  return {
    tips: windowTips,
    stats,
    week: summarize(tips.filter((tip) => inRange(tip, weekStart, yesterday))),
    month: hasDecidedTips(monthStats)
      ? { name: monthStart.toFormat("LLLL"), stats: monthStats }
      : null,
  };
}

/**
 * The whole result is cached for 10 minutes, an empty one included. Next only
 * caches successful fetches, so while the API errors every render would repeat
 * all ~40 day requests, and /vip renders on every request. `cache` on top
 * lets the strip and the slider on one page share a single lookup.
 */
export const getPackageResults = cache(
  unstable_cache(loadPackageResults, ["package-results"], {
    revalidate: RECENT_REVALIDATE_SECONDS,
  }),
);
