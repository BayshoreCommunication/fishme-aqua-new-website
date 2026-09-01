"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "@/component/shared/Button";
import Reveal from "@/component/motion/Reveal";
import Image from "next/image";

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
    <div className="group relative aspect-video overflow-hidden rounded-2xl bg-black shadow-xl">
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
          <div className="absolute inset-0 bg-black/30 transition-colors duration-200 group-hover:bg-black/45" />

          <button
            type="button"
            aria-label="Play video"
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/30 text-white backdrop-blur-md transition-transform duration-200 group-hover:scale-110"
          >
            <PlayIcon />
          </button>
        </div>
      )}
    </div>
  );
};

const About = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll up ba down korle section screen er baire gele video off korar jonno
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();

      // Jodi section-ti completely screen er upore ba niche chole jay
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
    <section ref={sectionRef} className="bg-background py-20 sm:py-28">
      <div className="container">
        <Reveal direction="up" delay={0}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <h2 className="font-heading text-3xl font-bold uppercase tracking-widest text-foreground sm:text-4xl">
              About Us
            </h2>
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-foreground/75 sm:text-right">
              FishMeAqua designs and builds premium aquariums, aquascapes,
              ponds, and nature-inspired environments, creating beautiful living
              ecosystems for homes, businesses, and commercial spaces.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Reveal direction="up" delay={150}>
            <MediaCard
              imageSrc="/assets/home/about-1.png"
              videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
              alt="About FishMeAqua - 1"
              isPlaying={activeVideoIndex === 0}
              onPlay={() => setActiveVideoIndex(0)}
            />
          </Reveal>
          <Reveal direction="up" delay={300}>
            <MediaCard
              imageSrc="/assets/home/about-2.png"
              videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
              alt="About FishMeAqua - 2"
              isPlaying={activeVideoIndex === 1}
              onPlay={() => setActiveVideoIndex(1)}
            />
          </Reveal>
        </div>

        <Reveal direction="up" delay={450}>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-foreground/75">
              At FishMeAqua, we believe nature is more than decoration—it is an
              experience. Our mission is to transform ordinary spaces into
              inspiring environments that promote relaxation, wellness, and a
              deeper connection with the natural world.
            </p>
            <Button
              href="/about"
              variant="primary"
              className="shrink-0 text-sm sm:text-base font-semibold"
            >
              Explore More About Fish Me Aqua
              <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                <ArrowUpRightIcon />
              </span>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
