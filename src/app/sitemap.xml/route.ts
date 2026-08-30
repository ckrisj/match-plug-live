import { API_URL } from "@/components/utils/constant";

export async function GET() {
  try {
    const backendRes = await fetch(
      `${API_URL}/wp-json/next/v1/sitemap`
    );
    const xml = await backendRes.text();
    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return new Response("Error loading sitemap", {
      status: 500,
    });
  }
}