"use client";

import React, { useState, useRef, useEffect } from "react";
import Reveal from "@/component/motion/Reveal";
import Image from "next/image";
import Button from "../shared/Button";

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

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7-11-7Z" />
  </svg>
);

interface MediaCardProps {
  imageSrc: string;
  videoSrc: string;
  alt: string;
  isPlaying: boolean;
  onPlay: () => void;
}

const MediaCard = ({
  imageSrc,
  videoSrc,
  alt,
  isPlaying,
  onPlay,
}: MediaCardProps) => {
  return (
    <div className="group relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-black shadow-xl">
      {isPlaying ? (
        <video
          src={videoSrc}
          controls
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="relative h-full w-full cursor-pointer" onClick={onPlay}>
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/25 transition-colors duration-200 group-hover:bg-black/40" />

          <button
            type="button"
            aria-label="Play video"
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition-transform duration-200 group-hover:scale-110 shadow-lg"
          >
            <PlayIcon />
          </button>
        </div>
      )}
    </div>
  );
};

const OurStory = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        setActiveVideoIndex(null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-background py-16 sm:py-20 overflow-hidden"
    >
      <div className="container ">
        {/* Top Header Section: Heading on Left, Subtitle on Left/Right properly aligned */}
        <Reveal direction="up" delay={0}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10 text-left">
            <h2 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground sm:text-4xl text-left">
              Our Story
            </h2>
            <p className="max-w-md text-base sm:text-lg leading-relaxed text-foreground/80 sm:text-left">
              Fish Me Aqua was founded with a simple vision: to transform
              ordinary spaces into extraordinary aquatic experiences.
            </p>
          </div>
        </Reveal>

        {/* Media Grid Cards */}
        <div className="grid gap-6 sm:grid-cols-2 mb-12">
          <Reveal direction="up" delay={150}>
            <MediaCard
              imageSrc="/assets/home/about-1.png"
              videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
              alt="Our Story - Team"
              isPlaying={activeVideoIndex === 0}
              onPlay={() => setActiveVideoIndex(0)}
            />
          </Reveal>
          <Reveal direction="up" delay={300}>
            <MediaCard
              imageSrc="/assets/home/about-2.png"
              videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
              alt="Our Story - Showcase"
              isPlaying={activeVideoIndex === 1}
              onPlay={() => setActiveVideoIndex(1)}
            />
          </Reveal>
        </div>

        {/* Bottom Section: Descriptive Text & Left Aligned CTA Button */}
        <div className="w-full text-left flex flex-col items-center gap-8">
          <Reveal direction="up" delay={450}>
            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-foreground/80 text-left">
              <p>
                What began as a passion for aquatic ecosystems and custom
                aquarium design has evolved into a trusted aquatic design
                company serving residential and commercial clients. Over the
                years, we have combined creativity, technical expertise, and a
                deep understanding of aquatic life to design stunning aquariums,
                ponds, and water features that inspire and captivate. Every
                project is carefully crafted to reflect our clients&apos; unique
                vision while maintaining the highest standards of quality and
                sustainability.
              </p>
              <p>
                Today, Fish Me Aqua is proud to be recognized for exceptional
                craftsmanship, innovative designs, and long-term client
                partnerships that continue to drive our success.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={600}>
            <Button
              href="/contact-us"
              variant="primary"
              className="px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold bg-[#006E5C] hover:bg-[#008c75] text-white shadow-lg transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Book Free Consultation</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                <ArrowUpRightIcon />
              </span>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
