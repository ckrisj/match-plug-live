import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function TermsOfService() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 leading-relaxed text-gray-800 dark:text-gray-800">
      <h1 className="text-4xl font-extrabold text-center text-gray-700 mb-2">
        Disclaimer
      </h1>

      {/* Section 1 */}
      <div className="mb-1">
        <p>
          <span className="font-medium">Matchplug.com</span> is not a bookmaker,
          betting,Sports data analysis and does not collect bets. We provide
          predictions, tips,picks, guides, and recommendations as we try to make
          them as accurate as possible are subject to errors.
        </p>
        <p className="mt-3">
          Predictions must be considered as guides and not incitement to bet,
          Remember that gambling should be considered as entertainment. The
          visitor and Matchplug user is solely responsible for his actions and
          his decisions and in no event shall the site and its employees can be
          held responsible for the information included on Matchplug.
        </p>
      </div>

      {/* Section 2 */}
      <div className="mb-1">
        <p>
          Matchplug will not be liable for any loss of money or anything else
          that may result from the use of the content on matchplug. Also please
          note that in some countries there is restrictions on sports betting
          and it is the sole responsibility of the user / visitor to see and
          learn about these regulations. We reserve the right to discretion,
          without prior notice, to do changes and corrections to this site. The
          images, except where otherwise indicated, are taken directly from the
          web, if some images were inserted by mistake violating the copyright,
          please contact the administrator for immediate removal.
        </p>
        <p className="mt-3">
          By opting to receive soccer predictions and tips, you accept that all
          matchplug predictions and tips are for informational purposes only and
          that Victorpredict take no responsibility for any losses incurred by
          you the subscriber, as a direct result of acting upon received
          matchplug information. We do not encourage gambling in any sort of
          form. Users under 18 years old must seek parental consent.
        </p>
      </div>
    </section>
  );
}
