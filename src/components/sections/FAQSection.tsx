"use client";
import Link from "next/link";
import React, { useState } from "react";

/**
 * An answer is either plain text, or a sequence of text and inline links so a
 * reference like /accuracy/ can be clickable without resorting to raw HTML.
 */
type AnswerSegment = string | { href: string; label: string };

interface FAQItem {
  id: number;
  question: string;
  answer: string | AnswerSegment[];
  category: string;
}

const answerToText = (answer: string | AnswerSegment[]): string =>
  typeof answer === "string"
    ? answer
    : answer.map((seg) => (typeof seg === "string" ? seg : seg.label)).join("");

interface Category {
  id: string;
  label: string;
}

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

const FAQAccordionItem: React.FC<{
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ faq, isOpen, onToggle }) => (
  <div className="border-b border-gray-300 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full py-6 flex justify-between items-center text-left hover:opacity-80 transition-opacity"
      aria-expanded={isOpen}
    >
      <h3 className="text-xl font-bold text-[#03DD3C] pr-4">{faq.question}</h3>
      <ChevronIcon isOpen={isOpen} />
    </button>

    {isOpen && (
      <div className="pb-6">
        <p className="text-xl text-black leading-relaxed">
          {typeof faq.answer === "string"
            ? faq.answer
            : faq.answer.map((segment, index) =>
                typeof segment === "string" ? (
                  <React.Fragment key={index}>{segment}</React.Fragment>
                ) : (
                  <Link
                    key={index}
                    href={segment.href}
                    className="text-[#1f7d33] underline underline-offset-2 hover:no-underline"
                  >
                    {segment.label}
                  </Link>
                )
              )}
        </p>
      </div>
    )}
  </div>
);

