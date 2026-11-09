import type { Metadata } from "next";
import Breadcrumb from "@/component/shared/Breadcrumb";
import PortfolioProjectsGrid from "@/component/portfolio/PortfolioProjectsGrid";
import WhyFishMeAqua from "@/component/home/WhyFishMeAqua";
import WhatOurClientsSay from "@/component/home/WhatOurClientsSay";

export const metadata: Metadata = {
  title: {
    absolute: "Custom Aquarium and Aquascape Portfolio | Fish Me Aqua",
  },
  description:
    "Explore Fish Me Aqua's portfolio of breathtaking living ecosystems. View our signature projects from luxury hotel marine tanks to private nature aquascapes.",
};

export default function PortfolioPage() {
  return (
    <>
      <Breadcrumb
        firstPart="Transforming Spaces Through"
        lastWord="Living Ecosystems"
        backgroundImage="/assets/home/services-section-background.png"
      />

      <section className="bg-background py-16 sm:py-24 text-foreground transition-colors duration-300">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006E5C] dark:text-teal-400 mb-2">
              Featured Work
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Our Signature Portfolio
            </h2>
            <p className="mt-3 text-base sm:text-lg text-foreground/80 leading-relaxed font-normal">
              Take a look at some of our favorite recent builds from bespoke
              living ecosystems and custom nature aquascapes to large scale
              marine installations.
            </p>
          </div>

          <PortfolioProjectsGrid />
        </div>
      </section>

      <WhyFishMeAqua
        videoUrl="https://www.youtube.com/embed/OdPQycGtzB4"
        videoTitle="Relaxing Paludarium with Waterfall Sounds"
      />
      <WhatOurClientsSay />
    </>
  );
}
