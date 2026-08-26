"use client";
import { useState } from "react";
import { MatchPrediction } from "../FootballPredictionDetailsTable";
import { Loader } from "../Loader";
import Button from "@/components/ui/Button";
import Link from "next/link";

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

export function FootballPredictionTableServer({
  data,
  title,
}: {
  data: {
    today: MatchPrediction[];
    tomorrow: MatchPrediction[];
    yesterday: MatchPrediction[];
  };
  title: string;
}) {
  const [activeTab, setActiveTab] = useState<
    "today" | "tomorrow" | "yesterday"
  >("today");

  const handleTabChange = (tab: "today" | "tomorrow" | "yesterday") => {
    setActiveTab(tab);
  };

  const TeamCell: React.FC<{ team: Team }> = ({ team }) => (
    <div
      id="collapseFour"
      className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 py-3"
    >
      <div className="w-6 h-6 sm:w-8 sm:h-8 relative flex-shrink-0">
        <img
          src={team.logo}
          alt={`${team.name} logo`}
          width={32}
          height={32}
          className="w-6 h-6 sm:w-8 sm:h-8 object-contain rounded"
          onError={(e) => {
            e.currentTarget.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNiA4QzEyIDggOSAxMSA5IDE1QzkgMTkgMTIgMjIgMTYgMjJDMjAgMjIgMjMgMTkgMjMgMTVDMjMgMTEgMjAgOCAxNiA4WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K";
          }}
        />
      </div>
      <span className="text-gray-800 font-medium text-xs sm:text-sm text-center sm:text-left">
        {team.name}
      </span>
    </div>
  );

  const renderTableHeaders = () => {
    if (activeTab === "yesterday") {
      return (
        <tr>
          <th className="text-left py-3 border border-white/50 sm:py-4 px-3 sm:px-6 text-white text-xs sm:text-sm font-bold  bg-[#455DBF] h-full ">
            Home Team
          </th>
          <th className="text-left py-3 border border-white/50 sm:py-4 px-3 sm:px-6 text-white text-xs sm:text-sm font-bold  bg-[#455DBF] h-full ">
            Away Team
          </th>
          <th className="text-left py-3 border border-white/50 sm:py-4 px-3 sm:px-6 text-white text-xs sm:text-sm font-bold  bg-[#455DBF] h-full  ">
            Prediction
          </th>
          <th className="text-left py-3 border border-white/50 sm:py-4 px-1.5 sm:px-6 text-white text-xs sm:text-sm font-bold  bg-[#455DBF] h-full  ">
            Result
          </th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th className="text-left py-3 border border-white/50 sm:py-4 px-3 sm:px-6 text-white text-xs sm:text-sm font-bold  bg-[#455DBF] h-full ">
            League
          </th>
          <th className="text-left py-3 border border-white/50 sm:py-4 px-3 sm:px-6 text-white text-xs sm:text-sm font-bold  bg-[#455DBF] h-full ">
            Home Team
          </th>
          <th className="text-left py-3 border border-white/50 sm:py-4 px-3 sm:px-6 text-white text-xs sm:text-sm font-bold  bg-[#455DBF] h-full ">
            Away Team
          </th>
          <th className="text-left py-3 border border-white/50 sm:py-4 px-1.5 sm:px-6 text-white text-xs sm:text-sm font-bold  bg-[#455DBF] h-full ">
            Prediction
          </th>
        </tr>
      );
    }
  };

  const renderTableRows = () => {
    return data?.[activeTab]?.map((match, index) => {
      const isLastRow = index === data?.[activeTab]?.length - 1;
      const firstTdClass = isLastRow ? "rounded-bl-full" : "";
      const lastTdClass = isLastRow ? "rounded-br-full" : "";

      return (
        <tr
          key={index}
          className={`border-b border-x border-gray-500 hover:bg-gray-50 transition-colors duration-150`}
        >
          {activeTab === "yesterday" ? (
            <>
              <td
                className={`px-3 sm:px-6 bg-[#F4F6FB] text-xs sm:text-sm ${firstTdClass}`}
              >
                <TeamCell
                  team={{
                    logo: match?.home_team_logo,
                    name: match?.home_team_name,
                  }}
                />
              </td>
              <td className="px-3 sm:px-6 bg-[#EDF0F9] text-xs sm:text-sm">
                <TeamCell
                  team={{
                    logo: match?.away_team_logo,
                    name: match?.away_team_name,
                  }}
                />
              </td>
              <td className="text-center py-3 px-3 sm:px-6 bg-[#F4F6FB]">
                <span className="inline-block bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {match.prediction}
                </span>
              </td>
              <td
                className={`text-center py-3  sm:px-6 bg-[#EDF0F9] ${lastTdClass}`}
              >
                <span
                  className={`inline-block text-nowrap ${
                    match.result ? "bg-green-100" : ""
                  } text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold`}
                >
                  {match.result ?? "-"}
                </span>
              </td>
            </>
          ) : (
            <>
              <td
                className={`py-3 px-3 sm:px-6 text-xs sm:text-sm text-black font-medium bg-[#EDF0F9] ${firstTdClass}`}
              >
                {match.league_name}
              </td>
              <td className="px-3 sm:px-6 bg-[#F4F6FB] text-xs sm:text-sm">
                <TeamCell
                  team={{
                    logo: match?.home_team_logo,
                    name: match?.home_team_name,
                  }}
                />
              </td>
              <td className="px-3 sm:px-6 bg-[#EDF0F9] text-xs sm:text-sm">
                <TeamCell
                  team={{
                    logo: match?.away_team_logo,
                    name: match?.away_team_name,
                  }}
                />
              </td>
              <td
                className={`text-center py-3  sm:px-6 bg-[#F4F6FB] ${lastTdClass}`}
              >
                <span className="inline-block text-nowrap bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {match.prediction}
                </span>
              </td>
            </>
          )}
        </tr>
      );
    });
  };

  if (!data) {
    return (
      <div className={`flex items-center justify-center h-[200px] w-full`}>
        <Loader />
      </div>
    );
  }

  return (
    <section id="prediction" className="bg-[#F4F6FB] py-12 sm:py-24">
      <div className="max-w-6xl mx-auto sm:px-4 px-2">
        {/* Header with Navigation Arrows */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 gap-5 sm:gap-20">
          <div className="text-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
              {title}
            </h2>
            <p className="text-black text-sm sm:text-base md:text-lg max-w-xl">
              Free Win Draw Win Predictions and Expert Tips for Every Match
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 sm:mb-10">
          <div className="flex gap-2 sm:gap-3 items-center justify-center flex-wrap">
            <button
              onClick={() => handleTabChange("yesterday")}
              className={`px-4 cursor-pointer sm:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 border border-black/10 ${
                activeTab === "yesterday"
                  ? "bg-[#455DBD] text-white"
                  : "text-gray-600 bg-white hover:text-gray-800"
              }`}
            >
              Yesterday
            </button>{" "}
            <button
              onClick={() => handleTabChange("today")}
              className={`px-4 sm:px-8 py-2 cursor-pointer sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 border border-black/10 ${
                activeTab === "today"
                  ? "bg-[#455DBD] text-white"
                  : "text-gray-600 bg-white hover:text-gray-800"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => handleTabChange("tomorrow")}
              className={`px-4 sm:px-8 py-2 sm:py-2.5 cursor-pointer rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 border border-black/10 ${
                activeTab === "tomorrow"
                  ? "bg-[#455DBD] text-white"
                  : "text-gray-600 bg-white hover:text-gray-800"
              }`}
            >
              Tomorrow
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          {!data[activeTab]?.length ? (
            <div
              className={`flex flex-col gap-2 items-center justify-center h-[200px] w-full`}
            >
              No Prediction Available
              <Link href="https://user.matchplug.com/auth/login">
                <Button className="cursor-pointer">Subscribe Now</Button>
              </Link>
            </div>
          ) : (
            <div className="w-full">
              <table className="w-full overflow-hidden">
                <thead>{renderTableHeaders()}</thead>
                <tbody>{renderTableRows()}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
