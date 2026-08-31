"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, Sprout } from "lucide-react";
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

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

const allBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Beginner’s Guide to Aquascaping",
    slug: "beginners-guide-to-aquascaping",
    excerpt:
      "Learn the fundamentals of creating stunning underwater landscapes with our comprehensive guide for beginners.",
    image: "/assets/blog/blog-1.png",
    category: "Aquarium Health",
    readTime: "8 min Read",
    featured: true,
  },
  {
    id: 2,
    title: "How to Maintain a Healthy Koi Pond",
    slug: "maintain-healthy-koi-pond",
    excerpt:
      "Essential seasonal tips for keeping your koi pond clean, balanced, and fish thriving throughout the year.",
    image: "/assets/blog/blog-2.png",
    category: "Pond Care",
    readTime: "6 min Read",
  },
  {
    id: 3,
    title: "Choosing the Right Plants for Your Aquarium",
    slug: "choosing-right-plants",
    excerpt:
      "Discover which aquatic plants work best for different tank types, substrate options, and lighting levels.",
    image: "/assets/blog/blog-3.png",
    category: "Lighting",
    readTime: "7 min Read",
  },
  {
    id: 4,
    title: "How to Maintain a Healthy Koi Pond",
    slug: "maintain-healthy-koi-pond-2",
    excerpt:
      "Essential seasonal tips for keeping your koi pond clean, balanced, and fish thriving throughout the year.",
    image: "/assets/blog/blog-2.png",
    category: "Pond Care",
    readTime: "6 min Read",
  },
  {
    id: 5,
    title: "Choosing the Right Plants for Your Aquarium",
    slug: "choosing-right-plants-2",
    excerpt:
      "Discover which aquatic plants work best for different tank types, substrate options, and lighting levels.",
    image: "/assets/blog/blog-3.png",
    category: "Lighting",
    readTime: "7 min Read",
  },
  {
    id: 6,
    title: "Beginner’s Guide to Aquascaping",
    slug: "beginners-guide-to-aquascaping-2",
    excerpt:
      "Learn the fundamentals of creating stunning underwater landscapes with our comprehensive guide for beginners.",
    image: "/assets/blog/blog-1.png",
    category: "Aquarium Health",
    readTime: "8 min Read",
    featured: true,
  },
  {
    id: 7,
    title: "Beginner’s Guide to Aquascaping",
    slug: "beginners-guide-to-aquascaping-3",
    excerpt:
      "Learn the fundamentals of creating stunning underwater landscapes with our comprehensive guide for beginners.",
    image: "/assets/blog/blog-1.png",
    category: "Aquarium Health",
    readTime: "8 min Read",
    featured: true,
  },
  {
    id: 8,
    title: "How to Maintain a Healthy Koi Pond",
    slug: "maintain-healthy-koi-pond-3",
    excerpt:
      "Essential seasonal tips for keeping your koi pond clean, balanced, and fish thriving throughout the year.",
    image: "/assets/blog/blog-2.png",
    category: "Pond Care",
    readTime: "6 min Read",
  },
  {
    id: 9,
    title: "Choosing the Right Plants for Your Aquarium",
    slug: "choosing-right-plants-3",
    excerpt:
      "Discover which aquatic plants work best for different tank types, substrate options, and lighting levels.",
    image: "/assets/blog/blog-3.png",
    category: "Lighting",
    readTime: "7 min Read",
  },
];

