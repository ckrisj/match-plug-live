"use client";

import React, { useState } from "react";
import { marketFaqs } from "@/components/utils/Collection/market-faqs";

const ChevronIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    className={`w-6 h-6 text-black transition-transform duration-200 ${
      isOpen ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const MarketFAQSection: React.FC<{ slug: string }> = ({ slug }) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const group = marketFaqs[slug];

  const toggleItem = (index: number) => {
    const next = new Set(openItems);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setOpenItems(next);
  };

  // Markets that aren't in the build sheet simply render nothing.
  if (!group) return null;

  // FAQPage structured data, generated from the same source as the rendered
  // accordion so the two can never drift apart.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: group.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      className="py-20 relative overflow-hidden transition-all"
      style={{
        backgroundImage: "url(/bg5.png)",
        backgroundColor: "#455DBD",
        backgroundBlendMode: "screen",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">{group.heading}</h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            {group.faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="border-b border-gray-300 last:border-b-0"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-6 flex justify-between items-center text-left hover:opacity-80 transition-opacity cursor-pointer"
                  aria-expanded={openItems.has(index)}
                >
                  <h3 className="text-xl font-bold text-[#03DD3C] pr-4">
                    {faq.question}
                  </h3>
                  <ChevronIcon isOpen={openItems.has(index)} />
                </button>

                {openItems.has(index) && (
                  <div className="pb-6">
                    <p className="text-xl text-black leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketFAQSection;
