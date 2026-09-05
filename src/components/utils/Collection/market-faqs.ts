// FAQ copy for the market detail pages, transcribed from the on-page build
// sheet (matchplug-onpage-simple-50-urls.docx). Keyed by the page slug used in
// src/app/[slug]/page.tsx. Markets absent from the sheet have no entry, and the
// detail page simply renders no FAQ block for them.

export interface MarketFAQ {
  question: string;
  answer: string;
}

export interface MarketFAQGroup {
  heading: string;
  faqs: MarketFAQ[];
}

export const marketFaqs: Record<string, MarketFAQGroup> = {
  // /predictions/win-draw-win/
  "free-football-predictions-1x2": {
    heading: "Win Draw Win FAQs",
    faqs: [
      {
        question: "What does win draw win mean in betting?",
        answer:
          "Win draw win — written 1X2 — is a bet on the full-time result of a match: home win (1), draw (X) or away win (2). Extra time and penalties don't count, so a match level after 90 minutes settles as a draw even if it's decided later.",
      },
      {
        question: "Is win draw win the same as 1X2?",
        answer:
          "Yes. 1X2 is the bookmaker shorthand for the same market: 1 is the home win, X the draw, 2 the away win. Some sites also call it match result, full-time result or three-way.",
      },
      {
        question: "How accurate are win draw win predictions?",
        answer:
          "Win draw win predictions from statistical models typically land between 50% and 60% across a full season, because the draw is genuinely hard to call. Matchplug publishes its verified 1X2 hit rate by month at /accuracy/, including losing predictions.",
      },
      {
        question: "What time are today's 1X2 predictions published?",
        answer:
          "Selections for the day are published each morning and updated as team news lands, usually up to an hour before kick-off. Live in-play calls then update during the match.",
      },
      {
        question: "Which is safer — win draw win or double chance?",
        answer:
          "Double chance covers two of the three outcomes, so it wins more often but pays shorter odds; win draw win pays more and wins less. Neither is safer in value terms — the question is whether the price covers the true probability.",
      },
      {
        question: "Are Matchplug's win draw win tips free?",
        answer:
          "Yes. Every 1X2 prediction on this page is free with no account required. The VIP Telegram tier adds earlier release times and staking guidance, not different markets.",
      },
    ],
  },
  // /predictions/over-2-5-goals/
  "free-football-prediction-over-2.5-goals": {
    heading: "Over 2.5 Goals FAQs",
    faqs: [
      {
        question: "What does over 2.5 goals mean?",
        answer:
          "Over 2.5 goals means the bet wins if the match ends with three or more goals in total, counting both teams. The half-goal line exists to remove the draw: exactly two goals loses, three wins.",
      },
      {
        question: "Do own goals count for over 2.5?",
        answer:
          "Yes. Every goal scored in normal time counts towards the total regardless of who scored it, including own goals and penalties. Goals in extra time and shoot-outs do not count.",
      },
      {
        question: "How often does over 2.5 goals land?",
        answer:
          "Across Europe's major leagues roughly half of matches finish with three or more goals, though it swings from about 40% in defensive leagues to over 60% in the Bundesliga and Eredivisie.",
      },
      {
        question: "Which leagues are best for over 2.5 goals?",
        answer:
          "The Bundesliga, Eredivisie and Austrian Bundesliga consistently carry the highest goals-per-game averages in Europe, while Ligue 1, Serie A and most South American leagues run lower.",
      },
      {
        question: "Is over 2.5 or over 1.5 the safer bet?",
        answer:
          "Over 1.5 lands far more often — most matches produce at least two goals — but pays much shorter odds, so a losing run hurts more. Over 2.5 is the higher-variance, higher-priced version of the same read.",
      },
    ],
  },
  // /predictions/btts/
  "free-football-predictions-both-team-to-score": {
    heading: "BTTS FAQs",
    faqs: [
      {
        question: "What does BTTS mean?",
        answer:
          "BTTS stands for both teams to score. The bet wins if each side scores at least one goal, whatever the final result — a 1-1 draw and a 4-3 win both settle as BTTS Yes.",
      },
      {
        question: "Does BTTS include extra time?",
        answer:
          "No. BTTS settles on the 90 minutes plus stoppage time only. Goals in extra time or a penalty shoot-out have no effect on the bet.",
      },
      {
        question: "What is BTTS No?",
        answer:
          "BTTS No wins when at least one team fails to score, including 0-0. It's the better side of the market in defensive leagues and in fixtures where a heavy favourite is likely to keep a clean sheet.",
      },
      {
        question: "How accurate are BTTS predictions?",
        answer:
          "BTTS is one of the more predictable markets because it depends on two independent scoring rates rather than a match result. Matchplug's verified BTTS hit rate by month is published at /accuracy/.",
      },
      {
        question: "Can you combine BTTS with over 2.5 goals?",
        answer:
          "Yes — bookmakers price 'BTTS and over 2.5' as a single selection at longer odds, since it needs both conditions. It's only worth taking when the price beats the two separate probabilities multiplied together.",
      },
    ],
  },
  // /predictions/draw/
  "free-football-predictions-correct-score-and-tips": {
    heading: "Draw Betting FAQs",
    faqs: [
      {
        question: "How often do football matches end in a draw?",
        answer:
          "Roughly one in four matches in Europe's major leagues finishes level, with the rate rising in low-scoring, defensively organised leagues. That's why draw odds sit around 3.20–3.60 for an evenly matched fixture.",
      },
      {
        question: "Why is the draw hard to predict?",
        answer:
          "The draw has no favourite behind it — it's the outcome that happens when two opposing forecasts cancel out, so most models rate it as a residual rather than a positive prediction. That's exactly why it's often mispriced.",
      },
      {
        question: "What is draw no bet?",
        answer:
          "Draw no bet removes the draw from the market: you back a team to win, and your stake is returned if the match finishes level. It costs you odds compared with a straight win bet.",
      },
      {
        question: "Which leagues produce the most draws?",
        answer:
          "Ligue 1, Serie A and several South American leagues historically carry the highest draw rates, while the Bundesliga and Eredivisie produce the fewest.",
      },
    ],
  },
  // /predictions/under-2-5-goals/
  "free-football-predictions-under-2.5-goals": {
    heading: "Under 2.5 Goals FAQs",
    faqs: [
      {
        question: "What does under 2.5 goals mean?",
        answer:
          "Under 2.5 goals wins if the match finishes with two goals or fewer in total. 0-0, 1-0 and 1-1 all win; 2-1 loses. Only normal time counts.",
      },
      {
        question: "Is under 2.5 goals a safe bet?",
        answer:
          "It's the more likely side in defensive leagues and derbies, but 'safe' is misleading — a single late goal turns a winning bet into a loser, so it carries the same variance as any other market.",
      },
      {
        question: "Which leagues suit under 2.5 goals?",
        answer:
          "Ligue 1, Serie A, the Greek Super League and most South American top divisions consistently run below 2.5 goals per game.",
      },
      {
        question: "Does under 2.5 include extra time?",
        answer:
          "No. Goals in extra time and penalty shoot-outs are excluded; the bet settles on 90 minutes plus stoppage time.",
      },
    ],
  },
  // /predictions/over-1-5-goals/
  "free-football-predictions-over-1.5-goals": {
    heading: "Over 1.5 Goals FAQs",
    faqs: [
      {
        question: "What does over 1.5 goals mean?",
        answer:
          "Over 1.5 goals wins if the match produces two or more goals in total, from either team. Only a 0-0 or a 1-0 result loses the bet.",
      },
      {
        question: "How often does over 1.5 goals win?",
        answer:
          "Around three quarters of matches in Europe's major leagues produce at least two goals, which is why the odds are usually between 1.20 and 1.40. Matchplug's own record is published at /accuracy/.",
      },
      {
        question: "Is over 1.5 goals good for accumulators?",
        answer:
          "It's the most commonly used accumulator leg because each selection wins often, but stacking short odds still compounds risk — five legs at 1.25 is roughly a one-in-three chance of at least one failing.",
      },
    ],
  },
  // /predictions/correct-score/
  "free-football-prediction-ht-ft-predictions": {
    heading: "Correct Score FAQs",
    faqs: [
      {
        question: "What is a correct score bet?",
        answer:
          "A correct score bet is a wager on the exact final scoreline of a match in normal time — 2-1, 1-0, and so on. It pays long odds because there are dozens of plausible outcomes.",
      },
      {
        question: "How accurate can correct score predictions be?",
        answer:
          "Even the best models hit the exact score in only a minority of matches, because the market has 20-plus realistic outcomes. Anyone advertising a high strike rate is not measuring honestly; our published record is at /accuracy/.",
      },
      {
        question: "What is the most common football scoreline?",
        answer:
          "1-1 and 1-0 are the most frequent results across Europe's major leagues, followed by 2-1 and 0-0. Those four account for roughly half of all matches.",
      },
      {
        question: "Should you back more than one correct score?",
        answer:
          "Backing two or three adjacent scorelines raises the chance of a return but cuts the effective price, so it only works when the individual odds are long enough to cover the extra stakes.",
      },
    ],
  },
  // /predictions/first-half-goals/
  "free-football-predictions-goal-first-half": {
    heading: "First Half Goals FAQs",
    faqs: [
      {
        question: "What does over 0.5 first half goals mean?",
        answer:
          "It means the bet wins if at least one goal is scored before half-time, by either team. Goals after the interval do not count, so the bet is settled at the break.",
      },
      {
        question: "How often is there a goal in the first half?",
        answer:
          "Around 60% of matches in Europe's major leagues produce at least one first-half goal. The rate is lower in derbies and cup knockout ties, where teams start more cautiously.",
      },
      {
        question: "Does first half stoppage time count?",
        answer:
          "Yes. Any goal scored in first-half added time counts towards the first-half total. The bet settles at the half-time whistle.",
      },
      {
        question: "Is half-time or full-time betting easier to predict?",
        answer:
          "First-half markets are lower-scoring and therefore more volatile per goal, but they remove second-half substitutions, red cards and game-state chaos from the equation — which some bettors find easier to read.",
      },
      {
        question: "What is half-time both teams to score?",
        answer:
          "It wins only if both teams score before the interval. It is a rare outcome and pays long odds, since it needs two goals from opposite sides inside 45 minutes.",
      },
    ],
  },
  // /predictions/Mix-chance/
  "free-football-predictions-mix-chance": {
    heading: "Mix Chance / Double Chance FAQs",
    faqs: [
      {
        question: "What is double chance in betting?",
        answer:
          "Double chance covers two of the three possible results in one bet: home or draw (1X), away or draw (X2), or home or away (12). It wins more often than a straight result bet but pays shorter odds.",
      },
      {
        question: "What does 1X mean?",
        answer:
          "1X means home win or draw. The bet wins if the home team wins or the match finishes level, and loses only if the away team wins.",
      },
      {
        question: "Is Mix Chance the same as double chance?",
        answer:
          "Yes. Mix Chance is the label some bookmakers use for the same market — two of the three results covered by a single selection.",
      },
      {
        question: "Is double chance better than a straight win bet?",
        answer:
          "Neither is inherently better. Double chance wins more often at shorter odds; a win bet wins less often at longer odds. What matters is whether the price covers the true probability.",
      },
      {
        question: "What is the difference between double chance and draw no bet?",
        answer:
          "Double chance pays out if the draw happens. Draw no bet refunds your stake if the draw happens. Draw no bet therefore pays slightly better odds but returns nothing extra on a level result.",
      },
    ],
  },
  // /predictions/handicap/
  "free-football-predictions-draw-predictions-and-tips": {
    heading: "Handicap Betting FAQs",
    faqs: [
      {
        question: "What does handicap mean in football betting?",
        answer:
          "A handicap gives one team a goal head start or deficit before the match starts, to level a mismatch. On a -1 handicap the favourite must win by two or more goals for the bet to win.",
      },
      {
        question: "What is the difference between European and Asian handicap?",
        answer:
          "European handicap keeps the draw as a third possible outcome, so a match can end in a handicap draw and lose your bet. Asian handicap removes the draw, refunding the stake instead on whole-number lines.",
      },
      {
        question: "What does +1 handicap mean?",
        answer:
          "The team starts with a one-goal advantage. They win the bet by winning, drawing, or losing by exactly one goal — a one-goal defeat becomes a draw after the handicap is applied.",
      },
      {
        question: "Is handicap betting better value than the match result?",
        answer:
          "Handicap markets typically carry a lower bookmaker margin than 1X2, so on a heavy favourite they often offer better value than a very short outright price.",
      },
      {
        question: "Can a handicap bet be refunded?",
        answer:
          "Yes, on whole-number Asian handicap lines. If the result lands exactly on the handicap the bet is a push and the stake is returned.",
      },
    ],
  },
  // /predictions/cards/
  "free-football-predictions-cards-predictions-and-tips": {
    heading: "Cards Betting FAQs",
    faqs: [
      {
        question: "How do cards betting markets work?",
        answer:
          "You bet on the number of cards shown, usually as an over or under line such as 3.5 total cards. Most bookmakers score a yellow as 10 booking points and a red as 25.",
      },
      {
        question: "Do second yellow cards count twice?",
        answer:
          "Normally a second yellow leading to a red is counted as 35 booking points in total rather than 45, but settlement rules vary between bookmakers — always check the specific rules before betting.",
      },
      {
        question: "Do cards after the final whistle count?",
        answer:
          "Usually not. Most bookmakers settle cards markets on the 90 minutes plus stoppage time, excluding cards shown at half-time, after the final whistle, or to substitutes and staff.",
      },
      {
        question: "What is the biggest factor in cards betting?",
        answer:
          "The referee. Card averages vary far more between individual referees than between teams, and appointments are published in advance — which makes the referee the first thing to check, not the last.",
      },
      {
        question: "Which matches produce the most cards?",
        answer:
          "Local derbies, relegation six-pointers and knockout ties with high stakes produce the most, especially in leagues with a strict refereeing culture such as La Liga.",
      },
    ],
  },
  // /predictions/player-tips/
  "free-football-predictions-player-specials-and-tips": {
    heading: "Player Tips FAQs",
    faqs: [
      {
        question: "What are player tips in football betting?",
        answer:
          "Player tips are bets on an individual player's performance rather than the match result — anytime goalscorer, shots, shots on target, assists or cards.",
      },
      {
        question: "What is anytime goalscorer?",
        answer:
          "Anytime goalscorer wins if your selected player scores at any point in normal time. Own goals do not count towards the player who scored them.",
      },
      {
        question: "What happens if my player does not start?",
        answer:
          "Most bookmakers void goalscorer bets if the player takes no part in the match, refunding the stake. Shots and other player props are usually voided too, but rules vary — check before betting.",
      },
      {
        question: "Why are player props easier to find value in?",
        answer:
          "Match result markets are priced by every trading desk with heavy modelling behind them, while individual player lines are set with less data. The pricing is looser, so genuine edges survive longer.",
      },
      {
        question: "When are player tips published?",
        answer:
          "After line-ups are confirmed or strongly indicated, because minutes played is the single biggest variable. A player rotated to the bench makes even a correct read a losing bet.",
      },
    ],
  },
  // /picks/nfl/
  "sports-betting-tips-NFL-predictions-and-tips": {
    heading: "NFL Picks FAQs",
    faqs: [
      {
        question: "What are today's NFL picks?",
        answer:
          "Matchplug publishes picks against the spread, on the total and on the moneyline for the NFL slate, with the line taken, our own number, and the reasoning behind the gap.",
      },
      {
        question: "What does covering the spread mean?",
        answer:
          "The favourite covers by winning by more than the spread; the underdog covers by losing by less than it, or winning outright. A -3 favourite winning by exactly 3 is a push and stakes are returned.",
      },
      {
        question: "Why do key numbers matter in NFL betting?",
        answer:
          "Because 3 and 7 are by far the most common margins of victory, given the scoring system. A line moving across 3 changes the true probability much more than a half-point move elsewhere.",
      },
      {
        question: "Is the NFL spread or the moneyline better value?",
        answer:
          "The spread is the more efficiently priced market and the moneyline is where big favourites get badly overpriced. Value on heavy favourites usually sits in the spread, not the moneyline.",
      },
      {
        question: "When are NFL picks published?",
        answer:
          "Picks go up early in the week and are updated through to kick-off as injury reports land — the Wednesday through Friday practice designations move NFL lines more than anything else.",
      },
    ],
  },
  // /picks/nba/
  "sports-betting-tips-NBA-predictions-and-tips": {
    heading: "NBA Picks FAQs",
    faqs: [
      {
        question: "What are today's NBA picks?",
        answer:
          "Matchplug publishes picks against the spread, on the total and on the moneyline for every NBA game on the slate, with the line taken and the pace and efficiency reasoning behind it.",
      },
      {
        question: "Why do NBA lines move so much before tip-off?",
        answer:
          "Because rest and injury news lands late. A starter ruled out or a team resting players on a back-to-back can move a spread by several points within an hour of the announcement.",
      },
      {
        question: "What is a back-to-back in the NBA?",
        answer:
          "A team playing on two consecutive nights. Shooting efficiency and defensive intensity measurably drop on the second night, particularly on the road, and the market does not always price it fully.",
      },
      {
        question: "Are NBA totals easier to predict than spreads?",
        answer:
          "Totals often carry more edge because they hinge on pace, which is more stable and more measurable than the matchup factors driving a spread. They also react more sharply to rest news.",
      },
      {
        question: "When are NBA picks published?",
        answer:
          "On the morning of the slate, with updates as injury reports and rest designations are confirmed through the afternoon.",
      },
    ],
  },
  // /picks/mlb/
  "sports-betting-tips-MLB-predictions-and-tips": {
    heading: "MLB Picks FAQs",
    faqs: [
      {
        question: "What are today's MLB picks?",
        answer:
          "Matchplug publishes moneyline, run line and total picks for every MLB game, listed to the named starting pitchers with the bullpen, park and weather reasoning shown.",
      },
      {
        question: "What is the run line in baseball?",
        answer:
          "The run line is baseball's spread, almost always set at 1.5 runs. The favourite must win by two or more; the underdog covers by winning or losing by exactly one.",
      },
      {
        question: "What does listing a pitcher mean?",
        answer:
          "It means the bet only stands if the named starting pitchers actually start. If either is scratched, the bet is voided and the stake returned — the standard setting for MLB moneyline bets.",
      },
      {
        question: "Why does weather matter in MLB betting?",
        answer:
          "Wind direction affects how far fly balls carry. A wind blowing out at a hitter-friendly park can be worth close to half a run on the total, and temperature has a smaller effect in the same direction.",
      },
      {
        question: "Why is the bullpen so important?",
        answer:
          "Roughly a third of innings are thrown by relievers, and a bullpen used heavily over the previous two or three days is measurably worse. Late-inning totals turn on it more than on the starters.",
      },
    ],
  },
  // /picks/nhl/
  "sports-betting-tips-NHL-predictions-and-tips": {
    heading: "NHL Picks FAQs",
    faqs: [
      {
        question: "What are today's NHL picks?",
        answer:
          "Matchplug publishes moneyline, puck line and total picks for every NHL game, based on confirmed goaltending, expected goals and shot-quality data rather than recent results.",
      },
      {
        question: "What is the puck line?",
        answer:
          "The puck line is hockey's spread, set at 1.5 goals. The favourite must win by two or more, which is a demanding line in a low-scoring sport where empty-net goals decide many margins.",
      },
      {
        question: "Why do starting goalies matter so much?",
        answer:
          "A goaltender change alters a game's true probability more than any other single roster factor. Starters are often confirmed close to puck drop, so a line can move sharply in the final hour.",
      },
      {
        question: "Is the NHL harder to predict than other leagues?",
        answer:
          "Yes — hockey carries the highest variance of the major North American leagues. Favourites win less often than in the NBA, so short-run results say almost nothing about the quality of a read.",
      },
      {
        question: "How does the empty net affect totals?",
        answer:
          "Trailing teams pull the goalie late, which produces a meaningful number of empty-net goals. With totals usually set at 6 or 6.5, that single factor decides a lot of over bets.",
      },
    ],
  },
  // /picks/ncaab/
  "sports-betting-tips-NCAAB-predictions-and-tips": {
    heading: "NCAAB Picks FAQs",
    faqs: [
      {
        question: "What are today's NCAAB picks?",
        answer:
          "Matchplug publishes spread and total picks across the Division I college basketball schedule, read through tempo and efficiency rather than raw scoring.",
      },
      {
        question: "Why are college basketball lines softer than the NBA?",
        answer:
          "Volume. Hundreds of games a week is more than any trading desk can price with equal attention, so mid-major and low-major games carry looser lines than televised matchups.",
      },
      {
        question: "Why does tempo matter in NCAAB betting?",
        answer:
          "Because scoring totals are meaningless without pace. A team scoring 55 in a deliberate system can be more efficient than one scoring 80 at a run-and-gun tempo — and totals are priced on that difference.",
      },
      {
        question: "Is home advantage bigger in college basketball?",
        answer:
          "Yes, considerably. Crowd proximity, travel and officiating patterns give college home teams a larger edge than their NBA counterparts, particularly in tight conference arenas.",
      },
      {
        question: "Are player props available for college basketball?",
        answer:
          "Availability varies by jurisdiction — several US states prohibit props on college athletes entirely. Check what is legal where you are before looking for these markets.",
      },
    ],
  },
  // /picks/ncaaf/
  "sports-betting-tips-NCAAF-predictions-and-tips": {
    heading: "NCAAF Picks FAQs",
    faqs: [
      {
        question: "What are today's NCAAF picks?",
        answer:
          "Matchplug publishes spread and total picks across the FBS college football schedule, with the roster, motivation and weather reasoning shown for each.",
      },
      {
        question: "Why are college football spreads so large?",
        answer:
          "Because roster talent varies enormously between programmes in a way it never does in the NFL. A 30-point spread reflects a genuine mismatch rather than a mispricing.",
      },
      {
        question: "Are big favourites worth backing against the spread?",
        answer:
          "They are difficult. A dominant team often rests starters once the game is decided, so the final margin can fall well short of how one-sided the game actually was.",
      },
      {
        question: "Does motivation really affect college football games?",
        answer:
          "Measurably. Teams looking ahead to a rivalry fixture, or with nothing left to play for once bowl eligibility is settled, underperform their ratings — and it is one of the few situational factors the market underprices.",
      },
      {
        question: "How much does weather affect NCAAF totals?",
        answer:
          "Considerably, because many programmes are run-first. Wind and cold in November games push totals down more sharply than the equivalent conditions in the NFL.",
      },
    ],
  },
};
