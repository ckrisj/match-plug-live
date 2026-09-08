// app/lib/titles.ts

import type { Metadata } from "next";
import { SITE_URL } from "@/components/utils/constant";
import { marketContent } from "@/components/utils/Collection/market-content";

/**
 * A simple map of routes → titles
 */
type RouteTitle = { label: string; title: string; description: string };

const baseRouteTitles: Record<string, RouteTitle> = {
  "/about-us": {
    label: "About us",
    title: "About Matchplug — How Our Predictions Are Made | Matchplug",
    description:
      "Who Matchplug is, how our football predictions are produced, and what we do and do not claim. Free tips across 40+ leagues since 2017.",
  },
  "/partners": {
    label: "Partners",
    title: "Partners & Affiliates | Matchplug",
    description:
      "Partner with Matchplug: affiliate and media enquiries for our football predictions and VIP tipping service.",
  },
  "/how-to-subscribe": {
    label: "How to subscribe",
    title: "How to Subscribe to Matchplug VIP | Matchplug",
    description:
      "Step-by-step guide to subscribing to Matchplug VIP: the plans, accepted payment methods, and how selections reach you on Telegram.",
  },
  "/terms-of-service": {
    label: "Terms and Conditions",
    title: "Terms of Service | Matchplug",
    description:
      "The terms governing use of Matchplug, including account rules, subscriptions, acceptable use and limitation of liability.",
  },
  "/disclaimer": {
    label: "Disclaimer",
    title: "Disclaimer | Matchplug",
    description:
      "Matchplug publishes predictions and analysis, not betting advice. No outcome is guaranteed. 18+ only — please gamble responsibly.",
  },
  "/vip": {
    label: "VIP Results",
    title: "Matchplug VIP — Premium Football Tips & Live Alerts | Matchplug",
    description:
      "Matchplug VIP: our highest-conviction daily picks, live in-play alerts and staking guidance, delivered to Telegram. Pricing, what's included and our record.",
  },
  "/": {
    label: "Home",
    title: "Soccer Tips Today — Win Draw Win Predictions | Matchplug",
    description:
      "Free soccer tips and win draw win predictions for today's matches across 40+ leagues, plus BTTS, over 2.5 goals and correct score. Live in-play tips.",
  },
  "/blog": {
    label: "Blog",
    title:
      "Latest Match Previews | News from Football | American Sports - Matchplug",
    description:
      "Stay updated with football match previews, news, and American sports betting insights on Matchplug.",
  },
  "/blog/category/football-prediction": {
    label: "Football Predictions",
    title: "Best Soccer Predictions Today - Matchplug",
    description:
      "Get accurate football betting predictions and expert insights daily at Matchplug.",
  },
  "/blog/category/match-preview": {
    label: "Match Previews",
    title: "Football Match Previews Today: Free Insights | Matchplug",
    description:
      "Explore free football match previews with expert analysis, stats, and betting insights. Stay ahead with Matchplug’s predictions.",
  },
  "/blog/category/football-news": {
    label: "Football News",
    title: "Latest Football News & Updates | Matchplug",
    description:
      "Stay updated with the latest football news, transfer rumors, and match updates. Get expert insights daily at Matchplug!",
  },
  "/blog/category/others": {
    label: "Other Sports News",
    title: "Latest Sports News from around the world - Matchplug",
    description:
      "Catch up on the latest sports news, analysis, and updates from around the world with Matchplug.",
  },

  "/sports-betting-tips-player-picks-predictions-and-tips": {
    label: "Player Picks",
    title:
      "Player Props Predictions and Tips | Free Football Predictions | Matchplug",
    description:
      "Discover player prop betting tips—goals, assists, and more. Win smarter with Matchplug’s expert insights.",
  },
  "/sports-betting-tips-NFL-predictions-and-tips": {
    label: "NFL Tips",
    title: "NFL Predictions Today: Free Betting Tips | Matchplug",
    description:
      "Get free NFL predictions for today’s games—expert tips on spreads, totals, and props. Smarter betting with Matchplug NFL insights.",
  },
  "/sports-betting-tips-NBA-predictions-and-tips": {
    label: "NBA Tips",
    title: "NBA Predictions Today: Free Betting Tips | Matchplug",
    description:
      "Get free NBA predictions for today’s games—expert tips on spreads, totals, and props. Smarter betting with Matchplug NBA insights.",
  },
  "/sports-betting-tips-NHL-predictions-and-tips": {
    label: "NHL Tips",
    title: "NHL Predictions Today: Free Betting Tips | Matchplug",
    description:
      "Get free NHL predictions—expert picks on moneylines, totals, and props. Smarter betting with Matchplug NHL insights.",
  },
  "/sports-betting-tips-MLB-predictions-and-tips": {
    label: "MLB Tips",
    title: "MLB Predictions Today: Free Betting Tips | Matchplug",
    description:
      "Get free MLB predictions—expert tips on moneylines, run lines, and props. Smarter betting with Matchplug MLB insights.",
  },
  
  "/free-football-prediction-over-2.5-goals": {
    label: "Over 2.5 Goals",
    title: "Over 2.5 Goals Predictions Today: Free Tips & Stats | Matchplug",
    description:
      "Unlock free over 2.5 goals predictions for today’s matches with expert tips, stats, and AI analysis.",
  },
  "/free-football-predictions-both-team-to-score": {
    label: "BTTS",
    title: "BTTS Predictions Today: Free Both Teams to Score Tips | Matchplug",
    description:
      "Get free BTTS predictions with stats and analysis. Maximize wins on high-odds bets with Matchplug.",
  },
  "/free-football-predictions-mix-chance": {
    label: "Mix Chance",
    title: "Mix Chance Predictions Today: Free Accumulator Tips | Matchplug",
    description:
      "Discover mix chance predictions—combine bets for massive odds with expert accumulator tips and stats.",
  },
  "/free-football-predictions-goal-first-half": {
    label: "First Half Goals",
    title: "First Half Goals Predictions Today: Free Over 0.5 Tips | Matchplug",
    description:
      "Free first half goals predictions—expert over 0.5 goals tips with stats and strategies.",
  },
  "/free-football-predictions-1x2": {
    label: "1X2 Predictions",
    title: "1X2 Predictions Today: Free Football Betting Tips | Matchplug",
    description:
      "Free 1X2 predictions—expert home, draw, or away win tips with stats for smarter betting.",
  },
  "/free-football-predictions-over-1.5-goals": {
    label: "Over 1.5 Goals",
    title: "Over 1.5 Goals Predictions Today: Free Betting Tips | Matchplug",
    description:
      "Free over 1.5 goals predictions—expert tips with stats for high-scoring games.",
  },
  "/free-football-predictions-under-2.5-goals": {
    label: "Under 2.5 Goals",
    title: "Under 2.5 Goals Predictions Today: Free Betting Tips | Matchplug",
    description:
      "Free under 2.5 goals predictions—expert tips with stats for low-scoring matches.",
  },
  "/free-football-predictions-draw-predictions-and-tips": {
    label: "Draw Predictions",
    title: "Draw Predictions Today: Free Football Betting Tips | Matchplug",
    description:
      "Expert draw betting tips with stats. Get free draw predictions for today’s football matches.",
  },
  "/free-football-predictions-correct-score-and-tips": {
    label: "Correct Score",
    title: "Correct Score Predictions Today: Free Betting Tips | Matchplug",
    description:
      "Free correct score predictions—expert betting insights for high-odds bets.",
  },
  "/free-football-prediction-ht-ft-predictions": {
    label: "HT/FT Predictions",
    title: "HT/FT Predictions | Direct Wins Today | Matchplug",
    description:
      "Free Half-Time/Full-Time predictions—betting tips for direct wins today.",
  },
  "/free-football-predictions-handicap-predictions": {
    label: "Handicap Predictions",
    title: "Handicap Predictions Today: Free Football Betting Tips | Matchplug",
    description:
      "Expert handicap predictions with Asian Handicap stats to level the odds.",
  },
  "/free-football-predictions-player-specials-and-tips": {
    label: "Player Specials",
    title: "Player Specials Predictions and Tips | Matchplug",
    description:
      "Free player specials predictions—tips on goals, assists, and player stats.",
  },
  "/free-football-predictions-cards-predictions-and-tips": {
    label: "Cards Predictions",
    title: "Cards Predictions Today: Free Football Betting Tips | Matchplug",
    description:
      "Free card predictions—expert tips on yellow and red cards with stats.",
  },
  "/free-football-predictions-free-kick-prediction-and-tips": {
    label: "Free Kicks",
    title: "Free Kick Predictions and Tips | Matchplug",
    description:
      "Expert free kick predictions—goals and shots analysis with betting insights.",
  },
  "/free-football-predictions-throw-in-prediction-and-tips": {
    label: "Throw-Ins",
    title: "Throw-In Predictions Today: Free Betting Tips | Matchplug",
    description:
      "Free throw-in predictions—expert betting tips with stats on total throw-ins.",
  },
  "/free-football-predictions-fouls-prediction-and-tips": {
    label: "Fouls",
    title: "Fouls Predictions Today: Free Betting Tips | Matchplug",
    description:
      "Free fouls predictions—expert tips on total fouls with betting insights.",
  },

  "/free-football-prediction-tackles": {
    label: "Tackles",
    title: "Tackles Predictions Today: Free Betting Tips | Matchplug",
    description:
      "Free tackles predictions—expert tips with stats on player tackles.",
  },
  "/free-football-predictions-shots-prediction-and-tips": {
    label: "Shots",
    title: "Shots Predictions Today: Free Betting Tips | Matchplug",
    description:
      "Expert shots predictions—total attempts betting insights with stats.",
  },
  "/free-football-predictions-shots-on-target-prediction-and-tips": {
    label: "Shots on Target",
    title: "Shots on Target Predictions Today: Free Betting Tips | Matchplug",
    description:
      "Free shots on target predictions—expert stats-based betting insights.",
  },
  "/free-footballpredictions-goal-kicks-predictions-and-tips": {
    label: "Goal Kicks",
    title: "Goal Kicks Predictions Today: Free Betting Tips | Matchplug",
    description:
      "Expert goal kicks predictions—total kicks insights with betting stats.",
  },
  "/free-football-predictions-bet-builders-predictions-and-tips": {
    label: "Bet Builder",
    title: "Bet Builder Predictions and Tips | Matchplug",
    description:
      "Expert bet builder strategies and free football predictions for smarter betting.",
  },
  "/free-football-predictions-corner-predictions-and-tips": {
    label: "Corners",
    title: "Corner Predictions Today: Free Betting Tips | Matchplug",
    description:
      "Free corner predictions with expert stats and betting insights.",
  },
};

