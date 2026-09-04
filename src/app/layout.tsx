import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { TanstackProvider } from "../components/TanstackProvider";
import { SITE_URL } from "@/components/utils/constant";
import Footer from "@/components/layout/Footer";
import { AppHeader } from "@/components/layout/AppHeader";
import { NuqsAdapter } from "nuqs/adapters/react";
import { routeTitles } from "./lib/title";
import { headers } from "next/headers";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const pathname = (await headers()).get("x-pathname") ?? "/";

  const route = routeTitles[pathname] ?? {
    title: "Matchplug - Football Predictions & Betting Tips",
    description:
      "Expert football predictions, betting tips, and sports insights daily.",
  };

  const canonicalPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return {
    metadataBase: new URL(SITE_URL),

    title: route.title,
    description: route.description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: "MatchPlug",
      title: route.title,
      description: route.description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: route.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: ["/og-image.jpg"],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <NuqsAdapter>
          <TanstackProvider>
            <AppHeader />
            {children}
            <Footer />
          </TanstackProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
