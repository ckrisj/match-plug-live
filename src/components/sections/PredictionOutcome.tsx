import React from "react";
import { Check, Minus, X } from "lucide-react";

/**
 * The Result cell of the free prediction tables. The API sends `outcome`:
 * WON, LOST or CANCELLED once graded, null before the match is played or
 * graded. A cancelled tip shows as VOID, as in the VIP results grid.
 */
const OUTCOMES = {
  WON: { label: "WON", Icon: Check, style: "bg-green-100 text-green-800" },
  LOST: { label: "LOST", Icon: X, style: "bg-red-100 text-red-700" },
  CANCELLED: { label: "VOID", Icon: Minus, style: "bg-gray-200 text-gray-700" },
  CANCELED: { label: "VOID", Icon: Minus, style: "bg-gray-200 text-gray-700" },
} as const;

const PredictionOutcome: React.FC<{ outcome?: string | null }> = ({
  outcome,
}) => {
  const graded =
    OUTCOMES[String(outcome ?? "").trim().toUpperCase() as keyof typeof OUTCOMES];

  if (!graded) {
    return (
      <span className="text-xs text-gray-500 sm:text-sm" title="Not graded yet">
        -
      </span>
    );
  }

  const { label, Icon, style } = graded;

  return (
    <span
      className={`inline-flex items-center gap-1 text-nowrap rounded-full px-1.5 py-1 text-xs font-semibold sm:px-3 sm:text-sm ${style}`}
    >
      <Icon className="hidden h-3.5 w-3.5 sm:inline" strokeWidth={3} aria-hidden />
      {label}
    </span>
  );
};

export default PredictionOutcome;
