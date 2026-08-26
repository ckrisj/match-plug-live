import type { Metadata } from "next";
import { Tabs } from "@/components/sections/Tabs";
import { API_URL } from "@/components/utils/constant";
import { notFound } from "next/navigation";
type Props = {
  params: Promise<{
    slug: string;
    id: string;
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const slug = id;

  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const seo = post.yoast_head_json;
  const image = seo?.og_image?.[0];

  const canonical = `${process.env.NEXT_PUBLIC_BLOG_API_URL}/blog/${post.slug}`;
  return {
    title: seo?.title || post.title?.rendered,
    description: seo?.description,

    robots: {
      index: seo?.robots?.index === "index",
      follow: seo?.robots?.follow === "follow",
      // maxSnippet: -1,
      // maxImagePreview: "large",
      // maxVideoPreview: -1,
    },

    alternates: {
      canonical,
    },

    openGraph: {
      type: "article",
      title: seo?.og_title || seo?.title,
      description: seo?.og_description || seo?.description,
      url: canonical,
      siteName: seo?.og_site_name,

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
      title: seo?.og_title || seo?.title,
      description: seo?.og_description || seo?.description,
      images: image ? [image.url] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const slug = id;

  const post = await getPost(slug);

  if (!post) {
    return notFound();
  }

  const seo = post.yoast_head_json;
  const image = seo?.og_image?.[0];
  const canonical = `${process.env.NEXT_PUBLIC_BLOG_API_URL}/blog/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: post.title?.rendered,
    description: seo?.description,

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
    author: post?.yoast_head_json?.author,
  };
  return (
    <div className="mt-20 max-w-4xl mx-auto px-4 py-10">
      {/* Article Structured Data */}
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
