"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import CategoryHeader from "./CategoryHeader";

export const AppHeader = () => {
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/blog")) {
    return <CategoryHeader />;
  }

  return <Header />;
};
