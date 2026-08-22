"use client";

import { useState } from "react";
import { FixturePrediction } from "../SureWinPredictionSection";
import { DateTime } from "luxon";

interface Prediction {
  tip: string;
  bookmaker: string;
  confidence: string;
  additional?: string;
}

const OddsButton: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => (
  <div className="text-center">
    <div className=" font-semibold text-black">{label}</div>
    <div className=" text-black">{value}</div>
  </div>
);

const PredictionRow: React.FC<{
  label: string;
  isHeader?: boolean;
}> = ({ label, isHeader = false }) => (
  <div
    className={`py-2 text-center text-lg ${
      isHeader ? "bg-[#455DBD] text-white rounded-t-lg" : "text-black"
    }`}
  >
    {label}
  </div>
);

export function SureWinPrediction({ data }: { data: FixturePrediction[] }) {
  const [selectedDate, setSelectedDate] = useState(DateTime.now().toISODate());

  const todaysMatch: FixturePrediction | undefined = data?.[0];

  const Prediction: Prediction = {
    tip: "1x",
    bookmaker: "Betking 1.28",
    confidence: "70% Expert Confidence",
    additional: "?",
  };

  if (!data?.length) {
    return (
      <div className="h-100 w-full  mx-auto px-4 flex items-center justify-center ">
        No Win Prediction Found
      </div>
    );
  }

  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(0deg, #455DBD, #455DBD), url(/bg5.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "screen",
      }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}

        <div className="text-center flex flex-col items-center justify-center mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-1 max-w-xl">
            Sure Win Prediction Today
          </h2>
          <p className="text-white/80 md:text-lg max-w-xl"></p>
        </div>

        {/* Tip of The Day Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-white capitalize mb-4">
              Tip of The Day
            </h3>
            <div className="w-96 h-px bg-white/70 mx-auto"></div>
          </div>

          {/* Records Section */}
          <div className="text-center mt-5 mb-5 w-full  ">
            <div className="sm:inline-flex justify-center  items-center gap-3 sm:gap-4 flex sm:flex-row flex-col rounded-full sm:px-6 py-3">
              <span className="text-lg text-white">Records</span>
              <div className="flex justify-center items-center gap-2 w-full sm:w-fit">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-white text-center border w-full sm:w-fit rounded-full border-gray-300 px-6 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Prediction Card */}
          <div
            className="bg-white/70 backdrop-blur-sm rounded-[51px] px-8 py-10 shadow-lg flex flex-col gap-8 md:gap-0"
            style={{ backdropFilter: "blur(2px)" }}
          >
            <div className="flex w-full items-center justify-evenly flex-col md:flex-row md:gap-0 gap-6 ">
              {" "}
              <div className="flex gap-2 relative">
                <img
                  src={todaysMatch?.home_team_logo}
                  alt={todaysMatch?.home_team_name}
                  width={120}
                  height={120}
                  className="object-cover w-32 h-32"
                />
                <img
                  src={todaysMatch?.away_team_logo}
                  alt={todaysMatch?.away_team_name}
                  width={120}
                  height={120}
                  className="object-cover w-32 h-32 block md:hidden"
                />
                <div className="w-10 h-10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 border-2 border-black bg-white flex items-center justify-center  md:hidden">
                  <span className="text-lg font-bold text-black">VS</span>
                </div>
              </div>
              <div className="flex flex-col">
                {" "}
                <div className="flex flex-col">
                  {/* Match Header */}
                  <div className="text-center mb-4">
                    <h4 className="text-2xl font-bold text-black ">
                      {todaysMatch?.league_name}
                    </h4>
                    <h5 className="text-lg font-bold text-black mb-2">
                      {todaysMatch?.home_team_name}
                      <span className="font-normal"> vs </span>{" "}
                      {todaysMatch?.away_team_name}
                    </h5>
                    <div className="w-72 h-px bg-black mb-2 mx-auto"></div>

                    <div className="text-sm text-black space-y-1">
                      <p>
                        Prediction Date
                        {/* {todaysMatch?.date ?? "No data"} {todaysMatch?.time} */}
                      </p>
                      <p className="font-bold">vanue</p>
                      <p className="font-bold">weather</p>
                    </div>
                  </div>
                </div>
                <div className="w-40 h-px bg-black mb-4 mx-auto"></div>
                {/* Team Logos and Odds */}
                <div className="flex items-start justify-between mb-4">
                  {/* Home Team Logo */}
                  {/* <div className="w-32">
                  <img
                    src={todaysMatch.homeTeam.logo}
                    alt={todaysMatch.homeTeam.name}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div> */}

                  {/* Odds */}
                  <div className="flex-1 mx-8 ">
                    <div className="  ">
                      <div className="flex gap-10 mx-auto w-fit">
                        {/* <OddsButton label="1" value={todaysMatch.odds.home} />
                        <OddsButton label="X" value={todaysMatch.odds.draw} />
                        <OddsButton label="2" value={todaysMatch.odds.away} /> */}
                      </div>
                    </div>
                  </div>

                  {/* Away Team Logo */}
                  {/* <div className="w-32">
                  <img
                    src={todaysMatch.awayTeam.logo}
                    alt={todaysMatch.awayTeam.name}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div> */}
                </div>{" "}
              </div>{" "}
              <img
                src={todaysMatch?.away_team_logo}
                alt={todaysMatch?.away_team_name}
                width={120}
                height={120}
                className="object-cover w-32 h-32 md:block hidden"
              />
            </div>
            {/* Prediction Details */}
            <div className="bg-white/50 rounded-3xl max-w-xl mx-auto overflow-hidden w-full">
              <PredictionRow label="Tip" isHeader />
              <div className="border-b border-black">
                <PredictionRow label={Prediction.tip} />
              </div>
              <div className="border-b border-black">
                <PredictionRow label={Prediction.bookmaker} />
              </div>
              <div className="border-b border-black">
                <PredictionRow label={Prediction.confidence} />
              </div>
              <PredictionRow label={Prediction.additional || ""} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
