/* eslint-disable @next/next/no-img-element */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { v3, v4 } from "uuid";
import { DateTime } from "luxon";

import { useState } from "react";
import { HotNews } from "./HotNews";
import ImportantPosts from "./ImportantPosts";
// import { useGetData } from "@/app/Hooks/useGetData";
import { useGetData } from "@/app/Hooks/UseGetDataArgs";
import { Loader } from "./Loader";
import Link from "next/link";
import { handleClick } from "../utils/helper";
export interface Author {
  id: string; // in your data it’s string, not number
  name: string;
  avatar: string;
  link: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  link: string;
  date: string; // can be string | Date if you plan to parse it
  thumbnail: string;
  author: Author;
  slug: string;
}

export interface BlogResponse {
  data: BlogPost[];
  featured: BlogPost;
  pages: number;
  page: 1;
  per_page: number;
  total: number;
  totalPages: number;
}

export interface Author {
  id: string;
  name: string;
  image: string;
  link: string;
}

export interface AmericanPosts {
  id: number;
  title: string;
  link: string;
  date: string;
  image: string;
  author: Author;
  slug: string;
}

export interface Magazine {
  id: number;
  title: string;
  link: string;
  slug: string;
  date: string; // ISO date string
  author: Author;
  featured_image: string;
  categories: string[];
}

export interface Author {
  id: string; // comes as string ("4")
  name: string;
}

export interface Meta {
  total: number;
  pages: number;
  current_page: number;
}

