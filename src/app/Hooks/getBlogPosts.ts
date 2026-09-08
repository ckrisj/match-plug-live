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
}

export interface BlogList {
  posts: BlogListPost[];
  page: number;
  totalPages: number;
}

const PER_PAGE = 12;

/** Posts change far less often than predictions do. */
const REVALIDATE_SECONDS = 900;

/**
 * WordPress returns title and excerpt as rendered HTML. The listing only needs
 * text, and rendering it raw would inject markup into the card layout.
 */
function toPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&hellip;|&#8230;/g, "…")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export async function getBlogPosts({
  page = 1,
  categoryId,
}: {
  page?: number;
  categoryId?: number;
} = {}): Promise<BlogList> {
  const url = new URL(`${API_URL}/wp-json/wp/v2/posts`);
  url.searchParams.set("per_page", String(PER_PAGE));
  url.searchParams.set("page", String(page));
  // Without _fields WordPress returns the full rendered body of every post,
  // which is megabytes per listing page.
  url.searchParams.set("_fields", "id,slug,title,excerpt,date");

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
      excerpt: toPlainText(post?.excerpt?.rendered ?? ""),
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
