import React from "react";

interface SectionProps {
  title: string;
  content: string; // content may include <br> tags
}

const AboutSection: React.FC<SectionProps> = ({ title, content }) => {
  return (
    <section className="max-w-4xl mx-auto py-12 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        {title}
      </h2>

      <div
        className="text-justify space-y-4 text-base md:text-lg text-gray-200 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
};

export default AboutSection;
