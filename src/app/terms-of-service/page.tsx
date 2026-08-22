import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function TermsOfService() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 leading-relaxed text-gray-800 dark:text-gray-800">
      <h1 className="text-4xl font-extrabold text-center text-gray-700 mt-10 mb-10">
        Terms of Service
      </h1>

      <h2 className="text-lg text-justify text-gray-500 dark:text-gray-600 mb-8 mt-5 uppercase tracking-wide">
        Legal Information and Notices
      </h2>

      {/* Section 1 */}
      <div className="mb-1">
        <p>
          Betting tips, predictions, analysis, and statistics published on
          <span className="font-medium"> matchplug.com </span>
          are recommendations and opinions only. They are not guaranteed
          predictions. Every user of matchplug.com bets at their own risk.
        </p>
        <p className="mt-3">
          We advise and encourage you to bet responsibly. Do not bet more than
          you can afford to lose. Matchplug.com will not be held responsible for
          any actions of its users and visitors. Any profits or losses incurred
          through gambling remain the sole responsibility of the user. No
          refunds are provided for subscription payments.
        </p>
      </div>

      {/* Section 2 */}
      <div className="mb-1">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Compliance with Local Laws
        </h3>
        <p>
          Betting may be illegal in certain countries or regions. Users must
          comply with their local laws, regulations, and age restrictions
          regarding betting. Matchplug.com is not responsible for any violations
          of local laws.
        </p>
        <p className="mt-3">
          Reproduction of materials such as tips, analysis, or strategies from
          matchplug.com is strictly prohibited. If you wish to use any original
          content, please contact us for permission.
        </p>
      </div>

      {/* Section 3 */}
      <div className="mb-1">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Affiliate Links
        </h3>
        <p>
          Bet codes or event links belong strictly to our affiliate bookmakers.
          Users are responsible for ensuring they understand the external sites
          those links direct to. Any expressed opinions (including strategy,
          bookmakers, and football predictions) are personal and not guaranteed.
        </p>
      </div>

      {/* Section 4 */}
      <div className="mb-1">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Accuracy of Information
        </h3>
        <p>
          Matchplug.com ensures that all information presented is as accurate
          and up-to-date as possible. However, we are not responsible for users’
          discretionary calculations or outcomes based on our tips or
          predictions.
        </p>
        <p className="mt-3">
          By viewing or using Matchplug.com, you agree to comply with these
          terms and conditions. Signing up means you accept responsibility for
          your account, email, and subscription details, which we are committed
          to protecting.
        </p>
      </div>
    </section>
  );
}
