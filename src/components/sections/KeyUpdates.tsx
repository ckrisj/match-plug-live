// app/latest-updates/page.tsx (Next.js 13+ App Router)
// If you are using pages router, create pages/latest-updates.tsx instead

import Image from "next/image";
import Link from "next/link";
import { handleClick } from "../utils/helper";
import { useGetData } from "@/app/Hooks/useGetData";
import { Loader } from "./Loader";

type Author = {
  id: string;
  name: string;
  image: string;
  link: string;
};

type Article = {
  id: number;
  title: string;
  link: string;
  slug: string;
  date: string;
  image: string;
  author: Author;
};

type Data = {
  data: Article[];
};

export function LatestUpdates() {
  const { data, isFetching } = useGetData<Data>({
    path: "posts-by-category?category=updates&per_page=5",
    key: ["post-by-category", "updates"],
  });

  if (isFetching) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!isFetching && !data?.data.length) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        No Data Found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-gray-200 pb-2">
        Latest Updates
      </h2>

      <div className="flex flex-wrap gap-6">
        {data?.data.map((item) => (
          <Link
            key={item.id}
            onClick={() => {
              handleClick(item?.id);
            }}
            onMouseDown={() => {
              handleClick(item?.id);
            }}
            href={`/blog/${item?.slug}`}
            className="bg-white rounded-2xl flex-[1_0_200px]  shadow hover:shadow-lg transition overflow-hidden"
          >
            <div>
              <div className="relative w-full h-48 md:h-46">
                <img
                  src={item?.image}
                  alt={item?.title}
                  style={{
                    height: "150px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  className=""
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-2">
                  <a
                    href={item?.link}
                    target="_blank"
                    className="hover:text-blue-600"
                    dangerouslySetInnerHTML={{ __html: item?.title }}
                  ></a>
                </h3>
                <p className="text-sm text-gray-500 mt-1">{item?.date}</p>
                <div className="flex items-center mt-3 gap-2">
                  <img
                    src={item?.author?.image}
                    alt={item?.author?.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <p
                    key={item?.id}
                    onClick={() => {
                      handleClick(item?.id);
                    }}
                    onMouseDown={() => {
                      handleClick(item?.id);
                    }}
                  >
                    {item.author.name}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
