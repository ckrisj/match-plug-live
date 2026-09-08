import { BlogPage } from "@/components/sections/Blogs";
import Blogs from "@/components/sections/BlogPage";
import { Posts } from "@/components/sections/Posts";
import PostListServer from "@/components/sections/Server/PostListServer";
import { parsePageParam } from "@/app/Hooks/getBlogPosts";
import { metadataForRoute } from "@/app/lib/title";

export const metadata = metadataForRoute("/blog");

type PageProps = {
  searchParams: Promise<{
    s?: string;
    page?: string;
  }>;
};

/**
 * A server component so the article list is in the HTML. The magazine blocks
 * above it still fetch client-side, but they are no longer the only path to a
 * post — PostListServer renders real links and a paginated trail through the
 * whole archive.
 */
const Page = async ({ searchParams }: PageProps) => {
  const { s: search, page } = await searchParams;

  if (typeof search === "string") {
    return (
      <div className="mt-20 max-w-4xl mx-auto px-4 py-10">
        <Posts slug="" search={search} isSearched />
      </div>
    );
  }

  return (
    <div className=" bg-gray-50">
      <BlogPage />

      <Blogs />

      <PostListServer basePath="/blog" page={parsePageParam(page)} />
    </div>
  );
};

export default Page;
