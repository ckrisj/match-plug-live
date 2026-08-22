import { DateTime } from "luxon";
import { MatchPrediction } from "@/components/sections/FootballPredictionDetailsTable";
import { getAdminData } from "./useGetAdminData";

export const getPredictionData = async (type: string) => {
  const getDate = () => {
    const currentDate = DateTime.now().setZone("local");

    if (type === "yesterday") {
      return currentDate.minus({ days: 1 }).toISODate();
    }

    if (type === "tomorrow") {
      return currentDate.plus({ days: 1 }).toISODate();
    }

    return currentDate.toISODate();
  };

  const dateTIme = getDate() ?? "";

  const data = await getAdminData<MatchPrediction[]>({
    key: ["predictions", dateTIme, "Free Expert Tips"],
    path: `predictions?date=${dateTIme}&market=Free Expert Tips`,
  });

  return data;
};
