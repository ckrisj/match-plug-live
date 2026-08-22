"use client";

import { useGetData } from "@/app/Hooks/useGetData";
import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import importantPostsData from "@/components/utils/Collection/important-post-links-response.json";
import { handleClick } from "../utils/helper";

const posts = [
  "Arsenal defender nears a return to Italy",
  "Borussia Dortmund vs Bayer Leverkusen Match Preview",
  "Crystal Palace vs Arsenal Match Preview",
  "Eintracht Frankfurt vs Bayern Munich Match Preview",
  "Fulham vs Liverpool Match Preview",
  "Batting School and Batting Tips",
  "Contact Us",
  "Latest Transfer News",
  "UEFA Champions League Highlights",
  "World Cup 2026 Qualifiers",
];

export interface MenuItem {
  id: number;
  title: string;
  url: string;
  parent: string; // if you prefer number, change to: parent: number;
  object: string; // allow known values + fallback
  slug: string;
}

// Type for the whole response
export interface MenuResponse {
  success: boolean;
  menu: string;
  items: MenuItem[];
}

const ImportantPosts: React.FC = () => {
  const { data } = useGetData<MenuResponse>({
    key: ["important-posts"],
    path: "menu/ajiSideBarMenu",
    initialData: importantPostsData,
  });

  return (
    <section className="max-w-3xl">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800   inline-block pb-1 mb-6">
        Important Posts
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-3">
        {data?.items?.map((post) => (
          <Link
            onClick={() => {
              handleClick(post?.id);
            }}
            onMouseDown={() => {
              handleClick(post?.id);
            }}
            href={`/blog/${post.slug}`}
            key={uuidv4()}
          >
            <div className="p-4 border-l-2 border-b-blue-950 h-[40px] text-start flex items-center  bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-xl transition cursor-pointer text-sm font-medium shadow-sm hover:shadow-md">
              {post.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ImportantPosts;
