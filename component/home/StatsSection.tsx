"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import CountUp from "@/component/motion/CountUp";

import Reveal from "@/component/motion/Reveal";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const statsData: StatItem[] = [
  { value: 100, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Maintenance Clients" },
  { value: 6, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-slate-950 text-white overflow-hidden"
    >
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/home/StatsSection.png"
          alt="Stats Background"
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {statsData.map((stat, index) => (
            <Reveal key={index} direction="up" delay={index * 100}>
              <div className="flex h-44 flex-col items-center justify-center gap-2 rounded-3xl border border-white/15 bg-white/[0.05] p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] shadow-xl group">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight transition-transform duration-300 group-hover:scale-105"
                />
                <span className="text-sm md:text-base font-light text-gray-300">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
