import { API_URL } from "@/components/utils/constant";

/**
 * Server-side post fetching for the blog index and category archives.
 *
 * The listings used to be rendered entirely client-side, so the HTML a crawler
 * received contained no links to any of the ~6,500 posts — they were reachable
 * only through the sitemap. This fetches on the server so the links are in the
 * markup, and exposes the page count so the archive can be walked.
 */

export interface BlogListPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  /** Featured image URL, empty when the post has none set. */
  image: string;
}

export interface BlogList {
  posts: BlogListPost[];
  page: number;
  totalPages: number;
}

const DEFAULT_PER_PAGE = 12;

/** Posts change far less often than predictions do. */
const REVALIDATE_SECONDS = 900;

/**
 * WordPress returns title and excerpt as rendered HTML. The listing only needs
 * text, and rendering it raw would inject markup into the card layout.
 */
function toPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&hellip;/g, "…")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    // Numeric entities are decoded generically — WordPress emits far more of
    // them than it is worth listing, and an undecoded &#8211; is visible text.
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCharCode(parseInt(code, 16)),
    )
    // Last, so an escaped entity inside the text is not double-decoded.
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Many posts have no hand-written excerpt, and WordPress then returns the whole
 * article. The card clamps it visually, but there is no reason to ship a few
 * thousand words per post to do it.
 */
function toExcerpt(html: string): string {
  const text = toPlainText(html);

  if (text.length <= 400) {
    return text;
  }

  const cut = text.slice(0, 400);
  const lastSpace = cut.lastIndexOf(" ");

  return `${cut.slice(0, lastSpace > 200 ? lastSpace : 400)}…`;
}

export async function getBlogPosts({
  page = 1,
  categoryId,
  perPage = DEFAULT_PER_PAGE,
}: {
  page?: number;
  categoryId?: number;
  /** Overrides the default page size — the homepage shows a short list. */
  perPage?: number;
} = {}): Promise<BlogList> {
  const url = new URL(`${API_URL}/wp-json/wp/v2/posts`);
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("page", String(page));
  // Without _fields WordPress returns the full rendered body of every post,
  // which is megabytes per listing page.
  url.searchParams.set("_fields", "id,slug,title,excerpt,date,jetpack_featured_media_url");

  if (categoryId) {
    url.searchParams.set("categories", String(categoryId));
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error(
        `Blog posts responded ${response.status} for page ${page}`,
        categoryId ? `(category ${categoryId})` : "",
      );
      return { posts: [], page, totalPages: 0 };
    }

    const body = await response.json();
    const totalPages = Number(response.headers.get("x-wp-totalpages") ?? 0);

    if (!Array.isArray(body)) {
      return { posts: [], page, totalPages: 0 };
    }

    const posts: BlogListPost[] = body.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: toPlainText(post?.title?.rendered ?? ""),
      excerpt: toExcerpt(post?.excerpt?.rendered ?? ""),
      image: post?.jetpack_featured_media_url ?? "",
      date: post.date,
    }));

    return { posts, page, totalPages };
  } catch (error) {
    console.error(`Blog posts request failed for page ${page}:`, error);
    return { posts: [], page, totalPages: 0 };
  }
}

/** Clamps a `?page=` query value to a usable page number. */
export function parsePageParam(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "1", 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

/**
 * Maps a raw WordPress post onto the listing shape. Exported so the client-side
 * category views produce exactly the same objects the server does.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapWpPost(post: any): BlogListPost {
  return {
    id: post.id,
    slug: post.slug,
    title: toPlainText(post?.title?.rendered ?? ""),
    excerpt: toExcerpt(post?.excerpt?.rendered ?? ""),
    image: post?.jetpack_featured_media_url ?? "",
    date: post.date,
  };
}

/** Fields the listing needs; without this WordPress returns whole articles. */
export const POST_FIELDS = "id,slug,title,excerpt,date,jetpack_featured_media_url";

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

/**
 * The category set the news section offers. Taken from the site's own
 * football-news endpoint so the list stays whatever the editors curate there,
 * rather than every WordPress category.
 */
export async function getNewsCategories(): Promise<BlogCategory[]> {
  try {
    const response = await fetch(`${API_URL}/wp-json/next/v1/football-news`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BLOG_API_KEY}`,
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error(`News categories responded ${response.status}`);
      return [];
    }

    const body = await response.json();

    return (body?.data ?? [])
      .map((entry: { category: BlogCategory }) => entry.category)
      .filter((category: BlogCategory) => category?.id);
  } catch (error) {
    console.error("News categories request failed:", error);
    return [];
  }
}
