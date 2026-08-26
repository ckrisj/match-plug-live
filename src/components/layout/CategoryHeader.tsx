"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { twMerge } from "tailwind-merge";
import { useGetData } from "@/app/Hooks/useGetData";
import headerData from "@/components/utils/Collection/header-menu-response.json";
import axios from "axios";
import { handleClick } from "../utils/helper";
import { API_URL } from "../utils/constant";

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
  const searchRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchPosts, setSearchPosts] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { data } = useGetData<MenuResponse>({
    key: ["header-categories"],
    path: "menu/left-menu",
    initialData: headerData,
  });
  const getSearchPosts = async (searchValue: string) => {
    if (!searchValue.trim()) {
      setSearchPosts([]);
      return;
    }

    try {
      setIsSearching(true);

      const response = await axios.get(`${API_URL}/wp-json/wp/v2/posts`, {
        params: {
          search: searchValue,
          // per_page: 100,
          // page: 1,
          orderby: "date",
          order: "desc",
        },
      });

      setSearchPosts(response.data);
    } catch (error) {
      console.error("Search API Error:", error);
      setSearchPosts([]);
    } finally {
      setIsSearching(false);
    }
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        getSearchPosts(search);
      } else {
        setSearchPosts([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearch("");
        setSearchPosts([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header
      className={twMerge(
        `fixed top-0 left-0 right-0 z-50 bg-black/80 border-b border-gray-800`,
        isMobileMenuOpen && "bg-black",
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
          <div className="hidden md:flex items-center" >
            <div ref={searchRef} className="relative">
              {/* Search Input */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-64 rounded-md bg-white px-3 py-2 text-sm text-black outline-none"
              />

              {/* Search Results */}
              {search?.trim() && (
                <div className="absolute right-0 top-full z-50 mt-2 max-h-[450px] w-96 overflow-y-auto overflow-x-hidden rounded-md bg-white shadow-xl">
                  {isSearching ? (
                    <div className="p-4 text-sm text-gray-500">
                      Searching...
                    </div>
                  ) : searchPosts.length === 0 ? (
                    <div className="p-4 text-sm text-gray-500">
                      No posts found
                    </div>
                  ) : (
                    <div>
                      {searchPosts?.map((post) => {
                        const image =
                          post?.jetpack_featured_media_url || "/person.webp";
                        return (
                          <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            onClick={() => {
                              handleClick(post.id);
                              setSearch("");
                              setSearchPosts([]);
                            }}
                            className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 text-sm text-gray-800 transition hover:bg-gray-100"
                          >
                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md">
                              {image ? (
                                <img
                                  src={image}
                                  alt={post.title?.rendered || "Post image"}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs text-gray-500">
                                  No Image
                                </div>
                              )}
                            </div>

                            <div
                              className="line-clamp-2"
                              dangerouslySetInnerHTML={{
                                __html: post.title?.rendered || "",
                              }}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
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
