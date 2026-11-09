"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  MapPin,
  Layers,
  Briefcase,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { notFound } from "next/navigation";
import projects from "@/data/FeaturedProjects.json";
import { getPortfolioItem } from "@/data/portfolio";
import YouTubeEmbed from "@/component/shared/YouTubeEmbed";
import { youtubeThumbnail } from "@/component/shared/youtube";
import Breadcrumb from "@/component/shared/Breadcrumb";
import Button from "@/component/shared/Button";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const [isPlaying, setIsPlaying] = useState(false);

  const project = projects.find((item) => String(item.id) === slug);
  if (!project) notFound();

  // Each project's case study text lives in the portfolio data (same slug).
  const details = getPortfolioItem(project.slug);
  if (!details) notFound();

  return (
    <>
      <Breadcrumb
        title={project.title}
        backgroundImage="/assets/home/services-section-background.png"
      />

      <section className="bg-background text-foreground py-20 sm:py-28 transition-colors duration-300">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#006E5C] dark:text-teal-400 hover:opacity-80 transition-opacity mb-8"
          >
            <ArrowLeft size={16} />
            All projects
          </Link>

          {/* Top Grid: Main Video/Media Player (Left) + Client/Quote Card (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
            {/* Left Video Banner */}
            <div className="lg:col-span-8 relative aspect-[16/10] w-full overflow-hidden bg-black border border-foreground/10 dark:border-white/10 group">
              {isPlaying ? (
                <YouTubeEmbed src={project.videoUrl} title={project.title} />
              ) : (
                <div
                  className="relative h-full w-full cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  <Image
                    src={youtubeThumbnail(project.videoUrl)}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors" />

                  <button
                    type="button"
                    aria-label="Play video"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110 shadow-2xl"
                  >
                    <Play size={28} className="fill-white ml-1" />
                  </button>
                </div>
              )}
            </div>

            {/* Right Quote / Review Card */}
            <div className="lg:col-span-4 flex flex-col justify-between border border-foreground/10 dark:border-white/10 bg-[#073c35] text-white p-8 sm:p-10 shadow-xl">
              <div className="space-y-4">
                <span className="text-3xl font-serif text-[#76dbc4]">
                  &ldquo;
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-white/90 font-light italic">
                  {details.testimonial.quote}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-white/15 mt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/20">
                  <Image
                    src={project.image}
                    alt={details.testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {details.testimonial.author}
                  </h4>
                  <p className="text-[11px] text-[#76dbc4] uppercase tracking-wider">
                    {details.testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata Specifications Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 mb-16 border border-foreground/10 dark:border-white/10 bg-foreground/[0.02] dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#006E5C]/10 text-[#006E5C] dark:text-teal-400">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-foreground/50 font-medium">
                  Aquarium Type
                </p>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {details.specs.aquariumType}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#006E5C]/10 text-[#006E5C] dark:text-teal-400">
                <Layers size={20} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-foreground/50 font-medium">
                  Scale
                </p>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {details.specs.scale}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#006E5C]/10 text-[#006E5C] dark:text-teal-400">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-foreground/50 font-medium">
                  Location
                </p>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {details.specs.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#006E5C]/10 text-[#006E5C] dark:text-teal-400">
                <Briefcase size={20} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-foreground/50 font-medium">
                  Timeline
                </p>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {details.specs.timeline}
                </p>
              </div>
            </div>
          </div>

          {/* Project Header Title & Overview */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-foreground/70 font-light">
              {details.description}
            </p>
          </div>

          {/* Challenge & Solution Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Challenge */}
            <div className="space-y-4">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black border border-foreground/10 dark:border-white/10">
                <Image
                  src={project.image}
                  alt="Challenge"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                Challenge: {details.challenge.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-foreground/70 font-light">
                {details.challenge.description}
              </p>
            </div>

            {/* Solution */}
            <div className="space-y-4">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black border border-foreground/10 dark:border-white/10">
                <Image
                  src={project.image}
                  alt="Solution"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                Solution: {details.solution.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-foreground/70 font-light">
                {details.solution.description}
              </p>
            </div>
          </div>

          {/* Installation Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black border border-foreground/10 dark:border-white/10">
              <Image
                src={project.image}
                alt="Installation 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black border border-foreground/10 dark:border-white/10">
              <Image
                src={project.image}
                alt="Installation 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:col-span-2 space-y-4 max-w-4xl mx-auto text-center">
              <h3 className="font-heading text-2xl font-bold text-foreground">
                Installation &amp; Outcome
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-foreground/70 font-light">
                {details.installation}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-foreground/70 font-light">
                {details.outcome}
              </p>
            </div>
          </div>

          {/* Bottom Consultation CTA Button */}
          <div className="text-center">
            <Button
              href="/contact-us"
              variant="primary"
              className="px-9 py-4 text-sm font-medium bg-[#006E5C] hover:bg-[#00584a] text-white transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>Book Free Consultation</span>
              <span className="inline-flex h-5 w-5 items-center justify-center bg-white/20">
                <ArrowUpRight size={14} />
              </span>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
