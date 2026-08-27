import Link from "next/link";
import { API_URL } from "@/components/utils/constant";
import HaalandArticleForCat from "./HaalandArticleForCat";

type Post = {
  id: number;
  slug: string;
  date: string;
  title?: {
    rendered?: string;
  };
  excerpt?: {
    rendered?: string;
  };
  jetpack_featured_media_url?: string;
};

async function getCategoryPosts(categoryId: number) {
  const response = await fetch(
    `${API_URL}/wp-json/wp/v2/posts?per_page=12&page=1&categories=${categoryId}&orderby=date&order=desc`,
    {
      next: {
        revalidate: 2,
      },
    }
  );

  if (!response.ok) {
    return [];
  }

  return response.json() as Promise<Post[]>;
}

export async function CategoryPosts({
  categoryId,
}: {
  categoryId: number;
}) {
  const posts = await getCategoryPosts(categoryId);

  if (!posts.length) {
    return (
      <div className="h-[500px] grid place-items-center">
        <p className="text-center text-gray-500">
          No posts found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}/`}
          className="h-full"
        >
          <article className="h-[500px] rounded-xl shadow-md overflow-hidden bg-white flex flex-col">
            <img
              src={
                post.jetpack_featured_media_url ||
                "/person.webp"
              }
              alt={post.title?.rendered || "Blog post"}
              width={600}
              height={300}
              className="h-52 w-full object-cover shrink-0"
            />

            <div className="p-4 flex flex-col flex-1">
              <p className="text-sm text-gray-500 mb-2">
                {new Date(post.date).toDateString()}
              </p>

              <h2
                className="font-bold text-lg mb-2 line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: post.title?.rendered || "",
                }}
              />

              <div className="text-gray-700 text-sm line-clamp-3">
                <HaalandArticleForCat
                  content={
                    post.excerpt?.rendered?.slice(0, 150) || ""
                  }
                />
              </div>

              <p className="mt-auto pt-3 text-green-600 font-medium">
                Read More »
              </p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
