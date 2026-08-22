"use client";
import React, { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { twMerge } from "tailwind-merge";
import { useGetData } from "@/app/Hooks/useGetData";
import headerData from "@/components/utils/Collection/header-menu-response.json";

type MenuItem = {
  id: number;
  title: string;
  url: string;
  slug: string;
  parent: string;
  object: string;
};

type MenuResponse = {
  success: boolean;
  menu: string;
  items: MenuItem[];
};

const CategoryHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data } = useGetData<MenuResponse>({
    key: ["header-categories"],
    path: "menu/left-menu",
    initialData: headerData,
  });

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

          <nav className="hidden md:flex items-center space-x-8">
            {data?.items.map((item) => (
              <Link
                key={item.slug}
                href={!item.slug ? "/" : `/blog/category/${item.slug}`}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.title}
              </Link>
            ))}
          </nav>

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
            {data?.items.map((item) => (
              <Link
                key={item.slug}
                onClick={closeMobileMenu}
                href={!item.slug ? "/" : `/blog/category/${item.slug}`}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default CategoryHeader;
