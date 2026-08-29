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
  slug: { link: string; label: string; description: string };
}) => {

  const data = await getAdminData<MatchPrediction[]>({
    key: ["predictions", currentDate, slug.label],
    path: `predictions?date=${currentDate}&market=${slug.label}`,
  });


  return (
    <FootballPredictionTable
      data={data}
      currentDate={currentDate}
      slug={slug}
    />
  );
};

export default FootballPredictionDetailsTable;
