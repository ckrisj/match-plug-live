import type { Metadata } from "next";
import { Tabs } from "@/components/sections/Tabs";
import { API_URL, SITE_URL } from "@/components/utils/constant";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

async function getPost(slug: string) {
  const response = await fetch(
    `${API_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}`,
    {
      next: {
        revalidate: 2,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  const posts = await response.json();

  return posts?.[0] || null;
}

// Remove HTML tags and decode basic HTML entities
function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;|&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// Create SEO-friendly description with max ~155 characters
function truncateDescription(text = "", maxLength = 155) {
  const cleanText = stripHtml(text);

  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  return `${cleanText.slice(0, maxLength).trimEnd()}...`;
}

// One description source for Meta, OG, Twitter and Schema
function getDescription(post: any) {
  const seo = post?.yoast_head_json;

  // Prefer a proper Yoast meta description
  if (seo?.description?.trim()) {
    return truncateDescription(seo.description);
  }

  // If missing, use excerpt
  if (post?.excerpt?.rendered) {
    return truncateDescription(post.excerpt.rendered);
  }

  // Final fallback: article content
  if (post?.content?.rendered) {
    return truncateDescription(post.content.rendered);
  }

  return "";
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const seo = post.yoast_head_json;
  const image = seo?.og_image?.[0];

  const canonical = `${SITE_URL}/blog/${post.slug}`;

  // Generate one clean description
  const description = getDescription(post);

  return {
    title: seo?.title || post.title?.rendered,

    // Meta description
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      type: "article",
      title: seo?.og_title || seo?.title || post.title?.rendered,
      description,
      url: canonical,
      siteName: seo?.og_site_name || "Matchplug",

      publishedTime: seo?.article_published_time,
      modifiedTime: seo?.article_modified_time,

      images: image
        ? [
            {
              url: image.url,
              width: image.width,
              height: image.height,
              type: image.type,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: seo?.og_title || seo?.title || post.title?.rendered,
      description,
      images: image ? [image.url] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return notFound();
  }

  const seo = post.yoast_head_json;
  const image = seo?.og_image?.[0];
  const canonical = `${SITE_URL}/blog/${post.slug}`;

  // Use the same description in Schema
  const description = getDescription(post);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: post.title?.rendered,
    description,

    image: image
      ? {
          "@type": "ImageObject",
          url: image.url,
          width: image.width,
          height: image.height,
        }
      : undefined,

    datePublished: seo?.article_published_time,
    dateModified: seo?.article_modified_time,

    author: {
      "@type": "Person",
      name: seo?.author,
    },

    publisher: {
      "@type": "Organization",
      name: "Matchplug Blog",
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };

  const structuredData = {
    id: post?.id,
    jetpack_featured_media_url: post?.jetpack_featured_media_url,
    categories: post?.categories,
    content: post?.content?.rendered,
    date: post?.date,
    excerpt: post?.excerpt?.rendered,
    title: post?.title?.rendered,
    slug: post?.slug,
    author: seo?.author,
  };

  return (
    <div className="mt-20 max-w-4xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Tabs structuredData={structuredData} />
    </div>
  );
}