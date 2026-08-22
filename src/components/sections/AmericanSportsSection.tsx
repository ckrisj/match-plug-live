import React from "react";
import Button from "../ui/Button";

const AmericanSportsSection: React.FC = () => {
  const sportsCategories = ["NBA PICKS", "NFL PICKS", "NHL PICKS", "MLB PICKS"];

  return (
    <section
      className="sm:py-20 py-28 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/sport-mobile.png)",
        backgroundSize: "cover",
        backgroundPosition: "left",
        // objectPosition: "right",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center space-y-5">
          {/* Main Heading */}
          <h2 className="text-2xl font-bold text-white">
            Unlock sure picks and Parlays wins with expert predictions -{" "}
            <span className="text-green-500">Lets Go!!</span>
          </h2>

          {/* Sports Categories */}
          <div className="text- text-white">{sportsCategories.join(" | ")}</div>

          {/* Accuracy Badge */}
          <div className="flex justify-center">
            <Button>80% Accuracy</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmericanSportsSection;