const CategoryTab: React.FC<{
  category: Category;
  isActive: boolean;
  onClick: () => void;
}> = ({ category, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2.5 text-lg rounded-full border transition-all ${
      isActive
        ? "border-white bg-white text-black"
        : "border-white text-white hover:bg-white/10"
    }`}
  >
    {category.label}
  </button>
);

const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("predictions");
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const categories: Category[] = [
    { id: "predictions", label: "Predictions" },
    { id: "tips", label: "Tips" },
    { id: "betting", label: "Betting Tips" },
    { id: "general", label: "General" },
  ];

  const faqData: FAQItem[] = [
    // Predictions
    {
      id: 22,
      question: "What is win draw win in betting?",
      answer:
        "Win draw win, also written 1X2, is a bet on the full-time result of a match: home win (1), draw (X) or away win (2). Extra time and penalties are not included. Only the score after 90 minutes plus stoppage time settles the bet. It is the most-bet market in soccer and carries the most efficient prices, which means value is harder to find but liquidity is high.",
      category: "predictions",
    },
    {
      id: 1,
      question: "What are football predictions?",
      answer:
        "A football prediction is a forecast of a match outcome — the result, the number of goals, or whether both teams score — produced from statistical analysis of form, historical results and expected goals. A prediction is not a guarantee. It states which outcome the data favours and by how much, so a reader can judge whether the bookmaker’s price is worth taking.",
      category: "predictions",
    },
    {
      id: 5,
      question: "What is a football prediction site?",
      answer:
        "A football prediction site is a platform that publishes forecasts for upcoming matches, covering markets such as match result, correct score, over/under goals and both teams to score. The forecasts are produced from statistics, expert analysis, or both. The ones worth reading publish the method behind each forecast and a record of how those forecasts performed, so a reader can judge the site instead of taking its word.",
      category: "predictions",
    },
    {
      id: 2,
      question: "How accurate are football predictions?",
      answer: [
        "Accuracy depends on the market: win draw win predictions from statistical models typically land between 50% and 60%, while over/under goals markets run higher. Matchplug publishes its verified hit rate by market at ",
        { href: "/accuracy/", label: "/accuracy/" },
        ". Any site claiming materially more than that over a large sample is not measuring honestly. Accuracy also falls in the opening rounds of a season, before enough form data has accumulated, and in cup competitions where squad rotation is heavy.",
      ],
      category: "predictions",
    },
    {
      id: 3,
      question: "Where can I find free soccer tips today?",
      answer:
        "Matchplug publishes free tips for every fixture it covers at matchplug.com — no account or payment required. Tips are released each morning and updated as team news lands. Win draw win, over and under 2.5 goals, both teams to score and correct score are all free to read; the paid VIP tier on Telegram adds higher-stake selections and earlier release times.",
      category: "predictions",
    },
    {
      id: 6,
      question: "Are football prediction sites legit?",
      answer:
        "Legitimacy comes down to whether a site publishes a verifiable record. Sites advertising “sure wins”, “100% accuracy” or fixed matches are not credible; sites that log every prediction and publish the hit rate — including losses — can be checked. Ask two questions before trusting any tipster: is the method described, and is the losing record published? A site showing only its wins is showing you a selection, not a record.",
      category: "predictions",
    },
    {
      id: 4,
      question: "What is the best site for football predictions?",
      answer:
        "There is no single best site — the right one is whichever publishes a record you can verify. Three things separate a credible site from the rest: a hit rate published by market and including losses, a stated method for how predictions are produced, and a clear line between free and paid content. Treat any site advertising guaranteed wins, 100% accuracy or fixed matches as disqualified, because no model can promise a result.",
      category: "predictions",
    },
    {
      id: 7,
      question: "Is Matchplug a legit prediction site?",
      answer: [
        "Yes. Matchplug publishes its full prediction log and verified accuracy record at ",
        { href: "/accuracy/", label: "/accuracy/" },
        ", updated daily, including losing predictions. It has operated since 2017. Predictions are produced by a statistical model reviewed by human analysts, and every published prediction is logged so the record can be audited.",
      ],
      category: "predictions",
    },
    {
      id: 8,
      question: "How do prediction sites make their picks?",
      answer: [
        "Most combine a statistical model with human review — the model produces a probability for each outcome from form, expected goals and historical results, and analysts override it where they hold information the model does not. At Matchplug an analyst reviews every fixture where the model disagrees sharply with the bookmaker price, and where the model is overridden the published prediction says so. Full method: ",
        { href: "/methodology/", label: "/methodology/" },
        ".",
      ],
      category: "predictions",
    },
    {
      id: 23,
      question: "Does Matchplug offer live in-play tips?",
      answer:
        "Yes. Tips update during matches, recalculating within 60 seconds of a goal, red card or significant shift in expected goals, across 40+ leagues. In-play calls are posted to the Telegram channel as they are made, so the timestamp on each one can be checked against when the match state actually changed.",
      category: "predictions",
    },
    {
      id: 24,
      question: "How does Matchplug compare to Pickwise?",
      answer: [
        "Pickwise is a US-facing picks site led by NFL, NBA and MLB coverage, with soccer as a secondary market. Matchplug is soccer-first across 40+ leagues, updates predictions live during matches, and publishes a verified accuracy record including losses. Full comparison: ",
        { href: "/matchplug-vs-pickwise/", label: "/matchplug-vs-pickwise/" },
        ".",
      ],
      category: "predictions",
    },
    // Tips
    {
      id: 9,
      question: "What are football tips?",
      answer:
        "A football tip is a specific betting suggestion for an upcoming match — a predicted result, correct score, or goals market — together with the reasoning behind it. A tip differs from a prediction by naming an action: a prediction says which outcome the data favours, a tip says which bet to place on it and at what price.",
      category: "tips",
    },
    {
      id: 10,
      question: "Are football tips free?",
      answer:
        "Yes. Matchplug publishes free tips for every fixture it covers, with no account or payment required. Win draw win, over and under 2.5 goals, both teams to score and correct score are all free to read on the site. The paid VIP tier on Telegram adds higher-stake selections, earlier release times and staking guidance.",
      category: "tips",
    },
    {
      id: 11,
      question: "How do I choose good football tips?",
      answer:
        "Judge a tip by whether the reasoning is shown, not by how confident the claim sounds. A tip worth acting on states the form, head-to-head record and expected-goals data it was built from, so you can examine the argument and disagree with it. Prefer sources that publish losing tips alongside winning ones — a record showing only wins is a selection, not a record.",
      category: "tips",
    },
    {
      id: 12,
      question: "What time are football tips updated?",
      answer:
        "Tips are published each morning, before that day’s fixtures, and updated as team news lands — including late lineup changes and injury news. Live in-play tips recalculate during matches, within 60 seconds of a goal, red card or significant shift in expected goals.",
      category: "tips",
    },
    // Betting Tips
    {
      id: 13,
      question: "What are football betting tips?",
      answer:
        "A football betting tip is a recommendation on which bet to place on a match — the market, the selection, and often the stake — based on statistical and situational analysis of both teams. The market matters as much as the selection: the same match can be a poor win draw win bet and a strong over 2.5 goals bet at the same time, because the prices differ.",
      category: "betting",
    },
    {
      id: 14,
      question: "Are football betting tips reliable?",
      answer:
        "Reliability depends entirely on whether the source publishes a record you can check. No tip can guarantee a result, because match outcomes carry genuine uncertainty. What separates a reliable source from an unreliable one is a published hit rate that includes losses, and a stated method for how selections are produced. Judge any tipster over a large sample rather than on a single match.",
      category: "betting",
    },
    {
      id: 15,
      question: "What is the difference between a prediction and a betting tip?",
      answer:
        "A prediction forecasts an outcome; a betting tip names the bet to place on it. “Arsenal are likely to win” is a prediction. “Arsenal to win at 1.95” is a tip, because it specifies the market and the price at which the bet is worth taking. Tips usually add a stake or confidence level, which predictions do not.",
      category: "betting",
    },
    {
      id: 16,
      question: "Do football betting tips guarantee wins?",
      answer:
        "No. No legitimate betting tip can guarantee a win, because match outcomes are genuinely uncertain. Win draw win predictions from statistical models typically land between 50% and 60% across a full season, and anyone claiming materially more than that over a large sample is not measuring honestly. The value of a tip service is consistent analysis over time, not certainty on any single match.",
      category: "betting",
    },
    {
      id: 17,
      question: "How much does a VIP football betting tips subscription cost?",
      answer:
        "Matchplug VIP costs $29.9 per month and the Elite Games tier costs $99.9 per month. VIP includes Telegram group access, website access to prematch games, 1.8 to 15 odds daily, daily emails and 5-8 max bets weekly. Elite Games includes everything in VIP plus 20 high-stake games monthly and direct 1-on-1 support with bankroll guidance. Both can be cancelled at any time.",
      category: "betting",
    },
    // General
    {
      id: 18,
      question: "What is Matchplug?",
      answer:
        "Matchplug is a soccer prediction service publishing free win draw win, over/under goals, both teams to score and correct score tips across more than 40 leagues. It has operated since 2017. Predictions are produced by a statistical model reviewed by human analysts, and every published prediction is logged so the accuracy record can be audited. NBA, NFL, MLB and NHL picks are also published as secondary markets.",
      category: "general",
    },
    {
      id: 19,
      question: "How do I register for Matchplug?",
      answer:
        "Registration takes under a minute: choose Subscribe Now or Get Free Tips, then enter your email and phone number. No payment is required to read the free daily predictions — a card is only needed if you choose a paid VIP or Elite Games plan.",
      category: "general",
    },
    {
      id: 20,
      question: "Can I trust the information provided by Matchplug?",
      answer:
        "Check the record rather than the claim — Matchplug publishes its full prediction log, including losing predictions, so the accuracy can be audited independently. Every prediction shows the form, head-to-head record and expected-goals data it was built from. All betting carries risk regardless of the source: predictions are analysis, not advice, and the financial risk of any bet is the reader’s alone.",
      category: "general",
    },
    {
      id: 21,
      question: "What if I have questions or need assistance?",
      answer:
        "Contact Matchplug support on WhatsApp at +1 307-218-5698, by email at hello@matchplug.com, or on Telegram at @matchplugvip. Support covers subscription, payment and prediction-related questions.",
      category: "general",
    },
  ];

  const filteredFAQs = faqData.filter((faq) => faq.category === activeCategory);

  // FAQPage structured data, generated from the same source as the rendered
  // accordion so the two can never drift apart.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answerToText(faq.answer),
      },
    })),
  };

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
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
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto"></p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <CategoryTab
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>

        {/* FAQ Container */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <div className=" ">
              {filteredFAQs.length > 0 ? (
                <div>
                  {filteredFAQs.map((faq) => (
                    <FAQAccordionItem
                      key={faq.id}
                      faq={faq}
                      isOpen={openItems.has(faq.id)}
                      onToggle={() => toggleItem(faq.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-500">
                    No FAQs available for this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