/**
 * Markets covered by the on-page build sheet take their meta title and
 * description from it, overriding the entries above so the two can't drift.
 */
export const routeTitles: Record<string, RouteTitle> = {
  ...baseRouteTitles,
  ...Object.fromEntries(
    Object.entries(marketContent).map(([slug, content]) => [
      `/${slug}`,
      {
        label: content.name,
        title: content.metaTitle,
        description: content.metaDescription,
      },
    ])
  ),
};

/**
 * Builds a route's metadata from the table above.
 *
 * Metadata used to be resolved in the root layout by reading an `x-pathname`
 * header that middleware set. That worked, but calling `headers()` in the root
 * layout opts every route in the app into dynamic rendering, so nothing could
 * be cached or statically generated. Each route now declares its own metadata
 * from the same table instead.
 */
export function metadataForRoute(route: string): Metadata {
  const entry = routeTitles[route] ?? {
    label: "Matchplug",
    title: "Matchplug - Football Predictions & Betting Tips",
    description:
      "Expert football predictions, betting tips, and sports insights daily.",
  };

  const canonicalPath = route === "/" ? "" : route.replace(/\/$/, "");
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: "MatchPlug",
      title: entry.title,
      description: entry.description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: entry.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      images: ["/og-image.jpg"],
    },
  };
}
