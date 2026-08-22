import React from "react";

interface StatItem {
  number: string;
  description: string;
  highlight: string;
}

const StatColumn: React.FC<{ stat: StatItem }> = ({ stat }) => (
  <div className="flex-1 sm:px-8">
    <h3 className="text-2xl font-bold text-black mb-6">{stat.number}</h3>
    <p className="text-xl text-black mb-4">{stat.description}</p>
    <p className="text-lg font-semibold text-black">{stat.highlight}</p>
  </div>
);

const JoinWinningBettorsSection: React.FC = () => {
  // Dummy data - will be replaced with API calls
  const stats: StatItem[] = [
    {
      number:
        "30+ : Access free betting tips and Picks across 30+ sports markets.  ",
      description: "",
      highlight: "",
    },
    {
      number:
        "20+ : Unlock premium insights with 20+ exclusive paid sports betting market tips and Accurate Picks",
      description: "",
      highlight: "",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left Column - Title and Description */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-black mb-6">
                Connect with over 150,000 successful bettors on Matchplug
              </h2>
              <p className="text-xl text-black"></p>
            </div>

            {/* Right Columns - Stats with Divider */}
            <div className="lg:col-span-2 flex flex-col md:flex-row">
              {/* Stats Columns */}
              <div className="flex flex-col md:flex-row flex-1 gap-10 sm:gap-0">
                {stats.map((stat, index) => (
                  <React.Fragment key={index}>
                    <StatColumn stat={stat} />
                    {index === 0 && (
                      <div className="hidden md:block w-px h-full bg-black mx-4"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinWinningBettorsSection;
