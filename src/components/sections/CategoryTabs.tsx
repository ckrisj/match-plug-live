"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NewsCategory } from "./LatestNewsSection";
import { v4 } from "uuid";

const CategoryTabs: React.FC<{
  categories: NewsCategory[];
  activeCategory: number | string;
  setActiveCategory: React.Dispatch<React.SetStateAction<number | string>>;
}> = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="max-w-6xl w-full mx-auto">
      {/* Mobile: Swiper */}
      <div className="block md:hidden">
        <Swiper spaceBetween={10} slidesPerView="auto" className="w-full">
          {categories.map((category) => (
            <SwiperSlide key={v4()} className="w-auto">
              <CategoryTab
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: Flex Row */}
      <div className="hidden md:flex items-center gap-4">
        {categories.map((category) => (
          <CategoryTab
            key={v4()}
            category={category}
            isActive={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

const CategoryTab: React.FC<{
  category: NewsCategory;
  isActive: boolean;
  onClick: () => void;
}> = ({ category, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 cursor-pointer text-nowrap py-2 text-lg rounded-full transition-all ${
      isActive
        ? "bg-[#455DBD] text-white font-semibold"
        : "bg-white text-black border border-gray-300 hover:bg-gray-50"
    }`}
  >
    {category.name}
  </button>
);

export default CategoryTabs;
