"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/component/motion/Reveal";

export default function PortfolioCaseStudy() {
  return (
    <section className="bg-background py-16 sm:py-24 text-foreground transition-colors duration-300">
      <div className="container max-w-6xl">
        {/* Section Header */}
        <Reveal direction="up" delay={0}>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Private Residence Aquascape
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-foreground/70 font-light max-w-2xl mx-auto">
              A comprehensive look at how we designed and installed a luxurious
              freshwater aquatic ecosystem for an exclusive private home.
            </p>
          </div>
        </Reveal>

        {/* 2-Column Challenge vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Challenge Column */}
          <Reveal direction="up" delay={100}>
            <div className="flex flex-col">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-foreground/10 dark:border-white/10 bg-black mb-5 shadow-xl group">
                <Image
                  src="/assets/home/about-1.png"
                  alt="Aquascape Challenge"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-950/70 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-red-300 backdrop-blur-md">
                  Challenges
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2.5">
                Challenge
              </h3>
              <p className="text-sm leading-relaxed text-foreground/75 font-light">
                The client wanted a calming, natural focal point that integrated
                seamlessly into a modern architecture. Challenges included
                optimizing natural sunlight without causing algae blooms and
                building a silent, concealed high-grade filtration system inside
                customized cabinetry.
              </p>
            </div>
          </Reveal>

          {/* Solution Column */}
          <Reveal direction="up" delay={200}>
            <div className="flex flex-col">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-foreground/10 dark:border-white/10 bg-black mb-5 shadow-xl group">
                <Image
                  src="/assets/home/about-2.png"
                  alt="Aquascape Solution"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-950/70 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-300 backdrop-blur-md">
                  Solution
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-2.5">
                Solution
              </h3>
              <p className="text-sm leading-relaxed text-foreground/75 font-light">
                We engineered a custom 2,500-liter rimless ultra-clear aquarium
                with precision CO2 injection and automated LED lighting that
                mimics sunrise to sunset. A concealed sump with biological
                filtration and automated water-change loops were installed to
                ensure crystal-clear water with minimal maintenance.
              </p>
            </div>
          </Reveal>
        </div>

        {/* 2-Image Gallery */}
        <Reveal direction="up" delay={250}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mb-10">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-foreground/10 dark:border-white/10 bg-black shadow-xl group">
              <Image
                src="/assets/home/WhyFishMeAqua-Main.png"
                alt="Installation View 1"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-foreground/10 dark:border-white/10 bg-black shadow-xl group">
              <Image
                src="/assets/home/about-1.png"
                alt="Installation View 2"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </Reveal>

        {/* Installation & Outcome Text */}
        <Reveal direction="up" delay={300}>
          <div className="space-y-4 mb-12">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Installation & Outcome
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-foreground/75 font-light">
              The final ecosystem includes 24 distinct aquatic plant species,
              hand-selected driftwood hardscapes, and a school of vibrant neon
              tetras and discus fish. The living system has established stable
              bio-parameters and has become the centerpiece of the client&apos;s
              home.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-foreground/75 font-light">
              Our ongoing monthly maintenance service keeps the water pristine
              and the plants thriving, ensuring the installation remains as
              breathtaking as the day it was unveiled.
            </p>
          </div>
        </Reveal>

        {/* CTA Button */}
        <Reveal direction="up" delay={350}>
          <div className="text-center pt-2">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-[#006E5C] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-teal-900/20 transition-all duration-300 hover:bg-[#00584a] hover:scale-105 group"
            >
              <span>Explore More Projects</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
