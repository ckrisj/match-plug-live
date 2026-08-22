export type InplayStatus = "1H" | "HT" | "2H";

export interface InplayTeam {
  name: string;
  short: string;
  score: number;
  logo?: string;
}

export interface InplayMatch {
  id: string;
  league: string;
  status: InplayStatus;
  minute: number;
  home: InplayTeam;
  away: InplayTeam;
  tip: string;
  confidence: number;
  odds: string;
  /** Match minute the tip was posted to the Telegram channel. */
  sentAt: number;
  /** false = tip shown as proof; true = tip blurred behind the Telegram CTA. */
  locked: boolean;
  /** Settled result of the tip, where already decided by the live score. */
  outcome?: "won";
}

/**
 * Telegram channel the whole section funnels into — matches the handle already
 * used in Footer and BetNowSectionServer.
 */
export const TELEGRAM_CHANNEL_URL = "https://t.me/MATCHPLUG";

/**
 * PLACEHOLDER SOCIAL PROOF — replace with real figures before shipping.
 * These are displayed to visitors as fact, so they must not stay invented.
 */
export const CHANNEL_STATS = {
  members: "12,400+",
  hitRate: "92%",
  tipsToday: 18,
};

/**
 * Placeholder in-play fixtures. The admin API currently only exposes
 * `predictions?date=&market=` (see getAdminData), which carries no score or
 * match-minute fields — so live data is mocked here until a livescore endpoint
 * exists. To wire it up, replace this export with the fetched payload mapped
 * into InplayMatch; LiveInplaySection needs no changes.
 *
 * The two `locked: false` entries are the proof cards: their tip has already
 * landed against the live score on screen, so the reader can verify the call
 * was right before being asked to join.
 */
export const LIVE_MATCHES: InplayMatch[] = [
  {
    id: "epl-ars-che",
    league: "Premier League",
    status: "2H",
    minute: 67,
    home: { name: "Arsenal", short: "ARS", score: 2 },
    away: { name: "Chelsea", short: "CHE", score: 1 },
    tip: "Over 2.5 Goals",
    confidence: 88,
    odds: "1.95",
    sentAt: 41,
    locked: false,
    outcome: "won",
  },
  {
    id: "laliga-bar-rma",
    league: "La Liga",
    status: "2H",
    minute: 81,
    home: { name: "Barcelona", short: "BAR", score: 3 },
    away: { name: "Real Madrid", short: "RMA", score: 1 },
    tip: "Over 3.5 Goals",
    confidence: 91,
    odds: "2.05",
    sentAt: 58,
    locked: false,
    outcome: "won",
  },
  {
    id: "epl-liv-mci",
    league: "Premier League",
    status: "1H",
    minute: 23,
    home: { name: "Liverpool", short: "LIV", score: 0 },
    away: { name: "Man City", short: "MCI", score: 0 },
    tip: "Both Teams To Score",
    confidence: 82,
    odds: "1.72",
    sentAt: 19,
    locked: true,
  },
  {
    id: "seriea-int-juv",
    league: "Serie A",
    status: "HT",
    minute: 45,
    home: { name: "Inter Milan", short: "INT", score: 1 },
    away: { name: "Juventus", short: "JUV", score: 1 },
    tip: "Next Goal — Inter",
    confidence: 76,
    odds: "2.10",
    sentAt: 44,
    locked: true,
  },
  {
    id: "bundes-bay-dor",
    league: "Bundesliga",
    status: "2H",
    minute: 58,
    home: { name: "Bayern Munich", short: "BAY", score: 2 },
    away: { name: "Dortmund", short: "DOR", score: 2 },
    tip: "Over 4.5 Goals",
    confidence: 79,
    odds: "2.35",
    sentAt: 52,
    locked: true,
  },
  {
    id: "ligue1-psg-mar",
    league: "Ligue 1",
    status: "1H",
    minute: 34,
    home: { name: "PSG", short: "PSG", score: 1 },
    away: { name: "Marseille", short: "MAR", score: 0 },
    tip: "PSG -1 Handicap",
    confidence: 85,
    odds: "1.88",
    sentAt: 28,
    locked: true,
  },
];