export interface ApiResponseMagazinGrid {
  success: boolean;
  data: Magazine[];
  meta: Meta;
}
export const formatDate = (date: string) => {
  // return moment(date).format("MMMM D, YYYY");
  const dateObj = DateTime.fromISO(date).setZone("local");
  return dateObj.toFormat("MMMM d, yyyy");
};
export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: trendingResponse,
    isLoading,
    isError,
  }: any = useGetData<any[]>({
    key: ["posts", currentPage, 8],
    path: "posts",
    params: {
      per_page: 8,
      page: currentPage,
      orderby: "date",
      order: "desc",
    },
  });
  const trendingNews = trendingResponse?.data || [];
  // const totalPosts = trendingResponse?.totalPages || 0;
  // const totalPages = trendingResponse?.total || 0;
  const totalPages = trendingResponse?.totalPages || 0;

  const { data: americanResponse, isFetching: isAmericanPostsFetching }: any =
    useGetData<any[]>({
      key: ["american-posts", 1, 4, "220,228,176,204,227"],
      path: "posts",
      params: {
        per_page: 4,
        page: 1,
        categories: "220,228,176,204,227",
        orderby: "date",
        order: "desc",
      },
    });
  const americanPosts = americanResponse?.data || [];
  const { data: magazineResponse, isFetching: isMagezinGridFeatchin }: any =
    useGetData<any[]>({
      key: ["megezin-grid", 1, 6],
      path: "posts",
      params: {
        per_page: 6,
        page: 1,
        orderby: "date",
        order: "desc",
      },
    });
  const megezinGrid = magazineResponse?.data || [];
  const { data: recentResponse, isFetching: isRecentPostsFetching }: any =
    useGetData<any[]>({
      key: ["recent-posts", 1, 8],
      path: "posts",
      params: {
        per_page: 8,
        page: 1,
        orderby: "date",
        order: "desc",
      },
    });
  const recentPosts = recentResponse?.data || [];
  // const totalPages = 100; // Replace with actual total pages from your API response

  return (
    <div className="p-4 max-w-7xl mt-10 mx-auto  space-y-10">
      <div className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg overflow-hidden">
        <span className="text-nowrap font-semibold">Hot News</span>
        <HotNews />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {
          <div
            className="flex items-center justify-center h-[762px] lg:col-span-2"
            hidden={!isLoading}
          >
            <Loader />
          </div>
        }

        {trendingNews?.length > 0 && (
          <div hidden={isLoading} className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Trending News</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
              {trendingNews?.map((news: any) => (
                <Link
                  key={news?.id}
                  href={`/blog/${news.slug}`}
                  onClick={() => handleClick(news?.id)}
                  onMouseDown={() => handleClick(news?.id)}
                  className="h-full"
                >
                  <div className="h-full rounded-xl shadow-lg overflow-hidden bg-white flex flex-col">
                    {/* Image */}
                    <img
                      src={news?.jetpack_featured_media_url || "person.webp"}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "person.webp";
                      }}
                      alt={news.title?.rendered || "News Image"}
                      className="h-40 w-full object-cover flex-shrink-0"
                    />

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-sm text-gray-500">
                        {formatDate(news.date)}
                      </p>

                      <h3
                        dangerouslySetInnerHTML={{
                          __html: news.title?.rendered || "",
                        }}
                        className="font-semibold mt-2 line-clamp-4"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="cursor-pointer px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>

                {/* Page numbers (max 4 visible) */}
                {(() => {
                  const maxVisible = 4;
                  let start: number, end: number;

                  if (totalPages <= maxVisible) {
                    // Show all pages if total is less than maxVisible
                    start = 1;
                    end = totalPages;
                  } else if (currentPage <= 2) {
                    // Near the start
                    start = 1;
                    end = maxVisible;
                  } else if (currentPage >= totalPages - 1) {
                    // Near the end
                    start = totalPages - maxVisible + 1;
                    end = totalPages;
                  } else {
                    // Middle range
                    start = currentPage - 1;
                    end = currentPage + 2;
                  }

                  return Array.from({ length: end - start + 1 }, (_, i) => {
                    const page = start + i;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`cursor-pointer px-3 py-1 rounded-md border ${
                          currentPage === page
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  });
                })()}

                {/* Next button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="cursor-pointer px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700">
            <span className="font-bold text-blue-600">Matchplug</span> is a
            reliable free sports prediction site dedicated to providing accurate
            Football, NFL, NBA, NHL, and MLB predictions.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              target="_blank"
              href="https://www.facebook.com/people/Matchplug-Sports/100083070081996/?ref=page_internal#"
            >
              <img src="facebook.svg" alt="facebook" className="w-6 h-6" />
            </a>
            <a target="_blank" href="https://t.me/MATCHPLUG">
              <img src="telegram.svg" alt="telegram.svg" className="w-6 h-6" />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/accounts/login/?next=%2Fmatchplug%2F"
            >
              <img
                src="instagram.svg"
                alt="instagram.svg"
                className="w-6 h-6"
              />
            </a>
            <a
              target="_blank"
              href="https://x.com/matchplugsports/status/1510252826907357189?s=21&t=77pQtxBn5ra7T4IF0tMivQ"
            >
              <img src="twitter.svg" alt="twitter.svg" className="w-6 h-6" />
            </a>
            <a
              target="_blank"
              href="https://www.youtube.com/channel/UC_Ihs6IxXkUeMzW56mOwplw/featured"
            >
              <img src="youtube.svg" alt="youtube.svg" className="w-6 h-6" />
            </a>
            <a
              target="_blank"
              href="http://linkedin.com/company/matchplug/?viewAsMember=true"
            >
              <img src="linkedin.svg" alt="linkedin.svg" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-10 gap-8">
        <div className="lg:col-span-12">
          <h2 className="text-2xl font-bold mb-4">Important Posts</h2>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500 }}
            slidesPerView={2}
            spaceBetween={16}
            loop
            breakpoints={{
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {megezinGrid?.map((news: any) => (
              <SwiperSlide key={v4()}>
                <Link
                  onClick={() => {
                    handleClick(news?.id);
                  }}
                  onMouseDown={() => {
                    handleClick(news?.id);
                  }}
                  key={news?.id}
                  href={`/blog/${news?.slug}`}
                >
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={news.jetpack_featured_media_url || "person.webp"}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "person.webp";
                      }}
                      alt={news?.title?.rendered}
                      className="h-80 w-full object-cover"
                    />

                    <div
                      dangerouslySetInnerHTML={{
                        __html: news?.title?.rendered,
                      }}
                      className="absolute bottom-0 bg-black bg-opacity-60 w-full p-3 text-white text-sm"
                    ></div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {americanPosts?.length > 0 && (
        <div>
          <header className="my-12">
            <h1 className="text-4xl font-bold text-center">American Sports</h1>
          </header>
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 3000 }}
            navigation
            loop
            className="rounded-2xl overflow-hidden shadow shadow-neutral-40"
          >
            {americanPosts?.map((news: any) => (
              <SwiperSlide key={v4()}>
                <Link
                  onClick={() => {
                    handleClick(news?.id);
                  }}
                  onMouseDown={() => {
                    handleClick(news?.id);
                  }}
                  href={`/blog/${news?.slug}`}
                >
                  <div
                    className="h-[500px] bg-cover bg-center flex flex-col justify-end"
                    style={{
                      backgroundImage: `url(${news.jetpack_featured_media_url || "person.webp"})`,
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: news.title.rendered }}
                      className="bg-blue-700 w-full p-4 text-white text-xl font-bold"
                    ></div>

                    <div className="bg-blue-50  w-full p-4  ">
                      <p className="text-gray-700 text-sm mb-2"></p>
                      <div className="flex justify-between items-center">
                        <a
                          // href={news.link}
                          href={`/blog/${news?.slug}`}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          Read More
                        </a>
                        <span className="flex items-center text-gray-500 text-xs">
                          <i className="far fa-clock mr-1"></i>
                          {formatDate(news.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {recentPosts?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* {data?.featured && (
            <Link
              onClick={() => {
                handleClick(data?.featured?.id);
              }}
              onMouseDown={() => {
                handleClick(data?.featured?.id);
              }}
              href={`/blog/${data?.featured?.slug}`}
            >
              <div className="col-span-1">
                <div className="rounded-xl shadow-md overflow-hidden bg-white h-full">
                  <img
                    src={data?.featured?.thumbnail || "person.webp"}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "person.webp";
                    }}
                    alt="{featuredPost.title}"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                      <span>👤 {data?.featured?.author?.name}</span>
                      <span>📅 {data?.featured?.date}</span>
                    </div>

                    <h3
                      className="text-lg font-semibold"
                      dangerouslySetInnerHTML={{
                        __html: data?.featured?.title ?? "",
                      }}
                    ></h3>
                  </div>
                </div>
              </div>
            </Link>
          )} */}

            <div
              className={`col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6`}
            >
              {recentPosts?.map((news: any) => (
                <Link
                  key={v4()}
                  onClick={() => handleClick(news?.id)}
                  onMouseDown={() => handleClick(news?.id)}
                  href={`/blog/${news?.slug}`}
                  className="h-[120px]"
                >
                  <div className="h-full rounded-xl shadow-md flex overflow-hidden bg-white items-stretch">
                    <img
                      src={news?.jetpack_featured_media_url || "person.webp"}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "person.webp";
                      }}
                      alt={news?.title?.rendered}
                      className="w-[120px] h-full object-cover flex-shrink-0"
                    />

                    <div className="p-3 flex flex-col justify-center overflow-hidden">
                      <p className="text-sm text-gray-500">
                        📅 {formatDate(news.date)}
                      </p>

                      <h3 className="font-semibold line-clamp-2">
                        {news?.title?.rendered}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
