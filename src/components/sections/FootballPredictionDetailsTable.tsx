import React from "react";
import { DateTime } from "luxon";

import FootballPredictionTable from "./Server/FootballPredictionTable";
import { getMarketPredictions } from "@/app/Hooks/getMarketPredictions";

interface Team {
  logo: string;
  name: string;
}

interface Match {
  league: string;
  homeTeam: Team;
  awayTeam: Team;
  prediction: string;
}

interface YesterdayMatch {
  league?: string;
  homeTeam: Team;
  awayTeam: Team;
  prediction: string;
  result: string;
}

interface PredictionData {
  today: Match[];
  tomorrow: Match[];
  yesterday: YesterdayMatch[];
}

export interface MatchPrediction {
  league_name: string;
  home_team_name: string;
  home_team_logo: string;
  prediction: string;
  away_team_name: string;
  away_team_logo: string;
  result: string;
}

/** Market published on the homepage, used as the last-resort table here. */
const GENERAL_MARKET = "Free Expert Tips";

const FootballPredictionDetailsTable = async ({
  currentDate,
  slug,
}: {
  currentDate: string;
  slug: {
    link: string;
    /** Also the market key sent to the predictions API — not shown to users. */
    label: string;
    /** Shown instead of `label` where the market's public name differs. */
    displayLabel?: string;
    /** Heading above the market explanation; falls back to "About <market>". */
    heading?: string;
    description: string;
  };
}) => {
  // Resolved on the server so the rows are in the HTML before any JS runs, and
  // so a day with nothing published falls back to the most recent day that has
  // picks rather than rendering an empty table. A failed call degrades to the
  // empty state inside the resolver rather than throwing and taking the page
  // down with it.
  const { predictions, servedDate, isFallback, nextDate } =
    await getMarketPredictions(slug.label, currentDate);

  // Markets that have not published for weeks would still leave the page with
  // no table at all, so fall back once more to the general expert tips card.
  // Clearly labelled as such — it is not presented as this market's picks.
  const expertTips = predictions.length
    ? null
    : await getMarketPredictions(
        GENERAL_MARKET,
        DateTime.now().toISODate() ?? currentDate,
      );

  return (
    <FootballPredictionTable
      data={predictions}
      currentDate={currentDate}
      servedDate={servedDate}
      isFallback={isFallback}
      nextDate={nextDate}
      expertTips={
        expertTips && expertTips.predictions.length
          ? {
              predictions: expertTips.predictions,
              servedDate: expertTips.servedDate,
            }
          : null
      }
      slug={slug}
    />
  );
};

export default FootballPredictionDetailsTable;
