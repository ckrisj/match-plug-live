import Link from "next/link";

/**
 * Rendered for anything that isn't a real route, and returned with a genuine
 * 404 status. Unknown URLs used to fall through to the market page and render
 * an empty shell with a 200, which reads to a crawler as a real page with no
 * content on it.
 */

const MARKETS = [
  { href: "/free-football-predictions-1x2", label: "Win Draw Win" },
  { href: "/free-football-prediction-over-2.5-goals", label: "Over 2.5 Goals" },
  { href: "/free-football-predictions-under-2.5-goals", label: "Under 2.5 Goals" },
  { href: "/free-football-predictions-both-team-to-score", label: "BTTS" },
  { href: "/free-football-predictions-draw-predictions-and-tips", label: "Draw" },
  {
    href: "/free-football-predictions-correct-score-and-tips",
    label: "Correct Score",
  },
  { href: "/free-football-predictions-handicap-predictions", label: "Handicap" },
  { href: "/free-football-predictions-mix-chance", label: "Double Chance" },
  { href: "/free-football-prediction-ht-ft-predictions", label: "HT/FT" },
];

const GUIDES = [
  { href: "/guides/what-is-win-draw-win", label: "What is win draw win?" },
  { href: "/guides/what-is-btts", label: "What is BTTS?" },
  { href: "/guides/over-2-5-meaning", label: "What does over 2.5 mean?" },
  { href: "/guides/how-to-read-odds", label: "How to read betting odds" },
];

export default function NotFound() {
  return (
    <section className="bg-[#F4F6FB] py-20">
      <div className="mx-auto max-w-3xl px-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#455DBF]">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-3 text-gray-700">
          The page you asked for doesn&apos;t exist, or it has moved. Today&apos;s
          predictions are still here:
        </p>

        <h2 className="mt-10 text-lg font-semibold text-gray-900">
          Prediction markets
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {MARKETS.map((market) => (
            <Link
              key={market.href}
              href={market.href}
              className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:border-[#455DBF] hover:text-[#455DBF]"
            >
              {market.label}
            </Link>
          ))}
        </div>

        <h2 className="mt-10 text-lg font-semibold text-gray-900">
          Betting guides
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700">
          {GUIDES.map((guide) => (
            <li key={guide.href}>
              <Link href={guide.href} className="text-[#455DBF] hover:underline">
                {guide.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-gray-700">
          Or head back to the{" "}
          <Link href="/" className="text-[#455DBF] hover:underline">
            home page
          </Link>{" "}
          or the{" "}
          <Link href="/blog" className="text-[#455DBF] hover:underline">
            latest football news
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
