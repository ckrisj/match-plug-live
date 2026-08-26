"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Loader } from "./Loader";
import { useRouter } from "next/navigation";
import Categories from "./Categories";
import { v4 } from "uuid";
import { useGetData } from "@/app/Hooks/useGetData";
import { handleClick } from "../utils/helper";

export interface CategoryData {
  category: Category;
  posts: Post[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  featured_image: string;
  slug: string;
}
export interface ApiResponse {
  data: CategoryData[];
}

interface NewsArticle {
  id: number;
  title: string;
  date: string;
  author: string;
  authorImage: string;
  image?: string;
  featured?: boolean;
  description: string;
}

export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
}

interface BlogCardProps {
  image: string;
  date: string;
  category: string;
  title: string;
  description: string;
  authorImage: string;
  authorName: string;
  authorRole: string;
}

export function BlogCard({ title, id, content, featured_image, slug }: Post) {
  const [expanded, setExpanded] = useState(false);

  const router = useRouter();
  const handleViewMore = () => {
    handleClick(id);
    router.push(`/blog/${slug}`);
  };

  return (
    <div className="max-w-6xl w-full bg-white rounded-2xl p-6 flex flex-col md:flex-row gap-6 mx-auto shadow-lg">
      <div className="w-full md:w-[300px] flex-shrink-0">
        <Image
          src={featured_image || "/person.webp"}
          alt={title}
          width={300}
          height={300}
          className="rounded-xl object-cover w-full h-auto md:h-[300px]"
        />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div>
          <h2
            className="text-xl font-semibold text-gray-700 mt-3"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h2>

          <p
            className={`text-gray-400 mt-2 text-sm leading-relaxed ${
              expanded ? "" : "line-clamp-5"
            }`}
            dangerouslySetInnerHTML={{ __html: content }}
          ></p>

          {content.length > 250 && (
            <button
              onClick={handleViewMore}
              className="mt-2 text-blue-800 cursor-pointer text-sm font-medium hover:text-blue-600"
            >
              {"View More >>"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const AuthorInfo: React.FC<{ author: string; authorImage: string }> = ({
  author,
  authorImage,
}) => (
  <div className="flex items-center gap-3">
    <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-300">
      <Image
        src={authorImage}
        alt={author}
        width={44}
        height={44}
        className="object-cover"
      />
    </div>
    <span className="text-base text-black">{author}</span>
  </div>
);

const FeaturedNewsCard: React.FC<{ article: Post }> = ({ article }) => (
  <BlogCard {...article} />
);

export const CategoryTab: React.FC<{
  category: NewsCategory;
  isActive: boolean;
  onClick: () => void;
}> = ({ category, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 flex-[0_1_auto] cursor-pointer text-nowrap py-2  text-lg rounded-full transition-all ${
      isActive
        ? "bg-[#455DBD] text-white font-semibold"
        : "bg-white text-black border border-gray-300 hover:bg-gray-50"
    }`}
  >
    {category.name}
  </button>
);

const LatestNewsSection: React.FC = () => {
  const { data, isFetching } = useGetData<ApiResponse>({
    key: ["football-news"],
    path: "football-news",
    initialData: { data: [] },
  });

  const defaultCategory = useMemo(() => {
    return data?.data?.find(
      ({ category }) => category.name === "Premier League",
    );
  }, [data]);

  const filtredCategories = useMemo(() => {
    return data?.data?.length
      ? data?.data?.map(({ category }) => category)
      : [];
  }, [data?.data]);

  const [activeCategory, setActiveCategory] = useState<number>(0);

  useMemo(() => {
    if (filtredCategories.length) {
      setActiveCategory(defaultCategory?.category.id ?? 0);
    }
  }, [filtredCategories]);

  const filteredPosts = useMemo(() => {
    return data?.data?.find(({ category }) => category.id === activeCategory);
  }, [data?.data, activeCategory]);
  console.log("filteredPosts", filteredPosts);

  return (
    <section
      id="news"
      className="py-20"
      style={{ backgroundColor: "rgba(243, 244, 233, 0.59)" }}
    >
      <div className=" mx-auto flex items-center justify-center">
        <div className="  flex items-center justify-center md:justify-start md:items-start flex-col  w-full p-5 md:p-10">
          <div className="mb-12 w-full">
            <h2 className="text-3xl text-center font-bold text-black mb-8">
              Latest News and Previews
            </h2>

            <div
              hidden={!isFetching}
              className="flex justify-center items-center mb-4"
            >
              <Loader />
            </div>

            <div hidden={isFetching}>
              <Categories
                activeCategory={activeCategory}
                filteredCategories={filtredCategories}
                setActiveCategory={setActiveCategory}
              />
            </div>
          </div>

          <div hidden={isFetching} className="w-full flex flex-col  gap-8">
            {filteredPosts?.posts?.map((article) => (
              <FeaturedNewsCard key={v4()} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
