import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";
import Breadcrumb from "@/component/shared/Breadcrumb";
import ServicePage from "@/component/services/ServicePage";
import StatsSection from "@/component/home/StatsSection";
import OurJourney from "@/component/about/OurJourney";

export const metadata: Metadata = {
  title: {
    absolute: "Aquarium Design and Maintenance Services | Fish Me Aqua",
  },
  description:
    "Explore our complete range of services including custom aquarium design professional installation and ongoing maintenance to keep your aquatic life thriving.",
  alternates: { canonical: canonicalUrl("/services") },
};

const ServicesPage = () => {
  return (
    <>
      <Breadcrumb
        firstPart="Premium Aquatic & Nature "
        lastWord="Design Services"
        backgroundImage="/assets/home/services-section-background.png"
      />
      <ServicePage />
      <StatsSection />
      <OurJourney />
    </>
  );
};
export default ServicesPage;
