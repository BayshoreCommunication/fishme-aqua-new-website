"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Sprout } from "lucide-react";

import Reveal from "@/component/motion/Reveal";

const ArrowUpRightIcon = () => (
  <svg
    width="16"
    height="16"
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

const BlogSection = () => {
  return (
    <section className="py-16 md:py-20 bg-foreground/3 dark:bg-white/2 text-foreground overflow-hidden transition-colors duration-300">
      <div className="container">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <Reveal direction="up" delay={0}>
            <div>
              <h2 className="font-heading text-3xl font-bold uppercase tracking-widest text-foreground sm:text-4xl mb-3">
                Blog & Knowledge Share
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base font-light">
                Stay informed with expert analysis, industry trends, and
                actionable tips from our aquarium care blog.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={100}>
            <div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 border border-foreground/20 dark:border-white/20 hover:border-[#006E5C] bg-foreground/5 dark:bg-white/5 hover:bg-[#006E5C] hover:text-white text-foreground px-7 py-3.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm cursor-pointer group"
              >
                <span>Explore All Blogs</span>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-foreground/10 dark:bg-white/10 group-hover:bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRightIcon />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* ========================================================= */}
          {/* LEFT: Large Featured Blog Card (Beginner's Guide to Aquascaping) */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <Reveal direction="up" delay={200} className="h-full">
              <Link
                href="/blogs/beginners-guide-to-aquascaping"
                className="group relative block h-full min-h-[500px] rounded-[2.5rem] overflow-hidden border border-foreground/10 dark:border-white/15 shadow-xl"
              >
                {/* Background Image */}
                <Image
                  src="/assets/blog/blog-1.png"
                  alt="Beginner's Guide to Aquascaping"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-colors" />

                {/* Top Badges (Category & Read Time) */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-white/15 text-white backdrop-blur-md border border-white/20">
                    <Sprout className="w-3.5 h-3.5" />
                    <span>Aquascaping Guides</span>
                    <ArrowUpRightIcon />
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-black/40 text-white backdrop-blur-md border border-white/20">
                    <Clock className="w-3.5 h-3.5" />
                    <span>8 min Read</span>
                  </span>
                </div>

                {/* Bottom Content & Hover Arrow Button */}
                <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between gap-4">
                  <div className="max-w-lg">
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">
                      Beginner’s Guide to Aquascaping
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light line-clamp-2">
                      Learn the fundamentals of creating stunning underwater
                      landscapes with our comprehensive guide for beginners.
                    </p>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:bg-[#006E5C] group-hover:border-[#006E5C] group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRightIcon />
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>

          {/* RIGHT: Stacked 2 Blog Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* ========================================================= */}
            {/* RIGHT CARD 1: How to Maintain a Healthy Koi Pond */}
            {/* ========================================================= */}
            <Reveal direction="up" delay={300} className="h-full">
              <Link
                href="/blogs/maintain-healthy-koi-pond"
                className="group relative block h-full min-h-[238px] rounded-[2rem] overflow-hidden border border-foreground/10 dark:border-white/15 shadow-lg"
              >
                <Image
                  src="/assets/blog/blog-2.png"
                  alt="How to Maintain a Healthy Koi Pond"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-colors" />

                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-white/15 text-white backdrop-blur-md border border-white/20">
                    <span>Pond Care</span>
                    <ArrowUpRightIcon />
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-black/40 text-white backdrop-blur-md border border-white/20">
                    <Clock className="w-3 h-3" />
                    <span>6 min Read</span>
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-teal-300 transition-colors">
                      How to Maintain a Healthy Koi Pond
                    </h3>
                    <p className="text-gray-300 text-xs leading-relaxed font-light line-clamp-1">
                      Essential tips for keeping your koi pond clean, balanced,
                      and fish thriving.
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:bg-[#006E5C] group-hover:border-[#006E5C] group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRightIcon />
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* ========================================================= */}
            {/* RIGHT CARD 2: Choosing the Right Plants for Your Aquarium */}
            {/* ========================================================= */}
            <Reveal direction="up" delay={400} className="h-full">
              <Link
                href="/blogs/choosing-right-plants"
                className="group relative block h-full min-h-[238px] rounded-[2rem] overflow-hidden border border-foreground/10 dark:border-white/15 shadow-lg"
              >
                <Image
                  src="/assets/blog/blog-3.png"
                  alt="Choosing the Right Plants for Your Aquarium"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-colors" />

                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-white/15 text-white backdrop-blur-md border border-white/20">
                    <span>Plant Care</span>
                    <ArrowUpRightIcon />
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-black/40 text-white backdrop-blur-md border border-white/20">
                    <Clock className="w-3 h-3" />
                    <span>7 min Read</span>
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-teal-300 transition-colors">
                      Choosing the Right Plants for Your Aquarium
                    </h3>
                    <p className="text-gray-300 text-xs leading-relaxed font-light line-clamp-1">
                      Discover which aquatic plants work best for different tank
                      types and lighting.
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:bg-[#006E5C] group-hover:border-[#006E5C] group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRightIcon />
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
