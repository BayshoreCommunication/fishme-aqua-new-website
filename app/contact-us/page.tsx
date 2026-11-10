import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";
import Breadcrumb from "@/component/shared/Breadcrumb";
import ContactSection from "@/component/contact/ContactSection";
import ContactMap from "@/component/contact/ContactMap";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with our aquatic experts. Book a free consultation for custom aquariums, ponds, waterfalls, and maintenance.",
  alternates: { canonical: canonicalUrl("/contact-us") },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumb
        firstPart="Get in Touch With"
        lastWord="Our Experts"
        backgroundImage="/assets/home/services-section-background.png"
      />
      <ContactSection />
      <ContactMap />
    </>
  );
}
