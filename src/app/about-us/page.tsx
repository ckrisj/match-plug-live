import Link from "next/link";

/* ---------------------------------------------------------------- content -- */

const INTRO =
  "Matchplug is a soccer prediction service publishing free win draw win, over/under goals, both teams to score and correct score tips across more than 40 leagues. It has operated since 2017. Predictions are produced by a statistical model reviewed by human analysts. Every published prediction is logged, and the resulting accuracy record is public.";

const WHAT_WE_DO = [
  "Matchplug publishes predictions for every fixture it covers, released each morning and updated as team news lands. The core markets are win draw win (1X2), over and under 2.5 goals, both teams to score, correct score, and daily accumulators. Live in-play tips recalculate during matches, within 60 seconds of a goal, red card or significant change in expected goals.",
  "All predictions are free to read on the site. A paid VIP tier on Telegram adds higher-stake selections, earlier release times and staking guidance. Matchplug also earns commission when readers open accounts with listed bookmakers. This is disclosed on every page carrying an affiliate link and does not affect which selections are published or how they are ranked.",
];

const COMPARISON_INTRO =
  "Soccer prediction sites fall broadly into three groups. Statistical sites such as Forebet and PredictZ publish model output across many leagues, but cover prematch markets only and do not publish a verified hit rate. US-facing picks sites such as Pickwise lead on NFL, NBA and MLB with soccer as a secondary market, and are built on expert commentary rather than a published record. Tipster blogs and Telegram channels publish selections with no methodology and no auditable history at all.";

const COMPARISON_POINTS = [
  "Predictions update during matches, not pre-match only",
  "Coverage is soccer-first across European, African, Asian and American leagues, rather than US-sports-first",
  "Every prediction is logged, so the accuracy record can be audited — including losses",
  "The method is published, so a reader can see what the model uses and where analysts override it",
];

const WHO_ITS_FOR = [
  "Matchplug is used by bettors in Nigeria, Kenya, Ghana, South Africa, the United Kingdom, India, Australia, Canada and the United States. All content is published in English, with kick-off times shown in the reader’s local timezone. Users must be of legal gambling age in their jurisdiction — 18 in most markets, 21 in the United States.",
  "The service suits bettors who want the reasoning behind a selection rather than the selection alone. Every prediction shows the form, head-to-head record and expected-goals data it was built from, so a reader can examine the argument and disagree with it.",
];

const WONT_TELL_YOU = [
  "No prediction service can guarantee an outcome. Matchplug does not publish “sure wins”, fixed matches, or guaranteed returns. Win draw win predictions from statistical models typically land between 50% and 60% across a full season; anyone claiming materially more than that over a large sample is not measuring honestly.",
  "The model does not know about injuries announced after publication, late tactical changes, or matches where one team has nothing left to play for. It is weaker in the opening rounds of a season before form data accumulates, and weaker in cup competitions where rotation is heavy.",
  "Predictions are analysis, not advice. The financial risk of any bet is the reader’s alone. If betting has stopped being entertainment, stop and seek support — BeGambleAware (UK), Gambling Help Online (AU), or your national service.",
];

const METHOD_INTRO =
  "Every Matchplug prediction starts as a probability, not a pick. The model produces a percentage for each possible outcome of a match — home win, draw, away win, and each goals line — and a selection is only published when that probability differs enough from the bookmaker’s implied price to be worth acting on.";

const DATA_INTRO =
  "The model is trained on completed matches from the leagues it covers and reads the following for every fixture:";

const DATA_POINTS = [
  "Results and expected goals (xG) for both teams, weighted toward recent matches",
  "Shot quality and volume, not just goals scored — a team creating chances without converting is treated differently to a team that isn’t creating",
  "Home and away form split separately, because most teams are materially different in each",
  "Head-to-head record, discounted heavily where it’s older than two seasons or in a different competition",
  "Rest days and fixture congestion, including midweek European travel",
  "League-specific scoring baselines — an over 2.5 line means something different in the Eredivisie to Ligue 1",
  "Confirmed team news and lineups where available before kickoff",
];

const OVERRIDES = [
  "Analysts review every fixture where the model disagrees sharply with the bookmaker price, because a large disagreement usually means one of two things: a genuine market inefficiency, or information the model does not have.",
  "Overrides typically happen for: confirmed absences announced after the model ran; a manager change inside the last two matches; a dead-rubber fixture where one side has already secured its position; extreme weather; and derby or relegation matches where historical form is a poor guide. Where an analyst overrides the model, the published prediction says so.",
];

