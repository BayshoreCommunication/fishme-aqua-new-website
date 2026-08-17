"use client";

import React, { useState } from "react";
import Image from "next/image";
import Reveal from "@/component/motion/Reveal";

interface LogoItem {
  id: number;
  name: string;
  image: string;
}

const logosData: LogoItem[] = [
  { id: 1, name: "AVANT", image: "/assets/home/client-1.png" },
  { id: 2, name: "brightly", image: "/assets/home/client-2.png" },
  { id: 3, name: "CLOUDVA", image: "/assets/home/client-3.png" },
  { id: 4, name: "DEVORA", image: "/assets/home/client-4.png" },
  { id: 5, name: "enfinity", image: "/assets/home/client-5.png" },
  { id: 6, name: "Greenly", image: "/assets/home/client-6.png" },
  { id: 7, name: "Hexatek", image: "/assets/home/client-7.png" },
  { id: 8, name: "KORVIA", image: "/assets/home/client-8.png" },
  { id: 9, name: "matexo", image: "/assets/home/client-9.png" },
  { id: 10, name: "Noventa", image: "/assets/home/client-10.png" },
];

const ClientLogosSlider = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-12 md:py-16  text-foreground overflow-hidden transition-colors duration-300 bg-foreground/5 dark:bg-white/2">
      <div className="w-full px-4 sm:px-8 md:px-16">
        <Reveal direction="up" delay={150}>
          <div className="w-full   transition-all duration-300 overflow-hidden relative">
            {/* Left and Right Fade Gradients for smooth modern edges */}

            {/* Marquee Track Container */}
            <div
              className="flex overflow-hidden w-full select-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* First Track */}
              <div
                className={`flex shrink-0 items-center justify-around gap-16 min-w-full animate-marquee`}
                style={{ animationPlayState: isPaused ? "paused" : "running" }}
              >
                {logosData.map((logo, index) => (
                  <div
                    key={`logo-1-${logo.id}-${index}`}
                    className="group relative flex items-center justify-center p-2 cursor-pointer shrink-0"
                  >
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      width={130}
                      height={45}
                      className="max-h-10 w-auto object-contain grayscale opacity-60 contrast-200 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              {/* Duplicate Track for seamless infinite loop without stutter */}
              <div
                className={`flex shrink-0 items-center justify-around gap-16 min-w-full animate-marquee`}
                aria-hidden="true"
                style={{ animationPlayState: isPaused ? "paused" : "running" }}
              >
                {logosData.map((logo, index) => (
                  <div
                    key={`logo-2-${logo.id}-${index}`}
                    className="group relative flex items-center justify-center p-2 cursor-pointer shrink-0"
                  >
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      width={130}
                      height={45}
                      className="max-h-10 w-auto object-contain grayscale opacity-60 contrast-200 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Tailwind Custom Animation Style */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ClientLogosSlider;
