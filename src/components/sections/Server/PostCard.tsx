import Image from "next/image";
import Link from "next/link";

import type { BlogListPost } from "@/app/Hooks/getBlogPosts";

/**
 * One article card. Shared so the server-rendered default view and the
 * client-fetched category views render identically.
 */

function formatDate(value: string) {
  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime())
    ? ""
    : parsed.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}

export default function PostCard({ post }: { post: BlogListPost }) {
  return (
    <article className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-2xl bg-white p-6 shadow-lg md:flex-row">
      <div className="w-full shrink-0 md:w-[300px]">
        <Image
          src={post.image || "/person.webp"}
          alt={post.title}
          width={300}
          height={300}
          className="h-auto w-full rounded-xl object-cover md:h-[300px]"
        />
      </div>

      <div className="flex w-full flex-col justify-between">
        <div>
          <h3 className="mt-3 text-xl font-semibold text-gray-700">
            <Link href={`/blog/${post.slug}`} className="hover:text-[#455DBF]">
              {post.title}
            </Link>
          </h3>

          {post.date && (
            <p className="mt-1 text-xs text-gray-500">{formatDate(post.date)}</p>
          )}

          <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-gray-400">
            {post.excerpt}
          </p>

          <Link
            href={`/blog/${post.slug}`}
            className="mt-2 inline-block text-sm font-medium text-blue-800 hover:text-blue-600"
          >
            {"View More >>"}
          </Link>
        </div>
      </div>
    </article>
  );
}
