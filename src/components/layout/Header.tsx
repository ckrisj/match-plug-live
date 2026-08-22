"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { twMerge } from "tailwind-merge";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [date, setDate] = useQueryState("date");

  const path = usePathname();

  const router = useRouter()

  useMemo(() => {
    if (path === "/") {
      setDate(null);

      return;
    }
  }, [path]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={twMerge(
        `fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-gray-800`,
        isMobileMenuOpen && "bg-black"
      )}
    >
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href={"/"} onClick={closeMobileMenu}>
              <Logo />
            </Link>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-gray-300 transition-colors duration-200 font-medium underline decoration-2 underline-offset-4"
            >
              Home
            </Link>
            <Link
              href="/#prediction"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Predictions
            </Link>
            <Link
              href="/#tips"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Betting tips
            </Link>
            <Link
              href="https://match-plug-landing-1.vercel.app/how-to-subscribe"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              How to subscribe
            </Link>
            <Link
            onClick={()=>{
              router.replace("/blog")
            }}
              href="/blog"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              News
            </Link>
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center">
            <Link href="https://user.matchplug.com/auth/login">
              <button className="bg-white hover:bg-gray-100 text-black font-semibold px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 cursor-pointer">
                Login
              </button>
            </Link>
          </div>

          {/* Mobile Burger Button */}
          <div className="md:hidden flex items-center justify-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span
                  className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <nav className="flex flex-col space-y-4 mt-4">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="text-white hover:text-gray-300 transition-colors duration-200 font-medium py-2 underline decoration-2 underline-offset-4"
            >
              Home
            </Link>
            <Link
              href="#prediction"
              onClick={closeMobileMenu}
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2"
            >
              Predictions
            </Link>
            <Link
              href="#tips"
              onClick={closeMobileMenu}
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2"
            >
              Betting tips
            </Link>
            <Link
              href="https://match-plug-landing-1.vercel.app/how-to-subscribe"
              onClick={closeMobileMenu}
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2"
            >
              How to subscribe
            </Link>
            <Link
              href="/blog"
              onClick={closeMobileMenu}
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2"
            >
              News
            </Link>

            {/* Mobile Login Button */}
            <div className="pt-4 border-t border-gray-700">
              <Link
                href="https://user.matchplug.com/auth/login"
                onClick={closeMobileMenu}
              >
                <button className="w-full bg-white hover:bg-gray-100 text-black font-semibold px-6 py-2 rounded-full transition-all duration-200 cursor-pointer">
                  Login
                </button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
