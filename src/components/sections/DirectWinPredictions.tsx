"use client";

import Link from "next/link";
import React, { useState } from "react";
import Logo from "../layout/Logo";
import { key } from "flatpickr/dist/types/locale";

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\//g, "") // remove slashes
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/[^a-z0-9.-]/g, ""); // keep letters, numbers, hyphen, dot

const allTitles = [
  // footballBettingTips
  "Over 2.5 Goals",
  "BTTS / GG",
  "Mix Chance",
  "Goal First Half",
  "Straight Win",
  "Over 1.5 Goals",
  "Under 2.5 Goals",
  "Handicap",

  // riskyTipsMarkets
  "Draw",
  "Correct Score",
  "Player Tip",
  "Cards",

  // specialTipsMarkets
  "Free Kicks",
  "Throw In",
  "Fouls",
  "Tackles",
  "Shots",
  "Shots on Target",
  "Goal Kicks",
  "Corners",

  // americaSportsPicks
  "Player Picks",
  "NFL Picks",
  "NBA Picks",
  "NHL Picks",
  "MLB Picks",
];

export const descriptions = [
  {
    link: "free-football-prediction-over-2.5-goals",
    label: "Over 2.5 Goals",
    description:
      "Football betting over 2.5 goals is becoming increasingly popular with fans and professionals alike. In this form of betting you are predicting that the match will end with three or more goals total being scored. This article will explain why football over 2.5 goals betting has become so popular and provide tips for making successful bets.\n\nThe popularity of over 2.5 goals betting can be attributed to the fact that it can be incredibly exciting. Watching a match with over 2.5 goals is always more thrilling then a low scoring game, and the anticipation of waiting to see if the third goal will come can be thrilling. \n\nFor those who are looking to make a successful over 2.5 goals bet, they should take the time to research the teams they are considering betting on. It is important to look into each team's recent matches to determine which one is more likely to score a large number of goals. Consider both teams goals per game statistics, and also look at the team's recent away/home form. \n\nStatistical analysis can also be helpful when making an over 2.5 goals bet. Tools such as Matchplug’s AI-based analysis can be used to determine which teams have the best chance of scoring two goals or more in a given match. Additionally, users can set alerts to notify them when an interesting game is about to start so that they can capitalize on the opportunity.",
  },
  {
    link: "free-football-predictions-both-team-to-score",
    label: "BTTS / GG",
    description:
      "Football betting has become increasingly popular in recent years, and with that has come the emergence of a new type of bet: Both Teams To Score (BTTS). With this type of bet, a punter can potentially win if both teams in a football match score at least one goal. \n\nThe concept is simple, and can be appealing for those looking to make a profit. If the team you bet on scores two or more, you win. If the opposing team fails to score, you’re still a winner. That’s why so many people love matchplug because its the best btts prediction site \nfor those choosing to invest in BTTS bets. \n\nBut before you start betting with BTTS, it’s important to consider some key points. Here are some tips to keep in mind:  \n\n1. Research Your Teams: Research each team you’re considering betting on. Learn as much as you can about their recent performances, injury reports, and news stories. This will allow you to make more informed bets.  \n\n2. Choose the Right Bookmaker: No two bookmakers are the same. It’s best to look around and compare what different operators can offer in terms of odds, bonuses, and promotions. The website Matchplug.com is a great resource for finding the best bookmaker for you. The site helps you compare different bookmakers’ offers and bonuses, and also provides advice on which bookmaker is best for BTTS bets.",
  },
  {
    link: "free-football-predictions-mix-chance",
    label: "Mix Chance",
    description:
      "Football betting involves forecasting the outcomes of games, as well as the exact score of matches and the teams that will qualify in each bracket. But with so many different betting options, it can be hard to know where to start. One popular method of football betting is a mix chance bet. Here’s what you need to know. \n\nWhat Are Mix Chance Bets? \n\nMix chance bets are a type of football bet that combines two or more individual bets into one single bet. This means that you get to put two bets on, but you can only win the wager if you get both of them correct. Mix chance bets offer more chances to win big money, so it’s one of the most popular ways to bet on football. \n\nAdvantages of Mix Chance Bets \n\nMix chance bets offer a number of advantages to football bettors: \n\n1. Increased odds. Because you’re putting two bets on, the odds for mix chance bets are usually better than for a single bet. This means you have a better chance of winning more money when you bet on a mix chance bet. \n\n2. More control. Another advantage to a mix chance bet is that you have more control over the outcome. You can choose two different bets, or even three, which means you can adjust the bet to suit your strategy and increase your chances of success. \n\n3. Flexible. Mix chance bets also offer more flexibility.",
  },
  {
    link: "free-football-predictions-goal-first-half",
    label: "Goal First Half",
    description:
      "Football betting can be an exciting way to add some extra thrill to your favorite game. By \nsetting achievable goals each half, you can turn the process into a profitable endeavor. If \nyou have an understanding of team tendencies, handicap line movements and other \nfactors, you can use your knowledge and Must win tips to put yourself in the best possible \nposition to make a winning wager.\nHalf-time goals are an excellent way to increase your chances of success when making \nfootball wagers. With half-time bets, you're wagering on which team will score more goals \nduring the first half or second half of the match. If you’re looking to make lots of money in \nfootball betting, setting goals each half is often a great way to get must win tips and 100 \npercent winning tips.\nOne good strategy to employ with goal-based football betting is to set either a fixed or on-going goal total for each half. For example, you can establish a goal of 4 for each half, \nmeaning that if either team reaches the total of 4 goals in either the first or second half, \nyour wager will be a winner. This type of goal-oriented betting is popular with in-play \nbettors that make quick decisions during the game.\nHedging your bets is also a useful strategy for achieving success with football betting. \nHedging your bets means that you'll wager on both teams to hit a particular goal total, \nrather than picking a single side or the other.",
  },
  {
    link: "free-football-predictions-1x2",
    label: "Straight Win",
    description:
      "Football betting has grown quickly in popularity in recent years and one of the most \ncommon bets for football is the 1x2 bet called the Straight Win. This straight win bet is one \nof the simplest bets to make with solid returns, and with the help of Matchplug.com you \ncan find football super tips for any major football game in just a few clicks of the mouse.\nThe 1x2 bet is quite straightforward and easy to understand, making it perfect for both new\nand experienced football bettors. When you make a 1x2 bet, you are essentially predicting \nwhich team will win the match. If you bet on the home team to win, it is referred to as 1, \nwhile the away team is 2 and a draw would be x. As an example, a bet of 1 would be \nbetting on the home team to win the match, and a bet of 2 is for the away team.\nSince Sure six straight win Today betting is one of the most basic bets on football, you can \npick up solid wins by going with the home team, as they usually have the home field \nadvantage. This is why at Matchplug.com, we match you up with the best odds \nrespectively in order to increase your chance of winning. With a simple but highly efficient \nsearch engine, you can compare multiple odds at once and quickly choose the best option \nto place your bet.",
  },
  {
    link: "free-football-predictions-over-1.5-goals",
    label: "Over 1.5 Goals",
    description:
      "Football betting is growing in popularity, and one of the most popular ways of making money from soccer betting is through betting on Over 1.5 Goals. This style of football betting is an excellent way to make money, as it allows you to capitalize on an unlikely but potentially profitable bet. \n\nTo understand why betting on Over 1.5 Goals can be so profitable, you first have to understand what Over 1.5 Goals actually means. This type of football betting involves you betting on any game where there will be more than one goal scored in the game. That is, you are betting that the goal tally in the game will be two or more goals. \n\nThis type of wager is an excellent way to make money from football betting, because the chances of a match ending with two or more goals are quite high. The average goal tally for a match in the top soccer leagues around the world is 2.25 goals, so as long as you manage your bets correctly, you should be able to win more often than you lose if you focus on Over 1.5 Goals. \n\nTo get the best Over 1.5 Goals football betting returns, it's essential that you manage your bets correctly, and that's where Matchplug comes in. Matchplug is the perfect tool to help you win more bets on Over 1.5 Goals. Our advanced algorithms analyze the data from the top football leagues and provide you with the best tips to make sure you're betting on Over 1.5 goals.",
  },
  {
    link: "free-football-predictions-under-2.5-goals",
    label: "Under 2.5 Goals",
    description:
      "Football fans and punters around the world love to make predictions on the match results of their favorite teams. One of the most interesting predictions they can make is regarding a match’s overall score - more specifically whether there will be under or over 2.5 goals. This type of bet is very popular and it can provide great returns if done correctly. \n\nCalled Under/Over 2.5 Goal markets in football betting, betting on under or over 2.5 goals means you are predicting the number of goals scored in a match to be less than or more than 2.5. For instance, if you place an under 2.5 bet for a match and the final score ends up as 1-1 – meaning 2 goals, then you will win your bet. If you had placed an over 2.5 bet, then you would have lost. \n\nAt Matchplug, we make it easy for you to follow your dreams of becoming a successful punter by providing you with all the essential information, predictions and tips you need to win. We understand that betting, especially on under/over 2.5 goals can feel intimidating, but with the right guidance, it can become one of the easiest bets to make. Our experienced professionals are here to provide you with valuable data and smart betting strategies to gain profits on the football matches you wager on.",
  },
  {
    link: "free-football-predictions-draw-predictions-and-tips",
    label: "Handicap",
    description:
      "Football betting has become an increasingly popular way to make money in recent years. With the rise of football fans across the globe, this type of wagering has skyrocketed in popularity. If you are looking to start betting on football, one of the most important things to understand is the concept of a draw. A draw in football betting implies that no team has a distinct advantage over the other. This means the outcome of the match could be a draw, or either team could win.\n\nDraws occur in football betting more often than you might think. In fact, approximately one-third of all matches in the english premier league result in a draw. This makes it important to understand how to bet on a draw and maximize your chances of winning. \n\nOne of the best ways to play a draw in football betting is through the Matchplug Acca Boost. This boosts your odds by up to 50%, making your chance for a win much higher. It also allows you to bet on more than one squad and create a 'combo' that covers all of your teams. Plus, with the Acca boost, you'll be able to get free weekly cash prizes as well. \n\nAnother key thing to note about draw betting in football is the cost. Since a draw can be a bit more unpredictable than other bets, the cost of the bet is often higher than average.",
  },
  {
    link: "free-football-predictions-correct-score-and-tips",
    label: "Draw",
    description:
      "Football betting has become increasingly popular in recent years and one of the most \npopular bets is correct score predictions. This involves predicting the exact score of a \nparticular football match. Accurate prediction of the correct score for a football match is \nquite difficult and as a result, correct score betting often provides more rewards than other \ntypes of football bets.\nIf you want to make a correct score bet, then you’re in the right place. Matchplug.com is \nthe king of correct score and offers you the perfect platform to make accurate predictions \nbased on our exhaustive analysis and assessment of football matches. With our cutting edge technology, we offer an edge over bookmakers. We are the ultimate online \ndestination for all your football betting needs.\nAt Matchplug.com, we use our deep knowledge and experience in the football betting \nindustry to assess the chances of each team in a particular match and how likely it is that \nthe match will end in the correct score that you predict. We also use our extensive \ndatabase of previous results and statistics to give you the best possible predictions for \nboth teams in a match. This wealth of information and detailed analysis allow you to make \nmore informed and accurate Correct score predictions—leading to better rewards.\nOn Matchplug.com, you will also find up-to-date information on the odds for different \ncorrect score matches which are being offered by different bookmakers. In addition to this, \nwe also provide you with the latest football news and updates, so that you are well informed before placing a correct score bet.",
  },
  {
    link: "free-football-prediction-ht-ft-predictions",
    label: "Correct Score",
    description:
      "Football betting has come leaps and bounds since its introduction and the advent of HT / \nFT bets one of the major advancement in the sports betting industry. HT / FT bets are no \ndoubt one of the most lucrative betting products available for bettors. With the help of HT / \nFT bets, bettors are now able to both hedge and speculate the outcome of football \nmatches, giving them a great chance to make a profit in the process through matchplug \nExpert Football Predictions. \nAt Matchplug.com, we understand the importance and significance of HT / FT bets and \nnow provide our clients a chance to utilise these bets and make huge profits. Before you \ntake part in these bets and win some money, let’s try to understand more about HT / FT \nbets and how we can benefit from them.\nWhat is HT / FT Betting?\nHT / FT bets is a type of betting, in which you provide a prediction or a guess The result of \na football match at both the half time and the end of the match. Most bookmakers have HT\n/ FT bets as a standard football bet, as this bet can offer decent returns based on the \nbookmaker’s odds.\nHow Does it Work?\nWhen you make a HT / FT bet, you must provide a prediction for the result of a football \nmatch at both halftime and full time. Your prediction must reflect accurately within the 90 \nminutes of the football match, including extra-time if it’s necessary.",
  },

  {
    link: "free-football-predictions-player-specials-and-tips",
    label: "Player Tip",
    description:
      "Matchplug offers Sure win Prediction today and we use analytics to create accurate football predictions which involves direct win prediction to help you win big.",
  },
  {
    link: "free-football-predictions-cards-predictions-and-tips",
    label: "Cards",
    description:
      "Football betting can be a great way to make some money, but with so many different bets to choose from it can be hard to decide which type is best for you. One popular bet type is the card bet. Card bets come in two forms - match cards and team cards. Both of these types of bets offer different opportunities for profit and can be a great way to top Soccer Predictions today and  add a bit of spice to your football betting. \n\nMatch cards are a great option for bettors who want to place a bet on the outcome of a game that has not yet been played. This type of bet allows you to predict the total number of cards that will be shown in the game. The odds on a match card are generally determined by the number of yellow and red cards in the game. If you think that a certain team is likely to be shown more cards in the match, then you can place a match card bet. The more cards that are shown in the match, the higher the odds and potential for profit. \n\nTeam cards are a great option for bettors who want to place a bet on the performance of a particular team in a match. This type of bet enables bettors to predict the total number of cards that the team in question is likely to receive over the course of the game. As with match cards, the odds on team cards generally depend on the number of yellow and red cards in the game.",
  },

  {
    link: "free-football-predictions-free-kick-prediction-and-tips",
    label: "Free Kicks",
    description:
      "Football betting is a popular way to make money and have more fun watching your favorite sports. Free kicks in football betting provide an opportunity to make money off of predicting the outcome of a game while taking only a minimal risk. It's an easy way to get started with football betting because the predictions do not need to be exact in order to make money. In this article, we'll explain the basics of free kicks betting in football and how you can use it to your advantage. \n\nBetting on free kicks in football is a strategy that is as old as the sport itself. It is based on the idea that the kicking team has an advantage when getting the ball because they have the opportunity to setup their runs and play into space. By predicting the outcome of these situations, bettors can make educated guesses about which team has the upper hand in this battle of wills. \n\nA great way to make money on free kicks in football betting is by using the Matchplug website. This website provides a comprehensive selection of football matches that you can bet on with their safe and secure betting platform. The website also includes a variety of bonuses that you can use to increase your winnings. They also offer match previews and recommendations from experienced tipsters to help you make more informed choices when it comes to your football bets.",
  },
  {
    link: "free-football-predictions-throw-in-prediction-and-tips",
    label: "Throw In",
    description:
      "Football betting is an exciting way to make money and enhance the enjoyment of watching your favorite sport. Thrown-ins in football betting is a great way for risk-takers and shrewd punters to potentially make large returns on just one bet. With the large number of thrown-ins that occur during the course of a game it can provide a great opportunity for astute punters to be ahead of the curve and capitalize on any potential edge. \n\nIn this article, we'll explore why thrown-ins in football betting can be a valuable tool for professional bettors and leisure bettors alike. We'll look at the different forms of thrown-in wagers and what to look for when placing a thrown-in wager. Finally, we’ll discuss why Matchplug is a great resource for punters who want to take advantage of thrown-ins in football betting. \n\nWhat are Thrown-Ins in Football Betting?\n\nThrown-ins in football betting refer to the strategic changes that a team makes during the course of a game that can impact the outcome of the match. This includes substitutions, tactical switches, formations and more. These changes can often give a punter an edge and can be used as a source of value betting. \n\nWhen placing a thrown-in bet, the key is to spot potential value early and to make sure you take advantage of the situation.",
  },
  {
    link: "free-football-predictions-fouls-prediction-and-tips",
    label: "Fouls",
    description:
      "Football betting has long been shrouded in mystery and confusion, but one thing is for certain - when it comes to fouls, it's a major no-no. Football betting can range from the small-time wagers of just pocket change to the much bigger financial investments, so when it comes to fouls, it's important to stay on the side of caution. If a bettor suspects that a match is being influenced by fouls, it's best to stay away. \n\nFouls in football betting have been around since the game was invented and they can be used to illegally alter the outcomes of games. Fouls come in many forms, and they can be used to manipulate the results of a match in favor of one team. For instance, if a referee gives a penalty to a team that would otherwise have been awarded a goal had the play been allowed to continue, it could be seen as a form of foul. \n\nFouls can also occur in other ways, such as teams receiving more time on the clock than they should have, or referees being bribed to make certain decisions. All of these activities are illegal and can be grounds for serious punishment. \n\nIf a bettor notices any hints of fouls being played out in a match in which they are betting, it's best to immediately investigate the situation further. Simply raising the alarm and voicing their concerns is often enough to get any unscrupulous actions stopped. Alternatively, bettors can report their suspicions.",
  },

  {
    link: "free-football-prediction-tackles",
    label: "Tackles",
    description:
      "Football betting is one of the most popular forms of gambling. It's an exciting way to get \ninvolved in the action, with the chance to win big money if you make the right predictions. \nHowever, there are certain challenges that can make it difficult to win – and one of the \nmost important is mastering the art of tackles.\nTackles are a crucial part of football betting, as they can lead to major shifts in momentum \nthat significantly affect the outcome of a game. As such, it's essential to understand the \nbasics of tackling and how it can impact your betting decisions.\nUnderstanding Tackles\nAt its core, a tackle is when an opposing player is brought down by an opponent. It's a key \nstrategy used in football to disrupt an opponent's play and give your team the upper hand. \nThere are two main types of tackles: defensive tackles and offensive tackles.\nA defensive tackle is usually employed when an opponent tries to run or pass the ball. It's \na tackles used to stop the play and can be achieved by a single player, multiple players, or\neven by a group of players. The key aim is to stop the ball carrier from gaining yards, as \nwell as forcing a turnover.\nAn offensive tackle, on the other hand, is used when a team has the ball and wants to gain\nyardage. In this case, an offensive tackle is used to open a gap for the ball carrier. This is \ndone by blocking an opponent.",
  },
  {
    link: "free-football-predictions-shots-prediction-and-tips",
    label: "Shots",
    description:
      "Football betting is one of the most popular forms of sports wagering, and while predicting the outcome of games is a challenging and exciting venture, it pays to know how to increase your chances of winning. One way to do this is through shot prediction in football betting. \n\nWith a little bit of knowledge and understanding of the fundamentals, you can be better prepared to make informed decisions when placing your bets. Using the right strategies and techniques, you can increase your chances of success and make a profit from Todays football prediction . \n\nThe number of shots taken in a game can be an important factor to consider when selecting which team to bet on. By analyzing the number of shots taken, you can gain an advantage as you can predict which team is likely to perform better, or is more likely to score. You can also take advantage of the situation when the team has an unrealistically low number of shots taken, or when the teams have an exceptional amount of shots taken. \n\nIt is also important to note the quality of shots that each team has taken. The higher quality shots will usually be from a closer distance from the goal and thus have a higher probability of being successful. When betting on football, you should look for teams that are attempting more shots from close range. \n\nGood knowledge about the teams that are playing will also be beneficial. Knowing how each team sets up and how they defend can help you understand how many shots they should be taking, and which type of shots they should be taking.",
  },
  {
    link: "free-football-predictions-shots-on-target-prediction-and-tips",
    label: "Shots on Target",
    description:
      "Shots on Target in Football Betting is a great option for sports bettors looking to maximize their winnings. Whether you are a beginner or an experienced bettor, shots on target can be your friend. By understanding the importance and impact that shots on target have on a game, you can increase your chances of success in football betting.\n\nWhen it comes to placing a shot on target in football betting, the most important factor to consider is the accuracy of the shot being taken. A shot must be on target to become a goal scoring opportunity and thus increase your chances of winning. To ensure accuracy, it is important to research the player and team you are betting on. Knowing who the top goal scorers are, the weaknesses of the opposition’s defense, and the form of the players is all important information that can help you make informed decisions when shot on target betting using football tips. \n\nAt MatchPlug, we understand the importance of shots on target in football betting and are committed to helping our customers make informed decisions when placing these bets. We have a comprehensive database of football stats, analysis and news that can help you identify the top shooters in any game. We also provide detailed betting tips and analysis to help you identify the best shots on target in any given match. \n\nBy doing your research and using the tools available at MatchPlug, you can increase your chances of making successful shots on target bets in football. We are dedicated to helping you make informed bets.",
  },
  {
    link: "free-footballpredictions-goal-kicks-predictions-and-tips",
    label: "Goal Kicks",
    description:
      "Goal kicks in football betting can be a great way to win a lot of money – if you know what you are doing. It is a straightforward betting option that offers a small but steady stream of wins. With the right strategy and knowledge, you can increase your chances of making a big profit. \n\nHere at Matchplug, we are dedicated to helping you make the most of your football betting, and goal kicks is no exception. We provide the most accurate football match prediction and tips to ensure that you have all the information to make the best decisions. Our advice is founded on the latest data, trends and analysis, so you can take full advantage of all the opportunities the market has to offer.  \n\nIf you want to get started with goal kicks in football betting, the crucial first step is to find a reliable online bookmaker. With so many bookies available these days, it is important to pick one with a good reputation and a solid track record. Make sure to read the terms and conditions of your chosen bookmaker before signing up, to ensure that you understand all the rules and won't get any nasty surprises in the long run.  \n\nOnce you have a bookmaker in place, your next step is to closely monitor the football matches taking place and observe the goal kick patterns of the teams involved. Are they consistent, or do they vary from match to match.",
  },

  {
    link: "free-football-predictions-corner-predictions-and-tips",
    label: "Corners",
    description:
      "Football betting wouldn't be complete without the corner market. Corner betting adds an element of complexity and nuance to the traditional 1X2 result market. This article will cover the basics of corner bet and how to benefit from them when placing football bets. \n\nCorner bets are a great way to increase your return on investment when betting on football. They are relatively simple to understand and provide exciting opportunities for punters who are knowledgeable about this type of bet. \n\nCorner betting revolves around how many corners each team will earn in a particular match. Generally, the result market itself is independent of the corner market. This means that the result of the match will not necessarily affect the corner bet, allowing it to be used as an avenue for more accurate betting tips. \n\nIf you are a corner bet enthusiast, you will want to practice the strategy of predicting more than just the result of the match. With corner betting, you must analyze the teams, the lineup, recent form, head-to-head, general stats and the match venue. It’s also important to look into individual players, who may have an effect on the number of corner kicks earned. \n\nThe beauty of corner betting is that you can use your knowledge of the sport to increase your chances of successfully predicting a corner outcome. Familiarize yourself with the players, teams and match history to identify the teams that play with tactics that primarily rely on corner kicks for scoring.",
  },

  {
    link: "sports-betting-tips-NFL-predictions-and-tips",
    label: "NFL Picks",
    description:
      "Are you looking for the latest NFL predictions today? Well, you have come to the right place! Matchplug is your number one source for daily, high-quality NFL predictions. Our team of experts has been studying the game for years and we have developed algorithms that help us make the most accurate predictions. \n\nAt Matchplug, we understand that football fans are passionate about the game and are always looking for the best possible predictions. That is why we are constantly updating our algorithms to make our predictions even more accurate. We understand that predicting the outcomes of NFL games correctly is not an easy task and takes a lot of knowledge and resources. That is why we make sure to provide our customers with the best information possible to make their predictions even more reliable.\nAre you looking for NFL expert picks to put your money on? Having expert opinions on points and wins is always a great way for NFL fans to potentially make money. Matchplug.com is an online sports betting platform that provides NFL expert picks and betting odds for bettors.  \n\nMatchplug.com provides updated information on the week’s games and picks from award-winning handicappers of the NFL. Whether you are a recreational gambler or a serious bettor, the expert picks of the Matchplug team can help you win big. You can stay ahead of the curve and increase your winnings by taking advantage of their detailed analysis and picks which are easy to understand and use. \n\nThe expert picks that you can find on Matchplug.com come with a competitive advantage. The Matchplug team strives to provide you with the best possible odds that give you the highest win probability. With in-depth analysis and betting strategy, you can make smarter decisions and become more successful with your NFL betting. \n\nThe Matchplug method is perfect for those who want to make money off of NFL betting. No more guesswork. Matchplug.com’s experts provide catered advice based on team analysis, player stats, and all other information related to the current week’s games.",
  },
  {
    link: "sports-betting-tips-NBA-predictions-and-tips",
    label: "NBA Picks",
    description:
      "As the NBA season heads into its busiest period of the year, sports bettors are searching for the best way to make their basketball picks. With the help of Matchplug, you can now get expert NBA picks from the pros. \n\nMatchplug is an online sports betting and prediction provider. They offer a variety of expert NBA picks, helping users understand the sports betting market better and enabling them to make strategic decisions with greater confidence. All of their picks come from experienced NBA experts who have strong records of success in the NBA betting scene. \n\nAt Matchplug, they are committed to providing users with the most informed and reliable picks possible. Each expert they hire has access to a multitude of data points, including player and team performance history, which they use to come up with their picks. Additionally, the experts analyze game situations, matchups, and any other pertinent information that can provide insight into the game. \n\nNot only do Matchplug’s experts provide valuable picks for sports bettors, but they also offer betting advice, offering opinions on which bets are likely to be the most profitable. With the insights provided by their experts, users can make informed decisions in setting their own betting lines and understand the likelihood of winning or losing. \n\nGoing to the sportsbook without the help of an expert can be risky, which is why Matchplug’s team of professionals is an invaluable asset for anyone who wants to make a successful wager.",
  },
  {
    link: "sports-betting-tips-NHL-predictions-and-tips",
    label: "NHL Picks",
    description:
      "NHL expert picks are an invaluable tool for sports bettors looking to maximize their profits. \nWhether you’re a novice or an experienced sports bettor, expert picks can provide useful \ninsight into which teams are most likely to win. In today’s sports betting climate, NHL \nexpert picks are more popular than ever – but with so many out there, how are you \nsupposed to tell which picks are best?\nThat’s where Matchplug comes in. Our expert handicappers bring years of experience and\nknowledge to the table when making NHL picks. We study team trends, injury reports and \nmore to come up with the most informed and accurate NHL picks for each game. Our picks\nare not just about who will win; we take into account potential value and which wagers \nprovide the highest chance of success.\nIf you’re ready to take your NHL betting to the next level, Matchplug provides the perfect \nsolution. We keep our members up-to-date on the latest trends and give them VMS Picks, \na daily edition of hot picks ready for action. Of course, our members also get access to our\nfull range of expert NHL picks for every game, along with detailed analysis and betting tips.\nMake the right NHL picks this season with Matchplug. We provide the most \ncomprehensive and accurate NHL expert picks available online. Join us today and start \nwinning the games you bet on.",
  },
  {
    link: "sports-betting-tips-MLB-predictions-and-tips",
    label: "MLB Picks",
    description:
      "Whether you are an expert bettor or an enthusiastic beginner, MLB Expert Picks from Matchplug can help you make the best betting decisions. \n\nHaving an edge when betting on MLB games is essential. Knowing the range of outcomes, the stats and the numbers behind each team and how they match up against one another, is vital to make well-informed bets.  \n\nMatchplug has you covered with MLB Expert Picks. As a professional betting analysis platform, it provides detailed betting stats, trends and team analysis. The information is powered by AI and human analysis, compiling data on a team’s batting, pitching and fielding trends and records. \n\nUsing MLB Expert Picks from Matchplug, you will know the trends in which teams and players specialize, giving you the edge in deciding the right picks and bets. You’ll find comprehensive data on the stats, records and team performance, trends, league overviews and game summaries. \n\nMatchplug’s MLB Expert Picks come with a full range of data from individual players and teams, including batting averages and pitching stats. This information gives you an insight into each team and players’ form, as well as their overall record so that you can place your bets more thoughtfully.  \n\nMatchplug’s MLB Expert Picks also provide daily picks from professional tipsters who know exactly which team and player stats to research and look for when it comes to making the smartest betting decisions.",
  },
  {
    link: "sports-betting-tips-NCAAB-predictions-and-tips",
    label: "NCAAB Picks",
    description: `College basketball is one of the most exciting and unpredictable sports to wager on, and with so many games played throughout the season, having expert guidance is essential. Our NCAAB picks, predictions, and betting tips provide you with in-depth analysis to help you make smarter betting decisions on every matchup.\n\n

From non-conference games to March Madness, we break down all the key factors that influence outcomes — including team form, player matchups, injuries, advanced stats, and historical trends. Our experts carefully evaluate point spreads, moneylines, over/under totals, and even prop bets, highlighting the best opportunities to maximize value.\n\n

Betting on college basketball offers countless options, but it can also be overwhelming given the number of games each week. That’s why we focus on quality over quantity, delivering researched predictions that point you toward the strongest plays. Whether you are a seasoned bettor or new to NCAAB betting, our tips are designed to simplify your choices and give you the confidence to place smarter wagers.\n\n

As the season progresses and tournament time approaches, the stakes get even higher. From regular-season showdowns to conference championships and the NCAA Tournament, our NCAAB betting tips ensure you stay ahead of the action. Trust our expert insights to guide you through every stage of the season and help turn your basketball knowledge into winning bets.`,
  },
  {
    link: "sports-betting-tips-NCAAF-predictions-and-tips",
    label: "NCAAF Picks",
    description: `If you are looking for reliable NCAAF picks, predictions, and betting tips, this is the right place. College football is one of the most exciting sports to bet on, with thrilling rivalries, high-scoring games, and unpredictable results that make every week unique. Having the right insights can give you an edge, and that is exactly what our NCAAF betting tips provide.\n\n

Our expert analysis covers every angle of the game — from team form, head-to-head history, injuries, and key player performances, to advanced stats and betting trends. Whether you are a seasoned bettor or just starting out, our predictions are designed to help you make informed decisions. Each pick is carefully researched to highlight value bets, potential upsets, and smart wagering strategies for both favorites and underdogs.\n\n`,
  },
];

