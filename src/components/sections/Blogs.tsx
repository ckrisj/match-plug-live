import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { v4 } from "uuid";
// import { useGetData } from "@/app/Hooks/useGetData";
import { useGetData } from "@/app/Hooks/UseGetDataArgs";
import { handleClick } from "../utils/helper";
import { Loader } from "./Loader";

// Dummy Blog Data
export const dummyPosts = [
  {
    id: 1,
    title: "FC Cincinnati’s Evander fined by MLS Disciplinary Committee",
    excerpt:
      "The MLS Disciplinary Committee has issued rulings after Matchday 25...",
    content:
      "Full content for post 1 goes here. You can replace this with long text or HTML.",
    featured_image: "https://picsum.photos/seed/evander/800/400",
    link: "#",
  },
  {
    id: 2,
    title: "Real Madrid secures last-minute win against Barcelona",
    excerpt:
      "In a thrilling El Clasico, Real Madrid sealed the game with a stoppage-time goal...",
    content: "Full content for post 2 goes here.",
    featured_image: "https://picsum.photos/seed/madrid/800/400",
    link: "#",
  },
  {
    id: 3,
    title: "Arsenal’s unbeaten run continues in Premier League",
    excerpt:
      "Arsenal extended their unbeaten streak this season with a 2-0 win...",
    content: "Full content for post 3 goes here.",
    featured_image: "https://picsum.photos/seed/arsenal/800/400",
    link: "#",
  },
  {
    id: 4,
    title: "NBA Playoffs: Lakers advance to conference finals",
    excerpt:
      "The Lakers moved past the Warriors to reach the Western Conference Finals...",
    content: "Full content for post 4 goes here.",
    link: "#",
    featured_image: "https://picsum.photos/seed/lakers/800/400",
  },
  {
    id: 5,
    title: "India defeats Pakistan in T20 World Cup thriller",
    excerpt:
      "A nail-biting finish saw India emerge victorious over Pakistan in the T20 World Cup...",
    content: "Full content for post 5 goes here.",
    featured_image: "https://picsum.photos/seed/india/800/400",
    link: "#",
  },
];

type Post = {
  id: number;
  title: string;
  link: string;
  featured_image: string;
  date: string;
  slug: string;
};

export function BlogPage() {
  // const { data, isFetching } = useGetData<{ data: Post[] }>({
  //   key: ["homepage-slider"],
  //   path: "homepage-slider",
  //   initialData: { data: [] },
  // });
  const {
    data: response,
    isLoading,
    isError,
  } = useGetData<any[]>({
    key: ["posts", 1, 3, "157,14,221"],
    path: "posts",
    params: {
      per_page: 3,
      page: 1,
      categories: "157,14,221",
      orderby: "date",
      order: "desc",
    },
  });

  const posts = response?.data || [];
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mt-20 bg-gray-50   max-w-7xl mx-auto space-y-10">
      <section className="p-4 max-w-7xl mx-auto ">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
        >
          {posts?.map((post) => (
            <SwiperSlide key={v4()}>
              <Link
                onClick={() => {
                  handleClick(post?.id);
                }}
                onMouseDown={() => {
                  handleClick(post?.id);
                }}
                href={`/blog/${post.slug}`}
              >
                <div className="relative h-96 rounded-xl overflow-hidden">
                  <img
                    src={post?.jetpack_featured_media_url || "person.webp"}
                    alt={post?.title?.rendered}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0    bg-opacity-50 text-white p-4 w-full">
                    <p className="text-xl font-bold">{post.title?.rendered}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
