import { DateTime } from "luxon";

import { getMarketPredictions } from "@/app/Hooks/getMarketPredictions";
import { FootballPredictionTableServer } from "./Server/FootballPredictionTableServer";

/** Market key the homepage block publishes. */
const HOMEPAGE_MARKET = "Free Expert Tips";

const FootballPredictionTable = async ({ title }: { title: string }) => {
  const now = DateTime.now();
  const today = now.toISODate() ?? "";
  const yesterday = now.minus({ days: 1 }).toISODate() ?? today;
  const tomorrow = now.plus({ days: 1 }).toISODate() ?? today;

  // Today and yesterday fall back to the most recent published day so the
  // homepage never renders an empty table during a publishing gap. Tomorrow
  // deliberately does not — showing an earlier day's picks under a future tab
  // would be wrong.
  const [todayData, yesterdayData, tomorrowData] = await Promise.all([
    getMarketPredictions(HOMEPAGE_MARKET, today),
    getMarketPredictions(HOMEPAGE_MARKET, yesterday),
    getMarketPredictions(HOMEPAGE_MARKET, tomorrow, { fallback: "none" }),
  ]);

  return (
    <FootballPredictionTableServer
      title={title}
      marketLabel="expert tips"
      data={{
        today: todayData,
        yesterday: yesterdayData,
        tomorrow: tomorrowData,
      }}
    />
  );
};

export default FootballPredictionTable;
