// import AmericanSportsSection from "@/components/sections/AmericanSportsSection";
// import BetBuilderSection from "@/components/sections/BetBuilderSection";
// import BetNowSection from "@/components/sections/BetNowSection";
import DirectWinPredictions from "@/components/sections/DirectWinPredictions";
// import EmailSubscriptionSection from "@/components/sections/EmailSubscriptionSection";
import FAQSection from "@/components/sections/FAQSection";
import FootballPredictionTable from "@/components/sections/FootballPredictionTable";
import Hero from "@/components/sections/Hero";
// import JoinWinningBettorsSection from "@/components/sections/JoinWinningBettorsSection";
import LatestNews from "@/components/sections/LatestNews";
import { Loader } from "@/components/sections/Loader";
// import { LogosSection } from "@/components/sections/LogosSection";
import PricingPlans from "@/components/sections/PricingPlans";
import RealWinsSection from "@/components/sections/RealWinsSection";
// import SureWinPredictionSection from "@/components/sections/SureWinPredictionSection";
// import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ResultsSection from "@/components/sections/Server/ResultsSection";
// import WhyMatchplug from "@/components/sections/WhyMatchplug";
import { Suspense } from "react";
import AboutUsPage from "./about-us/page";
import { metadataForRoute } from "@/app/lib/title";

export const metadata = metadataForRoute("/");

/**
 * No searchParams are read here, so the homepage can be statically rendered
 * and revalidated rather than rebuilt for every request.
 */
export const revalidate = 300;

export default async function Page() {
  return (
    <div className="flex flex-col">
      {/* The hero and results blocks are deliberately outside Suspense:
          streamed content lands in a hidden div at the end of the HTML, and
          the record has to be readable in place by crawlers that do not run
          JS. */}
      <Hero />
      {/* Proof first: the verified record sits directly under the hero, its
          torn top edge in the hero's near-black. */}
      <ResultsSection topEdgeColor="#0A0A0A" />
      <RealWinsSection />
      <PricingPlans />
      {/* Objections answered straight after the price. */}
      <FAQSection />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[300] w-full">
            <Loader />
          </div>
        }
      >
        <FootballPredictionTable title="Smarter soccer predictions for Today" />
      </Suspense>
      <DirectWinPredictions />
      <LatestNews />
      <AboutUsPage />
      {/* <AmericanSportsSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <WhyMatchplug /> */}
      {/* <LogosSection /> */}
      {/* <FootballPredictionTable title="AMERICAN SPORTS PREDICTION FOR TODAY" /> */}
      {/* <BetBuilderSection /> */}
      {/* <BetNowSection /> */}
      {/* <SureWinPredictionSection /> */}
      {/* <EmailSubscriptionSection /> */}
      {/* <JoinWinningBettorsSection /> */}
    </div>
  );
}
