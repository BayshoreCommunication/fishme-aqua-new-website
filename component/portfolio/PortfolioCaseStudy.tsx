"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/component/motion/Reveal";
import type { PortfolioItem } from "@/data/portfolio";

interface PortfolioCaseStudyProps {
  item?: PortfolioItem;
}

export default function PortfolioCaseStudy({ item }: PortfolioCaseStudyProps) {
  const title = item?.title || "Private Residence Aquascape";
  const description =
    item?.description ||
    "A comprehensive look at how we designed and installed a luxurious freshwater aquatic ecosystem for an exclusive private home.";
  const challengeTitle = item?.challenge?.title || "Challenge";
  const challengeDesc =
    item?.challenge?.description ||
    "The client wanted a calming, natural focal point that integrated seamlessly into a modern architecture. Challenges included optimizing natural sunlight without causing algae blooms and building a silent, concealed high-grade filtration system inside customized cabinetry.";
  const challengeImg = item?.challenge?.image || "/assets/home/about-1.png";

  const solutionTitle = item?.solution?.title || "Solution";
  const solutionDesc =
    item?.solution?.description ||
    "We engineered a custom 2,500-liter rimless ultra-clear aquarium with precision CO2 injection and automated LED lighting that mimics sunrise to sunset. A concealed sump with biological filtration and automated water-change loops were installed to ensure crystal-clear water with minimal maintenance.";
  const solutionImg = item?.solution?.image || "/assets/home/about-2.png";

  const gallery = item?.gallery || [
    "/assets/home/WhyFishMeAqua-Main.png",
    "/assets/home/about-1.png",
  ];
  const installation =
    item?.installation ||
    "The final ecosystem includes 24 distinct aquatic plant species, hand-selected driftwood hardscapes, and a school of vibrant neon tetras and discus fish. The living system has established stable bio-parameters and has become the centerpiece of the client's home.";
  const outcome =
    item?.outcome ||
    "Our ongoing monthly maintenance service keeps the water pristine and the plants thriving, ensuring the installation remains as breathtaking as the day it was unveiled.";

  return (
    <section className="bg-background py-16 sm:py-24 text-foreground transition-colors duration-300">
      <div className="container">
        {/* Section Header */}
        <Reveal direction="up" delay={0}>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-foreground/80 max-w-2xl mx-auto">
              {description}
            </p>
          </div>
        </Reveal>

        {/* 2-Column Challenge vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Challenge Column */}
          <Reveal direction="up" delay={100}>
            <div className="flex flex-col bg-foreground/[0.02] dark:bg-white/[0.02] border border-foreground/10 dark:border-white/10 p-6 sm:p-7 rounded-3xl shadow-md">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black mb-5 shadow-inner group">
                <Image
                  src={challengeImg}
                  alt={challengeTitle}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-950/70 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-red-300 backdrop-blur-md">
                  Challenges
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2.5">
                {challengeTitle}
              </h3>
              <p className="text-base leading-relaxed text-foreground/80">
                {challengeDesc}
              </p>
            </div>
          </Reveal>

          {/* Solution Column */}
          <Reveal direction="up" delay={200}>
            <div className="flex flex-col bg-foreground/[0.02] dark:bg-white/[0.02] border border-foreground/10 dark:border-white/10 p-6 sm:p-7 rounded-3xl shadow-md">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black mb-5 shadow-inner group">
                <Image
                  src={solutionImg}
                  alt={solutionTitle}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-950/70 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-300 backdrop-blur-md">
                  Solution
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2.5">
                {solutionTitle}
              </h3>
              <p className="text-base leading-relaxed text-foreground/80">
                {solutionDesc}
              </p>
            </div>
          </Reveal>
        </div>

        {/* 2-Image Gallery */}
        <Reveal direction="up" delay={250}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mb-10">
            {gallery.map((img: string, idx: number) => (
              <div
                key={idx}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-foreground/10 dark:border-white/10 bg-black shadow-xl group"
              >
                <Image
                  src={img}
                  alt={`Installation View ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Installation & Outcome Text */}
        <Reveal direction="up" delay={300}>
          <div className="space-y-4 mb-12">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Installation & Outcome
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-foreground/80">
              {installation}
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-foreground/80">
              {outcome}
            </p>
          </div>
        </Reveal>

        {/* CTA Button */}
        <Reveal direction="up" delay={350}>
          <div className="text-center pt-2">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-[#006E5C] px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-teal-900/20 transition-all duration-300 hover:bg-[#00584a] hover:scale-105 group"
            >
              <span>Explore All Portfolio Case Studies</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
