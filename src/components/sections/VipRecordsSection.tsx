"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface VipResult {
  date: string;
  isWin: boolean;
}

interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
}

const ResultIcon: React.FC<{ isWin: boolean }> = ({ isWin }) => (
  <div
    className={`w-8 h-8 rounded-full flex items-center justify-center ${
      isWin ? "bg-[#03DD3C]" : "bg-[#F63241]"
    }`}
  >
    {isWin ? (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="black"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="black"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    )}
  </div>
);

const ResultItem: React.FC<{ result: VipResult }> = ({ result }) => (
  <div className="flex flex-col items-center gap-3">
    <span className="text-xl text-white">{result.date}</span>
    <ResultIcon isWin={result.isWin} />
  </div>
);

export const CountdownBox: React.FC<{
  value: number;
  label: string;
}> = ({ value, label }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="bg-white rounded-xl w-10 h-10 flex items-center justify-center">
      <span className="text-lg font-normal text-black">
        {value.toString().padStart(2, "0")}
      </span>
    </div>
    <span className="text-sm text-white">{label}</span>
  </div>
);

const VipRecordsSection: React.FC = () => {
  const [countdown, setCountdown] = useState<CountdownTime>({
    hours: 11,
    minutes: 1,
    seconds: 2,
  });

  // Dummy data - will be replaced with API calls
  const vipResults: VipResult[] = [
    { date: "15/08", isWin: true },
    { date: "14/08", isWin: true },
    { date: "13/08", isWin: false },
    { date: "12/08", isWin: true },
  ];

  const winRate = 90; // 90% win rate
  const todaysOdd = "2.07";

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset timer when it reaches zero
          hours = 11;
          minutes = 1;
          seconds = 2;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Top Dark Section */}
      <div className="bg-[#111413] py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white ">VIP Records</h2>
        </div>
      </div>

      {/* Main Content with Background */}
      <div
        className="relative py-16"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/bg3.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center space-y-4">
            {/* Results Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Results</h3>
              <div className="flex justify-center gap-8">
                {vipResults.map((result, index) => (
                  <ResultItem key={index} result={result} />
                ))}
              </div>
            </div>

            {/* Win Rate */}
            <div>
              <div className="text-xl font-bold text-[#D03A46] mb-2">
                {winRate}%
              </div>
              <div className="text-xl font-bold text-white mb-3">
                Win Rate in the last 30 days
              </div>
            </div>

            <div className="text-xl text-white mb-3">
              Todays Odd <span className="font-bold">{todaysOdd}</span>
            </div>

            <Link href="https://user.matchplug.com/auth/login">
              <button className="bg-[#F63241] text-white px-8 py-2 rounded-full text-xl hover:opacity-90 transition-opacity">
                Get Access Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Countdown Section */}
      <div className="bg-[#111413] py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl text-white mb-6">Next Vip Starts</h3>
            <div className="flex justify-center gap-8">
              <CountdownBox value={countdown.hours} label="Hours" />
              <CountdownBox value={countdown.minutes} label="Minutes" />
              <CountdownBox value={countdown.seconds} label="Seconds" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VipRecordsSection;
