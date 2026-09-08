import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { TanstackProvider } from "../components/TanstackProvider";
import { SITE_URL } from "@/components/utils/constant";
import Footer from "@/components/layout/Footer";
import { AppHeader } from "@/components/layout/AppHeader";
import { NuqsAdapter } from "nuqs/adapters/react";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

/**
 * Site-wide defaults only. Per-route title, description, canonical and
 * og:image now come from each route's own metadata (see
 * src/app/lib/title.ts). This used to read an x-pathname header set by
 * middleware, which forced every route in the app to render dynamically.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Matchplug - Football Predictions & Betting Tips",
  description:
    "Expert football predictions, betting tips, and sports insights daily.",
  openGraph: {
    type: "website",
    siteName: "MatchPlug",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

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