export const predictionMap = {
  // --- Football Betting Tips ---
  "free-football-prediction-over-2.5-goals": "Over 2.5 Goals",
  "free-football-predictions-both-team-to-score": "BTTS / GG",
  "free-football-predictions-mix-chance": "Mix Chance",
  "free-football-predictions-goal-first-half": "Goal First Half",
  "free-football-predictions-1x2": "Straight Win",
  "free-football-predictions-over-1.5-goals": "Over 1.5 Goals",
  "free-football-predictions-under-2.5-goals": "Under 2.5 Goals",

  // --- Risky Tips Markets ---
  "free-football-predictions-draw-predictions-and-tips": "Draw",
  "free-football-predictions-correct-score-and-tips": "Correct Score",
  "free-football-predictions-handicap-predictions": "Handicap",
  "free-football-predictions-player-specials-and-tips": "Player Tip",
  "free-football-predictions-cards-predictions-and-tips": "Cards",

  // --- Special Tips Markets ---
  "free-football-predictions-free-kick-prediction-and-tips": "Free Kicks",
  "free-football-predictions-throw-in-prediction-and-tips": "Throw In",
  "free-football-predictions-fouls-prediction-and-tips": "Fouls",
  "free-football-prediction-tackles": "Tackles",
  "free-football-predictions-shots-prediction-and-tips": "Shots",
  "free-football-predictions-shots-on-target-prediction-and-tips":
    "Shots on Target",
  "free-footballpredictions-goal-kicks-predictions-and-tips": "Goal Kicks",
  "free-football-predictions-corner-predictions-and-tips": "Corners",

  // --- American Sports Picks ---
  "sports-betting-tips-NFL-predictions-and-tips": "NFL Picks",
  "sports-betting-tips-NBA-predictions-and-tips": "NBA Picks",
  "sports-betting-tips-MLB-predictions-and-tips": "MLB Picks",
  "sports-betting-tips-NHL-predictions-and-tips": "NHL Picks",
  "sports-betting-tips-NCAAB-picks-predictions-and-tips": "NCAAB Picks",
  "sports-betting-tips-NCAAF-Picks-predictions-and-tips": "NCAAF Picks",
};

