"use client";

import React from "react";
import Image from "next/image";
import Reveal from "@/component/motion/Reveal";

interface JourneyItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const topJourney: JourneyItem[] = [
  {
    year: "2010",
    title: "Fish Me Aqua Founded",
    description:
      "Started with a passion for creating custom aquatic environments and personalized aquarium designs.",
    icon: (
      <svg
        className="w-6 h-6 text-slate-900 dark:text-slate-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    year: "2013",
    title: "First Commercial Installation",
    description:
      "Successfully completed our first large-scale hotel aquarium project.",
    icon: (
      <svg
        className="w-6 h-6 text-slate-900 dark:text-slate-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    year: "2016",
    title: "Expanded Service Portfolio",
    description:
      "Introduced pond construction, water features, and landscape aquatic solutions.",
    icon: (
      <svg
        className="w-6 h-6 text-slate-900 dark:text-slate-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    year: "2019",
    title: "Industry Recognition",
    description:
      "Received recognition for excellence in aquascaping and custom aquatic design.",
    icon: (
      <svg
        className="w-6 h-6 text-slate-900 dark:text-slate-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

const bottomJourney: JourneyItem[] = [
  {
    year: "2022",
    title: "500th Project Completed",
    description:
      "Reached a major milestone by completing over 500 successful installations.",
    icon: (
      <svg
        className="w-6 h-6 text-slate-900 dark:text-slate-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  {
    year: "2025",
    title: "Regional Expansion",
    description:
      "Expanded operations to serve clients across multiple cities and regions.",
    icon: (
      <svg
        className="w-6 h-6 text-slate-900 dark:text-slate-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const OurJourney = () => {
  return (
    <section className="relative bg-background py-24 md:py-32 overflow-hidden text-foreground">
      {/* World Map Background Image */}
      <div className="absolute inset-0 z-0 opacity-15 dark:opacity-20">
        <Image
          src="/assets/about/WorldMapBG.png"
          alt="World Map Background"
          fill
          className="object-cover object-center pointer-events-none"
          priority
        />
      </div>

      <div className="container relative z-10 x-auto px-4">
        {/* Section Header */}
        <Reveal direction="up" delay={0}>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="font-heading text-3xl font-bold uppercase tracking-wider sm:text-4xl mb-2 text-foreground">
              Our Journey
            </h2>
            <p className="text-xs sm:text-sm text-foreground/60 font-light">
              Milestones That Define Our Growth
            </p>
          </div>
        </Reveal>

        {/* Journey Timeline Layout */}
        <div className="space-y-24">
          {/* Top Row Timeline */}
          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-[2px] bg-foreground/20 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10 items-stretch">
              {topJourney.map((item, index) => (
                <Reveal
                  key={index}
                  direction="up"
                  delay={index * 150}
                  className="h-full flex flex-col"
                >
                  <div className="flex flex-col items-center text-center group h-full">
                    {/* Year & Node point */}
                    <div className="flex flex-col items-center mb-3">
                      <span className="text-xs font-bold text-foreground/70 mb-2">
                        {item.year}
                      </span>
                      <div className="w-4 h-4 rounded-full bg-white border-2 border-foreground/40 shadow-md group-hover:scale-125 group-hover:border-[#006E5C] transition-all" />
                      <div className="w-[1px] h-6 bg-foreground/30 mt-1" />
                    </div>

                    {/* Centered Content Box */}
                    <div className="bg-white dark:bg-[#18181b] border border-slate-200 dark:border-white/10 p-7 sm:p-8 rounded-[2rem] shadow-xl w-full flex flex-col justify-between items-center text-center h-full hover:border-[#006E5C]/50 transition-all">
                      <div className="w-full">
                        {/* Centered Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/10 flex items-center justify-center mb-5 mx-auto border border-slate-200 dark:border-white/15 shadow-sm">
                          {item.icon}
                        </div>

                        <h3 className=" text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 leading-snug">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed mt-auto">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Bottom Row Timeline */}
          <div className="relative max-w-3xl mx-auto">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-[2px] bg-foreground/20 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10 items-stretch">
              {bottomJourney.map((item, index) => (
                <Reveal
                  key={index}
                  direction="up"
                  delay={600 + index * 150}
                  className="h-full flex flex-col"
                >
                  <div className="flex flex-col items-center text-center group h-full">
                    {/* Year & Node point */}
                    <div className="flex flex-col items-center mb-3">
                      <span className="text-xs font-bold text-foreground/70 mb-2">
                        {item.year}
                      </span>
                      <div className="w-4 h-4 rounded-full bg-white border-2 border-foreground/40 shadow-md group-hover:scale-125 group-hover:border-[#006E5C] transition-all" />
                      <div className="w-[1px] h-6 bg-foreground/30 mt-1" />
                    </div>

                    {/* Centered Content Box */}
                    <div className="bg-white dark:bg-[#18181b] border border-slate-200 dark:border-white/10 p-7 sm:p-8 rounded-[2rem] shadow-xl w-full flex flex-col justify-between items-center text-center h-full hover:border-[#006E5C]/50 transition-all">
                      <div className="w-full">
                        {/* Centered Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/10 flex items-center justify-center mb-5 mx-auto border border-slate-200 dark:border-white/15 shadow-sm">
                          {item.icon}
                        </div>

                        <h3 className=" text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 leading-snug">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed mt-auto">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
