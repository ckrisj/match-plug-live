// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["matchplug.com", "localhost", "user.matchplug.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wp.matchplug.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/how-to-subscribe.php",
        destination: "/how-to-subscribe",
        permanent: true,
      },
      {
        source: "/partners.php",
        destination: "/partners",
        permanent: true,
      },
      {
        source: "/terms-of-service.php",
        destination: "/terms-of-service",
        permanent: true,
      },
      {
        source: "/diclaimer.php",
        destination: "/disclaimer",
        permanent: true,
      },
      {
        source: "/auth/login.php",
        destination: `${process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL}/auth/login`,
        permanent: true,
      },
      {
        source: "/auth/signup.php",
        destination: `${process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL}/auth/register`,
        permanent: true,
      },
      {
        source: "/auth/forgot-password.php",
        destination: `${process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL}/auth/password-reset/request`,
        permanent: true,
      },
      // remaining mappings from the supplied cutover config
    ];
  },
};

module.exports = nextConfig;
