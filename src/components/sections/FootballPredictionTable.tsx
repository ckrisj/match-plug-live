// import { getPredictionData } from "@/app/Hooks/getPredictionData";
// import { FootballPredictionTableServer } from "./Server/FootballPredictionTableServer";

// interface Team {
//   logo: string;
//   name: string;
// }

// interface Match {
//   league: string;
//   homeTeam: Team;
//   awayTeam: Team;
//   prediction: string;
// }

// interface YesterdayMatch {
//   league?: string;
//   homeTeam: Team;
//   awayTeam: Team;
//   prediction: string;
//   result: string;
// }

// const FootballPredictionTable = async ({ title }: { title: string }) => {
//   const today = await getPredictionData("today");
//   const yesterday = await getPredictionData("yesterday");
//   const tomorrow = await getPredictionData("tomorrow");
//   console.log("today", today);
//   console.log("yesterday", yesterday);
//   console.log("tomorrow", tomorrow);

//   return (
//     <FootballPredictionTableServer
//       title={title}
//       data={{ today, tomorrow, yesterday }}
//     />
//   );
// };

// export default FootballPredictionTable;
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

interface YesterdayMatch extends Match {
  result: string;
}

const FootballPredictionTable = async ({ title }: { title: string }) => {
  const [todayResponse, yesterdayResponse, tomorrowResponse]: any =
    await Promise.all([
      getPredictionData("today"),
      getPredictionData("yesterday"),
      getPredictionData("tomorrow"),
    ]);

  // Make sure we always pass arrays
  const today = Array.isArray(todayResponse)
    ? todayResponse
    : (todayResponse?.data ?? []);

  const yesterday = Array.isArray(yesterdayResponse)
    ? yesterdayResponse
    : (yesterdayResponse?.data ?? []);

  const tomorrow = Array.isArray(tomorrowResponse)
    ? tomorrowResponse
    : (tomorrowResponse?.data ?? []);

  return (
    <FootballPredictionTableServer
      title={title}
      data={{
        today,
        yesterday,
        tomorrow,
      }}
    />
  );
};

export default FootballPredictionTable;
