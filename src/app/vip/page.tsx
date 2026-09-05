import Link from "next/link";
import MarketFAQSection from "@/components/sections/MarketFAQSection";

export default function VipResults() {
  return (
    <>
      <section className="max-w-5xl mx-auto px-6 py-20 leading-relaxed text-gray-800">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          VIP Results — Verified Records
        </h1>
        <p className="text-lg mb-10">
          Every VIP selection is logged and the resulting record is published,
          including the losses.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          What Matchplug VIP Includes
        </h2>
        <p className="text-lg mb-4">
          Matchplug VIP is a paid tier delivered through Telegram. Members
          receive the day&apos;s highest-conviction selections earlier than they
          appear on the site, push alerts the moment a live in-play call is
          issued, and staking guidance for each selection. The markets are the
          same ones published free on the site — VIP is a filter and a delivery
          channel, not a different model, so the hit rate is higher because the
          selections clear a higher confidence threshold.
        </p>
        <p className="text-lg mb-4">
          Both the free and VIP records are published on this page. VIP does not
          remove risk: no prediction service can guarantee an outcome, and any
          that claims to is not being honest. Pricing, billing period and
          cancellation terms are below.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">
          Pricing
        </h2>
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
}
