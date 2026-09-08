// Per-market on-page copy transcribed from the on-page build sheet
// (matchplug-onpage-simple-50-urls.docx). Keyed by the page slug used in
// src/app/[slug]/page.tsx.
//
// `heading` and `note` drive the market detail page; `metaTitle` and
// `metaDescription` are merged into routeTitles in src/app/lib/title.ts.
// Markets absent from the sheet have no entry and keep their existing copy.

export interface MarketContent {
  /** Market name as shown to users. */
  name: string;
  /** Page heading above the market explanation. */
  heading: string;
  /** Short explanation of the market. */
  note: string;
  metaTitle: string;
  metaDescription: string;
}

export const marketContent: Record<string, MarketContent> = {
  // /predictions/win-draw-win/
  "free-football-predictions-1x2": {
    name: "1X2 - Win Draw Win",
    heading: "Today's Win Draw Win Predictions",
    note:
      "Win draw win — written 1X2 by most bookmakers — is a bet on the full-time result of a match: home win (1), draw (X) or away win (2). It settles on 90 minutes plus stoppage time, so extra time and penalties don't count; a match level after 90 minutes is a draw even if it's decided later. Matchplug publishes a free win draw win prediction for every fixture it covers, with the model's pick, its confidence level and the form, head-to-head record and expected-goals data behind it. Selections go up each morning and are updated as team news lands. Every 1X2 call is logged, including the ones that lose.",
    metaTitle: "Win Draw Win Predictions Today — 1X2 Tips | Matchplug",
    metaDescription:
      "Today's win draw win predictions: a 1X2 call on every fixture with the reasoning behind it, updated each morning. See our published accuracy record.",
  },
  // /predictions/over-2-5-goals/
  "free-football-prediction-over-2.5-goals": {
    name: "Over 2.5 Goals",
    heading: "Today's Over 2.5 Goals Predictions",
    note:
      "Over 2.5 goals means the bet wins if a match ends with three or more goals in total, counting both teams in normal time. The half-goal line exists to remove the draw: exactly two goals loses, three wins. Own goals and penalties count; extra time and shoot-outs do not. Matchplug ranks today's fixtures by how likely they are to clear the line, using scoring and conceding form, expected goals, head-to-head history, venue and the referee's card and stoppage profile. We publish the fixtures worth backing and the ones that look like traps. Roughly half of matches in Europe's major leagues finish with three or more goals, though the rate swings from about 40% in defensive leagues to over 60% in the Bundesliga and Eredivisie.",
    metaTitle: "Over 2.5 Goals Predictions Today — Best Picks & Stats | Matchplug",
    metaDescription:
      "Over 2.5 goals predictions for today, ranked by scoring form, xG and head-to-head. See which fixtures actually clear 2.5 and which ones are traps.",
  },
  // /predictions/btts/
  "free-football-predictions-both-team-to-score": {
    name: "BTTS / GG",
    heading: "Today's BTTS Predictions",
    note:
      "BTTS stands for both teams to score. The bet wins if each side scores at least one goal in normal time, whatever the final result — a 1-1 draw and a 4-3 win both settle as BTTS Yes, while any clean sheet settles as No. Extra time and penalties are excluded. Matchplug publishes a BTTS call for every fixture it covers, built from each side's scoring and conceding streaks, home and away splits, expected goals for and against, and whether a heavy favourite is likely to shut the game down. We publish both sides of the market: the fixtures where both teams should score, and the defensive fixtures where BTTS No is the stronger read.",
    metaTitle: "BTTS Predictions Today — Both Teams to Score Tips | Matchplug",
    metaDescription:
      "Both teams to score predictions for today's matches, with BTTS form, xG and defensive records for each side. Free BTTS tips updated every morning.",
  },
  // /predictions/draw/
  "free-football-predictions-draw-predictions-and-tips": {
    name: "Draw",
    heading: "Today's Draw Predictions",
    note:
      "A draw bet wins when a match finishes level after 90 minutes plus stoppage time. Roughly one in four matches in Europe's major leagues ends level, which is why draw odds for an evenly matched fixture usually sit around 3.20 to 3.60. The draw is the most consistently mispriced outcome in football betting, because most models treat it as what's left over once a home and away probability have been calculated rather than predicting it directly. Matchplug predicts it positively: we look for the team profiles that actually produce draws — well-organised sides, low-scoring fixtures, closely matched opponents, and late-season matches where both teams are content with a point.",
    metaTitle: "Draw Predictions Today — Matches Likely to Draw | Matchplug",
    metaDescription:
      "Today's draw predictions: the fixtures our model rates as most likely to end level, with odds, form and the value case for each.",
  },
  // /predictions/under-2-5-goals/
  "free-football-predictions-under-2.5-goals": {
    name: "Under 2.5 Goals",
    heading: "Today's Under 2.5 Goals Predictions",
    note:
      "Under 2.5 goals wins if a match finishes with two goals or fewer in total. 0-0, 1-0 and 1-1 all win; 2-1 loses. Only normal time counts — extra time and penalties are excluded. Matchplug identifies the fixtures where the goals line looks too high, using defensive form, clean-sheet rates, expected goals against, league scoring averages and the tactical shape of both sides. Under 2.5 is the stronger side of the market in defensive leagues such as Ligue 1 and Serie A, in derbies, and in matches where one team is set up purely to contain. It is not a safe bet — a single late goal turns a winner into a loser — so we publish the reasoning, not just the pick.",
    metaTitle: "Under 2.5 Goals Predictions Today — Low-Scoring Picks | Matchplug",
    metaDescription:
      "Under 2.5 goals predictions for today's fixtures, built from defensive form, xG and league scoring averages. Free tips, updated daily.",
  },
  // /predictions/over-1-5-goals/
  "free-football-predictions-over-1.5-goals": {
    name: "Over 1.5 Goals",
    heading: "Today's Over 1.5 Goals Predictions",
    note:
      "Over 1.5 goals wins if a match produces two or more goals in total, from either team. Only a 0-0 or a 1-0 result loses. Around three quarters of matches in Europe's major leagues clear the line, which is why the odds usually sit between 1.20 and 1.40 — this is the lowest-risk goals market and the most commonly used accumulator leg. Matchplug publishes an over 1.5 call for every fixture it covers, with the scoring data behind it, and flags the low-scoring fixtures where even this line is worth avoiding. Short odds still need a read: stacking five legs at 1.25 leaves roughly a one-in-three chance that at least one fails.",
    metaTitle: "Over 1.5 Goals Predictions Today — Safe Goals Tips | Matchplug",
    metaDescription:
      "Over 1.5 goals predictions for today's matches, with the scoring data behind each pick. The lowest-risk goals market, called fixture by fixture.",
  },
  // /predictions/correct-score/
  "free-football-predictions-correct-score-and-tips": {
    name: "Correct Score",
    heading: "Today's Correct Score Predictions",
    note:
      "A correct score bet is a wager on the exact final scoreline of a match in normal time — 2-1, 1-0, and so on. It pays long odds because there are more than twenty realistic outcomes in a typical fixture. Matchplug publishes the single most likely scoreline for every match it covers, plus the two nearest alternatives, produced from a goal-distribution model rather than a guess: each side's expected goals is converted into a probability for every possible score. 1-1 and 1-0 are the most frequent results across Europe's major leagues, followed by 2-1 and 0-0 — together roughly half of all matches. Nobody hits the exact score often; anyone advertising a high correct-score strike rate is not measuring honestly.",
    metaTitle: "Correct Score Predictions Today — Scoreline Tips | Matchplug",
    metaDescription:
      "Correct score predictions for today's football matches: the most likely scoreline for each fixture plus two backup scores, with odds and xG.",
  },
  // /predictions/first-half-goals/
  "free-football-predictions-goal-first-half": {
    name: "Goal First Half",
    heading: "Today's First Half Goal Predictions",
    note:
      "A first half goal bet settles on the first 45 minutes plus first-half stoppage time only — whatever happens after the interval is irrelevant. The common lines are over 0.5 first half goals (at least one goal before the break), over 1.5, and half-time both teams to score. Around 60% of matches in Europe's major leagues produce at least one first-half goal, though the rate falls sharply in cagey derbies and in the opening exchanges of knockout ties, where sides start cautiously. Matchplug reads this market from each team's goal-timing profile — some sides consistently start fast and fade, others need twenty minutes to settle — plus early pressing intensity, home crowd effect and the referee's added-time tendencies. Selections publish each morning with the goal-timing data behind them.",
    metaTitle: "First Half Goals Predictions Today — HT Tips | Matchplug",
    metaDescription:
      "First half goal predictions for today's matches, built from each side's goal-timing profile. Over 0.5 and over 1.5 HT tips, updated every morning.",
  },
  // /predictions/bet-builder/
  "free-football-predictions-bet-builders-predictions-and-tips": {
    name: "Betbuilder / Same Game Parlay",
    heading: "Today's Bet Builder Tips",
    note:
      "A bet builder combines several selections from the same match into one bet — for example the home team to win, over 2.5 goals, and a named player to score. Every leg must land for the bet to pay. It differs from an accumulator in one important way: because the legs come from the same match they are correlated, so the bookmaker prices them together rather than simply multiplying the odds. That correlation is where the market can be beaten. A bet builder that stacks legs telling the same story — a favourite to win, over 2.5 goals, and their main striker to score — is often priced more generously than the true joint probability, because the individual legs reinforce each other. Matchplug publishes one bet builder per featured match with every leg, its reasoning and the combined price shown.",
    metaTitle: "Bet Builder Tips Today — Same Game Multi Picks | Matchplug",
    metaDescription:
      "Today's bet builder tips: same-game multis built from correlated legs, with every leg, its reasoning and the combined price shown. Free and updated daily.",
  },
  // /predictions/handicap/
  "free-football-predictions-handicap-predictions": {
    name: "Handicap",
    heading: "Today's Handicap Predictions",
    note:
      "A handicap bet gives one team a goal head start or deficit before kick-off, which levels a mismatched fixture and turns a short price into a workable one. On a -1 handicap the favourite must win by two clear goals; on +1 the underdog wins the bet by winning, drawing, or losing by exactly one. There are two families: European handicap, which keeps the draw as a third option and can result in a handicap draw, and Asian handicap, which removes the draw entirely and can refund the stake on whole-number lines. Handicap markets usually carry a lower bookmaker margin than the straight match result, which is why they often offer better value on a strong favourite. Matchplug publishes a handicap call on every fixture where the outright price is too short to be worth taking.",
    metaTitle: "Handicap Predictions Today — Football Handicap Tips | Matchplug",
    metaDescription:
      "Today's handicap predictions across Asian and European lines, for the fixtures where the outright price is too short. Free tips with the reasoning.",
  },
  // /predictions/cards/
  "free-football-predictions-cards-predictions-and-tips": {
    name: "Cards",
    heading: "Today's Cards Predictions",
    note:
      "Cards betting is a bet on disciplinary points rather than goals. The usual markets are total cards over or under a line (commonly 3.5 or 4.5), team cards, the first team to be booked, and whether a red card is shown. Most bookmakers use a booking-points system where a yellow counts 10 and a red counts 25, and a second yellow leading to a red is normally counted as 35 in total, not 45 — check the settlement rules, since they vary. Cards markets are driven far more by the referee than by the teams: appointment lists are published in advance, and individual referees vary enormously in cards per game. Matchplug reads each fixture from the referee's average, the rivalry and stakes involved, both sides' fouls-per-game, and whether the match profile invites a physical contest.",
    metaTitle: "Cards Predictions Today — Booking Points Tips | Matchplug",
    metaDescription:
      "Today's cards predictions, led by the referee's own average: total cards, team cards and first booking. Over and under lines called fixture by fixture.",
  },
  // /predictions/player-tips/
  "free-football-predictions-player-specials-and-tips": {
    name: "Player Tip",
    heading: "Today's Player Tips",
    note:
      "Player tips are bets on what an individual does rather than on the match result — anytime goalscorer, first or last goalscorer, shots and shots on target, assists, and player cards. The market has grown because it is where bookmaker pricing is least sharp: a match result is modelled to the decimal by every trading desk, while a specific player's shot line is set with far less data behind it. That is where the value sits. The single most important variable is minutes played, which is why team news matters more here than anywhere else: a striker rotated to the bench at 60 minutes is a losing shots bet no matter how well he plays. Matchplug publishes player tips only after line-ups are confirmed or strongly indicated, with the player's role, recent shot volume and the opposition's defensive profile shown alongside.",
    metaTitle: "Player Tips Today — Goalscorer, Shots & Assists | Matchplug",
    metaDescription:
      "Today's player tips: anytime goalscorer, shots on target and assists, published after line-ups so minutes played is known. Free picks with the data.",
  },
  // /predictions/ht-ft/
  "free-football-prediction-ht-ft-predictions": {
    name: "HT/FT",
    heading: "Today's HT/FT Predictions",
    note:
      "HT/FT — half-time/full-time — is a single bet on who is ahead at the break and who wins at the end. There are nine combinations: home/home, home/draw, home/away, draw/home, draw/draw, draw/away, away/home, away/draw and away/away. Because it settles on two checkpoints instead of one, the odds run far longer than a straight result bet, and the two turnaround combinations (home/away and away/home) are the longest of all — a side that trails at the break goes on to win outright in only a small share of matches. The combinations worth backing are the ones where a favourite starts slowly against a side that defends deep and tires: draw/home is the most commonly landed non-obvious result. Matchplug publishes an HT/FT call for the fixtures where a team's first-half and second-half profiles diverge enough to price the combination, using goal-timing splits, substitution patterns and how often each side leads or trails at half-time.",
    metaTitle: "HT/FT Predictions Today — Half-Time/Full-Time Tips | Matchplug",
    metaDescription:
      "Today's HT/FT predictions: half-time/full-time calls built from goal-timing splits and second-half form, with the reasoning behind each combination.",
  },
  // /predictions/double-chance/
  "free-football-predictions-mix-chance": {
    name: "Mix Chance / Double Chance",
    heading: "Today's Double Chance Predictions",
    note:
      "Double chance — listed as mix chance by some bookmakers — covers two of the three possible results in a single bet: home or draw (1X), away or draw (X2), or home or away (12). It settles as a win if either covered outcome lands, which is why the odds are shorter than a straight 1X2 call; you are buying a wider margin for error rather than a bigger return. The market earns its place in two situations: backing a strong favourite away from home, where a draw would otherwise sink the bet, and backing a well-organised underdog at 1X against a side that struggles to break down a low block. Matchplug publishes a double chance call for the fixtures where the straight result is genuinely close, showing which two outcomes are covered and the form, head-to-head record and expected-goals data behind the selection.",
    metaTitle: "Double Chance Predictions Today — 1X, X2 & 12 Tips | Matchplug",
    metaDescription:
      "Today's double chance predictions: 1X, X2 and 12 selections for the fixtures where the straight result is too close to call. Free tips, updated daily.",
  },
  // /picks/nfl/
  "sports-betting-tips-NFL-predictions-and-tips": {
    name: "NFL Picks",
    heading: "Today's NFL Picks",
    note:
      "Matchplug publishes NFL picks across the three markets that carry the market's liquidity: the point spread, the total (over/under), and the moneyline. Each pick shows the line we are taking, the number we make it, and the reasoning — because in a league where the spread is efficient to within about a point, the only useful thing a pick can tell you is where our number differs from the market's. NFL is a small-sample sport: seventeen regular-season games means one injury, one weather system or one turnover run swings a season, so we weight recent snap-count and personnel data over full-season records. Key numbers matter enormously here — 3 and 7 are the most common margins of victory, so a spread moving from -2.5 to -3.5 is a far bigger change than half a point suggests.",
    metaTitle: "NFL Picks Today — Spread, Total & Moneyline | Matchplug",
    metaDescription:
      "Today's NFL picks against the spread, on the total and the moneyline, with the line we take and the number we make it. Updated as injury reports land.",
  },
  // /picks/nba/
  "sports-betting-tips-NBA-predictions-and-tips": {
    name: "NBA Picks",
    heading: "Today's NBA Picks",
    note:
      "Matchplug publishes NBA picks on the spread, the total and the moneyline for every game on the slate. The NBA is the most schedule-driven league in North American sport: back-to-backs, three-games-in-four-nights stretches and long road trips measurably lower shooting efficiency and defensive intensity, and a team resting starters can move a line by six points in an hour. That makes late information decisive, so our picks update as injury reports and rest designations are released. We read games from pace and efficiency rather than raw scoring — a team averaging 118 points because they play fast is not the same as a team scoring 118 efficiently — which is also why totals are usually the softer market of the three in this league.",
    metaTitle: "NBA Picks Today — Spread, Total & Moneyline Bets | Matchplug",
    metaDescription:
      "Today's NBA picks read through pace and efficiency, not raw scoring. Spread, total and moneyline calls, updated as rest and injury news is confirmed.",
  },
  // /picks/mlb/
  "sports-betting-tips-MLB-predictions-and-tips": {
    name: "MLB Picks",
    heading: "Today's MLB Picks",
    note:
      "Matchplug publishes MLB picks on the moneyline, the run line and the total for every game on the card. Baseball is different from the other US sports in one decisive respect: the starting pitcher is the single largest variable in any given game, which is why every MLB bet should be listed to that pitcher — if he is scratched, the bet is void. Beyond pitching we read bullpen usage over the previous three days, which is where late-inning totals are won and lost, plus park factors and the wind, since a wind blowing out at Wrigley is worth close to half a run on the total. The long 162-game season makes MLB the most sample-friendly league to bet, and also the most punishing of anyone chasing short-term results.",
    metaTitle: "MLB Picks Today — Moneyline, Run Line & Totals | Matchplug",
    metaDescription:
      "Today's MLB picks listed to the named starting pitchers, with bullpen usage, park factors and wind in the read. Moneyline, run line and total calls.",
  },
  // /picks/nhl/
  "sports-betting-tips-NHL-predictions-and-tips": {
    name: "NHL Picks",
    heading: "Today's NHL Picks",
    note:
      "Matchplug publishes NHL picks on the moneyline, the puck line and the total for every game on the schedule. Two things make hockey distinct as a betting market. First, goaltending dominates: a confirmed starting goalie changes a game's true probability more than any skater in the lineup, and starters are often confirmed only in the hour before puck drop, so timing matters. Second, hockey is the highest-variance of the major leagues — the better team loses often enough that results tell you very little over short samples, which is why we read games through expected goals and shot-quality metrics rather than recent won-lost records. Totals sit at 6 or 6.5 in most games, making the empty-net goal a genuine factor in how they settle.",
    metaTitle: "NHL Picks Today — Puck Line, Moneyline & Totals | Matchplug",
    metaDescription:
      "Today's NHL picks built on confirmed goaltending and expected goals rather than recent results. Puck line, moneyline and total calls for every game.",
  },
  // /picks/ncaab/
  "sports-betting-tips-NCAAB-predictions-and-tips": {
    name: "NCAAB Picks",
    heading: "Today's NCAAB Picks",
    note:
      "Matchplug publishes college basketball picks on the spread and the total across the Division I schedule. NCAAB is the widest market in US sport — hundreds of games a week, far beyond what any trading desk can price with equal care — so the softest lines in North American betting sit in mid-major conference games rather than in televised matchups. We read games from tempo and efficiency, because raw scores are meaningless without pace: a team scoring 55 in a slow, deliberate system may be far more efficient than one scoring 80. Home advantage is unusually strong in college basketball, and conference familiarity matters, with second meetings between the same teams playing differently from first ones. Lines move sharply on late injury and eligibility news, which is reported far less reliably than in the professional leagues.",
    metaTitle: "NCAAB Picks Today — College Basketball Tips | Matchplug",
    metaDescription:
      "Today's college basketball picks across Division I, read through tempo and efficiency. Spreads and totals, including the softer mid-major lines.",
  },
  // /picks/ncaaf/
  "sports-betting-tips-NCAAF-predictions-and-tips": {
    name: "NCAAF Picks",
    heading: "Today's NCAAF Picks",
    note:
      "Matchplug publishes college football picks on the spread and the total across the FBS schedule. The defining feature of NCAAF betting is the talent gap: rosters vary far more than in the NFL, which is why spreads of 30 points or more exist here and never there — and why large spreads are so hard to bet, since a dominant team may simply empty the bench in the fourth quarter with the game long decided. Motivation is a real and readable factor: a team looking ahead to a rivalry game, or one with nothing left to play for after bowl eligibility is settled, plays measurably differently. Weather matters more than in the NFL because so many programmes are built around a running game, and totals in November move heavily on wind and cold.",
    metaTitle: "NCAAF Picks Today — College Football Spread & Totals | Matchplug",
    metaDescription:
      "Today's college football picks across the FBS schedule, with roster gaps, motivation and weather in the read. Spread and total calls for every game.",
  },
};
