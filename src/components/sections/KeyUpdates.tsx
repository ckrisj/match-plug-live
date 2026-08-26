// app/latest-updates/page.tsx (Next.js 13+ App Router)
// If you are using pages router, create pages/latest-updates.tsx instead

import Image from "next/image";
import Link from "next/link";
import { handleClick } from "../utils/helper";
import { useGetData } from "@/app/Hooks/UseGetDataArgs";
import { Loader } from "./Loader";
import { formatDate } from "./BlogPage";

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

export function LatestUpdates({ categories }: { categories: string[] }) {
  const categoryIds = categories?.join(",");
  const { data: response, isFetching }: any = useGetData<Data>({
    key: ["post-by-category", categoryIds, 1, 5],
    path: "posts",
    params: {
      per_page: 5,
      page: 1,
      categories: categoryIds,
      orderby: "date",
      order: "desc",
    },
  });
  const posts = response?.data || [];

  if (isFetching) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!isFetching && (!posts || posts?.length === 0)) {
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
        {posts?.map((item: any) => (
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
                  src={item?.jetpack_featured_media_url || "/person.webp"}
                  alt={item?.title?.rendered || "Blog post"}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/person.webp";
                  }}
                  style={{
                    height: "150px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-2">
                  <a
                    href={`/blog/${item?.slug}`}
                    target="_blank"
                    className="hover:text-blue-600"
                    dangerouslySetInnerHTML={{ __html: item?.title?.rendered }}
                  ></a>
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(item?.date)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
