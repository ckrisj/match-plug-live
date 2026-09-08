import Link from "next/link";
import { DateTime } from "luxon";
import FootballPredictionDetailsTable from "@/components/sections/FootballPredictionDetailsTable";
import MarketFAQSection from "@/components/sections/MarketFAQSection";
import { metadataForRoute } from "@/app/lib/title";

export const metadata = metadataForRoute("/vip");

type PageParams = {
  searchParams: Promise<{
    date: string;
  }>;
};

// `label` is the market key the predictions API is queried with; the rest is
// what the page shows.
const vip = {
  link: "vip",
  label: "VIP",
  displayLabel: "VIP Results",
  heading: "VIP Results",
  description:
    "Matchplug VIP is a paid tier delivered through Telegram. Members receive the day's highest-conviction selections earlier than they appear on the site, push alerts the moment a live in-play call is issued, and staking guidance for each selection. The markets are the same ones published free on the site — VIP is a filter and a delivery channel, not a different model, so the hit rate is higher because the selections clear a higher confidence threshold.\n\nEvery VIP selection is logged and the resulting record is published, including the losses. VIP does not remove risk: no prediction service can guarantee an outcome, and any that claims to is not being honest.",
};

const Page = async ({ searchParams }: PageParams) => {
  const { date } = await searchParams;

  return (
    <>
      <FootballPredictionDetailsTable
        currentDate={date ?? DateTime.now().toISODate()}
        slug={vip}
      />

      <section className="max-w-6xl mx-auto sm:px-4 px-2 py-12">
        <h2 className="text-[28px] font-bold mb-3">Pricing</h2>
        <p className="text-lg mb-6">
          VIP is <span className="font-semibold">$29.9 / month</span> and Elite
          Games (High Stakers) is{" "}
          <span className="font-semibold">$99.9 / month</span>, billed monthly.
          Cancel anytime.
        </p>

        <Link
          href="https://user.matchplug.com/auth/register"
          className="inline-flex items-center justify-center rounded-full bg-[#03DD3C] px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105 sm:text-base"
        >
          Get Started
        </Link>
      </section>

      <MarketFAQSection slug="vip" />
    </>
  );
};

export default Page;
