import type { Metadata } from "next";
import Breadcrumb from "@/component/shared/Breadcrumb";
import TestimonialGrid from "@/component/testimonial/TestimonialGrid";
import ClientLogosSlider from "@/component/home/ClientLogosSlider";
import OurJourney from "@/component/about/OurJourney";
import TestimonialFAQ from "@/component/testimonial/TestimonialFAQ";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read real reviews and client experiences from homeowners, businesses, and resorts that trust Fish Me Aqua.",
};

export default function TestimonialPage() {
  return (
    <>
      <Breadcrumb
        firstPart="What Our"
        lastWord="Clients Say"
        backgroundImage="/assets/home/services-section-background.png"
      />
      <TestimonialGrid />
      <ClientLogosSlider />
      <OurJourney />
      <TestimonialFAQ />
    </>
  );
}
