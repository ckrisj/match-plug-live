"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

interface ResultCell {
  odd: string;
  win: boolean;
}

interface MonthResult {
  month: string;
  score: string;
  cells: ResultCell[];
  // Market prediction page this month's results link to.
  // Picked per upload — must match a `link` slug in DirectWinPredictions.
  link: string;
}

const RESULT_CELLS: ResultCell[] = [
  { odd: "1.56", win: true },
  { odd: "1.56", win: true },
  { odd: "1.56", win: true },
  { odd: "1.56", win: true },
  { odd: "1.56", win: true },
  { odd: "1.56", win: true },
  { odd: "1.56", win: true },
  { odd: "1.56", win: true },
  { odd: "1.56", win: true },
  { odd: "5.31", win: false },
  { odd: "1.82", win: false },
  { odd: "1.56", win: true },
  { odd: "1.56", win: true },
  { odd: "1.56", win: true },
  { odd: "1.72", win: false },
  { odd: "1.56", win: true },
  { odd: "1.56", win: true },
  { odd: "1.56", win: true },
];

const months: MonthResult[] = [
  {
    month: "March Results",
    score: "15/18",
    cells: RESULT_CELLS,
    link: "free-football-prediction-over-2.5-goals",
  },
  {
    month: "April Results",
    score: "15/18",
    cells: RESULT_CELLS,
    link: "free-football-prediction-over-2.5-goals",
  },
  {
    month: "May Results",
    score: "15/18",
    cells: RESULT_CELLS,
    link: "free-football-prediction-over-2.5-goals",
  },
  {
    month: "June Results",
    score: "15/18",
    cells: RESULT_CELLS,
    link: "free-football-prediction-over-2.5-goals",
  },
];

const WinIcon: React.FC = () => (
  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-md bg-[#03DD3C]">
    <svg
      className="h-3 w-3"
      fill="none"
      stroke="#000000"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </span>
);

const LossIcon: React.FC = () => (
  <svg
    className="h-[18px] w-[18px]"
    fill="none"
    stroke="#F63241"
    strokeWidth={2.5}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ResultCard: React.FC<{ data: MonthResult }> = ({ data }) => (
  <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-14">
    {/* Image / score card */}
    <div className="relative shrink-0">
      <div className="h-[220px] w-[248px] rounded-[26px] border border-[#03DD3C] bg-[#455DBD] shadow-[0_0_28px_rgba(255,255,255,0.55),0_0_60px_rgba(255,255,255,0.28)] sm:h-[282px] sm:w-[332px]" />
      <div className="absolute -bottom-2 -right-[25px] flex h-[70px] w-[140px] items-center justify-center rounded-[19px] bg-[#03DD3C] sm:h-[83px] sm:w-[164px]">
        <span className="text-2xl font-bold text-black sm:text-[32px]">
          {data.score}
        </span>
      </div>
    </div>

    {/* Results grid */}
    <div className="flex flex-col items-center sm:items-start">
      <div className="mb-4 flex items-center gap-3">
        <h3 className="whitespace-nowrap text-xl font-bold uppercase text-white sm:text-2xl">
          {data.month}
        </h3>
        <span className="whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-[11px] font-medium tracking-wide text-black">
          HUGE PROFIT
        </span>
      </div>

      <div className="grid grid-cols-5 gap-x-2 gap-y-4 sm:gap-x-3 sm:gap-y-5">
        {data.cells.map((cell, index) => (
          <div
            key={index}
            className={`flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-2xl border bg-white sm:h-[54px] sm:w-[54px] sm:gap-1.5 ${
              cell.win ? "border-[#03DD3C]" : "border-[#222222]"
            }`}
          >
            <span className="text-xs font-normal text-black">{cell.odd}</span>
            {cell.win ? <WinIcon /> : <LossIcon />}
          </div>
        ))}
      </div>

      <Link
        href={`/${data.link}`}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[#03DD3C] px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105 sm:text-base"
      >
        View Verified Results
      </Link>
    </div>
  </div>
);

const NavButton: React.FC<{
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}> = ({ direction, onClick, className = "" }) => (
  <button
    type="button"
    aria-label={direction === "prev" ? "Previous" : "Next"}
    onClick={onClick}
    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-transform hover:scale-105 ${className}`}
  >
    {direction === "prev" ? (
      <ChevronLeft className="h-5 w-5" />
    ) : (
      <ChevronRight className="h-5 w-5" />
    )}
  </button>
);

/* Rough, torn-paper edge rendered with a turbulence-displaced rectangle. */
const TornEdge: React.FC<{ position: "top" | "bottom"; color: string }> = ({
  position,
  color,
}) => {
  const filterId = `torn-${position}`;
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${
        position === "top" ? "top-0" : "bottom-0"
      } h-[22px]`}
    >
      <svg
        className="h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 30"
      >
        <defs>
          <filter id={filterId} x="-5%" y="-100%" width="110%" height="300%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.009 0.32"
              numOctaves="2"
              seed={position === "top" ? 8 : 17}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <rect
          x="-40"
          y={position === "top" ? -46 : 16}
          width="1280"
          height="60"
          fill={color}
          filter={`url(#${filterId})`}
        />
      </svg>
    </div>
  );
};

const VipResultsSlider: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#455DBD] to-[#20358A] py-20">
      <TornEdge position="top" color="#0C1636" />
      <TornEdge position="bottom" color="#FFFFFF" />
      <div className="relative z-10 mx-auto max-w-[1650px] px-4">
        <h2 className="mb-10 text-center text-2xl font-bold uppercase text-white sm:text-3xl">
          VIP Results - Verified Records
        </h2>
        <div className="flex items-center gap-3 sm:gap-6">
          <NavButton
            direction="prev"
            className="hidden sm:flex"
            onClick={() => swiperRef.current?.slidePrev()}
          />

          <div className="min-w-0 flex-1 overflow-hidden">
            <Swiper
              modules={[Navigation]}
              spaceBetween={40}
              slidesPerView={1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              breakpoints={{
                1536: { slidesPerView: 2 },
              }}
            >
              {months.map((data) => (
                <SwiperSlide key={data.month}>
                  <div className="flex justify-center pb-4">
                    <ResultCard data={data} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <NavButton
            direction="next"
            className="hidden sm:flex"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>

        {/* Mobile navigation */}
        <div className="mt-8 flex justify-center gap-6 sm:hidden">
          <NavButton
            direction="prev"
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <NavButton
            direction="next"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      </div>
    </section>
  );
};

export default VipResultsSlider;
