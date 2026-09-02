"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Maximize2, Play, Waves } from "lucide-react";
import Reveal from "@/component/motion/Reveal";
import type { PortfolioItem } from "@/data/portfolio";

interface PortfolioHeroShowcaseProps {
  item?: PortfolioItem;
}

const defaultSpecs = [
  {
    icon: Waves,
    title: "Aquarium Type",
    value: "Planted Freshwater Aquascape",
  },
  {
    icon: Maximize2,
    title: "Scale",
    value: "2,500 Liters / 660 Gallons",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Private Residence, Gulshan",
  },
  {
    icon: Calendar,
    title: "Timeline",
    value: "8 Weeks (Design to Full Cycling)",
  },
];

export default function PortfolioHeroShowcase({
  item,
}: PortfolioHeroShowcaseProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const displaySpecs = item
    ? [
        {
          icon: Waves,
          title: "Aquarium Type",
          value: item.specs.aquariumType,
        },
        {
          icon: Maximize2,
          title: "Scale",
          value: item.specs.scale,
        },
        {
          icon: MapPin,
          title: "Location",
          value: item.specs.location,
        },
        {
          icon: Calendar,
          title: "Timeline",
          value: item.specs.timeline,
        },
      ]
    : defaultSpecs;

  const quote =
    item?.testimonial?.quote ||
    "A strategic aquatic partner that delivers breathtaking design. Transparent communication, meticulous craftsmanship, and results that consistently exceed expectations.";
  const author = item?.testimonial?.author || "ELEANOR PENA";
  const role = item?.testimonial?.role || "CTO & Homeowner";
  const avatar = item?.testimonial?.avatar || "/assets/home/DavidCallahan.png";
  const image = item?.image || "/assets/home/about-1.png";
  const videoUrl =
    item?.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ";

  return (
    <section className="bg-background py-12 sm:py-16 text-foreground transition-colors duration-300">
      <div className="container">
        {/* Top Featured Project Showcase & Quote Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left Large Video / Image Card */}
          <div className="lg:col-span-8">
            <Reveal direction="up" delay={100} className="h-full">
              <div className="group relative h-full min-h-[360px] sm:min-h-[440px] lg:min-h-[480px] w-full overflow-hidden rounded-[2.5rem] border border-foreground/10 dark:border-white/15 bg-black shadow-2xl">
                <Image
                  src={image}
                  alt={item?.title || "Featured Portfolio Project"}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors" />

                {/* Central Play Button */}
                <button
                  type="button"
                  onClick={() => setSelectedVideo(videoUrl)}
                  aria-label="Play project video showcase"
                  className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/35 focus:outline-none focus:ring-4 focus:ring-primary/40 shadow-2xl cursor-pointer"
                >
                  <Play className="ml-1 h-8 w-8 fill-white" />
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right Quote / Testimonial Card */}
          <div className="lg:col-span-4">
            <Reveal direction="up" delay={200} className="h-full">
              <div className="relative flex h-full min-h-[360px] sm:min-h-[440px] lg:min-h-[480px] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#06332a] via-[#04241d] to-[#011410] p-8 sm:p-10 text-white shadow-2xl border border-white/10">
                {/* Subtle ambient light curves */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.2),transparent_65%)]" />
                <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl" />

                {/* Quote Content */}
                <div className="relative z-10 space-y-4">
                  <p className="text-xl sm:text-2xl font-bold leading-relaxed text-white tracking-tight">
                    &ldquo;{quote}&rdquo;
                  </p>
                </div>

                {/* Author Info with Overlapping Badge */}
                <div className="relative z-10 pt-10">
                  <div className="relative inline-flex items-center mb-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white/30 shadow-xl bg-white/10">
                      <Image
                        src={avatar}
                        alt={author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-xl">
                      <span className="font-serif text-2xl font-black text-[#006E5C] leading-none select-none">
                        “
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                      {author}
                    </h4>
                    <p className="text-sm font-medium text-teal-300/80 mt-0.5">
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Specifications Bar (4 Specs) */}
        <Reveal direction="up" delay={300}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-3xl border border-foreground/10 dark:border-white/10 bg-foreground/[0.02] dark:bg-white/[0.03] p-4 sm:p-6 backdrop-blur-xl shadow-lg">
            {displaySpecs.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.title}
                  className={`flex items-center gap-4 p-3 transition-colors ${
                    index < displaySpecs.length - 1
                      ? "lg:border-r lg:border-foreground/10 lg:dark:border-white/10"
                      : ""
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-teal-300 border border-primary/20 shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-foreground/60 dark:text-white/60 font-semibold uppercase tracking-wider">
                      {spec.title}
                    </p>
                    <p className="mt-0.5 text-base font-bold text-foreground dark:text-white tracking-tight">
                      {spec.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* Video Modal Popup */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-black shadow-2xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/40"
              aria-label="Close video"
            >
              ✕
            </button>
            <iframe
              src={selectedVideo}
              title="Project Video"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
