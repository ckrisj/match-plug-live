import React from "react";
import Link from "next/link";
import Button from "../ui/Button";

interface Expert {
  id: number;
  name: string;
  specialty: string;
  description: string;
  achievements: string;
}

const ExpertCard: React.FC<{
  expert: Expert;
  className?: string;
  isOdd?: boolean;
}> = ({ expert, className = "", isOdd = false }) => (
  <div
    className={`relative flex flex-col max-w-48 justify-center items-center  gap-4 ${className} ${
      isOdd ? "sm:pt-10" : "sm:pb-10"
    }`}
  >
    {/* Black divider line at top */}
    <div className={`flex justify-center ${!isOdd && "hidden"} `}>
      <div className="w-30 h-[5px] bg-black"></div>
    </div>
    {/* Card */}
    <div className="relative ">
      {/* Sport tile. This was a stock portrait presented as a named analyst. */}
      <div className="w-40 h-40 rounded-[2rem] border overflow-hidden relative bg-gradient-to-br from-[#455DBF] to-[#070B12]">
        <div className="absolute inset-0 flex items-center justify-center px-3 pb-14">
          <span className="text-white text-lg font-bold text-center">
            {expert.specialty}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-3">
          <p className="text-white text-xs text-center">
            {expert.achievements}
          </p>
        </div>
      </div>
    </div>{" "}
    <div className={`flex justify-center ${isOdd && "hidden"} `}>
      <div className="w-30 h-[5px] bg-black"></div>
    </div>
    {/* Content below image */}
    <div className=" text-center text-sm">
      <h3 className=" font-bold text-black ">{expert.name}</h3>
      <p className=" text-black/70 font-medium">{expert.description}</p>
    </div>
  </div>
);

const MeetOurExperts: React.FC = () => {
  const experts: Expert[] = [
    {
      id: 1,
      name: "NFL picks",
      specialty: "NFL",
      description: "",
      achievements: "Spreads, totals and player props, published before kickoff",
    },
    {
      id: 2,
      name: "Soccer predictions",
      specialty: "Soccer",
      description: "",
      achievements: "Match result, goals and BTTS across 40+ leagues",
    },
    {
      id: 3,
      name: "Basketball picks",
      specialty: "Basketball",
      description: "",
      achievements: "Spreads and totals, published after line-ups are confirmed",
    },
    {
      id: 4,
      name: "NHL picks",
      specialty: "Hockey",
      description: "",
      achievements: "Puck line, moneyline and totals, updated for goalie news",
    },
    {
      id: 5,
      name: "MLB picks",
      specialty: "Baseball",
      description: "",
      achievements: "Run line, moneyline and totals, updated for starting pitchers",
    },
  ];

  return (
    <section className="py-20 bg-[#F4F6FB]">
      <div className="container w-full flex flex-col items-center justify-center px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-black mb-8">
            What We Cover
          </h2>
        </div>

        {/* Experts Grid */}
        <div className="relative  mx-auto">
          {/* Desktop Layout - Custom positioning to match design */}
          {/* <div className="hidden lg:block relative h-[426px]"> */}
          {/* Top row - 3 experts */}
          {/* <div className="absolute top-0 left-0">
              <ExpertCard expert={experts[0]} />
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <ExpertCard expert={experts[2]} />
            </div>
            <div className="absolute top-0 right-0">
              <ExpertCard expert={experts[4]} />
            </div> */}

          {/* Bottom row - 2 experts (offset) */}
          {/* <div className="absolute top-16 left-[306px]">
              <ExpertCard expert={experts[1]} />
            </div>
            <div className="absolute top-16 right-[306px]">
              <ExpertCard expert={experts[3]} />
            </div> */}
          {/* </div> */}

          {/* Mobile/Tablet Layout - Simple grid */}
          <div className=" flex flex-wrap sm:gap-8 gap-12 justify-center items-center">
            {experts.map((expert, index) => (
              <ExpertCard
                key={expert.id}
                expert={expert}
                isOdd={index % 2 !== 0}
              />
            ))}
          </div>
        </div>

        {/* Subscription Button */}
        <div className="flex justify-center mt-8">
          <Link
            href="https://user.matchplug.com/auth/login/"
            className="cursor-pointer"
          >
            <Button>Subscribe to Get Personalized Tips from Our Experts</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MeetOurExperts;
