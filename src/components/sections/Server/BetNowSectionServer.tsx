"use client";

import Link from "next/link";
import { Affiliate } from "../BetNowSection";

const TimelineDot: React.FC = () => (
  <div className="w-5 h-5 bg-white rounded-full border border-white"></div>
);

const TimelineLine: React.FC = () => (
  <div className="w-px h-16 bg-white border-l-2 border-white"></div>
);

const BetCard = ({ card }: { card: Affiliate }) => (
  <div className="flex flex-col gap-8 max-w-2xl">
    {/* Left Card */}
    <div
      className=" rounded-[51px] border border-white h-fit "
      style={{ backgroundColor: "#00011F" }}
    >
      <div className="text-center flex items-center justify-center">
        <img
          src={card.logo || "dummylogo.webp"}
          alt={card.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "dummylogo.webp";
          }}
          className="object-contain  w-[150px] h-60"
        />
      </div>
    </div>

    {/* Right Content */}
    <h2 className=" text-center lg:text-xl font-bold text-white uppercase ">
      {card.name}
    </h2>

    <div className="flex-1 relative">
      {/* Timeline - Hidden on mobile */}
      <div className="hidden lg:flex absolute left-0 top-6 flex-col items-center gap-2">
        <TimelineDot />
        <TimelineLine />
        <TimelineDot />
        <TimelineLine />
        <TimelineDot />
      </div>

      {/* Content */}
      <div className="lg:ml-12 pt-6 space-y-6 text-center lg:text-left">
        <div>
          <h3 className="text-lg lg:text-xl font-bold text-white uppercase mb-4">
            {card.description}
          </h3>
          <p className="text-lg lg:text-xl text-white/80">
            CLAIM WITH PROMO CODE:{" "}
            <span className="font-bold text-white">{card.promo_code}</span>
          </p>
        </div>

        <p className="text-lg lg:text-xl text-white/80">ODDS : {card.odds}</p>

        <p className="text-lg lg:text-xl text-white/80">
          Todays Bet Slip Code:{" "}
          <span className="font-bold text-white">{card.code}</span>
        </p>

        <button className="bg-white rounded-full px-6 py-2 text-lg lg:text-xl font-bold text-black hover:opacity-90 transition-opacity">
          Bet Now
        </button>
      </div>
    </div>
  </div>
);

const TelegramIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="w-8 h-8 lg:w-12 lg:h-12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.0773 2.00105C13.3972 2.01117 14.702 2.28274 15.9164 2.80012C17.1309 3.31749 18.2311 4.07042 19.1535 5.01549C20.0759 5.96057 20.8023 7.07909 21.2907 8.30655C21.7792 9.53401 22.0201 10.8461 21.9995 12.1672C21.3218 25.3588 2.44397 25.2476 1.99953 12.0115C1.99051 10.6878 2.2456 9.37566 2.74984 8.15196C3.25408 6.92825 3.99732 5.81765 4.93597 4.88527C5.87462 3.95289 6.98978 3.2175 8.21608 2.72223C9.44237 2.22696 10.7551 1.98178 12.0773 2.00105ZM13.8945 10.3765C13.8945 10.3765 13.9106 10.3876 13.7884 10.5433C13.6662 10.699 13.4218 10.9437 13.2995 11.055L10.7551 13.5242C10.2106 14.0692 10.2218 14.4029 10.8551 14.8589C11.6662 15.4373 12.4884 15.9712 13.3218 16.5385C14.1551 17.1057 15.1773 17.9399 15.5995 16.7164C15.7071 16.3897 15.7888 16.055 15.844 15.7154C16.0218 14.7366 16.1995 13.7578 16.3551 12.7679C16.5662 11.3775 16.7662 9.98719 16.944 8.58572C17.0329 7.89611 16.6662 7.58467 15.9773 7.75151C15.693 7.81843 15.4143 7.90768 15.144 8.01846L7.88842 11.0772C7.19953 11.3664 6.51064 11.6778 5.83286 12.0115C5.6662 12.1005 5.45508 12.3452 5.4662 12.512C5.47731 12.6789 5.71064 12.868 5.89953 12.9458C6.3662 13.1349 6.8662 13.2684 7.35508 13.4241C7.72694 13.5516 8.12456 13.5847 8.51236 13.5207C8.90017 13.4566 9.26606 13.2973 9.57731 13.0571C10.4995 12.3897 11.444 11.7668 12.3884 11.144C12.8329 10.8436 13.144 10.6768 13.5773 10.3765C13.7995 10.2653 13.8501 10.2145 13.8945 10.2812V10.3765Z"
      fill="currentColor"
    />
  </svg>
);

export function BetNowSectionServer({ data }: { data: Affiliate[] }) {
  return (
    <section
      id="jackpot-bet-codes"
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(16, 16, 16, 0.63), rgba(16, 16, 16, 0.63)), url(/bg2.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container gap-10 mx-auto px-4 flex flex-col items-center justify-center">
        {/* Header */}

        <div className="text-center flex flex-col items-center justify-center mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-1 max-w-xl">
            Bet Now On Matchplug Jackpot Betcodes and be a Millionaire
          </h2>
          <p className="text-white/80 md:text-lg max-w-xl"></p>
        </div>

        {/* Cards */}
        <div className="space-y-12 lg:space-y-16 mb-4 flex lg:flex-row flex-col mx-auto gap-10">
          {data?.map((card) => (
            <div key={card.id} className="flex  justify-center">
              <BetCard card={card} />
            </div>
          ))}
        </div>

        {/* Telegram Button */}
        <div className="text-center">
          <Link href="https://t.me/MATCHPLUG">
            <button className="bg-white rounded-full pl-3 pr-8 py-3 lg:py-2 flex items-center gap-3 lg:gap-4 mx-auto hover:opacity-90 transition-opacity">
              <TelegramIcon />
              <span className="text-lg lg:text-xl text-black">
                Join telegram for more <strong>BETCODES</strong>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
