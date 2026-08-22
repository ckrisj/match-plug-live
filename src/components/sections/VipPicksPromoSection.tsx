"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Crown, Target, Globe, TrendingUp, Send, Gift, Play } from "lucide-react";

interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
}

interface Feature {
  icon: React.ReactNode;
  label: string;
}

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => (
  <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-[#03DD3C] px-3 py-5 text-center">
    <span className="text-white">{feature.icon}</span>
    <span className="text-[10px] font-normal text-white sm:text-xs">
      {feature.label}
    </span>
  </div>
);

const TimeUnit: React.FC<{ value: number; label: string }> = ({
  value,
  label,
}) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl font-bold text-[#03DD3C] sm:text-3xl">
      {value.toString().padStart(2, "0")}
    </span>
    <span className="text-xs font-normal text-black sm:text-sm">{label}</span>
  </div>
);

const VipPicksPromoSection: React.FC = () => {
  const [countdown, setCountdown] = useState<CountdownTime>({
    hours: 1,
    minutes: 20,
    seconds: 7,
  });

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
          hours = 1;
          minutes = 20;
          seconds = 7;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const leftFeatures: Feature[] = [
    { icon: <Crown className="h-7 w-7" />, label: "Insider Picks" },
    { icon: <Globe className="h-7 w-7" />, label: "Sport Analytics" },
  ];

  const rightFeatures: Feature[] = [
    { icon: <Target className="h-7 w-7" />, label: "Master Play" },
    { icon: <TrendingUp className="h-7 w-7" />, label: "92.4% Accuracy" },
  ];

  return (
    <section className="overflow-hidden bg-white py-14 sm:py-20">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 sm:px-6">
        {/* Heading */}
        <h2 className="text-center text-2xl font-bold uppercase leading-tight text-black sm:text-3xl">
          Get VIP Sports Picks And Earn{" "}
          <span className="text-[#03DD3C]">€5,000-€10,000</span>
        </h2>

        {/* Badge */}
        <div className="mt-6 max-w-full rounded-full border border-[#484848] px-3 py-2 sm:px-5">
          <span className="whitespace-nowrap text-[10px] font-normal text-black sm:text-sm">
            JOIN FREE GROUP. GET FREE TIPS. SEE RESULTS BEFORE VIP.
          </span>
        </div>

        {/* Feature grid with central media panel */}
        <div className="mt-8 grid w-full grid-cols-[1fr_1.35fr_1fr] items-stretch gap-3 sm:gap-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {leftFeatures.map((feature) => (
              <FeatureCard key={feature.label} feature={feature} />
            ))}
          </div>

          <div className="flex min-h-[320px] items-center justify-center rounded-3xl bg-[#03DD3C] sm:min-h-[440px]">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm">
              <Play className="h-7 w-7 fill-white text-white" />
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            {rightFeatures.map((feature) => (
              <FeatureCard key={feature.label} feature={feature} />
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <p className="mt-8 max-w-xl text-center text-base text-black sm:text-lg">
          Daily signals from ex-bookmaker analysts. Copy the bet, place it at
          your bookmaker, collect winnings same day.
        </p>

        {/* Countdown */}
        <div className="mt-8 w-full max-w-xs rounded-3xl border border-[#484848] px-6 py-5 text-center">
          <p className="text-xs font-normal text-black sm:text-sm">
            FREE VIP ACCESS EXPIRES IN
          </p>
          <div className="mt-3 flex items-center justify-center gap-3 sm:gap-4">
            <TimeUnit value={countdown.hours} label="HRS" />
            <span className="text-2xl font-bold text-[#03DD3C] sm:text-3xl">
              :
            </span>
            <TimeUnit value={countdown.minutes} label="MIN" />
            <span className="text-2xl font-bold text-[#03DD3C] sm:text-3xl">
              :
            </span>
            <TimeUnit value={countdown.seconds} label="SEC" />
          </div>
        </div>

        {/* CTA */}
        <div className="relative mt-8 w-full max-w-sm">
          <Link
            href="https://user.matchplug.com/auth/register"
            className="flex w-full items-center justify-center gap-3 rounded-full bg-[#03DD3C] py-4 text-lg font-bold text-black transition-transform duration-300 hover:scale-105 sm:text-xl"
          >
            <Send className="h-6 w-6" />
            JOIN FREE CHANNEL
          </Link>
          <Gift className="absolute -right-1 -top-4 h-10 w-10 text-[#03DD3C]" />
        </div>

        {/* Footer note */}
        <p className="mt-5 text-center text-sm text-black sm:text-base">
          First 100 today members get{" "}
          <span className="text-[#03DD3C]">7 days of VIP access!</span> (Get 7
          Free Days)
        </p>
      </div>
    </section>
  );
};

export default VipPicksPromoSection;
