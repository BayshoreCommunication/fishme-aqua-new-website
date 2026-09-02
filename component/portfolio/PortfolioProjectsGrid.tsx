"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { getAllPortfolioItems, type PortfolioItem } from "@/data/portfolio";
import Reveal from "@/component/motion/Reveal";

export default function PortfolioProjectsGrid() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Take the top / best 6 projects for the portfolio page
  const bestSixProjects = getAllPortfolioItems().slice(0, 6);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bestSixProjects.map((project: PortfolioItem, index: number) => (
          <Reveal key={project.id} direction="up" delay={index * 60}>
            <article className="group flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-foreground/10 dark:border-white/10 bg-white dark:bg-[#18181b] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-[#006E5C]/40 hover:shadow-2xl">
              <div>
                {/* Media Image & Play Trigger */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black mb-5 shadow-md">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />

                  {/* Category Pill */}
                  <span className="absolute top-3.5 left-3.5 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white/95 border border-white/20">
                    {project.category}
                  </span>

                  {/* Play Video Trigger */}
                  <button
                    type="button"
                    onClick={() => setSelectedVideo(project.videoUrl)}
                    aria-label={`Play video for ${project.title}`}
                    className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/55 bg-white/25 text-white backdrop-blur-md shadow-lg transition-transform group-hover:scale-110 cursor-pointer"
                  >
                    <Play size={18} className="ml-0.5 fill-white" />
                  </button>
                </div>

                {/* Title & Description (16px standard) */}
                <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-[#006E5C] dark:group-hover:text-teal-400 transition-colors leading-snug">
                  <Link href={`/portfolio/${project.slug || project.id}`}>
                    {project.title}
                  </Link>
                </h3>

                <p className="text-base leading-relaxed text-foreground/75 line-clamp-2 mb-4 font-normal">
                  {project.description}
                </p>
              </div>

              {/* Bottom Explore Link */}
              <div className="border-t border-foreground/10 dark:border-white/10 pt-4 mt-auto">
                <Link
                  href={`/portfolio/${project.slug || project.id}`}
                  className="inline-flex items-center gap-1.5 text-base font-bold text-[#006E5C] dark:text-teal-400 hover:gap-2 transition-all group-hover:text-teal-500"
                >
                  <span>Explore Portfolio</span>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Video Modal Popup */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
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
              title="Portfolio Video"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
