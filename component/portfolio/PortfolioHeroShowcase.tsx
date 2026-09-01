"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Maximize2, Play, Quote, Waves } from "lucide-react";
import Reveal from "@/component/motion/Reveal";

const projectSpecs = [
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

export default function PortfolioHeroShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="bg-background py-12 sm:py-16 text-foreground transition-colors duration-300">
      <div className="container">
        {/* Top Featured Project Showcase & Quote Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10">
          {/* Left Large Video / Image Card */}
          <div className="lg:col-span-8">
            <Reveal direction="up" delay={100} className="h-full">
              <div className="group relative h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[460px] w-full overflow-hidden rounded-[2.5rem] border border-foreground/10 dark:border-white/15 bg-black shadow-2xl">
                <Image
                  src="/assets/home/about-1.png"
                  alt="Featured Portfolio Project"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Central Play Button */}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedVideo(
                      "https://www.youtube.com/embed/dQw4w9WgXcQ",
                    )
                  }
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
              <div className="relative flex h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[460px] flex-col justify-between overflow-hidden rounded-[2.5rem] border border-teal-500/20 bg-gradient-to-br from-[#082820] via-[#051a15] to-[#020d0a] p-8 sm:p-10 text-white shadow-2xl">
                {/* Background decorative glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-teal-500/15 blur-3xl" />

                {/* Quote Content */}
                <div className="relative z-10">
                  <p className="font-heading text-lg sm:text-xl lg:text-[1.35rem] font-medium leading-relaxed tracking-wide text-white/95">
                    &ldquo;Fish Me Aqua is an exceptional partner that delivered
                    our project in record time. Transparent communication,
                    state-of-the-art water care, and results that exceed each
                    and every expectation!&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="relative h-13 w-13 overflow-hidden rounded-full border-2 border-primary/50 shadow-md">
                      <Image
                        src="/assets/home/avatar1.png"
                        alt="Dr. Jennifer Rivers"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-wide">
                        Dr. Jennifer Rivers
                      </h4>
                      <p className="text-sm text-teal-300 font-medium">
                        Hospitality Director
                      </p>
                    </div>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-teal-300 border border-primary/30 shadow-inner">
                    <Quote className="h-5 w-5 fill-teal-300" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Specifications Bar (4 Specs) */}
        <Reveal direction="up" delay={300}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-3xl border border-foreground/10 dark:border-white/10 bg-foreground/[0.02] dark:bg-white/[0.03] p-4 sm:p-6 backdrop-blur-xl shadow-lg">
            {projectSpecs.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.title}
                  className={`flex items-center gap-4 p-3 transition-colors ${
                    index < projectSpecs.length - 1
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
