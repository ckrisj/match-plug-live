"use client";

import { DateTime } from "luxon";
import Image from "next/image";
import { Loader } from "./Loader";
import { useGetData } from "@/app/Hooks/useGetData";
import { useEffect, useMemo, useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { usePathname } from "next/navigation";
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
  featured_image: string;
  comment_count: number;
  views: number;
  categories: string[];
  tags: string[];
};

export function BlogDetailPage() {
  const [blogId, setBlogId] = useState<string | null>(null);

  const path = usePathname();

  useEffect(() => {
    const id = localStorage.getItem("blogId");
    setBlogId(id);
  }, []);

  const { data, isFetching } = useGetData<Blog>({
    key: ["blog", blogId ?? ""],
    path: `post/${blogId}`,
    enabled: !!blogId,
  });

  function stripHTML(html: string) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }

  useMemo(() => {
    document.title = data?.title ? stripHTML(data.title) : "";
  }, [data?.title]);

  if (isFetching)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );

  if (!data) return null;

  const dateObj = DateTime.fromISO(data.date).setZone("local");

  return (
    <div className=" max-w-4xl mx-auto px-4 py-10">
      <h1
        className="text-3xl font-bold mb-6"
        dangerouslySetInnerHTML={{ __html: data.title }}
      ></h1>

      {data.featured_image && (
        <div className="mb-6">
          <img
            src={data.featured_image || "person.webp"}
            alt={data.title}
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
        <span>👤 {data.author?.name}</span>
        <span>📅 {dateObj.toFormat("MMMM d, yyyy")}</span>
        <span>⏰ {dateObj.toFormat("h:mm a")}</span>
        <span>💬 {data.comment_count} Comments</span>
      </div>

      <div className="prose max-w-none prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:underline prose-h3:text-xl prose-h3:font-semibold">
        <HaalandArticle content={data.content} />
      </div>
    </div>
  );
}
