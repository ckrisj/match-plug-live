"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Check, ChevronLeft, ChevronRight, Minus, X } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

import {
  ResultsStats,
  TipOutcome,
  formatUnits,
} from "@/components/utils/results";

/** A card's text, formatted on the server so hydration cannot shift a date. */
export interface ResultCardData {
  id: string;
  dateLabel: string;
  league: string;
  match: string;
  tip: string;
  odds: string;
  score: string;
  result: TipOutcome;
}

export interface ResultsTabData {
  key: "vip" | "elite";
  /** Shown on the tab, e.g. "ELITE". */
  label: string;
  /** Shown in running text, e.g. "Join Elite". */
  name: string;
  stats: ResultsStats;
  cards: ResultCardData[];
  month: { name: string; stats: ResultsStats } | null;
}

const OUTCOMES: Record<
  TipOutcome,
  { label: string; Icon: typeof Check; badge: string; border: string }
> = {
  won: {
    label: "WON",
    Icon: Check,
    badge: "bg-[#03DD3C] text-black",
    border: "border-[#03DD3C]",
  },
  // Same size and weight as a win: losses get equal prominence.
  lost: {
    label: "LOST",
    Icon: X,
    badge: "bg-[#F63241] text-white",
    border: "border-[#F63241]",
  },
  void: {
    label: "VOID",
    Icon: Minus,
    badge: "bg-[#9CA3AF] text-black",
    border: "border-[#9CA3AF]",
  },
};

const ResultCard: React.FC<{ card: ResultCardData }> = ({ card }) => {
  const { label, Icon, badge, border } = OUTCOMES[card.result];

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border-2 bg-white p-4 text-black ${border}`}
    >
      <p className="text-xs font-semibold text-black/60">{card.dateLabel}</p>
      <p className="mt-1 truncate text-xs font-bold uppercase tracking-wide text-[#20358A]">
        {card.league}
      </p>
      <p
        className="mt-3 line-clamp-2 min-h-10 text-base font-bold leading-5"
        title={card.match}
      >
        {card.match}
      </p>
      <p className="mt-3 truncate text-sm">{card.tip}</p>
      <p className="text-sm font-semibold">@ {card.odds}</p>
      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
        <span className="text-xl font-bold tabular-nums">{card.score}</span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${badge}`}
        >
          <Icon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
          {label}
        </span>
      </div>
    </article>
  );
};

const MonthCard: React.FC<{
  month: { name: string; stats: ResultsStats };
  joinLabel: string;
  joinHref: string;
}> = ({ month, joinLabel, joinHref }) => (
  <article className="flex h-full flex-col rounded-2xl border-2 border-[#03DD3C] bg-[#0C1636] p-4 text-white">
    <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
      Monthly summary
    </p>
    <p className="mt-2 text-2xl font-bold">{month.name}</p>
    <p className="mt-3 text-sm leading-6">
      <span className="font-bold text-[#03DD3C]">{month.stats.won} won</span>
      {" · "}
      <span className="font-bold text-[#FF6B76]">{month.stats.lost} lost</span>
      {" · "}
      {month.stats.hitRate}%{" · "}
      {formatUnits(month.stats.units)}u
    </p>
    <Link
      href={joinHref}
      className="mt-auto inline-flex items-center justify-center rounded-full bg-[#03DD3C] px-4 py-2.5 text-sm font-bold text-black transition-transform hover:scale-105"
    >
      {joinLabel} →
    </Link>
  </article>
);

const NavButton: React.FC<{
  direction: "prev" | "next";
  onClick: () => void;
}> = ({ direction, onClick }) => (
  <button
    type="button"
    aria-label={direction === "prev" ? "Previous results" : "Next results"}
    onClick={onClick}
    className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-transform hover:scale-105 sm:flex"
  >
    {direction === "prev" ? (
      <ChevronLeft className="h-5 w-5" />
    ) : (
      <ChevronRight className="h-5 w-5" />
    )}
  </button>
);

