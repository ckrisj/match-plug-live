"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Team {
  name: string;
  logo: string;
}

interface BetOption {
  label: string;
  description: string;
}

interface BetCard {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  stake: number;
  toReturn: number;
  options: BetOption[];
  odds: string;
}

const CategoryTab: React.FC<{
  category: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ category, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2  rounded-full border border-gray-300 transition-all ${
      isActive
        ? "bg-[#455DBD] text-white border-[#455DBD]"
        : "bg-white text-black hover:bg-gray-50"
    }`}
  >
    {category}
  </button>
);

const BetOptionItem: React.FC<{
  option: BetOption;
  isLast: boolean;
}> = ({ option, isLast }) => (
  <div className="flex items-start gap-4 mb-0 last:mb-0">
    <div className="flex pt-2 flex-col items-center ">
      <div className="w-3 h-3 rounded-full border-2 border-black bg-white"></div>
      {!isLast && <div className="w-px h-8 bg-black mt-2"></div>}
    </div>
    <div className="flex-1 ">
      <h4 className=" font-bold text-black capitalize">{option.label}</h4>
      <p className=" text-black capitalize">{option.description}</p>
    </div>
  </div>
);

const BetBuilderCard: React.FC<{ card: BetCard }> = ({ card }) => (
  <div className="flex gap-5 flex-col sm:flex-row">
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="bg-white w-full rounded-[51px] border border-gray-400 shadow-lg p-8 max-w-md">
        {/* Team Logos */}
        <div className="flex items-center justify-center gap-3 mb-8 relative">
          <div className="w-24 h-24 relative">
            <img
              src={card.homeTeam.logo}
              alt={card.homeTeam.name}
              className="object-cover w-24 h-24"
            />
          </div>

          <div className="w-10 h-10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 border-2 border-black bg-white flex items-center justify-center">
            <span className="text-lg font-bold text-black">VS</span>
          </div>

          <div className="w-24 h-24 relative mt-10">
            <img
              src={card.awayTeam.logo}
              alt={card.awayTeam.name}
              className="object-cover w-24 h-24"
            />
          </div>
        </div>

        <div className="w-full h-px bg-gray-400 mb-6"></div>
        <div className="flex justify-between">
          <div>
            <p className="text-lg text-black">Stake</p>
            <p className="text-xl font-bold text-black">
              N {card.stake.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-lg text-black">To Return</p>
            <p className="text-xl font-bold text-black">
              N {card.toReturn.toLocaleString()}
            </p>
          </div>
        </div>
      </div>{" "}
      <div className="">
        <button className="w-full bg-[#03DD3C] text-white font-bold py-2 rounded-full mb-1 hover:opacity-90 transition-opacity">
          Cash out
        </button>
        {/* Subscribe Link */}
        <Link
          href="#"
          className="block  text-black underline text-center capitalize hover:opacity-80 transition-opacity"
        >
          Subscribe To Get More Bet Builders
        </Link>
      </div>
    </div>
    <div className="flex flex-col">
      {/* Bet Options */}
      <div className="mb-2">
        {card.options.map((option, index) => (
          <BetOptionItem
            key={index}
            option={option}
            isLast={index === card.options.length - 1}
          />
        ))}
      </div>

      {/* <div className="hidden lg:block h-px w-full bg-black mt-16"></div> */}

      {/* Options Column */}
      <div className=" flex flex-col justify-center pt-10">
        <button className="bg-[#455DBD] text-white px-8 py-2 rounded-full  font-bold mb-8 hover:opacity-90 transition-opacity">
          ODDS : {card.odds}
        </button>
      </div>

      {/* Cash Out Button */}
    </div>
  </div>
);

const BetBuilderSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Football");

  const categories = ["Football", "NFL", "NHL", "NBA", "FIFA", "MLB"];

  // Dummy data - will be replaced with API calls
  const betCards: BetCard[] = [
    {
      id: 1,
      homeTeam: {
        name: "Manchester United",
        logo: "https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png",
      },
      awayTeam: {
        name: "Chelsea",
        logo: "https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png",
      },
      stake: 5000,
      toReturn: 15000,
      odds: "3.0",
      options: [
        { label: "Over 2.5 Goals", description: "Total Goal Kick 2-Way" },
        { label: "Over 1.5 Goals", description: "Total Goal Kick 2-Way" },
        { label: "Under 2.5 Goal", description: "Total Goal Kick 2-Way" },
        { label: "Under 2.5 Goal", description: "Total Goal Kick 2-Way" },
        { label: "Straight Win", description: "Total Goal Kick 2-Way" },
      ],
    },
    {
      id: 2,
      homeTeam: {
        name: "Atlanta Falcons",
        logo: "https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png",
      },
      awayTeam: {
        name: "Philadelphia Eagles",
        logo: "https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png",
      },
      stake: 5000,
      toReturn: 15000,
      odds: "3.0",
      options: [
        { label: "Over 2.5 Goals", description: "Total Goal Kick 2-Way" },
        { label: "Over 1.5 Goals", description: "Total Goal Kick 2-Way" },
        { label: "Under 2.5 Goal", description: "Total Goal Kick 2-Way" },
        { label: "Under 2.5 Goal", description: "Total Goal Kick 2-Way" },
        { label: "Straight Win", description: "Total Goal Kick 2-Way" },
      ],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="w-fit mx-auto px-4">
        {/* Header */}
        <h2 className="text-3xl font-bold text-black mb-6">Bet Builder</h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <CategoryTab
              key={category}
              category={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>

        {/* Bet Cards */}
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-28 md:justify-start justify-center">
          {/* First Card with Options */}
          <div className="flex gap-10 lg:justify-start justify-center">
            <BetBuilderCard card={betCards[0]} />

            {/* Vertical Divider Line */}
          </div>

          {/* Second Card with Options */}
          <div className="flex gap-10 lg:justify-start justify-center">
            <BetBuilderCard card={betCards[1]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetBuilderSection;
