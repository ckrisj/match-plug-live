import Link from "next/link";
import React from "react";

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
            className="inline-flex items-center justify-center rounded-full bg-[#03DD3C] px-6 py-3 text-center font-bold text-black transition-transform duration-300 hover:scale-105 sm:px-8 sm:text-lg"
          >
            See today&apos;s free picks
          </Link>
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center rounded-full border-2 border-white px-6 py-3 text-center font-bold text-white transition-colors duration-300 hover:bg-white hover:text-black sm:px-8 sm:text-lg"
          >
            Subscribe for Highly Accurate Picks
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
