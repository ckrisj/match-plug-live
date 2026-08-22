"use client";
import React from "react";

interface PricingFeature {
  icon?: React.ReactNode;
  text: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  pricePeriod: string;
  accuracy: string;
  features: PricingFeature[];
  backgroundColor: string;
  isBestValue?: boolean;
  guarantee: string;
  cancelText: string;
}

const FeatureIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-5 h-5 flex items-center justify-center">{children}</div>
);

const GlobeIcon = () => (
  <FeatureIcon>
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 23C5.159 23 0 17.841 0 11.5C0 5.159 5.159 0 11.5 0C17.841 0 23 5.159 23 11.5C23 17.841 17.841 23 11.5 23ZM11.5 1C5.71 1 1 5.71 1 11.5C1 17.29 5.71 22 11.5 22C17.29 22 22 17.29 22 11.5C22 5.71 17.29 1 11.5 1Z"
        fill="black"
      />
      <path
        d="M11.5 23C7.855 23 5 17.948 5 11.5C5 5.052 7.855 0 11.5 0C15.145 0 18 5.052 18 11.5C18 17.948 15.145 23 11.5 23ZM11.5 1C8.519 1 6 5.809 6 11.5C6 17.191 8.519 22 11.5 22C14.481 22 17 17.191 17 11.5C17 5.809 14.481 1 11.5 1Z"
        fill="black"
      />
      <path
        d="M22.5 12H0.5C0.224 12 0 11.776 0 11.5C0 11.224 0.224 11 0.5 11H22.5C22.776 11 23 11.224 23 11.5C23 11.776 22.776 12 22.5 12Z"
        fill="black"
      />
      <path
        d="M20.7213 6H2.2793C2.0033 6 1.7793 5.776 1.7793 5.5C1.7793 5.224 2.0033 5 2.2793 5H20.7203C20.9963 5 21.2203 5.224 21.2203 5.5C21.2203 5.776 20.9973 6 20.7213 6Z"
        fill="black"
      />
      <path
        d="M20.7213 18H2.2793C2.0033 18 1.7793 17.776 1.7793 17.5C1.7793 17.224 2.0033 17 2.2793 17H20.7203C20.9963 17 21.2203 17.224 21.2203 17.5C21.2203 17.776 20.9973 18 20.7213 18Z"
        fill="black"
      />
      <path
        d="M11.5 23C11.224 23 11 22.776 11 22.5V0.5C11 0.224 11.224 0 11.5 0C11.776 0 12 0.224 12 0.5V22.5C12 22.776 11.776 23 11.5 23Z"
        fill="black"
      />
    </svg>
  </FeatureIcon>
);

const MailIcon = () => (
  <FeatureIcon>
    <svg
      width="24"
      height="16"
      className="w-full h-full"
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.5 16H1.5C0.673 16 0 15.327 0 14.5V1.5C0 0.673 0.673 0 1.5 0H22.5C23.327 0 24 0.673 24 1.5V14.5C24 15.327 23.327 16 22.5 16ZM1.5 1C1.224 1 1 1.224 1 1.5V14.5C1 14.776 1.224 15 1.5 15H22.5C22.776 15 23 14.776 23 14.5V1.5C23 1.224 22.776 1 22.5 1H1.5Z"
        fill="black"
      />
      <path
        d="M11.9993 9.00202C11.4833 9.00202 10.9683 8.84202 10.5283 8.52202L0.46027 1.24202C0.23727 1.08002 0.18727 0.767018 0.34827 0.543018C0.50927 0.319018 0.82227 0.269018 1.04627 0.431018L11.1153 7.71202C11.6443 8.09702 12.3533 8.09602 12.8813 7.71302L22.9543 0.431018C23.1763 0.269018 23.4903 0.319018 23.6523 0.543018C23.8143 0.767018 23.7633 1.08002 23.5403 1.24102L13.4683 8.52202C13.0293 8.84202 12.5143 9.00202 11.9993 9.00202Z"
        fill="black"
      />
      <path
        d="M0.769674 15.6811C0.614674 15.6811 0.462674 15.6101 0.364674 15.4751C0.202674 15.2511 0.252674 14.9391 0.475674 14.7761L10.3687 7.59509C10.5937 7.43209 10.9047 7.48309 11.0677 7.70609C11.2297 7.93009 11.1797 8.24209 10.9567 8.40509L1.06367 15.5861C0.973674 15.6501 0.870674 15.6811 0.769674 15.6811Z"
        fill="black"
      />
      <path
        d="M23.229 15.6809C23.127 15.6809 23.024 15.6499 22.936 15.5859L13.044 8.40488C12.821 8.24188 12.771 7.92988 12.933 7.70588C13.095 7.48188 13.406 7.43188 13.632 7.59488L23.524 14.7759C23.747 14.9389 23.797 15.2509 23.635 15.4749C23.537 15.6099 23.384 15.6809 23.229 15.6809Z"
        fill="black"
      />
    </svg>
  </FeatureIcon>
);

