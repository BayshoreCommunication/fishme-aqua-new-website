"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, FolderOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import Reveal from "@/component/motion/Reveal";
import projectsData from "@/data/FeaturedProjects.json";

// Categories List
const categories = [
  "All",
  "Residential",
  "Corporate",
  "Resort",
  "Office Spaces",
  "Koi Ponds",
  "Public Spaces",
  "Rooftop Water Features",
];

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

interface ProjectCardProps {
  project: (typeof projectsData)[0];
  onPlayVideo: (url: string) => void;
}

const ProjectCard = ({ project, onPlayVideo }: ProjectCardProps) => (
  <div className="h-full bg-foreground/[0.03] backdrop-blur-xl rounded-3xl p-5 border border-foreground/10 hover:border-foreground/25 hover:bg-foreground/[0.06] transition-all duration-300 flex flex-col justify-between group shadow-xl">
    <div>
      {/* Image & Video Play Container */}
      <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-5">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

        {/* Play Button */}
        <button
          onClick={() => onPlayVideo(project.videoUrl)}
          aria-label="Play Project Video"
          className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:scale-110 hover:bg-white/35 transition-all duration-300 cursor-pointer shadow-lg"
        >
          <Play className="w-5 h-5 fill-white ml-0.5" />
        </button>
      </div>

      {/* Text Content */}
      <div className="px-1 text-left">
        <h3 className="text-xl font-bold text-foreground mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-foreground/80 text-base leading-relaxed mb-6">
          {project.description}
        </p>
      </div>
    </div>

    {/* Explore Button */}
    <div className="px-1 pb-1 text-left">
      <Link
        href={`/projects/${project.id}`}
        className="inline-flex items-center gap-1.5 text-[#006E5C] dark:text-teal-400 text-sm font-semibold hover:gap-2 transition-all duration-300 group/link"
      >
        <span>Explore</span>
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-foreground/10">
          <ArrowUpRightIcon />
        </span>
      </Link>
    </div>
  </div>
);

const FeaturedProjects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Scroll up ba down korle section screen er baire gele handling
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        // Optional out-of-view handling
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Filter projects based on active tab
  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter(
          (project: (typeof projectsData)[0]) =>
            project.category === activeCategory,
        );

  const isSlider = filteredProjects.length > 3;

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 bg-background text-foreground overflow-hidden"
    >
      <div className="container">
        {/* Header Section */}
        <Reveal direction="up" delay={0}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-heading text-3xl font-bold uppercase tracking-widest text-foreground sm:text-4xl mb-4">
              Featured Projects
            </h2>
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-foreground/80 mx-auto">
              Explore our portfolio of stunning aquatic installations
            </p>
          </div>
        </Reveal>

        {/* Category Filter Tabs */}
        <Reveal direction="up" delay={100}>
          <div className="flex items-center justify-start md:justify-center gap-2.5 md:gap-3 overflow-x-auto pb-6 mb-12 no-scrollbar">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background font-semibold shadow-md"
                      : "bg-foreground/5 text-foreground/80 border border-foreground/15 hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Projects Content Area */}
        <Reveal direction="up" delay={200}>
          <div className="relative min-h-120 flex flex-col justify-center mb-14">
            {filteredProjects.length === 0 ? (
              <div className="w-full bg-foreground/3 backdrop-blur-xl rounded-3xl p-12 border border-foreground/10 shadow-xl flex flex-col items-center justify-center text-center my-auto">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-teal-500/10 flex items-center justify-center">
                    <FolderOpen className="w-10 h-10 text-teal-500 dark:text-teal-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  No Projects Found
                </h3>
                <p className="text-foreground/70 text-sm max-w-md font-light mb-6">
                  We currently don’t have any featured projects under the{" "}
                  <span className="font-semibold text-teal-500 dark:text-teal-400">
                    &quot;{activeCategory}&quot;
                  </span>{" "}
                  category.
                </p>
                <button
                  onClick={() => setActiveCategory("All")}
                  className="px-6 py-2.5 rounded-full bg-foreground/10 text-foreground hover:bg-foreground/20 text-xs font-medium transition-all duration-300 border border-foreground/20 cursor-pointer"
                >
                  View All Projects
                </button>
              </div>
            ) : isSlider ? (
              <Swiper
                onBeforeInit={(swiper: SwiperType) => {
                  swiperRef.current = swiper;
                }}
                onInit={(swiper: SwiperType) => {
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                onSlideChange={(swiper: SwiperType) => {
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                modules={[Navigation]}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="w-full overflow-visible!"
              >
                {filteredProjects.map((project: (typeof projectsData)[0]) => (
                  <SwiperSlide key={project.id} className="h-auto!">
                    <ProjectCard
                      project={project}
                      onPlayVideo={setSelectedVideo}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project: (typeof projectsData)[0]) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onPlayVideo={setSelectedVideo}
                  />
                ))}
              </div>
            )}
          </div>
        </Reveal>

        {/* Bottom CTA Button & Slider Navigation Buttons Together */}
        <Reveal direction="up" delay={300}>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            {/* Left side empty or spacer for balance, or left aligned control if preferred */}

            {/* Center/Main Explore CTA */}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-[#006E5C] hover:bg-[#008c75] text-white px-8 py-3.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-teal-500/25 cursor-pointer group"
            >
              <span>Explore All Projects</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRightIcon />
              </span>
            </Link>

            {/* Right side: Slider Navigation Buttons (Only shown if slider is active) */}
            {isSlider ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  disabled={isBeginning}
                  aria-label="Previous Project"
                  className="w-11 h-11 rounded-full border border-foreground/20 bg-foreground/5 backdrop-blur-md flex items-center justify-center text-foreground transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:not-disabled:bg-foreground/10 hover:not-disabled:border-foreground/40 active:not-disabled:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  disabled={isEnd}
                  aria-label="Next Project"
                  className="w-11 h-11 rounded-full border border-foreground/20 bg-foreground/5 backdrop-blur-md flex items-center justify-center text-foreground transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:not-disabled:bg-foreground/10 hover:not-disabled:border-foreground/40 active:not-disabled:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:block"></div>
            )}
          </div>
        </Reveal>
      </div>

      {/* Video Modal */}
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
              src={selectedVideo.replace("watch?v=", "embed/")}
              title="Project Video"
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

export default FeaturedProjects;
