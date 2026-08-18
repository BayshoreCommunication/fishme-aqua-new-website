import type { Metadata } from "next";
import Breadcrumb from "@/component/shared/Breadcrumb";
import ServicePage from "@/component/services/ServicePage";
import StatsSection from "@/component/home/StatsSection";
import OurJourney from "@/component/about/OurJourney";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Fish Me Aqua's tailored aquatic design, installation, and maintenance services.",
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
