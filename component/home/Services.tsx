"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import Reveal from "@/component/motion/Reveal";
import {
  Fish,
  Waves,
  Trees,
  TreePine,
  Droplets,
  CloudRain,
  Mountain,
  Flower2,
  Wrench,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ArrowUpRightIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7M17 7H8M17 7V16" />
  </svg>
);

export const servicesData = [
  {
    id: 1,
    slug: "custom-aquariums",
    title: "Custom Aquariums",
    description:
      "Bespoke aquarium design and installation for residential and commercial spaces.",
    icon: Fish,
  },
  {
    id: 2,
    slug: "aquascaping",
    title: "Aquascaping",
    description:
      "Artistic underwater landscapes using plants, rocks, and driftwood.",
    icon: Waves,
  },
  {
    id: 3,
    slug: "pond-design",
    title: "Pond Design",
    description:
      "Stunning koi ponds and garden water features for outdoor spaces.",
    icon: TreePine,
  },
  {
    id: 4,
    slug: "fountains",
    title: "Fountains",
    description:
      "Indoor and outdoor fountain installations that create tranquil ambiance.",
    icon: Droplets,
  },
  {
    id: 5,
    slug: "terrariums",
    title: "Terrariums",
    description:
      "Self-sustaining mini ecosystems enclosed in beautiful glass containers.",
    icon: Flower2,
  },
  {
    id: 6,
    slug: "rainforest-design",
    title: "Rainforest Design",
    description:
      "Lush tropical environments with high humidity plants and specialized lighting.",
    icon: CloudRain,
  },
  {
    id: 7,
    slug: "paludarium-design",
    title: "Paludarium Design",
    description:
      "A stunning combination of terrestrial land and aquatic habitats.",
    icon: Mountain,
  },
  {
    id: 8,
    slug: "landscaping",
    title: "Landscaping",
    description:
      "Complete outdoor garden planning and nature-inspired structural designs.",
    icon: Trees,
  },
  {
    id: 9,
    slug: "maintenance",
    title: "Maintenance",
    description:
      "Professional cleaning, water testing, and ecosystem upkeep services.",
    icon: Wrench,
  },
];

const Services = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        // Reset or out-of-view handling if needed
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-20 sm:py-28 overflow-hidden text-white"
    >
      {/* 1. Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/home/services-section-background.png"
          alt="Services Background"
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />
        {/* Dark Gradient Overlay for perfect image contrast like reference */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      <div className="container relative z-10">
        <Reveal direction="up" delay={0}>
          {/* Header Section matching reference image layout */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
                Our Services
              </h2>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                Comprehensive aquatic design solutions tailored to your vision
                and space
              </p>
            </div>

            {/* Slider Navigation Buttons on top right */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={isBeginning}
                aria-label="Previous Slide"
                className="w-11 h-11 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:not-disabled:bg-white/20 hover:not-disabled:border-white/40 active:not-disabled:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => swiperRef.current?.slideNext()}
                disabled={isEnd}
                aria-label="Next Slide"
                className="w-11 h-11 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:not-disabled:bg-white/20 hover:not-disabled:border-white/40 active:not-disabled:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* 2. Services Swiper Slider */}
        <Reveal direction="up" delay={150}>
          <Swiper
            onBeforeInit={(swiper: SwiperType) => {
              swiperRef.current = swiper;
            }}
            onInit={(swiper: SwiperType) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper: SwiperType) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="w-full overflow-visible!"
          >
            {servicesData.map((service) => {
              const IconComponent = service.icon;
              return (
                <SwiperSlide key={service.id} className="h-auto!">
                  {/* Glassmorphism Card styled exactly like the reference image */}
                  <div className="h-full bg-white/5 backdrop-blur-xl border border-white/15 p-7 rounded-3xl flex flex-col justify-between hover:border-white/30 hover:bg-white/8 transition-all duration-300 group shadow-2xl">
                    <div>
                      {/* Icon Container */}
                      <div className="w-14 h-14 rounded-2xl bg-white text-slate-900 flex items-center justify-center mb-6 shadow-md transition-transform duration-300 group-hover:scale-110">
                        <IconComponent className="w-7 h-7 text-slate-800" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed mb-8">
                        {service.description}
                      </p>
                    </div>

                    {/* Explore Button */}
                    <div>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 bg-[#006E5C] hover:bg-[#008c75] text-white px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 shadow-md hover:shadow-teal-500/20 group/btn"
                      >
                        <span>Explore</span>
                        <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                          <ArrowUpRightIcon />
                        </span>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
