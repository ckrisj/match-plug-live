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
        statusCode: 301,
      },
      {
        source: "/how-to-subscribe.php",
        destination: "/how-to-subscribe",
        statusCode: 301,
      },
      {
        source: "/partners.php",
        destination: "/partners",
        statusCode: 301,
      },
      {
        source: "/terms-of-service.php",
        destination: "/terms-of-service",
        statusCode: 301,
      },
      {
        source: "/diclaimer.php",
        destination: "/disclaimer",
        statusCode: 301,
      },
      {
        source: "/auth/login.php",
        destination: `${process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL}/auth/login`,
        statusCode: 301,
      },
      {
        source: "/auth/signup.php",
        destination: `${process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL}/auth/register`,
        statusCode: 301,
      },
      {
        source: "/auth/forgot-password.php",
        destination: `${process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL}/auth/password-reset/request`,
        statusCode: 301,
      },
      // Legacy .php URLs from the pre-Next site. These returned 200 with an
      // empty shell until the [slug] route started calling notFound(); a 301
      // passes their history to the replacement page instead of 404ing it.
      {
        source: "/about-us.php",
        destination: "/about-us",
        statusCode: 301,
      },
      {
        source: "/disclaimer.php",
        destination: "/disclaimer",
        statusCode: 301,
      },
      {
        source: "/blog.php",
        destination: "/blog",
        statusCode: 301,
      },
      {
        source: "/contact.php",
        // No standalone contact route exists; about-us carries the contact
        // details. Repoint if the cutover map says otherwise.
        destination: "/about-us",
        statusCode: 301,
      },
      {
        source: "/login.php",
        destination: `${process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL}/auth/login`,
        statusCode: 301,
      },
      {
        source: "/signup.php",
        destination: `${process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL}/auth/register`,
        statusCode: 301,
      },
      // The legacy per-market prediction pages carried the market in a query
      // string, which `source` cannot match — hence the `has` clause. Until the
      // cutover map supplies the id -> market pairs these land on the homepage
      // predictions section rather than a 404.
      {
        source: "/free-prediction.php",
        has: [{ type: "query", key: "id" }],
        destination: "/#prediction",
        statusCode: 301,
      },
      {
        source: "/free-prediction.php",
        destination: "/#prediction",
        statusCode: 301,
      },
      // Slugs that had a title entry but never a page, so they served an empty
      // shell. Point them at the market that actually covers them.
      {
        source: "/sports-betting-tips-player-picks-predictions-and-tips",
        destination: "/free-football-predictions-player-specials-and-tips",
        statusCode: 301,
      },
      {
        source: "/sports-betting-tips-NCAAB-picks-predictions-and-tips",
        destination: "/sports-betting-tips-NCAAB-predictions-and-tips",
        statusCode: 301,
      },
      {
        source: "/sports-betting-tips-NCAAF-Picks-predictions-and-tips",
        destination: "/sports-betting-tips-NCAAF-predictions-and-tips",
        statusCode: 301,
      },
      // Paths from the on-page build sheet (matchplug-onpage-simple-50-urls.docx).
      {
        source: "/predictions/win-draw-win",
        destination: "/free-football-predictions-1x2",
        statusCode: 301,
      },
      {
        source: "/predictions/over-2-5-goals",
        destination: "/free-football-prediction-over-2.5-goals",
        statusCode: 301,
      },
      {
        source: "/predictions/btts",
        destination: "/free-football-predictions-both-team-to-score",
        statusCode: 301,
      },
      {
        source: "/predictions/draw",
        destination: "/free-football-predictions-draw-predictions-and-tips",
        statusCode: 301,
      },
      {
        source: "/predictions/under-2-5-goals",
        destination: "/free-football-predictions-under-2.5-goals",
        statusCode: 301,
      },
      {
        source: "/predictions/over-1-5-goals",
        destination: "/free-football-predictions-over-1.5-goals",
        statusCode: 301,
      },
      {
        source: "/predictions/correct-score",
        destination: "/free-football-predictions-correct-score-and-tips",
        statusCode: 301,
      },
      {
        source: "/predictions/first-half-goals",
        destination: "/free-football-predictions-goal-first-half",
        statusCode: 301,
      },
      {
        source: "/predictions/Mix-chance",
        destination: "/free-football-predictions-mix-chance",
        statusCode: 301,
      },
      {
        source: "/predictions/handicap",
        destination: "/free-football-predictions-handicap-predictions",
        statusCode: 301,
      },
      {
        source: "/predictions/cards",
        destination: "/free-football-predictions-cards-predictions-and-tips",
        statusCode: 301,
      },
      {
        source: "/predictions/player-tips",
        destination: "/free-football-predictions-player-specials-and-tips",
        statusCode: 301,
      },
      {
        source: "/predictions/bet-builder",
        destination: "/free-football-predictions-bet-builders-predictions-and-tips",
        statusCode: 301,
      },
      {
        source: "/picks/nfl",
        destination: "/sports-betting-tips-NFL-predictions-and-tips",
        statusCode: 301,
      },
      {
        source: "/picks/nba",
        destination: "/sports-betting-tips-NBA-predictions-and-tips",
        statusCode: 301,
      },
      {
        source: "/picks/mlb",
        destination: "/sports-betting-tips-MLB-predictions-and-tips",
        statusCode: 301,
      },
      {
        source: "/picks/nhl",
        destination: "/sports-betting-tips-NHL-predictions-and-tips",
        statusCode: 301,
      },
      {
        source: "/picks/ncaab",
        destination: "/sports-betting-tips-NCAAB-predictions-and-tips",
        statusCode: 301,
      },
      {
        source: "/picks/ncaaf",
        destination: "/sports-betting-tips-NCAAF-predictions-and-tips",
        statusCode: 301,
      },
      {
        source: "/about",
        destination: "/about-us",
        statusCode: 301,
      },
      // Any remaining legacy .php path maps to its slug equivalent. Listed last
      // so the specific rules above take precedence.
      {
        source: "/:slug(.*)\\.php",
        destination: "/:slug",
        statusCode: 301,
      },
      // TODO: the client's "Answers for the freelancer — exact URLs" sheet is
      // still needed for the per-id /free-prediction.php?id=N targets.
      // need the client's URL list — 34 of 39 are not represented here.
    ];
  },
};

module.exports = nextConfig;
