// Proxy for posts by category
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // ...implement actual logic here...
  return NextResponse.json({
    data: [
      {
        id: 32575,
        title: "Bears QB Caleb Williams Opens Up About Draft Drama",
        link: "http://localhost:8080/blog/bears-qb-caleb-williams-opens-up-about-draft-drama/",
        date: "June 10, 2025",
        image:
          "http://localhost:8080/blog/wp-content/uploads/2025/06/caleb-williams-opens-up-about-draft-drama-300x171.png",
        author: {
          id: "4",
          name: "Jane Njoku",
          image:
            "https://secure.gravatar.com/avatar/d52c1219bd3dbcf74203e1c9c5df50f1c4b00d9bf4e20af18533f2747c20ec9a?s=96&d=mm&r=g",
          link: "http://localhost:8080/blog/author/jane/",
        },
      },
      {
        id: 31939,
        title: "Arsenal Learn Stunning Asking Price to Sign Sesko",
        link: "http://localhost:8080/blog/arsenal-learn-stunning-asking-price-to-sign-sesko/",
        date: "June 2, 2025",
        image:
          "http://localhost:8080/blog/wp-content/uploads/2025/06/arsenal-learn-stunning-asking-price-for-sesko-300x200.png",
        author: {
          id: "4",
          name: "Jane Njoku",
          image:
            "https://secure.gravatar.com/avatar/d52c1219bd3dbcf74203e1c9c5df50f1c4b00d9bf4e20af18533f2747c20ec9a?s=96&d=mm&r=g",
          link: "http://localhost:8080/blog/author/jane/",
        },
      },
      {
        id: 22088,
        title: "Exploring the Advantages of 1win for Nigerian Players",
        link: "http://localhost:8080/blog/exploring-the-advantages-of-1win-for-nigerian-players/",
        date: "August 22, 2024",
        image:
          "http://localhost:8080/blog/wp-content/uploads/2024/08/1win-300x187.png",
        author: {
          id: "10",
          name: "adminJCeN",
          image:
            "https://secure.gravatar.com/avatar/2feed8cad0a1b354a8b6da4db05e83cae2508291eeaf20daf686623d73973d39?s=96&d=mm&r=g",
          link: "http://localhost:8080/blog/author/adminjcen/",
        },
      },
      {
        id: 22056,
        title:
          "Football Predictions Today: Villarreal VS Atletico Madrid Sure Tips",
        link: "http://localhost:8080/blog/football-predictions-today-villarreal-vs-atletico-madrid-sure-tips/",
        date: "August 19, 2024",
        image:
          "http://localhost:8080/blog/wp-content/uploads/2024/08/football-predictions-today-villarreal-vs-atletico-madrid-sure-tips-300x171.jpg",
        author: {
          id: "4",
          name: "Jane Njoku",
          image:
            "https://secure.gravatar.com/avatar/d52c1219bd3dbcf74203e1c9c5df50f1c4b00d9bf4e20af18533f2747c20ec9a?s=96&d=mm&r=g",
          link: "http://localhost:8080/blog/author/jane/",
        },
      },
      {
        id: 22060,
        title: "Football Predictions Today: Leicester VS Tottenham Sure Tips",
        link: "http://localhost:8080/blog/football-predictions-today-leicester-vs-tottenham-sure-tips/",
        date: "August 19, 2024",
        image:
          "http://localhost:8080/blog/wp-content/uploads/2024/08/football-predictions-today-leicester-vs-tottenham-sure-tips-300x171.jpg",
        author: {
          id: "4",
          name: "Jane Njoku",
          image:
            "https://secure.gravatar.com/avatar/d52c1219bd3dbcf74203e1c9c5df50f1c4b00d9bf4e20af18533f2747c20ec9a?s=96&d=mm&r=g",
          link: "http://localhost:8080/blog/author/jane/",
        },
      },
    ],
    found: 5,
    pages: 1,
  });
}
