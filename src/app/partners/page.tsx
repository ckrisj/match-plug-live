import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Link } from "lucide-react";

export default function Partners() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
        Become a Partner
      </h1>

      {/* Intro */}
      <p className="text-center text-lg text-gray-600 dark:text-cyan-900 mb-10">
        Matchplug Sports Group (MSG) is seeking partners to ensure we deliver
        the best content to our audience. <br />
        If you want your website added, please add us first on your page using
        the information below.
      </p>

      {/* Info Card */}
      <div className="bg-white dark:bg-blue-100 shadow-lg rounded-2xl p-8 space-y-4">
        <div>
          <span className="font-semibold  text-blue-950">Name:</span> Matchplug
        </div>
        <div>
          <span className="font-semibold text-blue-950">Description:</span>{" "}
          Football Predictions Today
        </div>
        <div>
          <span className="font-semibold text-blue-950">URL :</span>
          {"  "}
          <Link
            href="https://www.matchplug.com/partners/"
            className="text-indigo-600 hover:underline"
            target="_blank"
          >
            https://www.matchplug.com/partners/
          </Link>
        </div>
      </div>

      {/* Contact */}
      <div className="text-center mt-10">
        <p className="text-gray-800 text-lg mb-4">Then send us an email:</p>
        <p className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-full shadow-md transition">
          hello@matchplug.com
        </p>
      </div>
    </section>
  );
}
