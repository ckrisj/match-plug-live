import { MatchPrediction } from "@/components/sections/FootballPredictionDetailsTable";
import { DateTime } from "luxon";
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

  // This runs on the server for the homepage table. A failed call must fall
  // back to an empty list so the section renders "No Prediction Available",
  // rather than throwing and taking the whole homepage down with it.
  try {
    return (
      (await getAdminData<MatchPrediction[]>({
        key: ["predictions", dateTIme, "Free Expert Tips"],
        path: `predictions?date=${dateTIme}&market=Free Expert Tips`,
      })) ?? []
    );
  } catch (error) {
    console.error(
      `Predictions request failed for "${type}" (${dateTIme}):`,
      error,
    );
    return [];
  }
};
