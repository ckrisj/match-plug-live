// import AmericanSportsSection from "@/components/sections/AmericanSportsSection";
// import BetBuilderSection from "@/components/sections/BetBuilderSection";
// import BetNowSection from "@/components/sections/BetNowSection";
import DirectWinPredictions from "@/components/sections/DirectWinPredictions";
// import EmailSubscriptionSection from "@/components/sections/EmailSubscriptionSection";
import FAQSection from "@/components/sections/FAQSection";
import FootballPredictionTable from "@/components/sections/FootballPredictionTable";
import Hero from "@/components/sections/Hero";
import LiveInplaySection from "@/components/sections/LiveInplaySection";
// import JoinWinningBettorsSection from "@/components/sections/JoinWinningBettorsSection";
import LatestNewsSection from "@/components/sections/LatestNewsSection";
import PostListServer from "@/components/sections/Server/PostListServer";
import { Loader } from "@/components/sections/Loader";
// import { LogosSection } from "@/components/sections/LogosSection";
import MeetOurExperts from "@/components/sections/MeetOurExperts";
import PricingPlans from "@/components/sections/PricingPlans";
import RealWinsSection from "@/components/sections/RealWinsSection";
// import SureWinPredictionSection from "@/components/sections/SureWinPredictionSection";
// import TestimonialsSection from "@/components/sections/TestimonialsSection";
import VipPicksPromoSection from "@/components/sections/VipPicksPromoSection";
// import VipRecordsSection from "@/components/sections/VipRecordsSection";
import VipResultsSlider from "@/components/sections/VipResultsSlider";
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
      <Hero />
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
      <VipPicksPromoSection />
      <LiveInplaySection />
      <VipResultsSlider />
      <RealWinsSection />
      <PricingPlans />
      <MeetOurExperts />
      <LatestNewsSection />
      {/*
        The section above groups posts by category and fetches them in the
        browser, so its feed carries no publish date and none of its links
        reach a crawler. This adds the newest posts by date, server-rendered.
      */}
      <PostListServer
        basePath="/blog"
        page={1}
        perPage={6}
        showPagination={false}
        heading="Latest posts"
        viewAllHref="/blog"
      />
      <AboutUsPage />
      <FAQSection />
      {/* <AmericanSportsSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <WhyMatchplug /> */}
      {/* <LogosSection /> */}
      {/* <FootballPredictionTable title="AMERICAN SPORTS PREDICTION FOR TODAY" /> */}
      {/* <BetBuilderSection /> */}
      {/* <BetNowSection /> */}
      {/* <SureWinPredictionSection /> */}
      {/* <VipRecordsSection /> */}
      {/* <EmailSubscriptionSection /> */}
      {/* <JoinWinningBettorsSection /> */}
    </div>
  );
}
