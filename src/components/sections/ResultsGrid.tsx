"use client";
import React, { useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Clock, Minus, X } from "lucide-react";

import {
  ResultsStats,
  TipOutcome,
  formatUnits,
} from "@/components/utils/results";

/** A tip's text, formatted on the server so hydration cannot shift a date. */
export interface ResultTipData {
  id: string;
  league: string;
  match: string;
  tip: string;
  odds: string | null;
  result: TipOutcome;
}

/** One cell of the grid: a day, with no tips if none was published. */
export interface ResultDayData {
  date: string;
  /** e.g. "Mon" */
  weekday: string;
  /** e.g. "12 Oct" */
  dayMonth: string;
  tips: ResultTipData[];
}

/** One page of the slider: 30 days and their stats. */
export interface ResultsPeriodData {
  /** e.g. "Last 30 days" */
  title: string;
  /** e.g. "Mon 14 Sep – Tue 13 Oct" */
  range: string;
  /** Oldest first. */
  days: ResultDayData[];
  stats: ResultsStats;
}

export interface ResultsTabData {
  key: "vip" | "elite";
  /** Shown on the tab, e.g. "ELITE". */
  label: string;
  /** Newest first: the last 30 days, then the 30 before. */
  periods: ResultsPeriodData[];
}

const OUTCOMES: Record<
  TipOutcome,
  {
    label: string;
    legend: string;
    Icon: typeof Check;
    badge: string;
    border: string;
  }
> = {
  won: {
    label: "WON",
    legend: "Won",
    Icon: Check,
    badge: "bg-[#03DD3C] text-black",
    border: "border-[#03DD3C]",
  },
  // Same size and weight as a win: losses get equal prominence.
  lost: {
    label: "LOST",
    legend: "Lost",
    Icon: X,
    badge: "bg-[#F63241] text-white",
    border: "border-[#F63241]",
  },
  void: {
    label: "VOID",
    legend: "Void (cancelled)",
    Icon: Minus,
    badge: "bg-[#9CA3AF] text-black",
    border: "border-[#9CA3AF]",
  },
  // Played but not graded yet by the backend.
  na: {
    label: "NA",
    legend: "Not graded yet",
    Icon: Clock,
    badge: "bg-white text-black/60 ring-1 ring-black/20",
    border: "border-black/15",
  },
};

/** A horizontal finger move this long, mostly sideways, turns the page. */
const SWIPE_DISTANCE = 50;

/**
 * In a grid cell: icon only on a phone-width cell, icon and label from sm up.
 * `labelled` always shows the label, as in the mobile details panel.
 */
