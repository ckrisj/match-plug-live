"use client";

import { useState } from "react";
import Link from "next/link";

import {
  API_URL,
} from "@/components/utils/constant";
import {
  mapWpPost,
  POST_FIELDS,
  type BlogCategory,
  type BlogListPost,
} from "@/app/Hooks/getBlogPosts";
import PostCard from "./Server/PostCard";
import { Loader } from "./Loader";

/**
 * Latest News and Previews.
 *
 * The default view is every category ordered by date, rendered on the server so
 * the newest articles are in the HTML a crawler receives. Selecting a category
 * fetches that category — also newest first — from the public WordPress REST
 * endpoint, which needs no key.
 */

const LATEST = "latest";
const PER_PAGE = 6;

type LatestNewsTabsProps = {
  categories: BlogCategory[];
  /** Newest posts across all categories, resolved on the server. */
  initialPosts: BlogListPost[];
};

export default function LatestNewsTabs({
  categories,
  initialPosts,
}: LatestNewsTabsProps) {
  const [active, setActive] = useState<string | number>(LATEST);
  const [posts, setPosts] = useState<BlogListPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);

  const select = async (key: string | number) => {
    if (key === active) return;

    setActive(key);

    if (key === LATEST) {
      setPosts(initialPosts);
      return;
    }

    setLoading(true);

    try {
      const url = new URL(`${API_URL}/wp-json/wp/v2/posts`);
      url.searchParams.set("per_page", String(PER_PAGE));
      url.searchParams.set("categories", String(key));
      url.searchParams.set("_fields", POST_FIELDS);

      const response = await fetch(url);
      const body = response.ok ? await response.json() : [];

      setPosts(Array.isArray(body) ? body.map(mapWpPost) : []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const tabClass = (key: string | number) =>
    `px-4 flex-[0_1_auto] cursor-pointer text-nowrap py-2 text-lg rounded-full transition-all ${
      active === key
        ? "bg-[#455DBD] text-white font-semibold"
        : "bg-white text-black border border-gray-300 hover:bg-gray-50"
    }`;

  return (
    <section
      id="news"
      className="py-20"
      style={{ backgroundColor: "rgba(243, 244, 233, 0.59)" }}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <h2 className="mb-8 text-center text-3xl font-bold text-black">
          Latest News and Previews
        </h2>

        <div className="mb-12 flex w-full flex-wrap justify-center gap-2">
          <button onClick={() => select(LATEST)} className={tabClass(LATEST)}>
            Latest
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => select(category.id)}
              className={tabClass(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader />
          </div>
        ) : posts.length ? (
          <div className="flex w-full flex-col gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-gray-600">
            No articles published in this category yet.
          </p>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-block text-sm font-semibold text-[#455DBF] hover:underline"
          >
            See all articles
          </Link>
        </div>
      </div>
    </section>
  );
}
