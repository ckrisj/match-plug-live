"use client";
import React from "react";

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  borderColor: string;
}

const FeatureIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-7 h-7 sm:mt-6 flex items-center justify-center ">
    {children}
  </div>
);

const FileIcon = () => (
  <FeatureIcon>
    <svg
      width="30"
      height="40"
      className="w-full h-full"
      viewBox="0 0 30 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.5 40H2.5C1.12167 40 0 38.8783 0 37.5V2.5C0 1.12167 1.12167 0 2.5 0H19.1667C19.6267 0 20 0.373333 20 0.833333V9.16667C20 9.625 20.3733 10 20.8333 10H29.1667C29.6267 10 30 10.3733 30 10.8333V37.5C30 38.8783 28.8783 40 27.5 40ZM2.5 1.66667C2.04 1.66667 1.66667 2.04167 1.66667 2.5V37.5C1.66667 37.9583 2.04 38.3333 2.5 38.3333H27.5C27.96 38.3333 28.3333 37.9583 28.3333 37.5V11.6667H20.8333C19.455 11.6667 18.3333 10.545 18.3333 9.16667V1.66667H2.5Z"
        fill="black"
      />
      <path
        d="M29.1658 11.6674C28.9524 11.6674 28.7391 11.5857 28.5758 11.424L18.5758 1.42404C18.2508 1.09904 18.2508 0.570703 18.5758 0.245703C18.9008 -0.0792969 19.4291 -0.0792969 19.7541 0.245703L29.7541 10.2457C30.0791 10.5707 30.0791 11.099 29.7541 11.424C29.5924 11.5857 29.3791 11.6674 29.1658 11.6674Z"
        fill="black"
      />
      <path
        d="M22.5013 16.6667H7.5013C7.0413 16.6667 6.66797 16.2933 6.66797 15.8333C6.66797 15.3733 7.0413 15 7.5013 15H22.5013C22.9613 15 23.3346 15.3733 23.3346 15.8333C23.3346 16.2933 22.9613 16.6667 22.5013 16.6667Z"
        fill="black"
      />
      <path
        d="M22.5013 23.3327H7.5013C7.0413 23.3327 6.66797 22.9593 6.66797 22.4993C6.66797 22.0393 7.0413 21.666 7.5013 21.666H22.5013C22.9613 21.666 23.3346 22.0393 23.3346 22.4993C23.3346 22.9593 22.9613 23.3327 22.5013 23.3327Z"
        fill="black"
      />
      <path
        d="M22.5013 30.0007H7.5013C7.0413 30.0007 6.66797 29.6273 6.66797 29.1673C6.66797 28.7073 7.0413 28.334 7.5013 28.334H22.5013C22.9613 28.334 23.3346 28.7073 23.3346 29.1673C23.3346 29.6273 22.9613 30.0007 22.5013 30.0007Z"
        fill="black"
      />
    </svg>
  </FeatureIcon>
);

const GlobeIcon = () => (
  <FeatureIcon>
    <svg
      width="32"
      height="32"
      className="h-full w-full"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="15" stroke="#33363F" strokeWidth="2" />
      <ellipse
        cx="16"
        cy="16"
        rx="5.625"
        ry="15"
        stroke="#33363F"
        strokeWidth="2"
      />
      <path
        d="M1 16H31"
        stroke="#33363F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </FeatureIcon>
);

const HeadsetIcon = () => (
  <FeatureIcon>
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 0C6.729 0 0 6.729 0 15V21.2145C0 22.7505 1.3455 24 3 24H4.5C4.89782 24 5.27936 23.842 5.56066 23.5607C5.84196 23.2794 6 22.8978 6 22.5V14.7855C6 14.3877 5.84196 14.0061 5.56066 13.7248C5.27936 13.4435 4.89782 13.2855 4.5 13.2855H3.138C3.972 7.4805 8.967 3 15 3C21.033 3 26.028 7.4805 26.862 13.2855H25.5C25.1022 13.2855 24.7206 13.4435 24.4393 13.7248C24.158 14.0061 24 14.3877 24 14.7855V24C24 25.6545 22.6545 27 21 27H18V25.5H12V30H21C24.309 30 27 27.309 27 24C28.6545 24 30 22.7505 30 21.2145V15C30 6.729 23.271 0 15 0Z"
        fill="black"
      />
    </svg>
  </FeatureIcon>
);

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => (
  <div
    className="border rounded-[51px] px-8 h-44 gap-5 flex flex-col items-center sm:items-start justify-center text-center hover:shadow-lg transition-shadow"
    style={{ borderColor: feature.borderColor }}
  >
    {feature.icon}
    <h3 className="text-xl text-black">{feature.title}</h3>
  </div>
);

const WhyMatchplug: React.FC = () => {
  const features: Feature[] = [
    {
      id: 1,
      icon: <FileIcon />,
      title: "Ai Powered Prediction + Human experts Analysis ",
      borderColor: "#455DBD",
    },
    {
      id: 2,
      icon: <GlobeIcon />,
      title: "Global Coverage",
      borderColor: "#C7CC95",
    },
    {
      id: 3,
      icon: <HeadsetIcon />,
      title: "24/7 Support",
      borderColor: "#8D7BB0",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-6">Why Matchplug?</h2>
          <p className="text-lg text-black max-w-2xl mx-auto"></p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMatchplug;
