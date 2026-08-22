"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetData } from "@/app/Hooks/useGetData";
import footerResponse from "@/components/utils/Collection/footer-menu-response.json";

type MenuItem = {
  id: number;
  title: string;
  url: string;
  slug: string;
  parent: string;
  object: string; // narrowed since we only saw these values
};

type MenuResponse = {
  success: boolean;
  menu: string;
  items: MenuItem[];
};

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <Link
    href={href}
    className="block text-white hover:opacity-80 transition-opacity"
  >
    {children}
  </Link>
);

const FooterSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div>
    <h3 className="text-2xl font-bold text-white mb-8">{title}</h3>
    {children}
  </div>
);

const PaymentIcon: React.FC<{
  src: string;
  alt: string;
  width: number;
  height: number;
}> = ({ src, alt, width, height }) => (
  <div className=" rounded flex items-center justify-center p-2">
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="object-contain w-20"
    />
  </div>
);

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <Link
    target="_blank"
    href={href}
    className="text-white hover:opacity-80 transition-opacity"
  >
    {children}
  </Link>
);

const Footer: React.FC = () => {
  const quickLinks = [
    { name: "News", url: "/blog" },
    { name: "Livescores", url: "#" },
    { name: "Predictions", url: "#prediction" },
    { name: "Match Previews", url: "#" },
    {
      name: "NHL Experts Picks",
      url: "/sports-betting-tips-NHL-predictions-and-tips",
    },
    {
      name: "NFL Picks for Free",
      url: "/sports-betting-tips-NFL-predictions-and-tips",
    },
    { name: "Jackpot Bet Codes", url: "#jackpot-bet-codes" },
    {
      name: "MLB Best Bets Today",
      url: "/sports-betting-tips-MLB-predictions-and-tips",
    },
    { name: "American Sports Picks", url: "#collapseFour" },
  ];

  const categories = [
    "America Sports Previews ",
    "MLS Predictions",
    "FA Cup Predictions",
    "American Sports News",
    "French Ligue Predictions",
    "Italian Serie A Predictions",
    "Europa League Predictions",
    "Spanish La Liga Predictions",
    "Premier League Predictions",
    "European League Predictions",
    "German Bundesliga Predictions",
    "USA World Cup 2026 Predictions",
  ];

  const informationLinks = [
    { src: "#about-us", label: "About us" },
    { src: "/partners", label: "Partners" },
    { src: "/disclaimer", label: "Disclaimers" },
    {
      src: "https://user.matchplug.com/auth/register/",
      label: "Join Matchplug",
    },
    { src: "/how-to-subscribe", label: "How to subscribe" },
    { src: "/terms-of-service", label: "Terms and Conditions" },
  ];

  const paymentMethods = [
    { src: "/g1.png", alt: "Bitcoin", width: 100, height: 55 },
    { src: "/g2.png", alt: "M-Pesa", width: 109, height: 65 },
    { src: "/g3.png", alt: "Smart Money", width: 109, height: 65 },
    { src: "/g4.png", alt: "PayPal", width: 87, height: 42 },
    { src: "/g5.png", alt: "Skrill", width: 87, height: 43 },
    {
      src: "/g6.png",
      alt: "Mastercard",
      width: 87,
      height: 59,
    },
    { src: "/g7.png", alt: "Mobile Money", width: 87, height: 59 },
  ];

  const { data: categoriesResponse } = useGetData<MenuResponse>({
    key: ["footer-menu"],
    path: "menu/footerMenu",
    initialData: footerResponse,
  });

  return (
    <footer className="bg-[#272727] text-white">
      <div className="container max-w-[100rem] mx-auto px-4 pt-16 pb-8">
        <div className="flex gap-24 mb-12 flex-col xl:flex-row">
          {/* Main Content Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Stop Playing and Start Winning With MatchPlug.
            </h2>
            <p className="text-base mb-8 max-w-sm">
              Matchplug offers Sure win Prediction today and we use analytics to
              create accurate football predictions which involves direct win
              prediction to help you win big.
            </p>

            {/* BeGambleAware Section */}
            <div className="mb-6">
              <div className="bg-white rounded mb-4 p-2 w-fit">
                <a href="https://www.gamblingcommission.gov.uk/authorities/codes-of-practice/3">
                  <Image
                    src="/footer1.png"
                    alt="BeGambleAware"
                    width={287}
                    height={63}
                    className="object-contain"
                  />
                </a>
              </div>
              <p className="text-base max-w-sm">
                <Link href="https://www.gambleaware.org/home/" target="_blank">
                  BeGambleAware.org
                </Link>{" "}
                aims to promote responsibility in gambling. They provide
                information to help you make informed decisions about your
                gambling.{" "}
                <span className="font-bold">
                  Call the National Gambling Helpline 0808 8020 133 8am to
                  midnight, 7 days a week.
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-12 justify-between w-full md:flex-row flex-col">
            {/* Quick Links */}
            <FooterSection title="Quick Links">
              <div className="space-y-4">
                {quickLinks.map((link, index) => (
                  <FooterLink key={index} href={link.url}>
                    {link.name}
                  </FooterLink>
                ))}
              </div>
            </FooterSection>

            <div className="h- w-px bg-white/40 md:flex hidden"></div>

            {/* Categories */}
            <FooterSection title="Categories">
              <div className="space-y-4">
                {categoriesResponse?.items?.map((category, index) => (
                  <FooterLink
                    key={index}
                    href={`/blog/category/${category.slug}`}
                  >
                    {category.title}
                  </FooterLink>
                ))}
              </div>
            </FooterSection>
            <div className=" w-px bg-white/40 md:flex hidden"></div>

            {/* Information & Contact */}
            <div>
              <FooterSection title="Information">
                <div className="space-y-4 mb-8">
                  {informationLinks.map(({ label, src }, index) => (
                    <FooterLink key={index} href={src}>
                      {label}
                    </FooterLink>
                  ))}
                </div>
              </FooterSection>

              {/* Contact Section */}
              <FooterSection title="Contact us">
                <div className="text-base space-y-1">
                  <p>
                    WhatsApp : <b>+1 (307) 218-5698</b>
                  </p>
                  <p>
                    Email : <b>hello@matchplug.com</b>
                  </p>
                  <p>
                    Telegram : <b>@matchplugvip</b>
                  </p>
                </div>
              </FooterSection>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {paymentMethods.map((method, index) => (
              <PaymentIcon key={index} {...method} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-white mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <p className="text-lg">© Matchplug.com 2025. All rights reserved.</p>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4 items-center">
            <Link href="https://www.gamcare.org.uk/">
              <Image
                src="/f1.jpeg"
                alt="Trust Badges"
                width={100}
                height={100}
                className="aspect-auto mix-blend-color-dodge object-cover"
              />
            </Link>
            <Link href="https://www.gamblingcommission.gov.uk/authorities/codes-of-practice/3">
              <Image
                src="/f4.jpeg"
                alt="Trust Badges"
                width={100}
                height={100}
                className="aspect-auto mix-blend-color-dodge object-cover"
              />
            </Link>
            <Link href="https://www.begambleaware.org/">
              <Image
                src="/f2.jpeg"
                alt="Trust Badges"
                width={100}
                height={100}
                className="aspect-auto mix-blend-color-dodge object-cover"
              />
            </Link>
            <Link href="https://gamblingtherapy.org/">
              <Image
                src="/f5.jpeg"
                alt="Trust Badges"
                width={100}
                height={100}
                className="aspect-auto mix-blend-color-dodge object-cover"
              />
            </Link>
            <Link href="https://www.raig.org/">
              <Image
                src="/f3.jpeg"
                alt="Trust Badges"
                width={100}
                height={100}
                className="aspect-auto mix-blend-color-dodge object-cover"
              />
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            <SocialIcon href="https://www.facebook.com/people/Matchplug-Sports/100083070081996/?ref=page_internal#">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.333v21.333C0 23.403.597 24 1.325 24h11.497v-9.294H9.691V11.01h3.131V8.414c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.505 0-1.797.716-1.797 1.767v2.317h3.59l-.467 3.696h-3.123V24h6.127C23.403 24 24 23.403 24 22.667V1.333C24 .597 23.403 0 22.675 0z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://t.me/MATCHPLUG">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.999 15.2l-.4 5.6c.6 0 .9-.3 1.3-.7l3.1-3 6.4 4.7c1.2.7 2 .3 2.3-1.1L24 2.6c.4-1.6-.6-2.3-1.8-1.9L1.6 8.8c-1.5.6-1.5 1.5-.3 1.9l5.8 1.8L19.6 6c.6-.4 1.2-.2.7.2" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://www.instagram.com/matchplug/?hl=en">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.070-4.85.070-3.204 0-3.584-.012-4.849-.070-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://x.com/matchplugsports/status/1510252826907357189?s=21&t=77pQtxBn5ra7T4IF0tMivQ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                className="w-7 h-7"
                viewBox="0 0 50 50"
                fill="currentColor"
              >
                <path d="M 11 4 C 7.1456661 4 4 7.1456661 4 11 L 4 39 C 4 42.854334 7.1456661 46 11 46 L 39 46 C 42.854334 46 46 42.854334 46 39 L 46 11 C 46 7.1456661 42.854334 4 39 4 L 11 4 z M 11 6 L 39 6 C 41.773666 6 44 8.2263339 44 11 L 44 39 C 44 41.773666 41.773666 44 39 44 L 11 44 C 8.2263339 44 6 41.773666 6 39 L 6 11 C 6 8.2263339 8.2263339 6 11 6 z M 13.085938 13 L 22.308594 26.103516 L 13 37 L 15.5 37 L 23.4375 27.707031 L 29.976562 37 L 37.914062 37 L 27.789062 22.613281 L 36 13 L 33.5 13 L 26.660156 21.009766 L 21.023438 13 L 13.085938 13 z M 16.914062 15 L 19.978516 15 L 34.085938 35 L 31.021484 35 L 16.914062 15 z"></path>
              </svg>
            </SocialIcon>
            <SocialIcon href="https://www.youtube.com/channel/UC_Ihs6IxXkUeMzW56mOwplw/featured">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="http://linkedin.com/company/matchplug/?viewAsMember=true">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        {/* MP Logo at bottom */}
        <div className="flex justify-center mt-8">
          {/* <img
            src="/footer2.png"
            alt="MatchPlug Logo"
            width={1485}
            height={222}
            className="object-contain max-w-full h-auto"
          /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
