import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";
import About from "@/component/home/About";
import BlogSection from "@/component/home/BlogSection";
import ClientLogosSlider from "@/component/home/ClientLogosSlider";
import FeaturedProjects from "@/component/home/FeaturedProjects";
import Hero from "@/component/home/Hero";
import Services from "@/component/home/Services";
import ShopAquaticEssentials from "@/component/home/ShopAquaticEssentials";
import StatsSection from "@/component/home/StatsSection";
import WhatOurClientsSay from "@/component/home/WhatOurClientsSay";
import WhyFishMeAqua from "@/component/home/WhyFishMeAqua";

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl("/") },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <FeaturedProjects />
      <WhyFishMeAqua />
      <ClientLogosSlider />
      <ShopAquaticEssentials />
      <StatsSection />
      <WhatOurClientsSay />
      <BlogSection />
    </>
  );
}
