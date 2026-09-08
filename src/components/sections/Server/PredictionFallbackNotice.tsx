"use client";

import Link from "next/link";
import { DateTime } from "luxon";

/**
 * Explains that the rows on screen are not from the day that was asked for.
 *
 * Shared by the market pages and the homepage prediction block so both say the
 * same thing when a publishing gap pushes them back to an earlier day.
 */

export const formatMatchDate = (date: string) => {
  const parsed = DateTime.fromISO(date);

  return parsed.isValid ? parsed.toFormat("cccc d LLLL") : date;
};

type PredictionFallbackNoticeProps = {
  /** The day the visitor asked for. */
  requestedDate: string;
  /** The day the rows on screen were actually published for. */
  servedDate: string;
  /** Next day that already has picks, if any. */
  nextDate?: string | null;
  /**
   * Where the "next day" link should point. Market pages carry the date in a
   * query string; the homepage block has no such control, so it omits this and
   * the date is shown as plain text.
   */
  nextDateHref?: (date: string) => string;
};

export default function PredictionFallbackNotice({
  requestedDate,
  servedDate,
  nextDate,
  nextDateHref,
}: PredictionFallbackNoticeProps) {
  return (
    <div className="mb-6 rounded-lg border border-[#455DBF]/30 bg-white px-4 py-3 text-sm text-gray-700">
      No picks were published for{" "}
      <span className="font-semibold">{formatMatchDate(requestedDate)}</span> yet,
      so these are the most recent published selections, from{" "}
      <span className="font-semibold">{formatMatchDate(servedDate)}</span>.
      {nextDate && (
        <>
          {" "}
          Picks for{" "}
          {nextDateHref ? (
            <Link
              href={nextDateHref(nextDate)}
              className="font-semibold text-[#455DBF] underline"
            >
              {formatMatchDate(nextDate)}
            </Link>
          ) : (
            <span className="font-semibold">{formatMatchDate(nextDate)}</span>
          )}{" "}
          are already up.
        </>
      )}
    </div>
  );
}
