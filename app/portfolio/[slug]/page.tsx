import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/component/shared/Breadcrumb";
import PortfolioHeroShowcase from "@/component/portfolio/PortfolioHeroShowcase";
import PortfolioCaseStudy from "@/component/portfolio/PortfolioCaseStudy";
import WhyFishMeAqua from "@/component/home/WhyFishMeAqua";
import WhatOurClientsSay from "@/component/home/WhatOurClientsSay";
import { getAllPortfolioItems, getPortfolioItem } from "@/data/portfolio";

type PortfolioDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const items = getAllPortfolioItems();
  return items.map((item: { slug: string }) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PortfolioDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const item = getPortfolioItem(resolvedParams.slug);

  if (!item) {
    return {
      title: "Portfolio Case Study",
      description: "Explore custom aquatic installations by Fish Me Aqua.",
    };
  }

  return {
    title: `${item.title} | Portfolio Case Study`,
    description: item.description,
  };
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const resolvedParams = await params;
  const item = getPortfolioItem(resolvedParams.slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <Breadcrumb
        firstPart={item.title}
        lastWord="Case Study"
        backgroundImage="/assets/home/services-section-background.png"
      />
      <PortfolioHeroShowcase item={item} />
      <PortfolioCaseStudy item={item} />
      <WhyFishMeAqua />
      <WhatOurClientsSay />
    </>
  );
}
