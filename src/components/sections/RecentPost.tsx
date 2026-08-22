import { v4 as uuidv4 } from "uuid";

const featuredPost = {
  id: 1,
  title: "New Premier League kits for season 2017/18",
  image: "/images/featured.jpg",
  author: "adminJCeN",
  date: "August 2, 2017",
};

const trendingNews = [
  {
    id: 2,
    title: "LAFC Sign Brazilian Midfielder Jailson Through 2025",
    image: "/images/news1.jpg",
    date: "September 3, 2025",
  },
  {
    id: 3,
    title: "FC Cincinnati’s Evander fined by MLS Disciplinary Committee",
    image: "/images/news2.jpg",
    date: "September 3, 2025",
  },
  // ...rest of your posts
];

export default function RecentPosts() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Featured Post */}
        <div className="lg:col-span-1 rounded-xl overflow-hidden shadow-md relative">
          <img
            src={featuredPost.image}
            alt={featuredPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
            <p className="text-xs flex items-center gap-2">
              <span className="font-semibold">{featuredPost.author}</span> •{" "}
              {featuredPost.date}
            </p>
            <h3 className="text-lg font-bold">{featuredPost.title}</h3>
          </div>
        </div>

        {/* Right Posts Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {trendingNews.map((news) => (
            <div
              key={uuidv4()}
              className="rounded-xl shadow-md overflow-hidden bg-white"
            >
              <img
                src={news.image}
                alt={news.title}
                className="h-32 w-full object-cover"
              />
              <div className="p-3">
                <p className="text-sm text-gray-500">{news.date}</p>
                <h3 className="font-semibold">{news.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
