// Proxy for hot news ticker posts
import { NextResponse } from "next/server";

export async function GET() {
  // ...implement actual logic here...
  return NextResponse.json({
    success: true,
    menu: "ajiSideBarMenu",
    items: [
      {
        id: 10179,
        title: "Arsenal defender nears a return to Italy",
        url: "http://localhost:8080/blog/arsenal-defender-nears-a-return-to-italy/",
        parent: "0",
        object: "post",
        slug: "arsenal-defender-nears-a-return-to-italy",
      },
      {
        id: 10175,
        title: "Borussia Dortmund vs Bayer Leverkusen Match Preview",
        url: "http://localhost:8080/blog/borussia-dortmund-vs-bayer-leverkusen-match-preview/",
        parent: "0",
        object: "post",
        slug: "borussia-dortmund-vs-bayer-leverkusen-match-preview",
      },
      {
        id: 10178,
        title: "Crystal Palace vs Arsenal Match Preview",
        url: "http://localhost:8080/blog/crystal-palace-vs-arsenal-match-preview/",
        parent: "0",
        object: "post",
        slug: "crystal-palace-vs-arsenal-match-preview",
      },
      {
        id: 10177,
        title: "Eintracht Frankfurt vs Bayern Munich Match Preview",
        url: "http://localhost:8080/blog/eintracht-frankfurt-vs-bayern-munich-match-preview/",
        parent: "0",
        object: "post",
        slug: "eintracht-frankfurt-vs-bayern-munich-match-preview",
      },
      {
        id: 10176,
        title: "Fulham vs Liverpool Match Preview",
        url: "http://localhost:8080/blog/fulham-vs-liverpool-match-preview/",
        parent: "0",
        object: "post",
        slug: "fulham-vs-liverpool-match-preview",
      },
      {
        id: 10180,
        title: "Batting School and Batting Tips",
        url: "https://matchplug.com/",
        parent: "0",
        object: "custom",
        slug: "#",
      },
      {
        id: 10173,
        title: "Conatct Us",
        url: "https://www.matchplug.com/Contact.php",
        parent: "0",
        object: "custom",
        slug: "#",
      },
    ],
  });
}
