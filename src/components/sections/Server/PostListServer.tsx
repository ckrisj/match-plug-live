import Image from "next/image";
import Link from "next/link";

import { getBlogPosts } from "@/app/Hooks/getBlogPosts";

/**
 * Server-rendered article list. The blog index and the category archives used
 * to fetch their posts client-side, so the HTML a crawler received contained no
 * links to any post — all ~6,500 were reachable only through the sitemap. This
 * puts real anchors and a paginated trail into the markup.
 */

type PostListServerProps = {
  /** Restricts the list to one category; omit for the whole blog. */
  categoryId?: number;
  /** Base path used for the pagination links. */
  basePath: string;
  page: number;
  heading?: string;
  /** Overrides the page size — the homepage shows a short list. */
  perPage?: number;
  /** Hidden on the homepage, where the list is a teaser rather than an index. */
  showPagination?: boolean;
  /** Renders a link through to the full archive. */
  viewAllHref?: string;
  /**
   * "card" matches the image-and-excerpt cards the Latest News section already
   * uses, so the homepage reads as one design. "list" is the denser index used
   * on /blog and the category archives.
   */
  variant?: "card" | "list";
};

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

/**
 * A window around the current page rather than every page — 6,459 posts is 539
 * pages, and emitting all of them on every listing would bloat the HTML.
 */
function pageWindow(page: number, totalPages: number) {
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default async function PostListServer({
  categoryId,
  basePath,
  page,
  heading,
  perPage,
  showPagination = true,
  viewAllHref,
  variant = "list",
}: PostListServerProps) {
  const { posts, totalPages } = await getBlogPosts({ page, categoryId, perPage });

  if (!posts.length) {
    return null;
  }

  const href = (target: number) =>
    target === 1 ? basePath : `${basePath}?page=${target}`;

  const isCard = variant === "card";

  return (
    <section
      className={
        isCard
          ? "w-full py-12"
          : "mx-auto max-w-4xl px-4 py-10"
      }
      style={isCard ? { backgroundColor: "rgba(243, 244, 233, 0.59)" } : undefined}
    >
      <div className={isCard ? "mx-auto max-w-6xl px-5 md:px-10" : undefined}>
        <h2
          className={
            isCard
              ? "mb-8 text-center text-3xl font-bold text-black"
              : "text-2xl font-bold text-gray-900"
          }
        >
          {heading ?? "Latest articles"}
        </h2>

        {isCard ? (
          <div className="flex w-full flex-col gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-2xl bg-white p-6 shadow-lg md:flex-row"
              >
                <div className="w-full flex-shrink-0 md:w-[300px]">
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
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-[#455DBF]"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    {post.date && (
                      <p className="mt-1 text-xs text-gray-500">
                        {formatDate(post.date)}
                      </p>
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
            ))}
          </div>
        ) : (
          <ul className="mt-6 space-y-6">
            {posts.map((post) => (
              <li
                key={post.id}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-[#455DBF]"
                  >
                    {post.title}
                  </Link>
                </h3>
                {post.date && (
                  <p className="mt-1 text-xs text-gray-500">
                    {formatDate(post.date)}
                  </p>
                )}
                {post.excerpt && (
                  <p className="mt-2 line-clamp-3 text-sm text-gray-700">
                    {post.excerpt}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}

        {showPagination && totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            {page > 1 && (
              <Link
                href={href(page - 1)}
                rel="prev"
                className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:border-[#455DBF] hover:text-[#455DBF]"
              >
                Previous
              </Link>
            )}

            {pageWindow(page, totalPages).map((target) => (
              <Link
                key={target}
                href={href(target)}
                aria-current={target === page ? "page" : undefined}
                className={
                  target === page
                    ? "rounded border border-[#455DBF] bg-[#455DBF] px-3 py-1 text-sm text-white"
                    : "rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:border-[#455DBF] hover:text-[#455DBF]"
                }
              >
                {target}
              </Link>
            ))}

            {page < totalPages && (
              <Link
                href={href(page + 1)}
                rel="next"
                className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:border-[#455DBF] hover:text-[#455DBF]"
              >
                Next
              </Link>
            )}
          </nav>
        )}

        {viewAllHref && (
          <div className={isCard ? "mt-8 text-center" : "mt-6"}>
            <Link
              href={viewAllHref}
              className="inline-block text-sm font-semibold text-[#455DBF] hover:underline"
            >
              See all articles
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
