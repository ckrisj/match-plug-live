"use client";

import React, { useState } from "react";
import { LatestUpdates } from "./KeyUpdates";
import { BlogDetailPage } from "./BlogDetailPage";
import { LatestStories } from "./Stories";

export const Tabs = ({ structuredData }: { structuredData: any }) => {
  const [activeTab, setActiveTab] = useState<
    "post" | "keyUpdates" | "topStories"
  >("post");
  const [categories, setCategories] = useState<string[]>([]);

  const tabs = [
    { id: "post", label: "Post" },
    { id: "keyUpdates", label: "Key Updates" },
    { id: "topStories", label: "Top Stories" },
  ];

  const tabRenderer = {
    post: (
      <BlogDetailPage
        setCategories={setCategories}
        structuredData={structuredData}
      />
    ),
    keyUpdates: <LatestUpdates categories={categories} />,
    topStories: <LatestStories categories={categories} />,
  };

  return (
    <div className="w-full">
      <div className="relative right-0">
        <ul
          className="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100"
          role="list"
        >
          {tabs.map((tab) => (
            <li key={tab.id} className="z-30 flex-auto text-center">
              <button
                onClick={() =>
                  setActiveTab(tab.id as "post" | "keyUpdates" | "topStories")
                }
                className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer 
                  ${
                    activeTab === tab.id
                      ? "bg-white text-slate-900 shadow"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-4 rounded-md border">{tabRenderer[activeTab]}</div>
    </div>
  );
};
