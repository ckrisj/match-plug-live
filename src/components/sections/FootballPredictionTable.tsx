import { getPredictionData } from "@/app/Hooks/getPredictionData";
import { FootballPredictionTableServer } from "./Server/FootballPredictionTableServer";

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

const FootballPredictionTable = async ({ title }: { title: string }) => {
  const today = await getPredictionData("today");
  const yesterday = await getPredictionData("yesterday");
  const tomorrow = await getPredictionData("tomorrow");

  return (
    <FootballPredictionTableServer
      title={title}
      data={{ today, tomorrow, yesterday }}
    />
  );
};

export default FootballPredictionTable;