export default function BlogGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  return (
    <section className="bg-background py-16 sm:py-24 text-foreground transition-colors duration-300">
      <div className="container">
        {/* Section Header */}
        <Reveal direction="up" delay={0}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground sm:text-4xl mb-3">
              Blog & Knowledge Share
            </h2>
            <p className="text-xs sm:text-sm text-foreground/60 font-light leading-relaxed">
              Discover expert tips and stories from our aquatic specialists
            </p>
          </div>
        </Reveal>

        {/* 3 Alternating Bento Blocks */}
        <div className="space-y-8 mb-16">
          {/* ========================================================= */}
          {/* BLOCK 1: Left Large Card + Right 2 Stacked Cards */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Large Card */}
            <div className="lg:col-span-7">
              <Reveal direction="up" delay={100} className="h-full">
                <Link
                  href={`/blog/${allBlogPosts[0].slug}`}
                  className="group relative block h-full min-h-[460px] sm:min-h-[500px] rounded-[2.5rem] overflow-hidden border border-foreground/10 dark:border-white/15 shadow-xl"
                >
                  <Image
                    src={allBlogPosts[0].image}
                    alt={allBlogPosts[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-colors" />

                  {/* Top Badges */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-white/15 text-white backdrop-blur-md border border-white/20">
                      <Sprout className="w-3.5 h-3.5" />
                      <span>{allBlogPosts[0].category}</span>
                      <ArrowUpRightIcon />
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-black/40 text-white backdrop-blur-md border border-white/20">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{allBlogPosts[0].readTime}</span>
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between gap-4">
                    <div className="max-w-lg">
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                        {allBlogPosts[0].title}
                      </h3>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light line-clamp-2">
                        {allBlogPosts[0].excerpt}
                      </p>
                    </div>

                    <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:bg-[#006E5C] group-hover:border-[#006E5C] group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <ArrowUpRightIcon />
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>

            {/* Right Stacked 2 Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {/* Stacked Card 1 */}
              <Reveal direction="up" delay={200} className="h-full">
                <Link
                  href={`/blog/${allBlogPosts[1].slug}`}
                  className="group relative block h-full min-h-[230px] rounded-[2rem] overflow-hidden border border-foreground/10 dark:border-white/15 shadow-lg"
                >
                  <Image
                    src={allBlogPosts[1].image}
                    alt={allBlogPosts[1].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-colors" />

                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-white/15 text-white backdrop-blur-md border border-white/20">
                      <span>{allBlogPosts[1].category}</span>
                      <ArrowUpRightIcon />
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-black/40 text-white backdrop-blur-md border border-white/20">
                      <Clock className="w-3 h-3" />
                      <span>{allBlogPosts[1].readTime}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">
                        {allBlogPosts[1].title}
                      </h3>
                      <p className="text-gray-300 text-xs leading-relaxed font-light line-clamp-1">
                        {allBlogPosts[1].excerpt}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:bg-[#006E5C] group-hover:border-[#006E5C] group-hover:scale-110 transition-all duration-300 shadow-md">
                      <ArrowUpRightIcon />
                    </div>
                  </div>
                </Link>
              </Reveal>

              {/* Stacked Card 2 */}
              <Reveal direction="up" delay={250} className="h-full">
                <Link
                  href={`/blog/${allBlogPosts[2].slug}`}
                  className="group relative block h-full min-h-[230px] rounded-[2rem] overflow-hidden border border-foreground/10 dark:border-white/15 shadow-lg"
                >
                  <Image
                    src={allBlogPosts[2].image}
                    alt={allBlogPosts[2].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-colors" />

                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-white/15 text-white backdrop-blur-md border border-white/20">
                      <span>{allBlogPosts[2].category}</span>
                      <ArrowUpRightIcon />
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-black/40 text-white backdrop-blur-md border border-white/20">
                      <Clock className="w-3 h-3" />
                      <span>{allBlogPosts[2].readTime}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">
                        {allBlogPosts[2].title}
                      </h3>
                      <p className="text-gray-300 text-xs leading-relaxed font-light line-clamp-1">
                        {allBlogPosts[2].excerpt}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:bg-[#006E5C] group-hover:border-[#006E5C] group-hover:scale-110 transition-all duration-300 shadow-md">
                      <ArrowUpRightIcon />
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>

          {/* ========================================================= */}
          {/* BLOCK 2: Inverted Layout (Left 2 Stacked Cards + Right Large Card) */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Stacked 2 Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between order-2 lg:order-1">
              {/* Stacked Card 1 */}
              <Reveal direction="up" delay={200} className="h-full">
                <Link
                  href={`/blog/${allBlogPosts[3].slug}`}
                  className="group relative block h-full min-h-[230px] rounded-[2rem] overflow-hidden border border-foreground/10 dark:border-white/15 shadow-lg"
                >
                  <Image
                    src={allBlogPosts[3].image}
                    alt={allBlogPosts[3].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-colors" />

                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-white/15 text-white backdrop-blur-md border border-white/20">
                      <span>{allBlogPosts[3].category}</span>
                      <ArrowUpRightIcon />
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-black/40 text-white backdrop-blur-md border border-white/20">
                      <Clock className="w-3 h-3" />
                      <span>{allBlogPosts[3].readTime}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">
                        {allBlogPosts[3].title}
                      </h3>
                      <p className="text-gray-300 text-xs leading-relaxed font-light line-clamp-1">
                        {allBlogPosts[3].excerpt}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:bg-[#006E5C] group-hover:border-[#006E5C] group-hover:scale-110 transition-all duration-300 shadow-md">
                      <ArrowUpRightIcon />
                    </div>
                  </div>
                </Link>
              </Reveal>

              {/* Stacked Card 2 */}
              <Reveal direction="up" delay={250} className="h-full">
                <Link
                  href={`/blog/${allBlogPosts[4].slug}`}
                  className="group relative block h-full min-h-[230px] rounded-[2rem] overflow-hidden border border-foreground/10 dark:border-white/15 shadow-lg"
                >
                  <Image
                    src={allBlogPosts[4].image}
                    alt={allBlogPosts[4].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-colors" />

                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-white/15 text-white backdrop-blur-md border border-white/20">
                      <span>{allBlogPosts[4].category}</span>
                      <ArrowUpRightIcon />
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-black/40 text-white backdrop-blur-md border border-white/20">
                      <Clock className="w-3 h-3" />
                      <span>{allBlogPosts[4].readTime}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">
                        {allBlogPosts[4].title}
                      </h3>
                      <p className="text-gray-300 text-xs leading-relaxed font-light line-clamp-1">
                        {allBlogPosts[4].excerpt}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:bg-[#006E5C] group-hover:border-[#006E5C] group-hover:scale-110 transition-all duration-300 shadow-md">
                      <ArrowUpRightIcon />
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>

            {/* Right Large Card */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Reveal direction="up" delay={100} className="h-full">
                <Link
                  href={`/blog/${allBlogPosts[5].slug}`}
                  className="group relative block h-full min-h-[460px] sm:min-h-[500px] rounded-[2.5rem] overflow-hidden border border-foreground/10 dark:border-white/15 shadow-xl"
                >
                  <Image
                    src={allBlogPosts[5].image}
                    alt={allBlogPosts[5].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-colors" />

                  {/* Top Badges */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-white/15 text-white backdrop-blur-md border border-white/20">
                      <Sprout className="w-3.5 h-3.5" />
                      <span>{allBlogPosts[5].category}</span>
                      <ArrowUpRightIcon />
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-black/40 text-white backdrop-blur-md border border-white/20">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{allBlogPosts[5].readTime}</span>
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between gap-4">
                    <div className="max-w-lg">
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                        {allBlogPosts[5].title}
                      </h3>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light line-clamp-2">
                        {allBlogPosts[5].excerpt}
                      </p>
                    </div>

                    <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:bg-[#006E5C] group-hover:border-[#006E5C] group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <ArrowUpRightIcon />
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>

          {/* ========================================================= */}
          {/* BLOCK 3: Left Large Card + Right 2 Stacked Cards */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Large Card */}
            <div className="lg:col-span-7">
              <Reveal direction="up" delay={100} className="h-full">
                <Link
                  href={`/blog/${allBlogPosts[6].slug}`}
                  className="group relative block h-full min-h-[460px] sm:min-h-[500px] rounded-[2.5rem] overflow-hidden border border-foreground/10 dark:border-white/15 shadow-xl"
                >
                  <Image
                    src={allBlogPosts[6].image}
                    alt={allBlogPosts[6].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-colors" />

                  {/* Top Badges */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-white/15 text-white backdrop-blur-md border border-white/20">
                      <Sprout className="w-3.5 h-3.5" />
                      <span>{allBlogPosts[6].category}</span>
                      <ArrowUpRightIcon />
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-black/40 text-white backdrop-blur-md border border-white/20">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{allBlogPosts[6].readTime}</span>
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between gap-4">
                    <div className="max-w-lg">
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                        {allBlogPosts[6].title}
                      </h3>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light line-clamp-2">
                        {allBlogPosts[6].excerpt}
                      </p>
                    </div>

                    <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:bg-[#006E5C] group-hover:border-[#006E5C] group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <ArrowUpRightIcon />
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>

            {/* Right Stacked 2 Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {/* Stacked Card 1 */}
              <Reveal direction="up" delay={200} className="h-full">
                <Link
                  href={`/blog/${allBlogPosts[7].slug}`}
                  className="group relative block h-full min-h-[230px] rounded-[2rem] overflow-hidden border border-foreground/10 dark:border-white/15 shadow-lg"
                >
                  <Image
                    src={allBlogPosts[7].image}
                    alt={allBlogPosts[7].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-colors" />

                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-white/15 text-white backdrop-blur-md border border-white/20">
                      <span>{allBlogPosts[7].category}</span>
                      <ArrowUpRightIcon />
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-black/40 text-white backdrop-blur-md border border-white/20">
                      <Clock className="w-3 h-3" />
                      <span>{allBlogPosts[7].readTime}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">
                        {allBlogPosts[7].title}
                      </h3>
                      <p className="text-gray-300 text-xs leading-relaxed font-light line-clamp-1">
                        {allBlogPosts[7].excerpt}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:bg-[#006E5C] group-hover:border-[#006E5C] group-hover:scale-110 transition-all duration-300 shadow-md">
                      <ArrowUpRightIcon />
                    </div>
                  </div>
                </Link>
              </Reveal>

              {/* Stacked Card 2 */}
              <Reveal direction="up" delay={250} className="h-full">
                <Link
                  href={`/blog/${allBlogPosts[8].slug}`}
                  className="group relative block h-full min-h-[230px] rounded-[2rem] overflow-hidden border border-foreground/10 dark:border-white/15 shadow-lg"
                >
                  <Image
                    src={allBlogPosts[8].image}
                    alt={allBlogPosts[8].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-colors" />

                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-white/15 text-white backdrop-blur-md border border-white/20">
                      <span>{allBlogPosts[8].category}</span>
                      <ArrowUpRightIcon />
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-medium bg-black/40 text-white backdrop-blur-md border border-white/20">
                      <Clock className="w-3 h-3" />
                      <span>{allBlogPosts[8].readTime}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">
                        {allBlogPosts[8].title}
                      </h3>
                      <p className="text-gray-300 text-xs leading-relaxed font-light line-clamp-1">
                        {allBlogPosts[8].excerpt}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:bg-[#006E5C] group-hover:border-[#006E5C] group-hover:scale-110 transition-all duration-300 shadow-md">
                      <ArrowUpRightIcon />
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Pagination Bar */}
        <Reveal direction="up" delay={300}>
          <nav
            aria-label="Blog pagination"
            className="flex items-center justify-center gap-2 text-xs font-semibold"
          >
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded-full border border-foreground/15 dark:border-white/15 px-4 py-2 disabled:opacity-40 transition-colors hover:border-primary hover:text-primary cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all cursor-pointer ${
                  currentPage === page
                    ? "border-primary bg-primary text-white shadow-md shadow-primary/25"
                    : "border-foreground/15 dark:border-white/15 text-foreground/70 dark:text-white/70 hover:border-primary hover:text-primary"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 rounded-full border border-foreground/15 dark:border-white/15 px-4 py-2 disabled:opacity-40 transition-colors hover:border-primary hover:text-primary cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
