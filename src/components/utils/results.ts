/**
 * Settled VIP / Elite results and the stats derived from them. Kept free of
 * fetching so the client slider can import the types and formatters without
 * pulling the admin API key into the browser bundle.
 */

export type TipOutcome = "won" | "lost" | "void";

export const TIP_OUTCOMES: readonly TipOutcome[] = ["won", "lost", "void"];

/** One settled tip, in the shape the developer brief specifies. */
export interface SettledTip {
  /** ISO date the tip was published for. */
  date: string;
  /** ISO kickoff time, when the backend provides one. */
  kickoff: string | null;
  league: string;
  home: string;
  away: string;
  tip: string;
  odds: number;
  result: TipOutcome;
  final_score: string;
}

export interface ResultsStats {
  won: number;
  lost: number;
  void: number;
  /** Wins as a whole-number percentage of won + lost. Voids are left out. */
  hitRate: number;
  /** Profit at a 1-unit stake: Σ(odds − 1) for wins, −1 per loss, voids excluded. */
  units: number;
}

/**
 * Every figure on the results block comes from here, so the record is always
 * counted from the tips themselves and never typed by hand.
 */
export function summarize(tips: SettledTip[]): ResultsStats {
  let won = 0;
  let lost = 0;
  let voided = 0;
  let units = 0;

  for (const tip of tips) {
    if (tip.result === "won") {
      won += 1;
      units += tip.odds - 1;
    } else if (tip.result === "lost") {
      lost += 1;
      units -= 1;
    } else {
      voided += 1;
    }
  }

  const decided = won + lost;

  return {
    won,
    lost,
    void: voided,
    hitRate: decided ? Math.round((won / decided) * 100) : 0,
    units,
  };
}

/** True when there is at least one won or lost tip to report on. */
export const hasDecidedTips = (stats: ResultsStats) =>
  stats.won + stats.lost > 0;

/**
 * "+18.4" / "-3.0". Always signed so a losing run reads as one, and rounded
 * before the sign is chosen so a tiny loss never shows as "-0.0".
 */
export function formatUnits(units: number) {
  const rounded = Math.round(units * 10) / 10;

  return `${rounded < 0 ? "-" : "+"}${Math.abs(rounded).toFixed(1)}`;
}
