"use client";

import React from "react";
import Image from "next/image";
import Reveal from "@/component/motion/Reveal";

interface ValueItem {
  title: string;
  description: string;
  iconSvg: React.ReactNode;
}

const valuesData: ValueItem[] = [
  {
    title: "Innovation",
    description:
      "By embracing new technologies, materials, and creative approaches, we continuously push the boundaries of aquatic design.",
    iconSvg: (
      <svg
        className="w-5 h-5 text-teal-600 dark:text-teal-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    title: "Partnership",
    description:
      "We believe great projects are built through collaboration, transparency, and long-lasting relationships with our clients.",
    iconSvg: (
      <svg
        className="w-5 h-5 text-teal-600 dark:text-teal-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: "Passion",
    description:
      "Our love for aquatic life and design inspires us to create unique environments that bring beauty and tranquility to every space.",
    iconSvg: (
      <svg
        className="w-5 h-5 text-teal-600 dark:text-teal-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Excellence",
    description:
      "We strive for exceptional quality in every detail, ensuring every installation exceeds expectations from concept to completion.",
    iconSvg: (
      <svg
        className="w-5 h-5 text-teal-600 dark:text-teal-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
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

const OurValues = () => {
  return (
    <section className="bg-foreground/3 dark:bg-white/2 py-20 sm:py-28 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Big Rounded Image Showcase */}
          <div className="lg:col-span-5">
            <Reveal direction="up" delay={0}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-2xl border border-foreground/10 dark:border-white/10">
                <Image
                  src="/assets/about/OurValues.png"
                  alt="Our Values Aquarium Showcase"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Heading, Subtitle & 2x2 Grid of Values */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal direction="up" delay={100}>
              <div className="mb-10 text-left">
                <h2 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground sm:text-4xl mb-2">
                  Our Values
                </h2>
                <p className="text-base sm:text-lg text-foreground/80">
                  The Principles Behind Every Project
                </p>
              </div>
            </Reveal>

            {/* 2x2 Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
              {valuesData.map((item, index) => (
                <Reveal key={index} delay={200 + index * 100} direction="up">
                  <div className="flex flex-col items-start gap-3">
                    {/* Icon Box */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 border border-teal-500/20 shadow-sm">
                      {item.iconSvg}
                    </div>

                    {/* Value Title */}
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      {item.title}
                    </h3>

                    {/* Value Description */}
                    <p className="text-base leading-relaxed text-foreground/80">
                      {item.description}
                    </p>
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

export default OurValues;
