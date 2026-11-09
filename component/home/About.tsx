"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "@/component/shared/Button";
import Reveal from "@/component/motion/Reveal";
import Image from "next/image";
import YouTubeEmbed from "@/component/shared/YouTubeEmbed";
import { youtubeThumbnail } from "@/component/shared/youtube";

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
  videoSrc: string;
  alt: string;
  isPlaying: boolean;
  onPlay: () => void;
}

const MediaCard = ({
  videoSrc,
  alt,
  isPlaying,
  onPlay,
}: MediaCardProps) => {
  return (
    <div className="group relative aspect-video overflow-hidden rounded-2xl bg-black shadow-xl">
      {isPlaying ? (
        <YouTubeEmbed src={videoSrc} title={alt} />
      ) : (
        <div className="relative h-full w-full cursor-pointer" onClick={onPlay}>
          <Image
            src={youtubeThumbnail(videoSrc)}
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
            <p className="max-w-4xl text-base sm:text-lg leading-relaxed text-foreground/75 sm:text-left">
              Fish Me Aqua designs beautiful aquariums, fantastic aquascapes,
              peaceful ponds and nature environments for homes, offices and
              public spaces. We combine color, movement, water and natural
              materials to create a lively, warm, calm environment for you.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Reveal direction="up" delay={150}>
            <MediaCard
              videoSrc="https://www.youtube.com/embed/_Q7qM_-lUEE"
              alt="Transform Your Space With Living Art | Fish Me"
              isPlaying={activeVideoIndex === 0}
              onPlay={() => setActiveVideoIndex(0)}
            />
          </Reveal>
          <Reveal direction="up" delay={300}>
            <MediaCard
              videoSrc="https://www.youtube.com/embed/R2-zSOArGdc"
              alt="Journey of transformation - Hardscape to green oasis"
              isPlaying={activeVideoIndex === 1}
              onPlay={() => setActiveVideoIndex(1)}
            />
          </Reveal>
        </div>

        <Reveal direction="up" delay={450}>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-4xl text-base sm:text-lg leading-relaxed text-foreground/75">
              Why settle for decor when you can live in a natural surrounding?
              We turn the average into a peaceful sanctuary with the potential
              for rest, relaxation and well being.
            </p>
            <Button
              href="/about"
              variant="primary"
              className="shrink-0  text-base font-semibold"
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
