"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Reveal from "@/component/motion/Reveal";

interface BreadcrumbProps {
  title?: string;
  firstPart?: string;
  lastWord?: string;
  backgroundImage?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  title,
  firstPart,
  lastWord,
  backgroundImage = "/assets/home/hero-bg.svg",
}) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((seg) => seg !== "");

  // Format segment text (e.g., "about-us" -> "About Us")
  const formatSegment = (segment: string) => {
    return segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Fallback title derived from pathname if props are not provided
  const derivedTitle =
    title ||
    (pathSegments.length > 0
      ? formatSegment(pathSegments[pathSegments.length - 1])
      : "Fish Me Aqua");

  // Determine final parts for rendering
  let headingFirst = firstPart;
  let headingLast = lastWord;

  if (!headingFirst && !headingLast) {
    const words = derivedTitle.split(" ");
    headingFirst = words.slice(0, -1).join(" ");
    headingLast = words[words.length - 1];
  } else if (!headingFirst) {
    headingFirst = "";
  } else if (!headingLast) {
    headingLast = derivedTitle;
  }

  return (
    <section className="relative isolate -mt-20 flex min-h-[45vh] sm:min-h-[50vh] w-full items-center overflow-hidden bg-black pt-20">
      {/* Background Image with Dark Gradient Overlay */}
      <Image
        src={backgroundImage}
        alt="Aquarium background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />

      <div className="relative z-10 py-16 container">
        <div className="flex flex-col items-start justify-start text-left w-full max-w-4xl gap-6">
          {/* Dynamic Page Title with Custom props support */}
          <Reveal direction="up" delay={0} className="text-left w-full">
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl text-left">
              {headingFirst && <span>{headingFirst} </span>}
              <span className="sm:whitespace-nowrap">
                <span className="title-gradient">{headingLast}</span>
              </span>
            </h1>
          </Reveal>

          {/* Breadcrumb Navigation Links */}
          <Reveal direction="up" delay={150} className="text-left w-full">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center flex-wrap justify-start gap-4 text-sm font-light text-white"
            >
              <Link
                href="/"
                className="hover:text-teal-400 transition-colors cursor-pointer"
              >
                Home
              </Link>

              {pathSegments.map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                const isLast = index === pathSegments.length - 1;
                const formattedName = formatSegment(segment);

                return (
                  <React.Fragment key={href}>
                    <span className="text-white/40">/</span>
                    {isLast ? (
                      <span className="px-5 py-1 rounded-full border border-white/30 bg-white/5 backdrop-blur-md text-white font-medium shadow-sm">
                        {formattedName}
                      </span>
                    ) : (
                      <Link
                        href={href}
                        className="hover:text-teal-400 transition-colors cursor-pointer"
                      >
                        {formattedName}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}

              {pathSegments.length === 0 && (
                <>
                  <span className="text-white/40">/</span>
                  <span className="px-5 py-1.5 rounded-full border border-white/30 bg-white/5 backdrop-blur-md text-white font-medium shadow-sm">
                    Overview
                  </span>
                </>
              )}
            </nav>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