const UserIcon = () => (
  <FeatureIcon>
    <svg
      width="24"
      className="w-full h-full"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_124_710)">
        <path
          d="M22.5 24.031C22.224 24.031 22 23.807 22 23.531C22 17.741 17.29 13.031 11.5 13.031C5.71 13.031 1 17.741 1 23.531C1 23.807 0.776 24.031 0.5 24.031C0.224 24.031 0 23.807 0 23.531C0 17.19 5.159 12.031 11.5 12.031C17.841 12.031 23 17.189 23 23.531C23 23.807 22.776 24.031 22.5 24.031Z"
          fill="black"
        />
        <path
          d="M11.5 10.969C8.468 10.969 6 8.50199 6 5.46899C6 2.43599 8.468 -0.0310059 11.5 -0.0310059C14.532 -0.0310059 17 2.43599 17 5.46899C17 8.50199 14.532 10.969 11.5 10.969ZM11.5 0.968994C9.019 0.968994 7 2.98799 7 5.46899C7 7.94999 9.019 9.96899 11.5 9.96899C13.981 9.96899 16 7.94999 16 5.46899C16 2.98799 13.981 0.968994 11.5 0.968994Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_124_710">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </FeatureIcon>
);

const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => (
  <div className="h-full relative ">
    {plan.isBestValue && (
      <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white border border-gray-200 shadow-lg rounded-full px-6 py-4">
          <span className="text-xl font-bold text-black">Best Value</span>
        </div>
      </div>
    )}

    <div
      className={`relative rounded-[51px] px-8 pb-8 pt-12 h-full flex flex-col border border-gray-300`}
      style={{ backgroundColor: plan.backgroundColor }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-3xl font-bold text-black mb-2">{plan.name}</h3>
        <p className="text-base text-black">{plan.guarantee}</p>{" "}
      </div>
      <div className="flex justify-center mb-4">
        <div className="w-20 h-px bg-black"></div>
      </div>
      {/* Features */}
      <div className="flex-1 space-y-2 items-center flex justify-center flex-col">
        {plan.features.map((feature, index) => (
          <div
            key={index}
            className="flex whitespace-break-spaces md:text-nowrap items-center gap-1"
          >
            {feature.icon && feature.icon}
            <span className=" text-black">{feature.text}</span>
          </div>
        ))}
      </div>

      {/* Accuracy Badge */}
      <div className="flex justify-center items-center mb-6 mt-6">
        <div className="w-full h-px bg-black"></div>
        <div className="border bg-green-400 flex shrink-0 border-black px-6 py-2">
          <span className="text-base text-black">{plan.accuracy}</span>
        </div>
        <div className="w-full h-px bg-black"></div>
      </div>

      {/* Price */}
      <div className="text-center mb-16">
        <span className="text-4xl font-bold text-black">{plan.price}</span>
        <span className="text-lg font-medium text-black"> {plan.pricePeriod}</span>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button className="bg-[#455DBD] rounded-full px-6 py-2 text-lg font-bold text-white hover:opacity-90 transition-opacity">
          Get Started
        </button>
        <p className="text-base font-medium text-black mt-3">{plan.cancelText}</p>
      </div>
    </div>
  </div>
);

const PricingPlans: React.FC = () => {
  const plans: PricingPlan[] = [
    {
      id: "vip",
      name: "VIP",
      price: "$29.9",
      pricePeriod: "/ Month",
      accuracy: "85% Verified Accuracy",
      backgroundColor: "#EDEBF1",
      guarantee: "Ideal for a minimum of 120% Monthly Returns",
      cancelText: "Join Free Group and make profit first · Cancel Anytime",
      features: [
        { icon: <UserIcon />, text: "VIP Telegram Group Access" },
        { icon: <GlobeIcon />, text: "Website Access to Sure Prematch Games" },
        { text: "1.8 to 15 Odds Daily" },
        { icon: <MailIcon />, text: "Daily Emails of Sure Games Daily" },
        { text: "5-8 Max Bets Weekly" },
        { text: "Confident Parlays" },
      ],
    },
    {
      id: "fixed",
      name: "ELITE GAMES (HIGH STAKERS)",
      price: "$99.9",
      pricePeriod: "/ Month",
      accuracy: "92.4% Verified Accuracy",
      backgroundColor: "#F9EFEF",
      isBestValue: true,
      guarantee: "Free Access to VIP Packages",
      cancelText: "Cancel Anytime",
      features: [
        { icon: <UserIcon />, text: "VIP Telegram Group Access" },
        { text: "20 High Stake Games Monthly" },
        { text: "Direct 1-on-1 Support & Bankroll Guidance" },
      ],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}

        <div className="text-center flex flex-col items-center justify-center mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-black mb-1 max-w-xl">
            Pricing & Plans
          </h2>
          <p className="text-black md:text-lg max-w-xl">
            Subscribe to any of our plans. We have suitable plans for your
            budget.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto mb-16 md:gap-8 gap-16">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
