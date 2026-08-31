import type { Metadata } from "next";
import Breadcrumb from "@/component/shared/Breadcrumb";
import PortfolioHeroShowcase from "@/component/portfolio/PortfolioHeroShowcase";
import PortfolioCaseStudy from "@/component/portfolio/PortfolioCaseStudy";
import WhyFishMeAqua from "@/component/home/WhyFishMeAqua";
import WhatOurClientsSay from "@/component/home/WhatOurClientsSay";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Transforming spaces through living ecosystems. Explore custom aquariums, aquascaping, and bespoke water features by Fish Me Aqua.",
};

export default function PortfolioPage() {
  return (
    <>
      <Breadcrumb
        firstPart="Transforming Spaces Through"
        lastWord="Living Ecosystems"
        backgroundImage="/assets/home/services-section-background.png"
      />
      <PortfolioHeroShowcase />
      <PortfolioCaseStudy />
      <WhyFishMeAqua />
      <WhatOurClientsSay />
    </>
  );
}
