"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import projects from "@/data/FeaturedProjects.json";

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

const projectsPerPage = 9;

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredProjects.length / projectsPerPage),
  );
  const visibleProjects = filteredProjects.slice(
    (page - 1) * projectsPerPage,
    page * projectsPerPage,
  );

  function selectCategory(category: string) {
    setActiveCategory(category);
    setPage(1);
  }

  return (
    <>
      {/* Category Filter Tabs (Minimum 16px font size) */}
      <div className="flex items-center justify-start md:justify-center gap-2.5 md:gap-3 overflow-x-auto pb-6 mb-12 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => selectCategory(category)}
            className={`px-5 py-2.5 rounded-full text-base font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
              activeCategory === category
                ? "bg-primary text-white font-semibold shadow-md border border-primary"
                : "bg-foreground/5 dark:bg-white/5 text-foreground/80 border border-foreground/15 dark:border-white/15 hover:border-primary hover:text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid (Minimum 16px typography) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <article
            key={project.id}
            className="group flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-foreground/10 dark:border-white/10 bg-white dark:bg-[#18181b] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl"
          >
            <div>
              {/* Media Preview & Play Button */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black mb-5 shadow-md">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />

                {/* Category Badge */}
                <span className="absolute top-3.5 left-3.5 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white/95 border border-white/20">
                  {project.category}
                </span>

                {/* Play Button Trigger */}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedVideo(
                      project.videoUrl ||
                        "https://www.youtube.com/embed/dQw4w9WgXcQ",
                    )
                  }
                  aria-label={`Play video for ${project.title}`}
                  className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/55 bg-white/25 text-white backdrop-blur-md shadow-lg transition-transform group-hover:scale-110 cursor-pointer"
                >
                  <Play size={18} className="ml-0.5 fill-white" />
                </button>
              </div>

              {/* Title & Description (16px minimum font size) */}
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                <Link href={`/projects/${project.slug || project.id}`}>
                  {project.title}
                </Link>
              </h2>
              <p className="text-base leading-relaxed text-foreground/75 line-clamp-2 mb-4 font-normal">
                {project.description}
              </p>
            </div>

            {/* Explore Link (16px font size) */}
            <div className="border-t border-foreground/10 dark:border-white/10 pt-4 mt-auto">
              <Link
                href={`/projects/${project.slug || project.id}`}
                className="inline-flex items-center gap-1.5 text-base font-bold text-primary dark:text-teal-400 hover:gap-2 transition-all group-hover:text-teal-500"
              >
                <span>Explore Project</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {visibleProjects.length === 0 && (
        <p className="py-16 text-center text-base text-foreground/60">
          No projects found in this category.
        </p>
      )}

      {/* Pagination Controls (16px font size) */}
      {pageCount > 1 && (
        <nav
          aria-label="Project pages"
          className="mt-14 flex items-center justify-center gap-2 text-base font-medium"
        >
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 dark:border-white/15 px-4 py-2 text-foreground/80 hover:border-primary disabled:opacity-40 transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPage(item)}
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors cursor-pointer ${
                  item === page
                    ? "border-primary bg-primary text-white font-bold shadow-md"
                    : "border-foreground/15 dark:border-white/15 text-foreground/80 hover:border-primary hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() =>
              setPage((current) => Math.min(pageCount, current + 1))
            }
            disabled={page === pageCount}
            className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 dark:border-white/15 px-4 py-2 text-foreground/80 hover:border-primary disabled:opacity-40 transition-colors cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </nav>
      )}

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
              title="Project Video"
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
