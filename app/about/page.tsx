"use client";

import OurJourney from "@/component/about/OurJourney";
import OurStory from "@/component/about/OurStory";
import OurValues from "@/component/about/OurValues";
import WhyFishMeAqua from "@/component/home/WhyFishMeAqua";
import Breadcrumb from "@/component/shared/Breadcrumb";

const AboutPage = () => {
  return (
    <>
      {/* Custom Title, Subtitle ebong Background Image pass kora hocche */}
      <Breadcrumb
        firstPart="About"
        lastWord="Fish Me Aqua"
        backgroundImage="/assets/home/hero-bg.svg"
      />

      <OurStory />
      <OurValues />
      <WhyFishMeAqua />
      <OurJourney />
    </>
  );
};

export default AboutPage;
