"use client";

import { DateTime } from "luxon";
import { useEffect } from "react";
import HaalandArticle from "./HaalandArticle";

export type Blog = {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  author: {
    id: string;
    name: string;
  };
  jetpack_featured_media_url: string;
  comment_count: number;
  views: number;
  categories: string[];
  tags: string[];
};

export function BlogDetailPage({
  setCategories,
  structuredData,
}: {
  setCategories: (categories: string[]) => void;
  structuredData?: any;
}) {
  const data = structuredData;
  useEffect(() => {
    if (data?.categories?.length > 0) {
      setCategories(data?.categories || []);
    }
  }, [data?.categories]);

  if (!data) return null;
  const dateObj = DateTime.fromISO(data?.date).setZone("local");

  return (
    <div className=" max-w-4xl mx-auto px-4 py-10">
      <h1
        className="text-3xl font-bold mb-6"
        dangerouslySetInnerHTML={{ __html: data?.title }}
      ></h1>

      {data?.jetpack_featured_media_url && (
        <div className="mb-6">
          <img
            src={data.jetpack_featured_media_url || "person.webp"}
            alt={data?.title?.rendered}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "person.webp";
            }}
            width={900}
            height={500}
            className="rounded-lg object-cover w-full"
          />
        </div>
      )}

      <div className="flex items-center text-gray-500 text-sm mb-6 gap-6 flex-wrap">
        {data?.author && <span>👤 {data.author}</span>}
        <span>📅 {dateObj?.toFormat("MMMM d, yyyy")}</span>
        <span>⏰ {dateObj?.toFormat("h:mm a")}</span>
        {/* <span>💬 {data.comment_count} Comments</span> */}
      </div>

      <div className="prose max-w-none prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:underline prose-h3:text-xl prose-h3:font-semibold">
        <HaalandArticle content={data?.content} />
      </div>
    </div>
  );
}
