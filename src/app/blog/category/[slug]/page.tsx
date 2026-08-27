import type { Metadata } from "next";
//import { Posts } from "@/components/sections/Posts";
import { CategoryPosts } from "@/components/sections/CategoryPosts";
import { API_URL } from "@/components/utils/constant";
import { notFound } from "next/navigation";

const SITE_URL =
  process.env.NEXT_PUBLIC_BLOG_API_URL || "http://localhost:3000";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

async function getCategory(slug: string) {
  const response = await fetch(
    `${API_URL}/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}`,
    {
      next: {
        revalidate: 2,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  const categories = await response.json();

  return categories?.[0] || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    return {
      title: "Category Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const seo = category.yoast_head_json;

  const canonical = `${SITE_URL}/blog/category/${category.slug}/`;

  return {
    title: seo?.title || category.name,
    description: seo?.description || "",

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
      type: "website",
      title: seo?.og_title || seo?.title || category.name,
      description: seo?.og_description || seo?.description || "",
      url: canonical,
      siteName: seo?.og_site_name || "Matchplug Blog",
    },

    twitter: {
      card: seo?.twitter_card || "summary_large_image",
      title: seo?.og_title || seo?.title || category.name,
      description: seo?.og_description || seo?.description || "",
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    return notFound();
  }

  const seo = category.yoast_head_json;

  const canonical = `${SITE_URL}/blog/category/${category.slug}/`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",

    "@id": canonical,
    url: canonical,

    name: seo?.title || category.name,
    description: seo?.description || "",

    breadcrumb: {
      "@type": "BreadcrumbList",

      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: category.name,
        },
      ],
    },

    inLanguage: "en-US",
  };
  console.log("category", category);

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4 py-10">
      {/* Archive JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* <Posts title={category?.name} slug={slug} categoryId={category?.id} /> */}
      <div className="text-3xl font-bold mb-6 md:mb-12 flex justify-center">
  {category.name}
</div>

<CategoryPosts categoryId={category.id} />

    </div>
  );
}
