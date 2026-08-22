// Proxy to fetch single blog details by post id
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // ...implement actual logic here...
  return NextResponse.json({
    id: 34416,
    title: "FC Cincinnati&#8217;s Evander fined by MLS Disciplinary Committee",
    content:
      '\n<p>The MLS Disciplinary Committee has issued the following rulings after Matchday 31 of the 2025 season.</p>\n\n\n\n<h3 class="wp-block-heading">MLS Disciplinary Committee fined Evander</h3>\n\n\n\n<p>The Committee has fined <a href="https://www.mlssoccer.com/clubs/fc-cincinnati/">FC Cincinnati</a> midfielder Evander for violating the league’s policy regarding simulation/embellishment in the 36th minute of Cincinnati’s match against <a href="https://www.mlssoccer.com/clubs/philadelphia-union/">Philadelphia Union</a> on August 30th.</p>\n\n\n\n<h3 class="wp-block-heading">Toklomati fined</h3>\n\n\n\n<p>The MLS Disciplinary Committee has fined <a href="https://www.mlssoccer.com/clubs/charlotte-fc/">Charlotte FC</a> forward <a href="https://www.mlssoccer.com/players/idan-toklomati/">Idan Toklomati</a> for making an inappropriate gesture in the 87th minute of Charlotte FC&#8217;s match against the <a href="https://www.mlssoccer.com/clubs/new-england-revolution/">New England Revolution</a> on August 30th.</p>\n',
    excerpt:
      "The MLS Disciplinary Committee has issued the following rulings after Matchday 31 of the 2025 season. MLS Disciplinary Committee fined Evander The Committee has fined FC Cincinnati midfielder Evander for violating the league’s policy regarding simulation/embellishment in the 36th minute of Cincinnati’s match against Philadelphia Union on August 30th. Toklomati fined The MLS Disciplinary Committee has fined Charlotte FC forward Idan Toklomati for making an inappropriate gesture in the 87th minute of Charlotte FC&#8217;s match against the New England Revolution on August 30th.",
    date: "2025-09-03T11:44:25+01:00",
    author: {
      id: "4",
      name: "Jane Njoku",
    },
    featured_image:
      "https://matchplug.com/blog/wp-content/uploads/2025/09/fc-cincinnatis-evander-fined-by-mls-disciplinary-committee.png",
    comment_count: 0,
    views: 0,
    categories: ["American Sport", "MLS"],
    tags: [],
  });
}
