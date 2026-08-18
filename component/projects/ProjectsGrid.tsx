"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useMemo, useState } from "react";
import projects from "@/data/FeaturedProjects.json";

const categories = ["All", "Residential", "Corporate", "Resort", "Office Spaces", "Koi Ponds", "Public Spaces", "Rooftop Water Features"];
const projectsPerPage = 9;

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const filteredProjects = useMemo(() => activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory), [activeCategory]);
  const pageCount = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));
  const visibleProjects = filteredProjects.slice((page - 1) * projectsPerPage, page * projectsPerPage);

  function selectCategory(category: string) {
    setActiveCategory(category);
    setPage(1);
  }

  return (
    <>
      <div className="flex justify-center gap-2 overflow-x-auto pb-5">
        {categories.map((category) => (
          <button key={category} type="button" onClick={() => selectCategory(category)} className={`shrink-0 rounded-full border px-3 py-1 text-[10px] transition-colors ${activeCategory === category ? "border-primary bg-primary/10 text-primary" : "border-black/15 text-black/70 hover:border-primary/40"}`}>{category}</button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <article key={project.id} className="group overflow-hidden rounded-2xl border border-black/7 bg-white p-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-lg">
            <Link href={`/projects/${project.id}`} className="relative block aspect-[1.45/1] overflow-hidden rounded-xl bg-black">
              <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 bg-black/15" />
              <span className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/55 bg-white/25 text-white backdrop-blur-sm"><Play size={15} className="ml-0.5 fill-white" /></span>
            </Link>
            <div className="p-2.5 pb-2">
              <h2 className="text-sm font-bold text-black">{project.title}</h2>
              <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-black/55">{project.description}</p>
              <Link href={`/projects/${project.id}`} className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-primary hover:text-[#004e41]">Explore <ArrowUpRight size={12} /></Link>
            </div>
          </article>
        ))}
      </div>
      {visibleProjects.length === 0 && <p className="py-16 text-center text-sm text-black/55">No projects found in this category.</p>}
      <nav aria-label="Project pages" className="mt-10 flex items-center justify-center gap-2 text-[10px]">
        <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="inline-flex items-center gap-1 rounded-full border border-black/15 px-3 py-1.5 disabled:opacity-40"><ChevronLeft size={12} />Previous</button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((item) => <button key={item} type="button" onClick={() => setPage(item)} className={`flex h-6 w-6 items-center justify-center rounded-full border ${item === page ? "border-primary bg-primary text-white" : "border-black/15 text-black/65"}`}>{item}</button>)}
        <button type="button" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={page === pageCount} className="inline-flex items-center gap-1 rounded-full border border-black/15 px-3 py-1.5 disabled:opacity-40">Next<ChevronRight size={12} /></button>
      </nav>
    </>
  );
}
