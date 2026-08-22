"use client";
import React, { useState } from "react";

const EmailSubscriptionSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // API call will be implemented here

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      // Show success message or redirect
    }, 1000);
  };

  return (
    <section
      className="py-20 -mt-3 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(16, 16, 16, 0.0), rgba(16, 16, 16, 0.0)), url(/bg4.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Enter Email for Free Prediction
          </h2>

          {/* Description */}
          <p className="text-xl text-white mb-9 max-w-3xl mx-auto"></p>

          {/* Email Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto"
          >
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
                className="w-full px-6 py-4 text-2xl text-white bg-transparent border border-white/30 rounded-full placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="bg-white text-black px-8 py-4 text-2xl font-bold rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmailSubscriptionSection;