const COVERAGE_INTRO =
  "Matchplug covers more than 40 competitions. Predictions are published for every fixture in the leagues below, with kick-off times shown in your local timezone. Coverage depth is highest in leagues with a full season of played rounds; newly promoted teams and early-season fixtures carry wider confidence bands.";

const COVERAGE_OUTRO =
  "Matchplug is used by bettors across Africa, Europe, Asia, North America and Australia, with the largest communities in Nigeria, Kenya, Ghana, South Africa, the United Kingdom and India. Predictions are published in English for every market.";

/**
 * Each competition links to the official league or governing-body homepage.
 * Where a league has no working site of its own, the link points at the
 * national federation that runs it — the Kenyan Premier League is Football
 * Kenya Federation, for example, since fkfpl.co.ke no longer resolves.
 */
const REGIONS: {
  region: string;
  competitions: { name: string; url: string }[];
}[] = [
  {
    region: "Europe",
    competitions: [
      { name: "Premier League", url: "https://www.premierleague.com" },
      { name: "Championship", url: "https://www.efl.com" },
      { name: "La Liga", url: "https://www.laliga.com" },
      { name: "Serie A", url: "https://www.legaseriea.it" },
      { name: "Bundesliga", url: "https://www.bundesliga.com" },
      { name: "Ligue 1", url: "https://www.ligue1.com" },
      { name: "Eredivisie", url: "https://eredivisie.nl" },
      { name: "Primeira Liga", url: "https://www.ligaportugal.pt" },
      { name: "Scottish Premiership", url: "https://spfl.co.uk" },
      { name: "Süper Lig", url: "https://www.tff.org" },
      { name: "Belgian Pro League", url: "https://www.proleague.be" },
      {
        name: "UEFA Champions League",
        url: "https://www.uefa.com/uefachampionsleague/",
      },
      {
        name: "UEFA Europa League",
        url: "https://www.uefa.com/uefaeuropaleague/",
      },
    ],
  },
  {
    region: "Africa",
    competitions: [
      { name: "Nigeria NPFL", url: "https://npfl.com.ng" },
      { name: "Kenyan Premier League", url: "https://footballkenya.org" },
      { name: "South African PSL", url: "https://www.psl.co.za" },
      { name: "Ghana Premier League", url: "https://ghanafa.org" },
      { name: "Egyptian Premier League", url: "https://www.efa.com.eg" },
      { name: "Tanzanian Premier League", url: "https://tff.or.tz" },
      { name: "CAF Champions League", url: "https://www.cafonline.com" },
      { name: "Africa Cup of Nations", url: "https://www.cafonline.com" },
    ],
  },
  {
    region: "Americas and Asia-Pacific",
    competitions: [
      { name: "MLS", url: "https://www.mlssoccer.com" },
      { name: "Liga MX", url: "https://www.ligamx.net" },
      { name: "Brasileirão Série A", url: "https://www.cbf.com.br" },
      { name: "Argentine Primera División", url: "https://www.afa.com.ar" },
      { name: "Copa Libertadores", url: "https://www.conmebol.com" },
      { name: "A-League", url: "https://aleagues.com.au" },
      { name: "J1 League", url: "https://www.jleague.jp" },
      { name: "K League 1", url: "https://www.kleague.com" },
      { name: "Indian Super League", url: "https://www.indiansuperleague.com" },
      { name: "Chinese Super League", url: "https://www.thecfa.cn" },
    ],
  },
];

const GUIDES_INTRO =
  "Plain-English explanations of the markets, terms and maths behind soccer betting. No signup, no upsell — these exist because a bettor who understands a market makes better use of a prediction than one who doesn’t.";

const GUIDES = [
  {
    title: "What Is Win Draw Win (1X2)?",
    body: "Win draw win, also written as 1X2, is a bet on the result of a match at full time: home win (1), draw (X) or away win (2). Extra time and penalties do not count — only the score after 90 minutes plus stoppage time. It is the most-bet market in soccer and the one with the most efficient prices.",
    href: "/guides/what-is-win-draw-win/",
  },
  {
    title: "What Is BTTS in Betting?",
    body: "BTTS stands for Both Teams To Score. The bet wins if each side scores at least one goal in the match, regardless of the final result — a 1-1 draw and a 4-3 win both settle as “yes”. The result of the match itself is irrelevant to the bet.",
    href: "/guides/what-is-btts/",
  },
  {
    title: "What Does Over 2.5 Goals Mean?",
    body: "Over 2.5 goals means the bet wins if the match produces three or more goals in total, counting both teams. The half-goal exists to remove the possibility of a tie: a match finishing 1-1 has two goals and loses, while 2-1 has three and wins. Only 90 minutes plus stoppage time counts.",
    href: "/guides/over-2-5-meaning/",
  },
  {
    title: "How to Read Betting Odds",
    body: "Betting odds express how much a bet returns and how likely the bookmaker thinks the outcome is. Decimal odds of 2.50 return 2.5 times your stake including it, and imply a 40% chance (1 ÷ 2.50). Fractional odds of 6/4 mean six units of profit for every four staked. Converting odds to a percentage is how you tell whether a price is worth taking.",
    href: "/guides/how-to-read-odds/",
  },
];

