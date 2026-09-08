import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SITE_URL } from "@/components/utils/constant";
import { guideBySlug, guides } from "@/components/utils/Collection/guides";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

/** Static at build time — the guides are fixed copy, not feed-driven. */
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);

  if (!guide) {
    return {};
  }

  const canonical = `${SITE_URL}/guides/${guide.slug}`;

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = guideBySlug(slug);

  if (!guide) {
    notFound();
  }

  // Marked up so the FAQ block is eligible for a rich result rather than being
  // read as plain body copy.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <article className="bg-[#F4F6FB] py-16">
      <div className="mx-auto max-w-3xl px-4">
        <nav className="text-sm text-gray-600">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link href="/guides" className="hover:underline">
            Guides
          </Link>
        </nav>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          {guide.heading}
        </h1>
        <p className="mt-4 text-lg text-gray-700">{guide.intro}</p>

        {guide.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900">
              {section.heading}
            </h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-3 text-gray-700">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-4 space-y-5">
            {guide.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-semibold text-gray-900">{faq.question}</dt>
                <dd className="mt-1 text-gray-700">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Put it into practice
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {guide.related.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[#455DBF] hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900">Other guides</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {guides
              .filter((other) => other.slug !== guide.slug)
              .map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/guides/${other.slug}`}
                    className="text-[#455DBF] hover:underline"
                  >
                    {other.title}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </article>
  );
}
