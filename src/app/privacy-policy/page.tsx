import type { Metadata } from "next";
import Link from "next/link";

import { SITE_URL } from "@/components/utils/constant";

export const metadata: Metadata = {
  title: "Privacy Policy | Matchplug",
  description:
    "How Matchplug collects, uses and protects personal data: what we store, cookies and analytics, who we share data with, how long we keep it, and your rights.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

/**
 * Ad networks, app stores and payment providers all require a reachable
 * privacy policy. This is standard, accurate copy for what the site actually
 * does — it should still get a legal review before being relied on, and it
 * must be updated if new trackers or processors are added.
 */

const SECTIONS: { heading: string; body: string[]; list?: string[] }[] = [
  {
    heading: "Who we are",
    body: [
      "Matchplug publishes football and American-sports predictions and analysis at matchplug.com. We are a predictions and analysis service: we are not a bookmaker, we do not accept bets, and we do not process wagers.",
      "For anything in this policy you can reach us at hello@matchplug.com, or at the postal address on our contact page.",
    ],
  },
  {
    heading: "What we collect",
    body: ["We collect two kinds of information."],
    list: [
      "Information you give us. An email address and account details if you register or subscribe, and the contents of any message you send us by email, WhatsApp or Telegram.",
      "Information collected automatically. Your IP address, browser and device type, referring page, the pages you view and the time of the visit. This is standard web-server and analytics data.",
    ],
  },
  {
    heading: "What we do not collect",
    body: [
      "We do not ask for or store card numbers or bank details on this website. Subscription payments are handled by our payment providers on their own systems, under their own privacy policies.",
      "We do not knowingly collect data from anyone under 18. This site is intended for adults only. If you believe a minor has given us personal data, contact us and we will delete it.",
    ],
  },
  {
    heading: "How we use it",
    body: ["We use personal data only for the purposes below."],
    list: [
      "To provide the service — publishing predictions, running your account, and delivering VIP selections to the channel you signed up for.",
      "To answer your messages and support requests.",
      "To understand how the site is used, so we can improve which markets we cover and how pages perform.",
      "To meet legal and regulatory obligations, including responsible-gambling and advertising requirements.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "We use cookies and similar storage to keep the site working — remembering your session and your preferences — and to measure traffic in aggregate.",
      "Your browser lets you block or delete cookies. Blocking them will not stop you reading predictions, but parts of the account area may not work correctly.",
    ],
  },
  {
    heading: "Who we share it with",
    body: [
      "We do not sell personal data. We share it only with the service providers who help us run the site, and only as far as they need it: our hosting provider, our content platform, our analytics provider, our payment providers, and the messaging platforms used to deliver VIP selections.",
      "We may also disclose information where we are legally required to, or to protect our rights, users or systems.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Account data is kept while your account is open and for a reasonable period afterwards to meet legal and accounting obligations. Support correspondence is kept while it is useful for support history. Aggregate analytics data is retained in a form that does not identify you individually.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Depending on where you live, you may have the right to ask for a copy of the personal data we hold about you, to have it corrected, to have it deleted, to object to or restrict how we use it, and to withdraw consent where we relied on it.",
      "To exercise any of these, email hello@matchplug.com. We will respond within the period required by the law that applies to you. If you are unhappy with our response you may complain to your local data-protection authority.",
    ],
  },
  {
    heading: "International transfers and security",
    body: [
      "Our providers may process data in countries other than the one you live in, including the United States. Where that happens we rely on the safeguards those providers have in place.",
      "We take reasonable technical and organisational measures to protect personal data. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Third-party links",
    body: [
      "The site links to bookmakers, payment providers and other third parties. Once you follow such a link, that site's own privacy policy governs what happens to your data. We are not responsible for their practices.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy as the service changes or as the law requires. The current version is always the one published on this page.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-[#F4F6FB] py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mt-4 text-lg text-gray-700">
          This policy explains what personal data Matchplug collects, why we
          collect it, who we share it with and what control you have over it.
        </p>

        {SECTIONS.map((section) => (
          <div key={section.heading} className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900">
              {section.heading}
            </h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-3 text-gray-700">
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
                {section.list.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Contact us</h2>
          <p className="mt-3 text-gray-700">
            Questions about this policy, or a request about your data, go to{" "}
            <a
              href="mailto:hello@matchplug.com"
              className="text-[#455DBF] hover:underline"
            >
              hello@matchplug.com
            </a>
            . Our postal address and messaging channels are on the{" "}
            <Link href="/contact-us" className="text-[#455DBF] hover:underline">
              contact page
            </Link>
            .
          </p>
        </div>

        <p className="mt-10 text-sm text-gray-600">
          See also our{" "}
          <Link href="/terms-of-service" className="text-[#455DBF] hover:underline">
            terms of service
          </Link>{" "}
          and{" "}
          <Link href="/disclaimer" className="text-[#455DBF] hover:underline">
            disclaimer
          </Link>
          . 18+ only. Please gamble responsibly.
        </p>
      </div>
    </section>
  );
}
