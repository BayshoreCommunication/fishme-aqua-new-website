"use client";

import Reveal from "@/component/motion/Reveal";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface BreadcrumbProps {
  title?: string;
  firstPart?: string;
  lastWord?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  title,
  firstPart,
  lastWord,
  backgroundImage = "/assets/home/hero-bg.svg",
  backgroundPosition = "center",
}) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((seg) => seg !== "");

  const formatSegment = (segment: string) => {
    let decodedSegment = segment;

    try {
      decodedSegment = decodeURIComponent(segment);
    } catch {
      // Keep the original segment when a URL contains invalid encoding.
    }

    return decodedSegment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const pathnameTitle = pathSegments.length
    ? formatSegment(pathSegments[pathSegments.length - 1])
    : "Fish Me Aqua";
  const fullTitle =
    title || [firstPart, lastWord].filter(Boolean).join(" ") || pathnameTitle;
  const words = fullTitle.trim().split(/\s+/);
  const headingFirst =
    firstPart ?? (words.length > 1 ? words.slice(0, -1).join(" ") : "");
  const headingLast = lastWord ?? words[words.length - 1];

  return (
    <section
      aria-labelledby="subpage-hero-title"
      className="relative isolate -mt-20 flex min-h-[30svh] w-full items-start overflow-hidden bg-black pt-20 sm:min-h-[42svh] sm:items-center"
    >
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: backgroundPosition }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/25" />
      <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-black/10" />

      <div className="container relative z-10 py-12 sm:py-16">
        <div className="flex w-full max-w-4xl flex-col items-start gap-5 text-left sm:gap-6">
          <Reveal direction="up" delay={0} className="text-left w-full">
            <h1
              id="subpage-hero-title"
              className="max-w-4xl text-left text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              {headingFirst && <span>{headingFirst} </span>}
              <span className="sm:whitespace-nowrap">
                <span className="title-gradient">{headingLast}</span>
              </span>
            </h1>
          </Reveal>

          <Reveal direction="up" delay={150} className="text-left">
            <nav
              aria-label="Breadcrumb"
              className="flex w-fit max-w-full flex-wrap items-center justify-start gap-x-2 gap-y-1.5  bg-black/15 px-4 py-2.5 text-sm text-white/75 shadow-lg backdrop-blur-md sm:rounded-full"
            >
              <Link
                href="/"
                className="transition-colors hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Home
              </Link>

              {pathSegments.map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                const isLast = index === pathSegments.length - 1;
                const formattedName =
                  isLast && title && pathSegments.length > 1
                    ? title
                    : formatSegment(segment);

                return (
                  <React.Fragment key={href}>
                    <ChevronRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 text-white/35"
                    />
                    {isLast ? (
                      <span
                        aria-current="page"
                        className="font-semibold text-white"
                      >
                        {formattedName}
                      </span>
                    ) : (
                      <Link
                        href={href}
                        className="transition-colors hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {formattedName}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}

              {pathSegments.length === 0 && (
                <>
                  <ChevronRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 text-white/35"
                  />
                  <span
                    aria-current="page"
                    className="font-semibold text-white"
                  >
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
