"use server";

import { getAdminData } from "@/app/Hooks/useGetAdminData";
import { SureWinPrediction } from "./Server/SureWinPrediction";

export type FixturePrediction = {
  fixture_id: number;
  prediction: string;
  league_name: string;
  home_team_name: string;
  home_team_logo: string;
  away_team_name: string;
  away_team_logo: string;
};

const SureWinPredictionSection = async () => {
  const data = await getAdminData<FixturePrediction[]>({
    key: ["sure-win-prediction"],
    path: "sure-win-prediction",
  });

  return <SureWinPrediction data={data} />;
};

export default SureWinPredictionSection;
