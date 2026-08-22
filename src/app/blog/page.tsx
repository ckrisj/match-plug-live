"use client";

import { BlogPage } from "@/components/sections/Blogs";
import Blogs from "@/components/sections/BlogPage";
import { Posts } from "@/components/sections/Posts";
import { useQueryState } from "nuqs";

const Page = () => {
  const [search] = useQueryState("s");

  const isSearched = typeof search === "string";

  return (
    <>
      {typeof search === "string" ? (
        <div className="mt-20 max-w-4xl mx-auto px-4 py-10">
          <Posts slug="" search={search} isSearched={isSearched} />
        </div>
      ) : (
        <div className=" bg-gray-50">
          <BlogPage />

          <Blogs />
        </div>
      )}
    </>
  );
};

export default Page;
