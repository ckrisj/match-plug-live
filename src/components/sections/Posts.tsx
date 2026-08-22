"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetData } from "@/app/Hooks/useGetData";
import Link from "next/link";
import { handleClick } from "../utils/helper";
import { Loader } from "./Loader";
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

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
}: {
  slug: string;
  isSearched?: boolean;
  search?: string;
}) {
  const [query, setQuery] = useQueryState("s");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [value, setValue] = useState(query);

  const isSearched = typeof query === "string";

  const router = useRouter();

  const debouncedSearch = useDebounce(query, 500) ?? "";

  const { data: posts, isFetching } = useGetData<BlogResponse>({
    key: ["category-posts", slug, currentPage],
    path: `posts/category/${slug}?page=${currentPage}&limit=10`,
    enabled: !isSearched,
  });

  const { data: searchedPosts, isFetching: isSearchFetching } =
    useGetData<BlogResponse>({
      key: ["posts-searched", currentPage, debouncedSearch],
      path: `posts?page=${currentPage}&limit=10&search=${debouncedSearch}`,
      enabled: isSearched || !!debouncedSearch,
    });

  useMemo(() => {
    if (posts) {
      setTotalPages(posts?.meta?.pages || 1);
    }
  }, [posts, isFetching]);

  useMemo(() => {
    if (isSearched || debouncedSearch || query) {
      setTotalPages(searchedPosts?.meta?.pages || 1);
    }
  }, [isSearchFetching, searchedPosts, isSearched, debouncedSearch, query]);

  const getPaginationRange = (
    currentPage: number,
    totalPages: number,
    siblingCount: number = 1
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

  const filteredPosts = isSearched ? searchedPosts : posts;

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
          )
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
    <div className="max-w-7xl  mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="space-y-6">
        <div className="flex">
          <input
            type="text"
            placeholder="Search..."
            className=" border rounded-l-md px-3 py-2 w-full outline-none"
            value={value ?? ""}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setQuery(e.currentTarget.value);
                router.push(`/blog?s=${e.currentTarget.value}`);
              }
            }}
          />
          <button
            onClick={() => {
              router.push(`/blog?s=${value}`);
            }}
            className="bg-orange-500 cursor-pointer text-white px-4 rounded-r-md"
          >
            🔍
          </button>
        </div>
      </div>

      <div className="lg:col-span-3">
        {isFetching || isSearchFetching ? (
          <div className="flex items-center justify-center w-full lg:col-span-3 h-screen">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!!filteredPosts?.data?.length ? (
              filteredPosts.data?.map((post) => (
                <Link
                  key={post.id}
                  onClick={() => {
                    handleClick(post?.id);
                  }}
                  onMouseDown={() => {
                    handleClick(post?.id);
                  }}
                  href={`/blog/${post.slug}`}
                >
                  <div className="rounded-xl shadow-md overflow-hidden bg-white flex flex-col">
                    <img
                      src={post.featured_image ?? "person.webp"}
                      alt={post.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/person.webp";
                      }}
                      width={600}
                      height={300}
                      className="h-52 w-full object-cover"
                    />

                    <div className="p-4 flex flex-col flex-grow">
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(post.date).toDateString()}
                      </p>

                      <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                      <p className="text-gray-700 text-sm flex-grow">
                        {post.excerpt.slice(0, 150)}...
                      </p>
                      <a
                        href={`/blog/${post.id}`}
                        className="mt-3 text-green-600 font-medium hover:underline"
                      >
                        Read More »
                      </a>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="h-[500px] place-items-center grid mx-auto col-span-2">
                <p className="col-span-2 text-center text-gray-500">
                  No posts found.
                </p>
              </div>
            )}
          </div>
        )}

        {!isFetching &&
          totalPages > 2 &&
          !!filteredPosts?.data.length &&
          renderPagination()}
      </div>
    </div>
  );
}
