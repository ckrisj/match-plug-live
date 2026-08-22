"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Send, Gift } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";

const MEMBER_IMAGES = Array.from(
  { length: 10 },
  (_, i) => `/s${i + 1}.jpeg`,
);

const PhoneCard: React.FC<{ src: string; index: number }> = ({
  src,
  index,
}) => (
  <div className="relative mx-auto h-[326px] w-[150px] overflow-hidden rounded-[26px] border border-[#03DD3C] bg-[#1B1B1B] shadow-[0_0_55px_rgba(3,221,60,0.3)] sm:h-[496px] sm:w-[238px]">
    <Image
      src={src}
      alt={`Member win ${index + 1}`}
      fill
      sizes="238px"
      className="object-contain"
    />
  </div>
);

/* Rough, torn-paper edge rendered with a turbulence-displaced rectangle. */
const TornEdge: React.FC<{ position: "top" | "bottom" }> = ({ position }) => {
  const filterId = `rw-torn-${position}`;
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${
        position === "top" ? "top-0" : "bottom-0"
      } h-[22px]`}
    >
      <svg
        className="h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 30"
      >
        <defs>
          <filter id={filterId} x="-5%" y="-100%" width="110%" height="300%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.009 0.32"
              numOctaves="2"
              seed={position === "top" ? 11 : 23}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <rect
          x="-40"
          y={position === "top" ? -46 : 16}
          width="1280"
          height="60"
          fill="#FFFFFF"
          filter={`url(#${filterId})`}
        />
      </svg>
    </div>
  );
};

const RealWinsSection: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#111413] py-16 sm:py-20">
      <TornEdge position="top" />
      <TornEdge position="bottom" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4">
        {/* Heading */}
        <h2 className="text-center text-2xl font-bold uppercase leading-tight text-white sm:text-[32px]">
          Real Members. <span className="text-[#03DD3C]">Real Wins.</span>
        </h2>

        {/* Phone fan carousel */}
        <div className="mt-12 w-full sm:mt-16">
          <Swiper
            modules={[EffectCoverflow, Autoplay]}
            effect="coverflow"
            centeredSlides
            slidesPerView="auto"
            loop
            grabCursor
            slideToClickedSlide
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 7,
              stretch: 0,
              depth: 120,
              modifier: 1,
              slideShadows: false,
            }}
            onSwiper={(s) => {
              swiperRef.current = s;
            }}
            onSlideChange={(s) => setActiveIndex(s.realIndex)}
            className="!overflow-visible"
          >
            {MEMBER_IMAGES.map((src, i) => (
              <SwiperSlide key={src} className="!w-auto cursor-pointer">
                <PhoneCard src={src} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Pagination dots */}
        <div className="mt-10 flex items-center justify-center gap-1.5 sm:mt-12">
          {MEMBER_IMAGES.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? "w-7 bg-[#03DD3C]" : "w-2 bg-[#424242]"
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="relative mt-10 w-full max-w-[440px]">
          <Link
            href="https://user.matchplug.com/auth/register"
            className="flex w-full items-center justify-center gap-3 rounded-full bg-[#03DD3C] py-4 text-lg font-bold text-black transition-transform duration-300 hover:scale-105 sm:text-2xl"
          >
            <Send className="h-6 w-6" />
            JOIN FREE VIP CHANNEL
          </Link>
          <Gift className="absolute -right-1 -top-4 h-10 w-10 text-[#03DD3C]" />
        </div>

        {/* Footer note */}
        <p className="mt-5 text-center text-base">
          <span className="text-white">First 100 today members get </span>
          <span className="text-[#03DD3C]">7 days of VIP access</span>
        </p>
      </div>

      {/* Scroll indicator line */}
      <span className="absolute bottom-5 left-1/2 h-10 w-px -translate-x-1/2 bg-white/70" />
    </section>
  );
};

export default RealWinsSection;
