"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Quote, Star } from "lucide-react";

import Container from "@/component/layout/Container";
import Reveal from "@/component/motion/Reveal";

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

const WhatOurClientsSay = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-28 bg-background text-foreground overflow-hidden transition-colors duration-300">
      <Container>
        {/* Header Section */}
        <Reveal direction="up" delay={0}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold uppercase tracking-widest text-foreground sm:text-4xl mb-3">
              What Our Clients Say
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base mx-auto font-light">
              Real experiences from satisfied clients
            </p>
          </div>
        </Reveal>

        {/* Bento Grid Layout matching the reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12">
          
          {/* Left Large Video Testimonial Card */}
          <div className="lg:col-span-6 h-full">
            <Reveal direction="up" delay={100}>
              <div className="h-full bg-foreground/[0.03] dark:bg-white/[0.04] backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 border border-foreground/10 dark:border-white/15 flex flex-col justify-between shadow-xl group">
                <div>
                  {/* Video Thumbnail with Play Button */}
                  <div className="relative h-64 sm:h-80 w-full rounded-3xl overflow-hidden mb-6 bg-black">
                    <Image
                      src="/assets/home/client-video-1.png"
                      alt="David Callahan"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <button
                      onClick={() => setSelectedVideo("https://www.youtube.com/embed/dQw4w9WgXcQ")}
                      aria-label="Play Testimonial Video"
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:scale-110 hover:bg-white/35 transition-all duration-300 cursor-pointer shadow-lg"
                    >
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </button>
                  </div>

                  {/* Quote Icon & Review Text */}
                  <Quote className="w-8 h-8 text-teal-500/80 mb-3" />
                  <p className="text-foreground/80 text-sm sm:text-base leading-relaxed font-light mb-8">
                    &quot;We needed a modern, high-converting website, and the Bravio team delivered beyond expectations. Their design and SEO expertise helped us increase conversion rate by 800% in just two weeks. Highly recommend!&quot;
                  </p>
                </div>

                {/* Author Info & Carousel Dots */}
                <div className="flex items-center justify-between pt-4 border-t border-foreground/10 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-foreground/20">
                      <Image
                        src="/assets/home/author-1.png"
                        alt="David Callahan"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">David Callahan</h4>
                      <p className="text-foreground/60 text-xs">Marketing Director, Spotify</p>
                    </div>
                  </div>

                  {/* Slider Pagination Dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    <span className="w-2 h-2 rounded-full bg-foreground/20" />
                    <span className="w-2 h-2 rounded-full bg-foreground/20" />
                    <span className="w-2 h-2 rounded-full bg-foreground/20" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column Grid Cards */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Top Row: Two Review Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 1 */}
              <Reveal direction="up" delay={200}>
                <div className="bg-foreground/[0.03] dark:bg-white/[0.04] backdrop-blur-xl rounded-[2rem] p-6 border border-foreground/10 dark:border-white/15 flex flex-col justify-between h-full shadow-lg">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Quote className="w-6 h-6 text-teal-500/80" />
                      <span className="text-lg font-bold">G</span>
                    </div>
                    <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed font-light mb-6">
                      &quot;From branding to website design, every detail was meticulously handled. The team&apos;s expertise helped us launch faster!&quot;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-foreground/10 dark:border-white/10">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image src="/assets/home/author-2.png" alt="Sarah Mitchel" fill className="object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold text-foreground text-xs">Sarah Mitchel</h5>
                      <p className="text-foreground/60 text-[10px]">Marketing Director</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Card 2 */}
              <Reveal direction="up" delay={300}>
                <div className="bg-foreground/[0.03] dark:bg-white/[0.04] backdrop-blur-xl rounded-[2rem] p-6 border border-foreground/10 dark:border-white/15 flex flex-col justify-between h-full shadow-lg">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Quote className="w-6 h-6 text-teal-500/80" />
                      <span className="text-lg font-bold">G</span>
                    </div>
                    <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed font-light mb-6">
                      &quot;From branding to website design, every detail was meticulously handled. The team&apos;s expertise helped us launch faster!&quot;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-foreground/10 dark:border-white/10">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image src="/assets/home/author-3.png" alt="Jane Cooper" fill className="object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold text-foreground text-xs">Jane Cooper</h5>
                      <p className="text-foreground/60 text-[10px]">Marketing Director</p>
                    </div>
                  </div>
                </div>
              </Reveal>

            </div>

            {/* Bottom Row: Text Review Card & Small Video Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 3 (Text with Company logo) */}
              <Reveal direction="up" delay={400}>
                <div className="bg-foreground/[0.03] dark:bg-white/[0.04] backdrop-blur-xl rounded-[2rem] p-6 border border-foreground/10 dark:border-white/15 flex flex-col justify-between h-full shadow-lg">
                  <div>
                    <Quote className="w-6 h-6 text-teal-500/80 mb-3" />
                    <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed font-light mb-6">
                      &quot;From branding to website design, every detail was meticulously handled. The team&apos;s expertise helped us launch faster!&quot;
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-foreground/10 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-xs">A</div>
                      <div className="text-left">
                        <h5 className="font-bold text-foreground text-xs">Acme Corporation</h5>
                        <p className="text-foreground/60 text-[10px]">New York City, NY</p>
                      </div>
                    </div>
                    <span className="text-blue-400 text-xs font-semibold">📍</span>
                  </div>
                </div>
              </Reveal>

              {/* Card 4 (Small Video Testimonial Card) */}
              <Reveal direction="up" delay={500}>
                <div className="relative h-full min-h-[220px] rounded-[2rem] overflow-hidden border border-foreground/10 dark:border-white/15 group shadow-lg">
                  <Image
                    src="/assets/home/client-video-2.png"
                    alt="Jane Cooper Testimonial"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  
                  {/* Play Button */}
                  <button
                    onClick={() => setSelectedVideo("https://www.youtube.com/embed/dQw4w9WgXcQ")}
                    aria-label="Play Testimonial Video"
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:scale-110 transition-all cursor-pointer shadow-md"
                  >
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </button>

                  {/* Author info overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 z-10">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/30">
                      <Image src="/assets/home/author-3.png" alt="Jane Cooper" fill className="object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-xs">Jane Cooper</h5>
                      <p className="text-gray-300 text-[10px]">Marketing Director</p>
                    </div>
                  </div>
                </div>
              </Reveal>

            </div>

          </div>
        </div>

        {/* Bottom Stats & Explore All Footer Bar */}
        <Reveal direction="up" delay={600}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-foreground/[0.02] dark:bg-white/[0.03] backdrop-blur-xl border border-foreground/10 dark:border-white/15 p-6 rounded-3xl shadow-lg">
            
            {/* Satisfied Clients Badge */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                <Star className="w-6 h-6 fill-amber-500" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg">1500+</h4>
                <p className="text-foreground/60 text-xs">Satisfied Clients love Our Services</p>
              </div>
            </div>

            {/* Google Rating Badge */}
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-blue-500">G</div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="text-foreground font-bold text-xs ml-1">4.9</span>
                </div>
                <p className="text-foreground/60 text-xs">Based on 1.5k review</p>
              </div>
            </div>

            {/* Explore All CTA Button */}
            <div>
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 bg-[#006E5C] hover:bg-[#008c75] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-teal-500/25 cursor-pointer group"
              >
                <span>Explore All</span>
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRightIcon />
                </span>
              </Link>
            </div>

          </div>
        </Reveal>
      </Container>

      {/* Video Modal Popup */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden aspect-video shadow-2xl border border-white/15">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer"
            >
              ✕
            </button>
            <iframe
              src={selectedVideo}
              title="Client Testimonial Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default WhatOurClientsSay;