import { getBlogPosts, getNewsCategories } from "@/app/Hooks/getBlogPosts";
import LatestNewsTabs from "./LatestNewsTabs";

/**
 * Server half of the news section: resolves the category list and the newest
 * posts by date, so the default view is in the HTML rather than fetched in the
 * browser. Category switching happens client-side in LatestNewsTabs.
 */
export default async function LatestNews() {
  const [categories, latest] = await Promise.all([
    getNewsCategories(),
    getBlogPosts({ perPage: 6 }),
  ]);

  if (!latest.posts.length && !categories.length) {
    return null;
  }

  return (
    <LatestNewsTabs categories={categories} initialPosts={latest.posts} />
  );
}
