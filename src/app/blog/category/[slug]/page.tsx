"use client";

import { Posts } from "@/components/sections/Posts";
import React from "react";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);

  return (
    <div className="mt-20 max-w-4xl mx-auto px-4 py-10">
      <Posts slug={slug} />
    </div>
  );
}