export type PredictionMap = keyof typeof predictionMap;

function findKeyByName(name: string) {
  return descriptions.find(({ label }) => label === name)?.link ?? "";
}

export const predictionData: PredictionData = {
  footballBettingTips: [
    {
      id: "1",
      title: "Straight Win",
      subtitle: "5-6 Wins from the last 7 games",
      accuracy: "78% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "2",
      title: "Over 2.5 Goals",
      subtitle: "5-6 Wins from the last 7 games",
      accuracy: "78% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "3",
      title: "BTTS / GG",
      subtitle: "5-6 Wins from the last 7 games",
      accuracy: "78% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "4",
      title: "Mix Chance",
      subtitle: "5-6 Wins from the last 7 games",
      accuracy: "78% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "5",
      title: "Goal First Half",
      subtitle: "5-6 Wins from the last 7 games",
      accuracy: "78% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "6",
      title: "Over 1.5 Goals",
      subtitle: "5-6 Wins from the last 7 games",
      accuracy: "78% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "7",
      title: "Under 2.5 Goals",
      subtitle: "5-6 Wins from the last 7 games",
      accuracy: "78% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "8",
      title: "Handicap",
      subtitle: "5-6 Wins from the last 7 games",
      accuracy: "78% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
  ],

  riskyTipsMarkets: [
    {
      id: "9",
      title: "Draw",
      subtitle: "4-5 Wins from the last 7 games",
      accuracy: "65% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "10",
      title: "Correct Score",
      subtitle: "3-4 Wins from the last 7 games",
      accuracy: "55% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },

    {
      id: "12",
      title: "Player Tip",
      subtitle: "4-5 Wins from the last 7 games",
      accuracy: "64% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "13",
      title: "Cards",
      subtitle: "4-5 Wins from the last 7 games",
      accuracy: "62% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
  ],

  specialTipsMarkets: [
    {
      id: "15",
      title: "Free Kicks",
      subtitle: "6-7 Wins from the last 7 games",
      accuracy: "85% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "16",
      title: "Throw In",
      subtitle: "7-7 Wins from the last 7 games",
      accuracy: "90% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "17",
      title: "Fouls",
      subtitle: "5-6 Wins from the last 7 games",
      accuracy: "80% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },

    {
      id: "19",
      title: "Tackles",
      subtitle: "7-7 Wins from the last 7 games",
      accuracy: "92% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "20",
      title: "Shots",
      subtitle: "6-6 Wins from the last 7 games",
      accuracy: "88% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "21",
      title: "Shots on Target",
      subtitle: "7-7 Wins from the last 7 games",
      accuracy: "92% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "22",
      title: "Goal Kicks",
      subtitle: "7-7 Wins from the last 7 games",
      accuracy: "92% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },

    {
      id: "24",
      title: "Corners",
      subtitle: "7-7 Wins from the last 7 games",
      accuracy: "92% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
  ],
  americaSportsPicks: [
    {
      id: "28",
      title: "NFL Picks",
      subtitle: "5-6 Wins from the last 7 games",
      accuracy: "75% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "29",
      title: "NBA Picks",
      subtitle: "4-5 Wins from the last 7 games",
      accuracy: "72% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "30",
      title: "NHL Picks",
      subtitle: "4-5 Wins from the last 7 games",
      accuracy: "70% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "31",
      title: "MLB Picks",
      subtitle: "5-6 Wins from the last 7 games",
      accuracy: "76% Accurate",
      backgroundImage:
        "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      url: "#",
    },
    {
      id: "32",
      title: "NCAAB Picks",
      accuracy: "72% Accurate",
      subtitle: "8-9 Wins from the last 7 games",
      backgroundImage:
        "/ncaab.jpg",
      url: "#",
    },

    {
      id: "33",
      title: "NCAAF Picks",
      accuracy: "79% Accurate",
      subtitle: "4-6 Wins from the last 7 games",
      backgroundImage:
        "/ncaaf.jpg",
      url: "#",
    },
  ],
};

interface PredictionCard {
  id: string;
  title: string;
  subtitle: string;
  accuracy: string;
  backgroundImage: string;
  url: string;
}

interface PredictionData {
  footballBettingTips: PredictionCard[];
  riskyTipsMarkets: PredictionCard[];
  specialTipsMarkets: PredictionCard[];
  americaSportsPicks: PredictionCard[];
}

const DirectWinPredictions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | "footballBettingTips"
    | "riskyTipsMarkets"
    | "specialTipsMarkets"
    | "americaSportsPicks"
  >("footballBettingTips");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dummy data - replace with API later

  const getCurrentData = () => predictionData[activeTab];
  const displayData = getCurrentData();

  const handlePrevious = () => {
    const totalData = getCurrentData().length;
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, totalData - 4) : Math.max(0, prev - 1)
    );
  };

  const handleNext = () => {
    const totalData = getCurrentData().length;
    setCurrentIndex((prev) => (prev + 4 >= totalData ? 0 : prev + 1));
  };

  const handleTabChange = (
    tab:
      | "footballBettingTips"
      | "riskyTipsMarkets"
      | "specialTipsMarkets"
      | "americaSportsPicks"
  ) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const PredictionCard: React.FC<{ card: PredictionCard }> = ({ card }) => (
    <Link
      onClick={() => {
        localStorage.setItem("slug", card.title);
      }}
      onMouseDown={() => {
        localStorage.setItem("slug", card.title);
      }}
      href={`/${findKeyByName(card.title)}`}
    >
      <div className="relative  w-full h-fit rounded-4xl overflow-hidden flex-shrink-0 group  transform transition-all duration-300">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${card.backgroundImage})` }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300" />

        {/* Content */}
        <div className="relative z-10 px-6 py-10 h-full flex flex-col items-center justify-between text-white">
          {/* Top section with logo */}

          {/* Bottom section with content */}
          <div className="space-y-4  flex items-center justify-center flex-col text-center">
            <div className="flex flex-col gap-1 items-center justify-center">
              <Logo className="w-13" />
              <h3 className="text-lg underline text-gray-200 ">{card.title}</h3>
              <p className="text-gray-200  max-w-40 text-center">
                {card.subtitle}
              </p>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <p className=" font-semibold text-lg">{card.accuracy}</p>

              <button className="bg-white cursor-pointer hover:bg-gray-100 text-black font-bold py-2 px-6 rounded-full  transition-all duration-200 transform hover:scale-105 cursor-pointer">
                Bet Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <section id="tips" className=" py-16 relative">
      <div className="absolute inset-0 z-0">
        <img src="/bg1.png" alt="" className="h-full w-full bg-cover" />
      </div>
      <div className="max-w-7xl mx-auto px-4 z-10 relative">
        {/* Header with Navigation Arrows */}

        <div className="text-center flex flex-col items-center justify-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
            More Free Soccer Tips by Market
          </h2>
          <p className="text-black  md:text-lg max-w-xl">
            Matchplug is the worlds most wanted hot prediction site with over{" "}
            <br className="hidden md:block" />
            30 free betting tips markets.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-3 flex-wrap items-center justify-center">
            <button
              onClick={() => handleTabChange("footballBettingTips")}
              className={` px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 border border-black/10 ${
                activeTab === "footballBettingTips"
                  ? "bg-[#455DBD] text-white"
                  : "text-gray-600 bg-white bla hover:text-gray-800"
              }`}
            >
              Football Betting Tips
            </button>
            <button
              onClick={() => handleTabChange("riskyTipsMarkets")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 border border-black/10 ${
                activeTab === "riskyTipsMarkets"
                  ? "bg-[#455DBD] text-white"
                  : "text-gray-600 bg-white bla hover:text-gray-800"
              }`}
            >
              Risky Tips Markets
            </button>
            <button
              onClick={() => handleTabChange("specialTipsMarkets")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 border border-black/10 ${
                activeTab === "specialTipsMarkets"
                  ? "bg-[#455DBD] text-white"
                  : "text-gray-600 bg-white bla hover:text-gray-800"
              }`}
            >
              Special Tips Markets
            </button>
            <button
              onClick={() => handleTabChange("americaSportsPicks")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 border border-black/10 ${
                activeTab === "americaSportsPicks"
                  ? "bg-[#455DBD] text-white"
                  : "text-gray-600 bg-white bla hover:text-gray-800"
              }`}
            >
              America Sports Picks
            </button>
          </div>
        </div>

        {/* Cards Container */}
        <div className="relative">
          <div className="gap-6 flex-col items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center pb-4 ">
            {displayData.map((card) => (
              <PredictionCard key={card.id} card={card} />
            ))}
          </div>

          {/* Fade out effect on right */}
          {/* <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-100 to-transparent pointer-events-none" /> */}
        </div>
      </div>
    </section>
  );
};

export default DirectWinPredictions;
