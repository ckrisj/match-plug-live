import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

interface Expert {
  id: number;
  name: string;
  specialty: string;
  description: string;
  backgroundImage: string;
  achievements: string;
}

const StarRating: React.FC = () => (
  <div className="flex justify-center gap-0.5 mb-1">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="w-4 h-4">
        <svg
          width="25"
          height="23"
          viewBox="0 0 25 23"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 0L15.3064 8.63729H24.3882L17.0409 13.9754L19.8473 22.6127L12.5 17.2746L5.15268 22.6127L7.95911 13.9754L0.611794 8.63729H9.69357L12.5 0Z"
            fill="white"
          />
        </svg>
      </div>
    ))}
  </div>
);

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
      {/* Background image */}
      <div
        className="w-40 h-40 rounded-[2rem] border overflow-hidden bg-cover bg-center relative"
        style={{ backgroundImage: `url(${expert.backgroundImage})` }}
      >
        {/* Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70  px-2 py-3">
          <StarRating />
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
      name: "NFL Specialist with 10+ Years Experience",
      specialty: "NFL",
      description: "",
      backgroundImage: "/t1.png",
      achievements: "Predicted 500+ Wins Last Season",
    },
    {
      id: 2,
      name: "Soccer Predictor with 90% Win Rate",
      specialty: "Soccer",
      description: "",
      backgroundImage: "/t2.png",
      achievements: "Predicted 750+ Wins Last Season",
    },
    {
      id: 3,
      name: "NBA/NCAA Specialist with 10+Years Experience",
      specialty: "Basketball",
      description: "",
      backgroundImage: "/t3.png",
      achievements: "Predicted 1200+ Wins Last Season",
    },
    {
      id: 4,
      name: "NHL Specialist with 10+ Years Experience",
      specialty: "Hockey",
      description: "",
      backgroundImage: "/t4.png",
      achievements: "Predicted 800+ Wins Last Season",
    },
    {
      id: 5,
      name: "MLB Specialist with 10+ Years Experience",
      specialty: "Baseball",
      description: "",
      backgroundImage: "/t5.png",
      achievements: "Predicted 1000+ Wins Last Season",
    },
  ];

  return (
    <section className="py-20 bg-[#F4F6FB]">
      <div className="container w-full flex flex-col items-center justify-center px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-black mb-8">
            Meet Our Experts Analysts
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
