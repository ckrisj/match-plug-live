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
}: PostListServerProps) {
  const { posts, totalPages } = await getBlogPosts({ page, categoryId, perPage });

  if (!posts.length) {
    return null;
  }

  const href = (target: number) =>
    target === 1 ? basePath : `${basePath}?page=${target}`;

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-900">
        {heading ?? "Latest articles"}
      </h2>

      <ul className="mt-6 space-y-6">
        {posts.map((post) => (
          <li
            key={post.id}
            className="border-b border-gray-200 pb-6 last:border-b-0"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              <Link href={`/blog/${post.slug}`} className="hover:text-[#455DBF]">
                {post.title}
              </Link>
            </h3>
            {post.date && (
              <p className="mt-1 text-xs text-gray-500">
                {formatDate(post.date)}
              </p>
            )}
            {post.excerpt && (
              <p className="mt-2 text-sm text-gray-700">{post.excerpt}</p>
            )}
          </li>
        ))}
      </ul>

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
        <Link
          href={viewAllHref}
          className="mt-6 inline-block text-sm font-semibold text-[#455DBF] hover:underline"
        >
          See all articles
        </Link>
      )}
    </section>
  );
}