const OutcomeBadge: React.FC<{ result: TipOutcome; labelled?: boolean }> = ({
  result,
  labelled = false,
}) => {
  const { label, Icon, badge } = OUTCOMES[result];

  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center gap-1 rounded-full text-[11px] font-bold ${
        labelled ? "px-2.5 py-1" : "mt-auto p-1 sm:px-2.5 sm:py-1"
      } ${badge}`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
      <span className={labelled ? "" : "sr-only sm:not-sr-only"}>{label}</span>
    </span>
  );
};

/**
 * Phone-width cells are too narrow for the bet, so the selected day's bet is
 * shown in full under the grid. Desktop cells already show it.
 */
const DayDetails: React.FC<{ day: ResultDayData }> = ({ day }) => (
  <div
    aria-live="polite"
    className="mt-4 rounded-2xl bg-white p-4 text-black sm:hidden"
  >
    <p className="text-xs font-semibold text-black/60">
      {day.weekday} {day.dayMonth}
    </p>
    {day.tips.map((tip) => (
      <div
        key={tip.id}
        className="mt-2 flex items-start justify-between gap-3 border-t border-black/10 pt-2 first-of-type:border-0 first-of-type:pt-0"
      >
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#20358A]">
            {tip.league}
          </p>
          <p className="text-sm font-bold">{tip.match}</p>
          <p className="text-sm">
            {tip.tip}
            {tip.odds && ` @ ${tip.odds}`}
          </p>
        </div>
        <OutcomeBadge result={tip.result} labelled />
      </div>
    ))}
    <p className="mt-3 text-[11px] text-black/50">
      Tap any day to see its bet.
    </p>
  </div>
);

const DayCell: React.FC<{
  day: ResultDayData;
  selected: boolean;
  onSelect: () => void;
}> = ({ day, selected, onSelect }) => {
  const date = (
    <p className="text-[10px] font-semibold leading-tight sm:text-xs">
      <span className="hidden sm:inline">{day.weekday} </span>
      {day.dayMonth}
    </p>
  );

  if (!day.tips.length) {
    return (
      <li
        title={`${day.weekday} ${day.dayMonth}: no tip`}
        className="flex min-h-[72px] flex-col rounded-xl border border-dashed border-white/30 p-1.5 text-white/60 sm:min-h-[132px] sm:p-3"
      >
        {date}
        <p className="mt-auto hidden text-xs sm:block">No tip</p>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        title={day.tips
          .map(
            (tip) =>
              `${day.weekday} ${day.dayMonth} · ${tip.league} · ${tip.match} · ${tip.tip}${tip.odds ? ` @ ${tip.odds}` : ""} · ${OUTCOMES[tip.result].label}`,
          )
          .join("\n")}
        className={`flex h-full min-h-[72px] w-full flex-col rounded-xl border-2 bg-white p-1.5 text-left text-black sm:min-h-[132px] sm:cursor-default sm:p-3 ${
          OUTCOMES[day.tips[0].result].border
        } ${selected ? "ring-[3px] ring-white sm:ring-0" : ""}`}
      >
        <div className="text-black/60">{date}</div>
        {day.tips.map((tip) => (
          <div key={tip.id} className="mt-1 flex w-full min-w-0 flex-1 flex-col">
            <p className="hidden truncate text-[11px] font-bold uppercase tracking-wide text-[#20358A] sm:block">
              {tip.league}
            </p>
            <p className="hidden truncate text-xs font-bold sm:block">
              {tip.match}
            </p>
            <p className="mb-2 hidden truncate text-xs sm:block">
              {tip.tip}
              {tip.odds && ` @ ${tip.odds}`}
            </p>
            <OutcomeBadge result={tip.result} />
          </div>
        ))}
      </button>
    </li>
  );
};

/**
 * "Last 30 days: 9 won · 3 lost · 75%", plus units once odds are in. A page
 * with nothing graded says so rather than showing 0%.
 */
const StatsLine: React.FC<{ period: ResultsPeriodData }> = ({ period }) => {
  const { stats } = period;

  if (stats.won + stats.lost === 0) {
    return (
      <span className="text-white/70">{period.title}: no graded tips yet</span>
    );
  }

  return (
    <>
      <span className="text-white/70">{period.title}: </span>
      <span className="font-bold text-[#03DD3C]">{stats.won} won</span>
      {" · "}
      <span className="font-bold text-[#FF6B76]">{stats.lost} lost</span>
      {" · "}
      <span className="font-bold">{stats.hitRate}%</span>
      {stats.units !== null && (
        <>
          {" · "}
          <span className="font-bold">{formatUnits(stats.units)} units</span>
        </>
      )}
    </>
  );
};

const ArrowButton: React.FC<{
  direction: "older" | "newer";
  disabled: boolean;
  onClick: () => void;
}> = ({ direction, disabled, onClick }) => {
  const Icon = direction === "older" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={
        direction === "older" ? "Previous 30 days" : "Next 30 days"
      }
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#20358A] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
    >
      <Icon className="h-5 w-5" strokeWidth={2.5} aria-hidden />
    </button>
  );
};

const ResultsGrid: React.FC<{ tabs: ResultsTabData[] }> = ({ tabs }) => {
  const [activeKey, setActiveKey] = useState(tabs[0].key);
  const active = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];

  // 0 is the last 30 days; each step back is 30 days older.
  const [pageIndex, setPageIndex] = useState(0);
  const pageCount = active.periods.length;
  const page = active.periods[Math.min(pageIndex, pageCount - 1)];

  // The mobile details panel opens on the latest bet of the page, so the
  // details show before anyone taps.
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const tipDays = page.days.filter((day) => day.tips.length);
  const selectedDay =
    tipDays.find((day) => day.date === selectedDate) ??
    tipDays[tipDays.length - 1];

  const goTo = (index: number) => {
    setPageIndex(Math.max(0, Math.min(pageCount - 1, index)));
    setSelectedDate(null);
  };

  // Swipe on touch screens. touch-action: pan-y on the track leaves vertical
  // scrolling to the browser and hands sideways moves to these handlers.
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (event: React.PointerEvent) => {
    swipeStart.current =
      event.pointerType === "mouse"
        ? null
        : { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: React.PointerEvent) => {
    const start = swipeStart.current;
    swipeStart.current = null;

    if (!start) {
      return;
    }

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy) * 1.5) {
      return;
    }

    // Older days sit to the left, so dragging right goes back in time.
    goTo(pageIndex + (dx > 0 ? 1 : -1));
  };

  // The track lays pages out oldest to newest, left to right.
  const slots = [...active.periods].reverse();
  const slot = pageCount - 1 - pageIndex;

  return (
    <div>
      <div
        className={`mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row ${
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
                onClick={() => {
                  setActiveKey(tab.key);
                  setPageIndex(0);
                  setSelectedDate(null);
                }}
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
          <StatsLine period={page} />
        </p>
      </div>

      <div
        id="results-panel"
        role="tabpanel"
        aria-labelledby={
          tabs.length > 1 ? `results-tab-${active.key}` : undefined
        }
        className="mx-auto max-w-5xl"
      >
        {/* Says exactly which 30 days are shown. Today is left out until its
            tips have been played. */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <ArrowButton
            direction="older"
            disabled={pageIndex >= pageCount - 1}
            onClick={() => goTo(pageIndex + 1)}
          />
          <div className="text-center" aria-live="polite">
            <p className="text-sm font-bold text-white sm:text-base">
              {page.title}
            </p>
            <p className="text-xs text-white/70 sm:text-sm">{page.range}</p>
            {pageCount > 1 && (
              <div className="mt-2 flex justify-center gap-1.5">
                {slots.map((period, index) => (
                  <button
                    key={period.range}
                    type="button"
                    onClick={() => goTo(pageCount - 1 - index)}
                    aria-label={`Show ${period.title.toLowerCase()}`}
                    aria-current={index === slot}
                    className={`h-2 rounded-full transition-all ${
                      index === slot ? "w-6 bg-[#03DD3C]" : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          <ArrowButton
            direction="newer"
            disabled={pageIndex === 0}
            onClick={() => goTo(pageIndex - 1)}
          />
        </div>

        <div className="overflow-hidden">
          <div
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              swipeStart.current = null;
            }}
            className="flex touch-pan-y transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${slot * 100}%)` }}
          >
            {slots.map((period, index) => (
              <ol
                key={period.range}
                aria-label={`${period.title}, ${period.range}`}
                aria-hidden={index !== slot}
                inert={index !== slot}
                className="grid w-full shrink-0 grid-cols-5 gap-1.5 sm:grid-cols-6 sm:gap-3"
              >
                {period.days.map((day) => (
                  <DayCell
                    key={day.date}
                    day={day}
                    selected={index === slot && day.date === selectedDay?.date}
                    onSelect={() => setSelectedDate(day.date)}
                  />
                ))}
              </ol>
            ))}
          </div>
        </div>

        {selectedDay && <DayDetails day={selectedDay} />}

        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/80 sm:text-sm">
          {(Object.keys(OUTCOMES) as TipOutcome[]).map((result) => {
            const { legend, Icon, badge } = OUTCOMES[result];

            return (
              <li key={result} className="inline-flex items-center gap-1.5">
                <span className={`inline-flex rounded-full p-1 ${badge}`}>
                  <Icon className="h-3 w-3" strokeWidth={3} aria-hidden />
                </span>
                {legend}
              </li>
            );
          })}
          <li className="inline-flex items-center gap-1.5">
            <span className="h-4 w-4 rounded border border-dashed border-white/50" />
            No tip
          </li>
        </ul>

        <p className="mt-4 text-center text-sm text-white">
          <StatsLine period={page} />
        </p>
      </div>
    </div>
  );
};

export default ResultsGrid;
