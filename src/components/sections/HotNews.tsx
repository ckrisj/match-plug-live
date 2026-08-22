"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { v4 } from "uuid";
import { useGetData } from "@/app/Hooks/useGetData";
import { Loader } from "./Loader";
import { handleClick } from "../utils/helper";

export type NewsItem = {
  id: number;
  title: string;
  date: string; // ISO date string
  featured_image: string;
  link: string;
  categories: string[];
  slug: string;
};

export type NewsResponse = {
  data: NewsItem[];
};

export function HotNews() {
  const { data, isFetching } = useGetData<NewsResponse>({
    key: ["hot-news"],
    path: "hot-news",
  });

  if (isFetching) return <Loader />;

  return (
    <div className="text-white py-2">
      <div className="w-full max-w-6xl mx-auto flex items-center gap-4 px-4">
        <div className="flex-1 overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 2500 }}
            loop
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {data?.data?.map((post) => (
              <SwiperSlide key={v4()}>
                <Link
                  onClick={() => {
                    handleClick(post?.id);
                  }}
                  onMouseDown={() => {
                    handleClick(post?.id);
                  }}
                  href={`/blog/${post.slug}`}
                  className="hover:underline block truncate"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                ></Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
