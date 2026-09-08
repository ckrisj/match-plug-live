/**
 * Content for the /guides/* pages. The homepage has linked to these four URLs
 * since launch while the routes themselves 404'd, so the copy lives here and
 * src/app/guides/[slug]/page.tsx renders it.
 *
 * Every guide links out to the market page it explains, which is also the
 * internal-linking path from the homepage into the commercial pages.
 */

export interface GuideSection {
  heading: string;
  /** Each string renders as its own paragraph. */
  body: string[];
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  title: string;
  /** H1 on the guide page. */
  heading: string;
  /** One-line summary, used on the index and as the meta description. */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  /** Market page this guide explains. */
  related: { href: string; label: string }[];
}

export const guides: Guide[] = [
  {
    slug: "what-is-win-draw-win",
    title: "What is win draw win?",
    heading: "What is win draw win (1X2) betting?",
    summary:
      "The three-way match result market explained: what 1, X and 2 mean, when the bet settles, and how to read the odds.",
    metaTitle: "What Is Win Draw Win? 1X2 Betting Explained | Matchplug",
    metaDescription:
      "Win draw win, or 1X2, is a bet on the 90-minute result of a football match. What each selection covers, when it settles and how the odds are priced.",
    intro:
      "Win draw win is the oldest and most widely bet football market. Bookmakers list it as 1X2, and every fixture on a coupon carries one. If you only ever place one type of football bet, it is almost certainly this one.",
    sections: [
      {
        heading: "What 1, X and 2 mean",
        body: [
          "The three selections map onto the three possible results of a football match. 1 is a home win. X is a draw. 2 is an away win. You are backing exactly one of them, and only that one outcome pays.",
          "The shorthand comes from the fixed-odds coupons printed before online betting existed, and it stuck. A bookmaker showing Arsenal 1.75 / Draw 3.60 / Chelsea 4.20 is quoting 1, X and 2 in that order — home team first, always.",
        ],
      },
      {
        heading: "When the bet settles",
        body: [
          "Win draw win settles on 90 minutes plus stoppage time. Extra time and penalties do not count. This catches people out in cup competitions: if a knockout tie is level after 90 minutes and your team goes on to win in extra time, your 1X2 bet still settles as a draw and loses.",
          "That is the single most important rule in the market, and it is why the draw is worth more attention in cup football than in a league season.",
        ],
      },
      {
        heading: "How the odds are priced",
        body: [
          "Odds are a probability with the bookmaker's margin added. Decimal odds of 2.00 imply a 50% chance; 4.00 implies 25%. Add up the implied probabilities of all three selections and you will get something above 100% — usually between 103% and 108%. That overround is the bookmaker's built-in edge.",
          "A useful habit is to convert before you bet. Divide 100 by the decimal odds to get the implied percentage. If you think a home side wins more often than the number the price implies, that is a bet worth making. If you do not, the fact that they are 'the better team' is irrelevant — you are being asked to pay too much for the outcome.",
        ],
      },
      {
        heading: "Why the draw is the hardest selection",
        body: [
          "Roughly one in four matches in Europe's major leagues ends level, and draw odds for an evenly matched fixture usually sit between 3.20 and 3.60. Despite that, the draw is the most consistently mispriced outcome in football betting.",
          "The reason is structural: most models calculate a home win probability and an away win probability, then treat the draw as whatever is left over. Predicting it directly — by looking for well-organised sides, low-scoring fixtures, closely matched opponents and late-season matches where a point suits both teams — is a different exercise, and a more profitable one.",
        ],
      },
      {
        heading: "Where win draw win goes wrong",
        body: [
          "The common mistake is backing short-priced favourites in accumulators. A 1.20 shot has an implied 83% chance, so it loses about one time in six. String five of them together and the accumulator loses more often than it wins, even though every individual selection looked safe.",
          "The other is ignoring team news. A confirmed absence in a key position moves a 1X2 price more than almost any other factor, and prices move fast once line-ups are published an hour before kick-off.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does win draw win include extra time?",
        answer:
          "No. The market settles on the result after 90 minutes plus stoppage time. A cup tie decided in extra time or on penalties still settles as a draw for 1X2 purposes.",
      },
      {
        question: "What is the difference between 1X2 and double chance?",
        answer:
          "1X2 covers one of the three results. Double chance covers two of them at once — home or draw, away or draw, or home or away — at shorter odds.",
      },
      {
        question: "Is win draw win the same as match result?",
        answer:
          "Yes. Match result, full-time result, 1X2 and win draw win are all names for the same market.",
      },
    ],
    related: [
      {
        href: "/free-football-predictions-1x2",
        label: "Today's win draw win predictions",
      },
      {
        href: "/free-football-predictions-draw-predictions-and-tips",
        label: "Today's draw predictions",
      },
      {
        href: "/free-football-predictions-mix-chance",
        label: "Today's double chance predictions",
      },
    ],
  },
  {
    slug: "what-is-btts",
    title: "What is BTTS?",
    heading: "What is BTTS (both teams to score)?",
    summary:
      "Both teams to score explained: how it settles, why the result doesn't matter, and what actually drives the market.",
    metaTitle: "What Is BTTS? Both Teams to Score Explained | Matchplug",
    metaDescription:
      "BTTS wins if both sides score at least once in normal time, whatever the result. How the market settles, and the form data that actually predicts it.",
    intro:
      "BTTS stands for both teams to score. It is sometimes listed as GG (goal-goal) and NG (no goal). It has become one of the most popular football markets because it keeps a bet alive regardless of who wins.",
    sections: [
      {
        heading: "How BTTS settles",
        body: [
          "BTTS Yes wins if each side scores at least one goal in normal time. The final result is irrelevant: a 1-1 draw and a 4-3 win both settle as Yes. Any clean sheet — 1-0, 3-0, 0-0 — settles as No.",
          "As with most football markets, extra time and penalties are excluded. Own goals count for the team credited with the goal in the official record.",
        ],
      },
      {
        heading: "Why the result doesn't matter",
        body: [
          "This is the market's main appeal. Backing a 1X2 selection means picking a winner, and a late equaliser can undo 89 minutes of a bet going right. A BTTS Yes bet is settled the moment the second team scores, whenever that happens and whoever ends up winning.",
          "That also makes it a different analytical problem. You are not asking which team is better. You are asking two separate questions — can the home side score, and can the away side score — and both have to be yes.",
        ],
      },
      {
        heading: "What actually predicts BTTS",
        body: [
          "Scoring and conceding streaks matter more than league position. A mid-table side that scores in almost every match but keeps few clean sheets is a far better BTTS Yes candidate than a title contender that wins 1-0 every week.",
          "Home and away splits matter too. Many teams have a markedly different defensive record away from home, and the raw season-long numbers hide it. Expected goals for and against is the sharper version of the same read, because it strips out the finishing luck that makes a small sample look decisive.",
          "The other factor is game state. A heavy favourite that takes an early two-goal lead often shuts the match down, which suppresses both the opposition's chances and its own. Fixtures where neither side can comfortably control the game produce more BTTS Yes results.",
        ],
      },
      {
        heading: "BTTS No is a real bet",
        body: [
          "Most tipping content only ever backs Yes, which leaves half the market unexamined. BTTS No is the stronger read in defensive fixtures: a well-drilled side facing a team that has failed to score in several away matches is often better value on No than anything on the Yes side of the book.",
          "Because Yes attracts most of the recreational money, No is more frequently the side with value.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does an own goal count for BTTS?",
        answer:
          "Yes. An own goal is credited to the team it is scored for in the official record, and it counts towards that team scoring for BTTS purposes.",
      },
      {
        question: "What does GG mean in betting?",
        answer:
          "GG means goal-goal, another name for BTTS Yes. NG means no goal, which is BTTS No.",
      },
      {
        question: "Does BTTS include extra time?",
        answer:
          "No. BTTS settles on normal time only. Goals in extra time or a penalty shoot-out do not count.",
      },
    ],
    related: [
      {
        href: "/free-football-predictions-both-team-to-score",
        label: "Today's BTTS predictions",
      },
      {
        href: "/free-football-prediction-over-2.5-goals",
        label: "Today's over 2.5 goals predictions",
      },
    ],
  },
  {
    slug: "over-2-5-meaning",
    title: "What does over 2.5 mean?",
    heading: "What does over 2.5 goals mean?",
    summary:
      "Why the half-goal line exists, exactly what wins and loses, and how often matches actually clear 2.5 goals.",
    metaTitle: "What Does Over 2.5 Goals Mean? Explained | Matchplug",
    metaDescription:
      "Over 2.5 goals wins if a match ends with three or more goals in total. Why the line has a half in it, what counts, and how often it lands.",
    intro:
      "Over 2.5 goals is a bet that a match will end with three or more goals in total, counting both teams. It is the most heavily bet goals line in football, and the half in the number is doing specific work.",
    sections: [
      {
        heading: "Why the line is 2.5 and not 2 or 3",
        body: [
          "A line of 2.5 makes a draw impossible. Because no match can end with two and a half goals, every result falls clearly on one side: two goals or fewer loses, three or more wins. There is no push, no stake returned, no ambiguity.",
          "If the line were a whole number — over 2 goals — a match finishing 1-1 would land exactly on the line and the stake would be returned. Bookmakers use half-goal lines to remove that outcome and keep the market binary.",
        ],
      },
      {
        heading: "What counts towards the total",
        body: [
          "All goals scored by both teams in normal time, including penalties awarded during the match and own goals. Extra time and penalty shoot-outs do not count, which matters in knockout football.",
          "A 2-1 win, a 3-0 win and a 2-2 draw all settle as over 2.5. A 1-1 draw, a 2-0 win and a 0-0 all settle as under.",
        ],
      },
      {
        heading: "How often it actually lands",
        body: [
          "Across Europe's major leagues, roughly half of all matches finish with three or more goals. That average conceals a wide spread: defensive leagues sit nearer 40%, while the Bundesliga and Eredivisie regularly run above 60%.",
          "This is why blanket over 2.5 strategies fail. The base rate you are betting into depends heavily on which league you are looking at, and a price that is value in one competition is poor value in another.",
        ],
      },
      {
        heading: "What moves the number",
        body: [
          "Scoring and conceding form for both sides is the starting point, but expected goals is the more reliable signal because it is less distorted by a handful of unusual finishes.",
          "Beyond that: head-to-head history between the specific clubs, venue, and the referee. A referee who plays long stoppage time and awards penalties readily adds meaningfully to the goal expectation of a match, and it is the factor most often ignored.",
          "Game state matters here too. Two teams that both need a win produce more goals than two teams that would each accept a point.",
        ],
      },
      {
        heading: "Other goal lines",
        body: [
          "The same logic applies across the ladder. Over 1.5 goals wins on two or more and is the safest of the common lines, usually priced between 1.20 and 1.40. Over 3.5 needs four goals and pays considerably more.",
          "Under 2.5 is simply the other side of the same market: it wins when a match ends with two goals or fewer.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does over 2.5 goals include extra time?",
        answer:
          "No. Only goals scored in normal time, including stoppage time, count towards the total.",
      },
      {
        question: "Is 3 goals over or under 2.5?",
        answer:
          "Three goals is over 2.5, so an over bet wins. Exactly two goals is under.",
      },
      {
        question: "What is the difference between over 2.5 and BTTS?",
        answer:
          "Over 2.5 counts total goals regardless of who scores them, so 3-0 wins. BTTS requires each side to score at least once, so 3-0 loses but 1-1 wins.",
      },
    ],
    related: [
      {
        href: "/free-football-prediction-over-2.5-goals",
        label: "Today's over 2.5 goals predictions",
      },
      {
        href: "/free-football-predictions-under-2.5-goals",
        label: "Today's under 2.5 goals predictions",
      },
      {
        href: "/free-football-predictions-over-1.5-goals",
        label: "Today's over 1.5 goals predictions",
      },
    ],
  },
  {
    slug: "how-to-read-odds",
    title: "How to read betting odds",
    heading: "How to read football betting odds",
    summary:
      "Decimal, fractional and American odds, how to convert any price into a probability, and what the bookmaker's margin costs you.",
    metaTitle: "How to Read Betting Odds — Decimal & Fractional | Matchplug",
    metaDescription:
      "Convert decimal, fractional and American odds into implied probability, work out returns, and see how the bookmaker's margin is built into every price.",
    intro:
      "Odds do two jobs at once: they tell you what a winning bet returns, and they state the probability the bookmaker is willing to lay. Reading the second one is what separates a considered bet from a guess.",
    sections: [
      {
        heading: "Decimal odds",
        body: [
          "Decimal odds are the standard across Europe and the clearest format to work with. The number is your total return per unit staked, stake included. A 10 stake at 2.50 returns 25 — 15 profit plus your 10 back.",
          "To convert to a probability, divide 100 by the odds. 2.50 implies 40%. 1.50 implies 66.7%. 5.00 implies 20%. That single calculation is the most useful habit in betting, because it turns a price into a claim you can agree or disagree with.",
        ],
      },
      {
        heading: "Fractional odds",
        body: [
          "Fractional odds are still standard in the UK. They show profit relative to stake rather than total return. 3/1 means three profit for every one staked; a 10 bet returns 40 in total.",
          "To convert fractional to decimal, divide the first number by the second and add one. 3/1 becomes 4.00. 5/2 becomes 3.50. 1/2 — an odds-on price — becomes 1.50.",
        ],
      },
      {
        heading: "American odds",
        body: [
          "American odds use a positive or negative number based around a 100 unit. A positive price, such as +250, is the profit on a 100 stake. A negative price, such as -150, is the stake required to win 100.",
          "+250 is 3.50 in decimal. -150 is 1.67. Anything negative is an odds-on favourite.",
        ],
      },
      {
        heading: "The overround, and what it costs you",
        body: [
          "Convert every selection in a market to a probability and add them up. On a 1X2 market priced at 1.75, 3.60 and 4.20, that gives 57.1% + 27.8% + 23.8% = 108.7%. The 8.7% above 100 is the bookmaker's margin, known as the overround or the vig.",
          "It is the reason betting at random loses money over time even when your selections are right about half the time. It is also why shopping between bookmakers matters: on the same match, a book running a 104% margin gives you materially better prices than one running 109%, and that difference compounds across every bet you place.",
        ],
      },
      {
        heading: "What value actually means",
        body: [
          "A bet has value when your assessment of the probability is higher than the probability implied by the price. If you rate a home win at 50% and the price is 2.50 — an implied 40% — that is value, whether or not it wins on the day.",
          "Backing a strong favourite at a short price is not value simply because they are likely to win. You are being asked whether they are more likely to win than the price says. Those are different questions, and only the second one determines whether a bet is worth making.",
        ],
      },
    ],
    faqs: [
      {
        question: "What do odds of 2.00 mean?",
        answer:
          "2.00 is an even-money price, equivalent to 1/1 fractional or +100 American. It implies a 50% chance and doubles your stake if it wins.",
      },
      {
        question: "How do I convert odds to a percentage?",
        answer:
          "Divide 100 by the decimal odds. 4.00 gives 25%, 1.60 gives 62.5%. For fractional odds, convert to decimal first by dividing the first number by the second and adding one.",
      },
      {
        question: "Do shorter odds mean a better bet?",
        answer:
          "No. Shorter odds mean a more likely outcome, not a better bet. A bet is worth making when the price is longer than the true probability justifies, which happens at both short and long prices.",
      },
    ],
    related: [
      {
        href: "/free-football-predictions-1x2",
        label: "Today's win draw win predictions",
      },
      {
        href: "/free-football-prediction-over-2.5-goals",
        label: "Today's over 2.5 goals predictions",
      },
    ],
  },
];

export const guideBySlug = (slug: string) =>
  guides.find((guide) => guide.slug === slug);
