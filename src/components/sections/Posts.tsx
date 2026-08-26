"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetData } from "@/app/Hooks/UseGetDataArgs";
import Link from "next/link";
import { handleClick } from "../utils/helper";
import { Loader } from "./Loader";
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import HaalandArticleForCat from "./HaalandArticleForCat";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  link: string;
  featured_image: string;
  slug: string;
}

type BlogResponse = {
  data: Post[];
  meta: {
    total: number;
    pages: number;
  };
};

export function Posts({
  slug,
  categoryId,
  title,
}: {
  slug: string;
  categoryId?: number;
  title?: string;
  isSearched?: boolean;
  search?: string;
}) {
  const [query, setQuery] = useQueryState("s");
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState(query);

  const isSearched = typeof query === "string";

  const router = useRouter();

  const debouncedSearch = useDebounce(query, 500) ?? "";

  // const { data: posts, isFetching } = useGetData<BlogResponse>({
  //   key: ["category-posts", slug, currentPage],
  //   path: `posts/category/${slug}?page=${currentPage}&limit=10`,
  //   enabled: !isSearched,
  // });
  const { data: response, isFetching }: any = useGetData<BlogResponse>({
    key: ["category-posts", slug, currentPage],
    path: `posts?per_page=12&page=${currentPage}&categories=${categoryId}&orderby=date&order=desc`,
    enabled: !isSearched && !!categoryId,
  });
  const posts = response?.data || [];
  const totalPosts = response?.total || 0;
  const totalPages = response?.totalPages || 0;

  const getPaginationRange = (
    currentPage: number,
    totalPages: number,
    siblingCount: number = 1,
  ) => {
    const totalNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 2); // ⬅️ start from 2
    const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1); // ⬅️ stop at totalPages -1

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    const range: (number | string)[] = [];

    range.push(1); // first page always

    if (showLeftDots) range.push("...");

    for (let i = leftSibling; i <= rightSibling; i++) {
      range.push(i);
    }

    if (showRightDots) range.push("...");

    range.push(totalPages); // last page always

    return range;
  };

  const filteredPosts: any = posts;

  const renderPagination = () => {
    const pages = getPaginationRange(currentPage, totalPages);

    return (
      <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() => {
            setCurrentPage((p) => Math.max(p - 1, 1));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          disabled={currentPage === 1}
          className="px-3 cursor-pointer py-1 text-blue-600 disabled:text-gray-400"
        >
          « Previous
        </button>

        {pages.map((page, idx) =>
          page === "..." ? (
            <span key={idx} className="px-3 py-1">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => {
                setCurrentPage(page as number);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-3 cursor-pointer py-1 border rounded ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => {
            setCurrentPage((p) => Math.min(p + 1, totalPages));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          disabled={currentPage === totalPages}
          className="px-3 cursor-pointer py-1 text-blue-600 disabled:text-gray-400"
        >
          Next »
        </button>
      </div>
    );
  };

  return (
    <div>
      {title && (
        <div className="text-3xl font-bold mb-6 md:mb-12 flex justify-center">
          {title}
        </div>
      )}
      <div>
        {isFetching ? (
          <div className="flex items-center justify-center w-full h-screen">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {!!filteredPosts?.length ? (
              filteredPosts?.map((post: any) => (
                <Link
                  key={post.id}
                  onClick={() => {
                    handleClick(post?.id);
                  }}
                  onMouseDown={() => {
                    handleClick(post?.id);
                  }}
                  href={`/blog/${post.slug}`}
                  className="h-full"
                >
                  <div className="h-[500px] rounded-xl shadow-md overflow-hidden bg-white flex flex-col">
                    <img
                      src={post?.jetpack_featured_media_url || "/person.webp"}
                      alt={post?.title?.rendered}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/person.webp";
                      }}
                      width={600}
                      height={300}
                      className="h-52 w-full object-cover shrink-0"
                    />

                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(post.date).toDateString()}
                      </p>

                      <h3 className="font-bold text-lg mb-2 line-clamp-2">
                        {post?.title?.rendered}
                      </h3>

                      <p className="text-gray-700 text-sm line-clamp-3">
                        <HaalandArticleForCat
                          content={post?.excerpt?.rendered?.slice(0, 150)}
                        />
                      </p>

                      <p className="mt-auto pt-3 text-green-600 font-medium hover:underline">
                        Read More »
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="h-[500px] place-items-center grid col-span-full">
                <p className="text-center text-gray-500">No posts found.</p>
              </div>
            )}
          </div>
        )}

        {!isFetching &&
          totalPages > 2 &&
          !!filteredPosts.length &&
          renderPagination()}
      </div>
    </div>
  );
}
