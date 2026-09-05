import React from "react";
import FootballPredictionTable from "./Server/FootballPredictionTable";
import { getAdminData } from "@/app/Hooks/useGetAdminData";

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
  // The predictions call runs on the server so the table — including the empty
  // "No Prediction Available" state — is in the HTML before any JS runs. A
  // failed call must degrade to that same empty state rather than throwing,
  // which would take the whole page down instead of just the table.
  let data: MatchPrediction[] = [];

  try {
    data =
      (await getAdminData<MatchPrediction[]>({
        key: ["predictions", currentDate, slug.label],
        path: `predictions?date=${currentDate}&market=${slug.label}`,
      })) ?? [];
  } catch (error) {
    console.error(
      `Predictions request failed for market "${slug.label}" on ${currentDate}:`,
      error
    );
  }


  return (
    <FootballPredictionTable
      data={data}
      currentDate={currentDate}
      slug={slug}
    />
  );
};

export default FootballPredictionDetailsTable;
