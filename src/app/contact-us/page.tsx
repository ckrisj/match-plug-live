import type { Metadata } from "next";
import Link from "next/link";

import { SITE_URL } from "@/components/utils/constant";

export const metadata: Metadata = {
  title: "Contact Matchplug — Support, WhatsApp & Telegram | Matchplug",
  description:
    "Get in touch with Matchplug: WhatsApp, Telegram, email and our registered office address. Support for free predictions and VIP subscriptions.",
  alternates: { canonical: `${SITE_URL}/contact-us` },
};

const CONTACTS = [
  {
    label: "WhatsApp",
    value: "+1 (307) 218-5698",
    href: "https://wa.me/13072185698",
  },
  {
    label: "Telegram",
    value: "@matchplugvip",
    href: "https://t.me/matchplugvip",
  },
  {
    label: "Email",
    value: "hello@matchplug.com",
    href: "mailto:hello@matchplug.com",
  },
];

const ADDRESS = {
  street: "30 N Gould St Ste R",
  city: "Sheridan",
  region: "Wyoming",
  postalCode: "82801",
  country: "USA",
};

export default function ContactUsPage() {
  // Also the site's Organization record — there was no Organization markup
  // anywhere before this page existed.
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Matchplug",
    url: SITE_URL,
    email: "hello@matchplug.com",
    telephone: "+1-307-218-5698",
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@matchplug.com",
      telephone: "+1-307-218-5698",
      availableLanguage: "English",
    },
    sameAs: ["https://t.me/matchplugvip"],
  };

  return (
    <section className="bg-[#F4F6FB] py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-gray-900">Contact Matchplug</h1>
        <p className="mt-4 text-lg text-gray-700">
          Questions about a prediction, a VIP subscription or a payment? Reach us
          on any of the channels below. Telegram and WhatsApp are the fastest —
          email is answered within one working day.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {CONTACTS.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              className="rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:border-[#455DBF]"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-[#455DBF]">
                {contact.label}
              </p>
              <p className="mt-2 break-words text-gray-900">{contact.value}</p>
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Registered office
          </h2>
          <address className="mt-2 not-italic text-gray-700">
            {ADDRESS.street}
            <br />
            {ADDRESS.city}, {ADDRESS.region} {ADDRESS.postalCode}
            <br />
            {ADDRESS.country}
          </address>
          <p className="mt-4 text-sm text-gray-600">
            Post is not monitored daily. For anything time-sensitive — a
            subscription or payment question — use WhatsApp, Telegram or email.
          </p>
        </div>

        <div className="mt-10 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Before you write in
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
            <li>
              Subscription and billing questions are handled through your{" "}
              <a
                href="https://user.matchplug.com/auth/login"
                className="text-[#455DBF] hover:underline"
              >
                account area
              </a>
              , which is the quickest route.
            </li>
            <li>
              How the tiers work is covered on{" "}
              <Link
                href="/how-to-subscribe"
                className="text-[#455DBF] hover:underline"
              >
                how to subscribe
              </Link>
              .
            </li>
            <li>
              We do not give individual betting advice, and we cannot guarantee
              the outcome of any prediction. See our{" "}
              <Link href="/disclaimer" className="text-[#455DBF] hover:underline">
                disclaimer
              </Link>
              .
            </li>
          </ul>
        </div>

        <p className="mt-10 text-sm text-gray-600">
          Matchplug is a predictions and analysis service. It is not a bookmaker
          and does not accept bets. 18+ only. Please gamble responsibly.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
