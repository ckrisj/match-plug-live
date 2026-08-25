// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["matchplug.com", "localhost", "user.matchplug.com","wp.matchplug.com"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/predictions",
  //       destination: `${process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL}/api/predictions`,
  //     },
  //     {
  //       source: "/api/affiliates",
  //       destination: `${process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL}/api/affiliates`,
  //     },
  //     {
  //       source: "/api/sure-win-prediction",
  //       destination: `${process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL}/api/sure-win-prediction`,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
