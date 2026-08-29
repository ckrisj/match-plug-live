// app/latest-updates/page.tsx (Next.js 13+ App Router)
// If you are using pages router, create pages/latest-updates.tsx instead

import Link from "next/link";
// import { useGetData } from "@/app/Hooks/UseGetDataArgs";
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

export function LatestStories({ categories }: { categories: string[] }) {
  // const categoryIds = categories?.join(",");
  // const { data: response, isFetching }: any = useGetData<Data>({
  //   key: ["post-by-category", categoryIds, 1, 4],
  //   path: "posts",
  //   params: {
  //     per_page: 4,
  //     page: 1,
  //     categories: categoryIds,
  //     orderby: "date",
  //     order: "desc",
  //   },
  // });

  const { data, isFetching } = useGetData<Data>({
    path: "posts-by-category?category=trending-news&per_page=4",
    key: ["post-by-category", "trending-news", 4],
  });

  const posts = data?.data || [];

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

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {posts?.map((item: any) => (
          <Link
            key={item.id}
            href={`/blog/${item?.slug}`}
            className="bg-white rounded-2xl   shadow hover:shadow-lg transition overflow-hidden"
          >
            <div>
              <div className="relative w-full h-48 md:h-46">
                <img
                  src={item?.image || "/person.webp"}
                  alt={item?.title}
                  style={{
                    height: "150px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/person.webp";
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-2">
                  <p
                    className="hover:text-blue-600"
                    dangerouslySetInnerHTML={{ __html: item?.title }}
                  ></p>
                </h3>
                <p className="text-sm text-gray-500 mt-1"> {item?.date}</p>
                {item.author.name && (
                  <div className="flex items-center mt-3 gap-2">
                    <img
                      src={item?.author?.image}
                      alt={item?.author?.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <p key={item?.id}>{item.author.name}</p>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
