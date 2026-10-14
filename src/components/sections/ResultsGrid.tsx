"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Check, Clock, Minus, X } from "lucide-react";

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

export interface ResultsTabData {
  key: "vip" | "elite";
  /** Shown on the tab, e.g. "ELITE". */
  label: string;
  /** Shown in running text, e.g. "Join Elite". */
  name: string;
  stats: ResultsStats;
  /** The last 30 days, oldest first. */
  days: ResultDayData[];
  month: { name: string; stats: ResultsStats } | null;
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

const ResultsGrid: React.FC<{
  tabs: ResultsTabData[];
  /** "See full record" target; null hides it, e.g. on the page it points to. */
  recordHref: string | null;
  joinHref: string;
}> = ({ tabs, recordHref, joinHref }) => {
  const [activeKey, setActiveKey] = useState(tabs[0].key);
  const active = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];
  const joinLabel = `Join ${active.name}`;
  const first = active.days[0];
  const last = active.days[active.days.length - 1];

  // The mobile details panel opens on the latest bet, so the details show
  // before anyone taps.
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const tipDays = active.days.filter((day) => day.tips.length);
  const selectedDay =
    tipDays.find((day) => day.date === selectedDate) ??
    tipDays[tipDays.length - 1];

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
          {active.stats.units !== null && (
            <>
              {" · "}
              <span className="font-bold">
                {formatUnits(active.stats.units)} units
              </span>
            </>
          )}
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
        {/* Says exactly which 30 days are counted. Today is left out until its
            tips have been played. */}
        {first && last && (
          <p className="mb-3 text-center text-xs text-white/70 sm:text-sm">
            {first.weekday} {first.dayMonth} – {last.weekday} {last.dayMonth}
          </p>
        )}

        <ol className="grid grid-cols-5 gap-1.5 sm:grid-cols-6 sm:gap-3">
          {active.days.map((day) => (
            <DayCell
              key={day.date}
              day={day}
              selected={day.date === selectedDay?.date}
              onSelect={() => setSelectedDate(day.date)}
            />
          ))}
        </ol>

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

        {active.month && (
          <p className="mt-4 text-center text-sm text-white/80">
            <span className="font-bold text-white">{active.month.name}:</span>{" "}
            <span className="font-bold text-[#03DD3C]">
              {active.month.stats.won} won
            </span>
            {" · "}
            <span className="font-bold text-[#FF6B76]">
              {active.month.stats.lost} lost
            </span>
            {" · "}
            {active.month.stats.hitRate}%
            {active.month.stats.units !== null &&
              ` · ${formatUnits(active.month.stats.units)}u`}
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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

export default ResultsGrid;
