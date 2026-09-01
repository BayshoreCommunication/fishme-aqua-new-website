"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Quote, Star } from "lucide-react";
import Reveal from "@/component/motion/Reveal";

interface TestimonialCardItem {
  id: number;
  category: string;
  thumbnail: string;
  authorImage: string;
  name: string;
  role: string;
  quote: string;
  videoUrl: string;
}

const categories = [
  "All",
  "Residential",
  "Living Ecosystem",
  "Commercial",
  "Resort",
  "Maintenance",
];

const testimonialsData: TestimonialCardItem[] = [
  {
    id: 1,
    category: "Commercial",
    thumbnail: "/assets/home/DavidCallahan-Video.png",
    authorImage: "/assets/home/DavidCallahan.png",
    name: "Cameron Williamson",
    role: "Corporate Director, FinTech",
    quote:
      "Fish Me Aqua transformed our reception into a breathtaking living centerpiece. The craftsmanship and attention to detail surpassed all expectations.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    category: "Residential",
    thumbnail: "/assets/home/JaneCooper-Video.png",
    authorImage: "/assets/home/JaneCooper.png",
    name: "Darrell Steward",
    role: "Private Homeowner, Gulshan",
    quote:
      "The custom freshwater aquascape brings an unmatched sense of calm to our living room. Their team handled everything from design to monthly care.",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
  },
  {
    id: 3,
    category: "Living Ecosystem",
    thumbnail: "/assets/home/about-1.png",
    authorImage: "/assets/home/avatar1.png",
    name: "Ralph Edwards",
    role: "Head of Marketing, GreenSpace",
    quote:
      "From rare aquatic plant species to automated lighting, every detail is engineered to perfection. Our guests are captivated every single visit.",
    videoUrl: "https://www.youtube.com/embed/Scxs7L0vhZ4",
  },
  {
    id: 4,
    category: "Resort",
    thumbnail: "/assets/home/about-2.png",
    authorImage: "/assets/home/avatar2.png",
    name: "Jane Cooper",
    role: "Hospitality Lead, Azure Resort",
    quote:
      "Our resort atrium needed a focal attraction that felt connected to nature. Fish Me Aqua delivered a world-class paludarium ahead of schedule.",
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
  },
  {
    id: 5,
    category: "Commercial",
    thumbnail: "/assets/home/WhyFishMeAqua-Main.png",
    authorImage: "/assets/home/avatar3.png",
    name: "David Callahan",
    role: "Managing Partner, Creative Studio",
    quote:
      "The ongoing maintenance service keeps our ecosystem crystal clear and thriving. It has truly become the signature visual of our office space.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 6,
    category: "Maintenance",
    thumbnail: "/assets/home/WhyFishMeAqua-bg.png",
    authorImage: "/assets/home/DavidCallahan.png",
    name: "Arlene McCoy",
    role: "Interior Architect, McCoy Design",
    quote:
      "Working with Fish Me Aqua makes integrating high-end aquatic architecture seamless. Their technical expertise and aesthetics are second to none.",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
  },
];

export default function TestimonialGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredTestimonials =
    activeCategory === "All"
      ? testimonialsData
      : testimonialsData.filter((item) => item.category === activeCategory);

  return (
    <section className="bg-background py-16 sm:py-20 text-foreground transition-colors duration-300">
      <div className="container">
        {/* Section Header */}
        <Reveal direction="up" delay={0}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground sm:text-4xl mb-3">
              What Our Clients Say
            </h2>
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              Real experiences from satisfied clients
            </p>
          </div>
        </Reveal>

        {/* Category Filter Pills */}
        <Reveal direction="up" delay={100}>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-8 mb-4 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === category
                    ? "border border-primary bg-primary/10 text-primary shadow-sm"
                    : "border border-foreground/15 text-foreground/70 hover:border-primary/40 hover:text-primary dark:border-white/15 dark:text-white/70"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        {/* 3-Column Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {filteredTestimonials.map((item, index) => (
            <Reveal
              key={item.id}
              direction="up"
              delay={150 + (index % 3) * 100}
              className="h-full flex flex-col"
            >
              <div className="group h-full flex flex-col justify-between rounded-[2rem] border border-foreground/10 dark:border-white/10 bg-white dark:bg-[#18181b] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl">
                <div>
                  {/* Video Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black mb-5 shadow-md">
                    <Image
                      src={item.thumbnail}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />

                    {/* Play Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(item.videoUrl)}
                      aria-label={`Play testimonial video from ${item.name}`}
                      className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/35 cursor-pointer shadow-lg"
                    >
                      <Play className="ml-0.5 h-6 w-6 fill-white" />
                    </button>
                  </div>

                  {/* Quote Icon & Text */}
                  <Quote className="h-6 w-6 text-primary mb-3" />
                  <p className="text-base leading-relaxed text-foreground/80 dark:text-white/80 mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-foreground/10 dark:border-white/10 mt-auto">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-foreground/20 dark:border-white/20 shadow-sm">
                    <Image
                      src={item.authorImage}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground dark:text-white tracking-tight">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-foreground/60 dark:text-white/60 font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Rating Stats Bar */}
        <Reveal direction="up" delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 rounded-3xl border border-foreground/10 dark:border-white/10 bg-foreground/[0.02] dark:bg-white/[0.03] p-6 backdrop-blur-xl shadow-lg max-w-2xl mx-auto">
            {/* 1500+ Clients */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 shadow-sm">
                <Star className="h-6 w-6 fill-amber-500" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-xl tracking-tight">
                  1500+
                </h4>
                <p className="text-foreground/70 text-sm">
                  Satisfied Clients love Our Services
                </p>
              </div>
            </div>

            {/* Google Rating 4.9 */}
            <div className="flex items-center gap-3.5">
              <div className="relative flex h-12 w-12 items-center justify-center shrink-0 rounded-2xl bg-white p-2 shadow-sm border border-black/5">
                <Image
                  src="/assets/home/google.png"
                  alt="Google"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                  <span className="text-foreground font-bold text-sm ml-1">
                    4.9
                  </span>
                </div>
                <p className="text-foreground/70 text-sm">
                  Based on 1.5k reviews
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Video Modal Popup */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-black shadow-2xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/40 cursor-pointer"
              aria-label="Close video"
            >
              ✕
            </button>
            <iframe
              src={selectedVideo}
              title="Client Testimonial Video"
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
