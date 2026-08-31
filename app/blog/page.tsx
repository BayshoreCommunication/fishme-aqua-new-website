import type { Metadata } from "next";
import Breadcrumb from "@/component/shared/Breadcrumb";
import BlogGrid from "@/component/blog/BlogGrid";
import WhatOurClientsSay from "@/component/home/WhatOurClientsSay";
import TestimonialFAQ from "@/component/testimonial/TestimonialFAQ";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Aquatic inspiration & expert advice. Read guides, maintenance tips, and aquascaping ideas from Fish Me Aqua.",
};

export default function BlogPage() {
  return (
    <>
      <Breadcrumb
        firstPart="Aquatic Inspiration &"
        lastWord="Expert Advice"
        backgroundImage="/assets/home/services-section-background.png"
      />
      <BlogGrid />
      <WhatOurClientsSay />
      <TestimonialFAQ />
    </>
  );
}
