import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "../components/TanstackProvider";
import Footer from "@/components/layout/Footer";
import { AppHeader } from "@/components/layout/AppHeader";
import { NuqsAdapter } from "nuqs/adapters/react";
import { routeTitles } from "./lib/title";
import { headers } from "next/headers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export async function generateMetadata() {
  const pathname = (await (await headers()).get("x-pathname")) ?? "/";

  const title = routeTitles[pathname] ?? {
    title: "Matchplug - Football Predictions & Betting Tips",
    description:
      "Expert football predictions, betting tips, and sports insights daily.",
  };
  return { title: title.title, description: title.description };
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
