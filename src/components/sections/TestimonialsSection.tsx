"use client";
import React, { useState } from "react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  image: string;
}

interface TestimonialImage {
  id: number;
  image: string;
  alt: string;
  author: string;
  location: string;
}

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  isActive: boolean;
}> = ({ testimonial, isActive }) => (
  <div
    className={`relative h-[28rem] lg:w-3/5 xl:w-3/5 w-full bg-cover bg-center transition-all duration-500 `}
    // isActive ? "w-[744px]" : "w-[327px]"
    style={{ backgroundImage: `url(${testimonial.image})` }}
  >
    {isActive && (
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-8">
        <p className=" text-white mb-4 max-w-md">{testimonial.quote}</p>
        <p className=" font-bold text-white">
          {testimonial.author} | {testimonial.location}
        </p>
      </div>
    )}
  </div>
);

const TestimonialImageCard: React.FC<{
  image: TestimonialImage;
  onClick: () => void;
}> = ({ image, onClick }) => (
  <div
    className="relative w-full h-96 lg:h-[28rem] bg-cover bg-center cursor-pointer hover:opacity-80 transition-opacity"
    style={{ backgroundImage: `url(${image.image})` }}
    onClick={onClick}
  >
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
      <p className="font-bold text-white">
        {image.author} | {image.location}
      </p>
    </div>
  </div>
);

const TestimonialsSection: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 2,
      quote:
        "Amazing predictions that helped me win consistently. The accuracy is incredible and the support team is very responsive.",
      author: "Sarah Johnson",
      location: "London",

      image: "/a3.png",
    },
    {
      id: 3,
      quote:
        "I've been using MatchPlug for 6 months now and my betting success has increased by 80%. Highly recommend!",
      author: "Viktor",
      location: "Sweden",
      image: "/a2.png",
    },
    {
      id: 4,
      quote:
        "The VIP package is worth every penny. The personal manager and exclusive tips have transformed my betting strategy.",
      author: "Emma Davis",
      location: "Lagos",
      image: "/a4.png",
    },
  ];

  const testimonialImages: TestimonialImage[] = testimonials
    .slice(1)
    .map((testimonial) => ({
      id: testimonial.id,
      image: testimonial.image,
      alt: `${testimonial.author} testimonial`,
      author: testimonial.author,
      location: testimonial.location,
    }));

  return (
    <section className="bg-[#3B425D] py-20 ">
      <div className=" mx-auto max-w-[130rem]">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 px-4">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Testimonials and Success Stories
            </h2>
          </div>
          <div>
            <p className="text-xl text-white"></p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="flex flex-col lg:flex-row  overflow-hidden">
          {/* Active Testimonial - Large */}
          <TestimonialCard
            testimonial={testimonials[activeTestimonial]}
            isActive={true}
          />

          {/* Other Testimonials - Small */}
          <div className="flex flex-col lg:flex-row w-full ">
            {testimonialImages.map((image, index) => (
              <TestimonialImageCard
                key={image.id}
                image={image}
                onClick={() => setActiveTestimonial(index + 1)}
              />
            ))}
          </div>
        </div>

        {/* Mobile Testimonial Navigation */}
        {/* <div className="lg:hidden mt-8">
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeTestimonial === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div> */}

        {/* Mobile Testimonial Text */}
        <div className="lg:hidden mt-8 text-center">
          <p className="text-xl text-white mb-4">
            {testimonials[activeTestimonial].quote}
          </p>
          <p className="text-xl font-bold text-white">
            {testimonials[activeTestimonial].author} |{" "}
            {testimonials[activeTestimonial].location}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
