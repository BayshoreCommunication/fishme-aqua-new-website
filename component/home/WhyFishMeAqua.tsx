"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Award, Sparkles, ShieldCheck, Headphones } from "lucide-react";

import Reveal from "@/component/motion/Reveal";
import YouTubeEmbed from "@/component/shared/YouTubeEmbed";
import { youtubeThumbnail } from "@/component/shared/youtube";

interface WhyChooseItem {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const whyChooseData: WhyChooseItem[] = [
  {
    id: 1,
    title: "15+ Years Expertise",
    description:
      "Our expert team has over 15 years of experience in aquatic design and installation and has successfully carried out hundreds of commercial and residential installations.",
    icon: Award,
  },
  {
    id: 2,
    title: "Premium Materials",
    description:
      "We select the best equipment, the brightest fish, the healthiest plants, and the strongest materials to make sure it will last and be beautiful.",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Custom Solutions",
    description:
      "Each project is derived from your original idea, sized and designed to comply with your available space, your specific needs and your existing budget.",
    icon: Sparkles,
  },
  {
    id: 4,
    title: "Lifetime Support",
    description:
      "We don't just stop at the installation. We also provide advice, maintenance and emergencies as and when you need.",
    icon: Headphones,
  },
];

interface WhyFishMeAquaProps {
  // Each page passes its own channel video so no video repeats across pages.
  videoUrl?: string;
  videoTitle?: string;
}

const WhyFishMeAqua = ({
  videoUrl = "https://www.youtube.com/embed/Y0toBjqf22Q",
  videoTitle = "Transform Your Space with Living Art | FishMe Project Showreel",
}: WhyFishMeAquaProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll up ba down korle section screen er baire gele video off korar jonno
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        setIsPlaying(false);
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
          src="/assets/home/WhyFishMeAqua-bg.png"
          alt="Services Background"
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      <div className="relative container z-10">
        {/* Header Section */}
        <Reveal direction="up" delay={0}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-white mb-3">
              Why Fish Me Aqua?
            </h2>
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-gray-200 mx-auto">
              A trusted team for custom aquatic design.
            </p>
          </div>
        </Reveal>

        {/* Grid Layout: Left Cards (2) -> Center Video/Image -> Right Cards (2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between h-full">
            <Reveal direction="up" delay={100} className="flex-1 flex flex-col">
              <div className="h-full w-full bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/15 hover:border-white/30 hover:bg-white/8 transition-all duration-300 shadow-2xl flex flex-col justify-between group min-h-[220px]">
                <div className="w-14 h-14 rounded-2xl bg-white text-slate-900 flex items-center justify-center mb-6 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Award className="w-7 h-7 text-slate-800" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {whyChooseData[0].title}
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {whyChooseData[0].description}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={200} className="flex-1 flex flex-col">
              <div className="h-full w-full bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/15 hover:border-white/30 hover:bg-white/8 transition-all duration-300 shadow-2xl flex flex-col justify-between group min-h-[220px]">
                <div className="w-14 h-14 rounded-2xl bg-white text-slate-900 flex items-center justify-center mb-6 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <ShieldCheck className="w-7 h-7 text-slate-800" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {whyChooseData[1].title}
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {whyChooseData[1].description}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Center Column: Featured Interactive Video/Image Card */}
          <div className="lg:col-span-4 h-full flex flex-col">
            <Reveal
              direction="up"
              delay={300}
              className="h-full flex-1 flex flex-col"
            >
              <div className="relative h-full min-h-[460px] lg:min-h-[500px] w-full overflow-hidden rounded-3xl bg-black shadow-2xl border border-white/20 group">
                {isPlaying ? (
                  <YouTubeEmbed src={videoUrl} title={videoTitle} />
                ) : (
                  <>
                    {/* Blurred copy fills the card; the full 16:9 thumbnail sits on top uncropped */}
                    <Image
                      src={youtubeThumbnail(videoUrl)}
                      alt=""
                      aria-hidden
                      fill
                      className="scale-125 object-cover blur-2xl"
                    />
                    <Image
                      src={youtubeThumbnail(videoUrl)}
                      alt="Why Fish Me Aqua - Featured Installation"
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                    {/* Centered Large Play Button */}
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      aria-label="Play Why Fish Me Aqua showcase video"
                      className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/50 bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/40 cursor-pointer shadow-2xl"
                    >
                      <Play className="ml-1 h-8 w-8 fill-white text-white" />
                    </button>
                  </>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right Column Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between h-full">
            <Reveal direction="up" delay={400} className="flex-1 flex flex-col">
              <div className="h-full w-full bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/15 hover:border-white/30 hover:bg-white/8 transition-all duration-300 shadow-2xl flex flex-col justify-between group min-h-[220px]">
                <div className="w-14 h-14 rounded-2xl bg-white text-slate-900 flex items-center justify-center mb-6 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Sparkles className="w-7 h-7 text-slate-800" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {whyChooseData[2].title}
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {whyChooseData[2].description}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={500} className="flex-1 flex flex-col">
              <div className="h-full w-full bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/15 hover:border-white/30 hover:bg-white/8 transition-all duration-300 shadow-2xl flex flex-col justify-between group min-h-[220px]">
                <div className="w-14 h-14 rounded-2xl bg-white text-slate-900 flex items-center justify-center mb-6 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Headphones className="w-7 h-7 text-slate-800" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {whyChooseData[3].title}
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {whyChooseData[3].description}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyFishMeAqua;
