"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { CountdownBox } from "./VipRecordsSection";
interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
}

const Hero: React.FC = () => {
  const [countdown, setCountdown] = useState<CountdownTime>({
    hours: 11,
    minutes: 1,
    seconds: 2,
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
    <section className="relative  bg-black overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 ">
        <img
          src="/hero_new.webp"
          alt=""
          className="  object-cover w-full h-full  object-top"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Bokeh/Light effects */}
      {/* <div className="absolute inset-0"> */}
      {/* Large bokeh lights */}
      {/* <div className="absolute top-20 left-20 w-16 h-16 bg-amber-400/30 rounded-full blur-md"></div> */}
      {/* <div className="absolute top-32 right-32 w-20 h-20 bg-yellow-400/25 rounded-full blur-lg"></div> */}
      {/* <div className="absolute top-60 left-1/4 w-12 h-12 bg-orange-400/35 rounded-full blur-md"></div> */}
      {/* <div className="absolute bottom-40 right-20 w-24 h-24 bg-amber-300/20 rounded-full blur-xl"></div> */}
      {/* <div className="absolute bottom-60 left-16 w-14 h-14 bg-yellow-500/30 rounded-full blur-md"></div> */}
      {/* <div className="absolute top-40 right-1/4 w-18 h-18 bg-orange-300/25 rounded-full blur-lg"></div> */}
      {/* <div className="absolute top-80 left-1/2 w-10 h-10 bg-amber-400/40 rounded-full blur-sm"></div> */}
      {/* <div className="absolute bottom-80 right-1/3 w-16 h-16 bg-yellow-400/20 rounded-full blur-lg"></div> */}

      {/* Small scattered lights */}
      {/* <div className="absolute top-24 left-64 w-4 h-4 bg-amber-400/60 rounded-full blur-sm"></div> */}
      {/* <div className="absolute top-44 right-48 w-3 h-3 bg-yellow-300/70 rounded-full blur-xs"></div> */}
      {/* <div className="absolute top-72 left-32 w-5 h-5 bg-orange-400/50 rounded-full blur-sm"></div> */}
      {/* <div className="absolute bottom-32 right-64 w-4 h-4 bg-amber-500/60 rounded-full blur-sm"></div> */}
      {/* <div className="absolute bottom-48 left-48 w-3 h-3 bg-yellow-400/80 rounded-full"></div> */}
      {/* </div> */}

      {/* Main Content Container */}
      <div className="relative flex-col pt-48 pb-10 w-full z-10 flex items-center justify-center  px-4 sm:px-6 lg:px-8 text-center sm:text-start">
        <div className=" max-w-3xl mx-auto flex flex-col sm:gap-7 gap-5 ">
          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl  xl:text-5xl font-bold text-white  ">
            <span className="">
              Soccer Tips Today — Win Draw Win Predictions, Free for Every Match
              —{" "}
            </span>
            <span className="  font-medium mt-4">
              Join thousands of bettors winning with Matchplug
            </span>
          </h1>

          {/* Stats/Features Text */}
          <p className=" sm:text-lg lg:text-xl xl:text-2xl text-white   max-w-5xl  ">
            Daily free tips. Verified VIP track record. Real analysis, not luck.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row sm:gap-6 gap-4  ">
            <Link href="https://user.matchplug.com/auth/login">
              <Button className="cursor-pointer">Subscribe Now</Button>
            </Link>
            <Link href="https://user.matchplug.com/auth/register">
              <Button variant="secondary">Get Free Tips</Button>
            </Link>
          </div>
        </div>{" "}
        <div className="flex w-full items-center gap-4 sm:gap-3 pt-20    sm:pt-36 sm:flex-row flex-col max-w-[100rem] ">
          <span className="w-full h-0.5 bg-white/60"></span>
          <p className=" text-nowrap font-bold  text-lg text-white">
            Today’s Jackpot Odds Expire in{" "}
          </p>
          <div className="flex justify-center gap-3">
            <CountdownBox value={countdown.hours} label="Hours" />
            <CountdownBox value={countdown.minutes} label="Minutes" />
            <CountdownBox value={countdown.seconds} label="Seconds" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
