"use client";

import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import { Loader } from "../Loader";
import { useQueryState } from "nuqs";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { formatParagraphToHTML } from "@/components/utils/helper";

interface Team {
  logo: string;
  name: string;
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

type FootballPredictionTableProps = {
  currentDate: string;
  slug: {
    link: string;
    label: string;
    description: string;
  };
  data: MatchPrediction[];
};

const FootballPredictionTable = ({
  slug,
  data,
}: FootballPredictionTableProps) => {
  const router = useRouter();

  const [slugDate, setSlugDate] = useQueryState("date");

  useEffect(() => {
    if (!slugDate) {
      setSlugDate(DateTime.now().toISODate());
    }
  }, [slugDate]);

  const TeamCell: React.FC<{ team: Team }> = ({ team }) => (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 py-3">
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
    return (
      <tr>
        <th className="text-left py-3 border border-white/50 sm:py-4 px-3 sm:px-6 text-white text-xs sm:text-sm font-bold  bg-[#455DBF] h-full ">
          Home Team
        </th>
        <th className="text-left py-3 border border-white/50 sm:py-4 px-3 sm:px-6 text-white text-xs sm:text-sm font-bold  bg-[#455DBF] h-full  ">
          Away Team
        </th>
        <th className="text-left py-3 border border-white/50 sm:py-4 px-3 sm:px-6 text-white text-xs sm:text-sm font-bold  bg-[#455DBF] h-full  ">
          Prediction
        </th>
        <th className="text-left py-3 border border-white/50 sm:py-4 px-1.5 sm:px-6 text-white text-xs sm:text-sm font-bold  bg-[#455DBF] h-full ">
          Result
        </th>
      </tr>
    );
  };

  const renderTableRows = () => {
    return data?.map((match, index) => {
      const isLastRow = index === data.length - 1;
      const firstTdClass = isLastRow ? "rounded-bl-full" : "";
      const lastTdClass = isLastRow ? "rounded-br-full" : "";

      return (
        <tr
          key={index}
          className={`border-b border-x border-gray-500 hover:bg-gray-50 transition-colors duration-150`}
        >
          <td
            className={`px-3 sm:px-6 bg-[#F4F6FB] text-center text-xs sm:text-sm ${firstTdClass}`}
          >
            <TeamCell
              team={{
                logo: match?.home_team_logo,
                name: match?.home_team_name,
              }}
            />
          </td>
          <td className="px-3 text-center sm:px-6 bg-[#EDF0F9] text-xs sm:text-sm">
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
            <span className="inline-block text-nowrap bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              {match.result}
            </span>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <section id="prediction" className="bg-[#F4F6FB] py-12 py-24">
        <div className="max-w-6xl mx-auto sm:px-4 px-2">
          {/* Header with Navigation Arrows */}
          <div className="flex sm:justify-start  justify-center items-center mb-6 sm:mb-8 gap-5 sm:gap-20">
            <div className="text-center sm:text-start">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
                {slug.label}
              </h2>
              <p className="text-black text-sm sm:text-base md:text-lg max-w-xl">
                Free Sport betting Picks and best bets today from the experts
              </p>
            </div>
          </div>

          <div className="py-10 flex flex-col sm:flex-row items-center gap-4 justify-center ">
            <p className="w-full sm:w-auto">Select Match Date:</p>

            <div className="relative sm:max-w-sm w-full">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={slugDate ? new Date(slugDate) : null}
                  sx={{
                    width: "100%",
                  }}
                  onChange={(newValue) => {
                    if (newValue) {
                      router.replace(
                        `?date=${DateTime.fromJSDate(
                          newValue as Date
                        ).toISODate()}`
                      );

                      setSlugDate(
                        DateTime.fromJSDate(newValue as Date).toISODate()
                      );
                    }
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden">
            {!data?.length && (
              <div
                className={`flex flex-col gap-2 items-center justify-center h-[200px] w-full`}
              >
                No Prediction Available
                <Link href="https://user.matchplug.com/auth/login">
                  <Button className="cursor-pointer">Subscribe Now</Button>
                </Link>
              </div>
            )}

            {!data ? (
              <div
                className={`flex items-center justify-center h-[200px] w-full`}
              >
                <Loader />
              </div>
            ) : (
              <div hidden={!data?.length} className="w-full">
                <table className="w-full overflow-hidden">
                  <thead>{renderTableHeaders()}</thead>
                  <tbody>{renderTableRows()}</tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F6FB] py-12 py-24">
        <div className="max-w-6xl mx-auto sm:px-4 px-2">
          <h1 className="text-[28px] font-bold">About {slug.label}</h1>
          <p
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html: formatParagraphToHTML(slug.description),
            }}
          ></p>
        </div>
      </section>
    </>
  );
};

export default FootballPredictionTable;
