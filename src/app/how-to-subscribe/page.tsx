import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Link from "next/link";
import React from "react";
import { v4 } from "uuid";

const steps = [
  "Visit www.matchplug.com",
  "Click Sign Up and fill the form",
  "Login with your details",
  "Check your dashboard for the subscribe button",
  "Click the Subscribe Button",
  "Choose the most convenient Payment method and follow the instructions displayed",
  "You would see two sessions for tips: Daily Sure games and other markets",
  "Click each market to view tips and Daily sure games to view Tips",
  "Receive Email containing tips",
  "Follow Risk management strategy and Win - Repeat - Win",
];

const HowToSubscribe = () => {
  return (
    <section className="max-w-3xl mx-auto py-20 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-700 mb-10">
        How to Subscribe
      </h2>

      <p className="text-2xl  font-bold text-justify text-gray-900 dark:text-gray-700 mb-10">
        Follow the following steps to subscribe
      </p>

      <div className="space-y-2">
        {steps.map((step, index) => (
          <div
            key={v4()}
            className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-2xl hover:shadow-lg transition"
          >
            <div className="flex-shrink-0">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-semibold">
                {index + 1}
              </span>
            </div>
            <div className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
              {step}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button className="cursor-pointer px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-full shadow-md transition">
          <Link href="https://user.matchplug.com/auth/login/">
            Subscribe Now
          </Link>
        </button>
      </div>
    </section>
  );
};

export default HowToSubscribe;