/* --------------------------------------------------------------- partials -- */

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="mb-5 text-2xl font-bold text-white md:text-3xl">{children}</h2>
);

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="mb-3 mt-8 text-lg font-bold text-[#03DD3C] md:text-xl">
    {children}
  </h3>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mb-4 text-base leading-relaxed text-gray-200 md:text-lg">
    {children}
  </p>
);

const Bullets: React.FC<{ items: readonly string[] }> = ({ items }) => (
  <ul className="mb-4 space-y-2.5">
    {items.map((item) => (
      <li
        key={item}
        className="relative pl-6 text-base leading-relaxed text-gray-200 md:text-lg"
      >
        <span className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-[#03DD3C]" />
        {item}
      </li>
    ))}
  </ul>
);

/* ------------------------------------------------------------------- page -- */

export default function AboutUsPage() {
  return (
    <div id="about-us" className="flex flex-col bg-gray-900 pt-10">
      <div className="mx-auto w-full max-w-4xl px-6 py-12">
        {/* About Matchplug */}
        <section>
          <H2>About Matchplug</H2>
          <P>{INTRO}</P>

          <H3>What Matchplug Does</H3>
          {WHAT_WE_DO.map((para) => (
            <P key={para.slice(0, 40)}>{para}</P>
          ))}

          <H3>How Matchplug Compares to Other Tipster Sites</H3>
          <P>{COMPARISON_INTRO}</P>
          <P>Matchplug’s differences are specific and checkable:</P>
          <Bullets items={COMPARISON_POINTS} />
          <P>
            Full comparisons:{" "}
            <Link
              href="/matchplug-vs-pickwise/"
              className="text-[#03DD3C] underline hover:no-underline"
            >
              Matchplug vs Pickwise
            </Link>{" "}
            ·{" "}
            <Link
              href="/best-soccer-predictionsites/"
              className="text-[#03DD3C] underline hover:no-underline"
            >
              Best soccer prediction sites compared
            </Link>
          </P>

          <H3>Who Matchplug Is For</H3>
          {WHO_ITS_FOR.map((para) => (
            <P key={para.slice(0, 40)}>{para}</P>
          ))}

          <H3>What Matchplug Will Not Tell You</H3>
          {WONT_TELL_YOU.map((para) => (
            <P key={para.slice(0, 40)}>{para}</P>
          ))}
        </section>

        {/* Method */}
        <section className="mt-16">
          <H2>How Matchplug Makes Its Predictions</H2>
          <P>{METHOD_INTRO}</P>

          <H3>The Data Behind Each Prediction</H3>
          <P>{DATA_INTRO}</P>
          <Bullets items={DATA_POINTS} />

          <H3>Where Human Analysts Override the Model</H3>
          {OVERRIDES.map((para) => (
            <P key={para.slice(0, 40)}>{para}</P>
          ))}
        </section>

        {/* Coverage */}
        <section className="mt-16">
          <H2>Leagues and Competitions We Cover</H2>
          <P>{COVERAGE_INTRO}</P>

          {REGIONS.map(({ region, competitions }) => (
            <div key={region}>
              <H3>{region}</H3>
              <ul className="mb-4 flex flex-wrap gap-x-2 gap-y-1.5 text-base leading-relaxed text-gray-200 md:text-lg">
                {competitions.map(({ name, url }, index) => (
                  <li key={name} className="flex items-center gap-2">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-gray-600 underline-offset-2 transition-colors hover:text-[#03DD3C] hover:decoration-[#03DD3C]"
                    >
                      {name}
                    </a>
                    {index < competitions.length - 1 && (
                      <span aria-hidden="true" className="text-gray-500">
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <P>{COVERAGE_OUTRO}</P>
        </section>

        {/* Guides */}
        <section className="mt-16">
          <H2>Free Soccer Betting Guides</H2>
          <P>{GUIDES_INTRO}</P>

          {GUIDES.map(({ title, body, href }) => (
            <div key={href}>
              <H3>{title}</H3>
              <P>{body}</P>
              <Link
                href={href}
                className="mb-4 inline-block text-base font-medium text-[#03DD3C] underline hover:no-underline md:text-lg"
              >
                Read the guide
              </Link>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
