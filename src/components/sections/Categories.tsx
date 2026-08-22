"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // nice icons
import { CategoryTab, NewsCategory } from "./LatestNewsSection";

export default function Categories({
  filteredCategories,
  activeCategory,
  setActiveCategory,
}: {
  filteredCategories: NewsCategory[];
  activeCategory: number | string;
  setActiveCategory: (categoryId: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth - 100; // adjust for how much to move
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      hidden={false}
      className="max-w-6xl flex-col md:flex-row gap-3 mx-auto w-full  flex-center relative"
    >
      <div ref={scrollRef} className=" flex  justify-center gap-2 flex-wrap">
        {filteredCategories.map((category: NewsCategory) => (
          <CategoryTab
            key={category.id}
            category={category}
            isActive={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          />
        ))}
      </div>
    </div>
  );
}
