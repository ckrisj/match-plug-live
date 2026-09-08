import type { Metadata } from "next";
import Link from "next/link";

import { SITE_URL } from "@/components/utils/constant";
import { guides } from "@/components/utils/Collection/guides";

export const metadata: Metadata = {
  title: "Football Betting Guides — Markets Explained | Matchplug",
  description:
    "Plain-English guides to the football betting markets we publish predictions for: win draw win, BTTS, over 2.5 goals, and how to read odds.",
  alternates: { canonical: `${SITE_URL}/guides` },
};

export default function GuidesIndexPage() {
  return (
    <section className="bg-[#F4F6FB] py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Football betting guides
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Short, plain-English explanations of the markets we publish
          predictions for — what each bet covers, when it settles, and what
          actually drives the result. No jargon and no guaranteed-win claims.
        </p>

        <div className="mt-10 space-y-4">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                <Link
                  href={`/guides/${guide.slug}`}
                  className="hover:text-[#455DBF]"
                >
                  {guide.title}
                </Link>
              </h2>
              <p className="mt-2 text-gray-700">{guide.summary}</p>
              <Link
                href={`/guides/${guide.slug}`}
                className="mt-3 inline-block text-sm font-semibold text-[#455DBF] hover:underline"
              >
                Read the guide
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