const ResultsSlider: React.FC<{
  tabs: ResultsTabData[];
  /** "See full record" target; null hides it, e.g. on the page it points to. */
  recordHref: string | null;
  joinHref: string;
}> = ({ tabs, recordHref, joinHref }) => {
  const [activeKey, setActiveKey] = useState(tabs[0].key);
  const swiperRef = useRef<SwiperType | null>(null);
  const active = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];
  const joinLabel = `Join ${active.name}`;

  // Autoplay would move content under a reader who asked for less motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      swiperRef.current?.autoplay?.stop();
    }
  }, [activeKey]);

  return (
    <div>
      <div
        className={`mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row ${
          tabs.length > 1 ? "sm:justify-between" : ""
        }`}
      >
        {tabs.length > 1 && (
          <div
            role="tablist"
            aria-label="Results package"
            className="inline-flex rounded-full bg-white/10 p-1"
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                id={`results-tab-${tab.key}`}
                aria-selected={tab.key === active.key}
                aria-controls="results-panel"
                onClick={() => setActiveKey(tab.key)}
                className={`rounded-full px-6 py-2 text-sm font-bold tracking-wide transition-colors ${
                  tab.key === active.key
                    ? "bg-[#03DD3C] text-black"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <p className="rounded-2xl bg-[#0C1636] px-4 py-2 text-center text-sm text-white sm:text-base">
          <span className="text-white/70">Last 30 days: </span>
          <span className="font-bold text-[#03DD3C]">
            {active.stats.won} won
          </span>
          {" · "}
          <span className="font-bold text-[#FF6B76]">
            {active.stats.lost} lost
          </span>
          {" · "}
          <span className="font-bold">{active.stats.hitRate}%</span>
          {" · "}
          <span className="font-bold">
            {formatUnits(active.stats.units)} units
          </span>
        </p>
      </div>

      <div
        id="results-panel"
        role="tabpanel"
        aria-labelledby={
          tabs.length > 1 ? `results-tab-${active.key}` : undefined
        }
        className="flex items-center gap-3 sm:gap-5"
      >
        <NavButton
          direction="prev"
          onClick={() => swiperRef.current?.slidePrev()}
        />

        <div className="min-w-0 flex-1">
          <Swiper
            // Remount on tab change so the new package starts at its first card.
            key={active.key}
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 20 },
            }}
            autoplay={{
              delay: 5000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            // Swiper only pauses once a finger starts dragging. A reader
            // resting a thumb on a card should hold the slide too; mouse
            // hover is already handled by pauseOnMouseEnter.
            onTouchStart={(swiper, event) => {
              if ((event as PointerEvent).pointerType !== "mouse") {
                swiper.autoplay.pause();
              }
            }}
            onTouchEnd={(swiper, event) => {
              if ((event as PointerEvent).pointerType !== "mouse") {
                swiper.autoplay.resume();
              }
            }}
            className="!pb-10"
            style={
              {
                "--swiper-pagination-color": "#03DD3C",
                "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
                "--swiper-pagination-bullet-inactive-opacity": "0.5",
              } as React.CSSProperties
            }
          >
            {active.cards.map((card) => (
              <SwiperSlide key={card.id} className="!h-auto">
                <ResultCard card={card} />
              </SwiperSlide>
            ))}
            {active.month && (
              <SwiperSlide className="!h-auto">
                <MonthCard
                  month={active.month}
                  joinLabel={joinLabel}
                  joinHref={joinHref}
                />
              </SwiperSlide>
            )}
          </Swiper>
        </div>

        <NavButton
          direction="next"
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {recordHref && (
          <Link
            href={recordHref}
            className="inline-flex w-full items-center justify-center rounded-full border-2 border-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#20358A] sm:w-auto sm:text-base"
          >
            See full {active.name} record
          </Link>
        )}
        <Link
          href={joinHref}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#03DD3C] px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105 sm:w-auto sm:text-base"
        >
          {joinLabel} →
        </Link>
      </div>
    </div>
  );
};

export default ResultsSlider;
