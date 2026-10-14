import Link from "next/link";
import React from "react";
import { Check } from "lucide-react";

import { RESULTS_PACKAGES, getPackageResults } from "@/app/Hooks/getResults";

/**
 * The free channel, offered once here as a quiet secondary link instead of in
 * the four "join free" sections the page used to carry.
 */
const FREE_TELEGRAM_URL = "https://t.me/MATCHPLUG";

/**
 * The VIP record in one line, from the same 30-day count as the results grid
 * further down, so the page never shows two different win rates. Hidden when
 * there is nothing graded to report.
 */
const TrustLine = async () => {
  const vip = await getPackageResults(RESULTS_PACKAGES.vip);

  if (!vip) {
    return null;
  }

  const { won, lost, hitRate } = vip.stats;

  return (
    <a
      href="#results"
      className="group inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm text-white sm:justify-start sm:text-base"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#03DD3C]">
        <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} aria-hidden />
      </span>
      <span>
        VIP, last 30 days: <span className="font-bold">{hitRate}%</span> ·{" "}
        <span className="font-bold text-[#03DD3C]">{won} won</span> ·{" "}
        <span className="font-bold text-[#FF6B76]">{lost} lost</span>
      </span>
      <span className="font-semibold text-[#03DD3C] underline-offset-4 group-hover:underline">
        See results →
      </span>
    </a>
  );
};

const Hero = () => (
  <section className="relative overflow-hidden bg-black">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0">
      <img
        src="/hero_new.webp"
        alt=""
        className="h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-black/60"></div>
    </div>

    <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 pb-14 pt-28 text-center sm:px-6 sm:pb-24 sm:pt-44 sm:text-start lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-5 sm:gap-7">
        {/* Interim copy until the owner signs off the new headline. */}
        <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl xl:text-5xl">
          Soccer Tips Today — Win Draw Win Predictions, Free for Every Match
        </h1>

        <p className="text-white sm:text-lg lg:text-xl xl:text-2xl">
          Daily free tips. Verified VIP track record. Real analysis, not luck.
        </p>

        {/* One primary action, one secondary. */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
          <Link
            href="#prediction"
            className="inline-flex items-center justify-center rounded-full bg-[#03DD3C] px-8 py-3 font-bold text-black transition-transform duration-300 hover:scale-105 sm:text-lg"
          >
            See today&apos;s picks
          </Link>
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 font-bold text-white transition-colors duration-300 hover:bg-white hover:text-black sm:text-lg"
          >
            Subscribe
          </Link>
        </div>

        <TrustLine />

        <p className="text-sm text-white/70">
          Prefer free tips first?{" "}
          <Link
            href={FREE_TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white underline underline-offset-4 hover:text-[#03DD3C]"
          >
            Join our free Telegram channel
          </Link>
        </p>
      </div>
    </div>
  </section>
);

export default Hero;
