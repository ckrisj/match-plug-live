import { API_URL, SITE_URL } from "@/components/utils/constant";
import { guides } from "@/components/utils/Collection/guides";
import { marketContent } from "@/components/utils/Collection/market-content";

/**
 * The sitemap used to be a straight proxy of WordPress's, which meant it listed
 * ~6,500 blog posts and not one commercial page — the homepage, every market
 * page and every static page were absent from the only sitemap robots.txt
 * points at. This still serves the WordPress URLs, but merges the app's own
 * routes in first.
 */

const STATIC_ROUTES = [
  "",
  "/vip",
  "/about-us",
  "/partners",
  "/how-to-subscribe",
  "/terms-of-service",
  "/disclaimer",
  "/privacy-policy",
  "/contact-us",
  "/blog",
  "/guides",
];

export const revalidate = 3600;

function toUrlEntry(loc: string, lastmod: string) {
  return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
}

export async function GET() {
  const lastmod = new Date().toISOString();

  // Market slugs come from marketContent rather than a list maintained here, so
  // a market can't be added to the site and forgotten in the sitemap. Every key
  // in it resolves to a rendered page.
  const ownEntries = [
    ...STATIC_ROUTES.map((route) => `${SITE_URL}${route}`),
    ...Object.keys(marketContent).map((slug) => `${SITE_URL}/${slug}`),
    ...guides.map((guide) => `${SITE_URL}/guides/${guide.slug}`),
  ]
    .map((loc) => toUrlEntry(loc, lastmod))
    .join("");

  let blogXml = "";

  try {
    const response = await fetch(`${API_URL}/wp-json/next/v1/sitemap`, {
      next: { revalidate },
    });

    if (response.ok) {
      blogXml = await response.text();
    } else {
      console.error(`Blog sitemap responded ${response.status}`);
    }
  } catch (error) {
    console.error("Blog sitemap request failed:", error);
  }

  // Splice our URLs into the WordPress document. If WordPress is unavailable we
  // still serve the commercial pages rather than returning a 500 for the only
  // sitemap Google is pointed at.
  const closingTag = "</urlset>";
  const xml = blogXml.includes(closingTag)
    ? blogXml.replace(closingTag, `${ownEntries}${closingTag}`)
    : `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${ownEntries}${closingTag}`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
