"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Navbar from "../shared/Navbar";

export const HeroSection = () => {
  const bgImageUrl = "/images/home/hero/hero-section-background.png";

  // Mouse position state for 3D/Parallax Cursor Movement
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Intersection observer for triggering CountUp when scrolled into view
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    // Calculate normalized offset from center (-1 to 1)
    const x = (clientX - (left + width / 2)) / (width / 2);
    const y = (clientY - (top + height / 2)) / (height / 2);

    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen text-white font-sans overflow-hidden bg-slate-950 flex flex-col justify-between"
    >
      {/* 1. Optimized Next.js Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={bgImageUrl}
          alt="Aquarium Background"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Dark Gradient Overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 backdrop-blur-[1px]"></div>
      </div>

      {/* 2. Separate Navbar Component */}
      <Navbar />

      {/* 3. Main Hero Body with Container */}
      <div className="relative z-10 my-auto py-16 sm:py-20 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column Text Content */}
            <div className="lg:col-span-6 space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-serif">
                Transform Your Space with{" "}
                <span className="bg-gradient-to-r from-[#F91C13] to-[#00CB83] bg-clip-text text-transparent font-serif">
                  Living Art
                </span>
              </h1>

              <p className="text-gray-300 text-base sm:text-lg max-w-xl font-light leading-relaxed">
                Premium aquatic design solutions for luxury homes, corporate
                offices, and commercial spaces. From custom aquariums to
                breathtaking aquascapes.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {/* Primary Button */}
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#0f766e] to-[#0d9488] px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-teal-950/40 transition-all duration-300 hover:scale-105 hover:shadow-teal-500/30 active:scale-95"
                >
                  {/* Light Streak Layer */}
                  <span className="absolute top-0 -left-[100%] h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-in-out group-hover:left-[100%]" />

                  <span className="relative z-10">Book Free Consultation</span>
                  <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>

                {/* Secondary Button */}
                <Link
                  href="/projects"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/40 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 active:scale-95"
                >
                  {/* Light Streak Layer */}
                  <span className="absolute top-0 -left-[100%] h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-in-out group-hover:left-[100%]" />

                  <span className="relative z-10">View Our Projects</span>
                  <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>

              {/* WhatsApp Contact */}
              <div className="pt-4 flex items-center gap-3 text-sm text-gray-300 italic">
                <span>Connect Our Community -</span>
                <a
                  href="https://wa.me/880123456789"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white font-medium hover:text-emerald-400 transition-colors not-italic"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs">
                    <Phone className="w-3.5 h-3.5 fill-black text-emerald-500" />
                  </div>
                  +880 123456789
                </a>
              </div>
            </div>

            {/* Right Column Grid Glassmorphism Cards with Parallax & Offset */}
            <div ref={ref} className="lg:col-span-6 relative w-full">
              <div className="grid grid-cols-2 gap-5 max-w-lg mx-auto lg:max-w-none items-start">
                {/* Left Column Cards (Shifted slightly higher on desktop) */}
                <div className="space-y-5 lg:-translate-y-4">
                  {/* Card 1: Projects Completed */}
                  <div
                    className="group relative bg-white/[0.05] backdrop-blur-xl border border-white/15 p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-300 ease-out hover:border-teal-400/50 hover:bg-white/[0.08] hover:shadow-teal-500/10 hover:shadow-2xl hover:-translate-y-1"
                    style={{
                      transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0px)`,
                    }}
                  >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
                      {inView ? <CountUp end={100} duration={2.5} /> : 0}+
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide">
                      Projects Completed
                    </p>
                  </div>

                  {/* Card 3: Years Experience */}
                  <div
                    className="group relative bg-white/[0.05] backdrop-blur-xl border border-white/15 p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-300 ease-out hover:border-teal-400/50 hover:bg-white/[0.08] hover:shadow-teal-500/10 hover:shadow-2xl hover:-translate-y-1"
                    style={{
                      transform: `translate3d(${mousePos.x * -8}px, ${mousePos.y * -8}px, 0px)`,
                    }}
                  >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
                      {inView ? <CountUp end={6} duration={2} /> : 0}+
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide">
                      Years Experience
                    </p>
                  </div>
                </div>

                {/* Right Column Cards (Shifted downward like in the design image) */}
                <div className="space-y-5 lg:translate-y-8">
                  {/* Card 2: Maintenance Clients */}
                  <div
                    className="group relative bg-white/[0.05] backdrop-blur-xl border border-white/15 p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-300 ease-out hover:border-teal-400/50 hover:bg-white/[0.08] hover:shadow-teal-500/10 hover:shadow-2xl hover:-translate-y-1"
                    style={{
                      transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * 12}px, 0px)`,
                    }}
                  >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
                      {inView ? <CountUp end={50} duration={2.5} /> : 0}+
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide">
                      Maintenance Clients
                    </p>
                  </div>

                  {/* Card 4: Client Satisfaction */}
                  <div
                    className="group relative bg-white/[0.05] backdrop-blur-xl border border-white/15 p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-300 ease-out hover:border-teal-400/50 hover:bg-white/[0.08] hover:shadow-teal-500/10 hover:shadow-2xl hover:-translate-y-1"
                    style={{
                      transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * -10}px, 0px)`,
                    }}
                  >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
                      {inView ? <CountUp end={98} duration={2.5} /> : 0}%
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide">
                      Client Satisfaction
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to balance vertical layout */}
      <div className="h-6"></div>
    </section>
  );
};

export default HeroSection;
