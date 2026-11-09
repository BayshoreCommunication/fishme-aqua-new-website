import type { Metadata } from "next";
import OurJourney from "@/component/about/OurJourney";
import OurStory from "@/component/about/OurStory";
import OurValues from "@/component/about/OurValues";
import WhyFishMeAqua from "@/component/home/WhyFishMeAqua";
import Breadcrumb from "@/component/shared/Breadcrumb";

export const metadata: Metadata = {
  title: {
    absolute: "About Fish Me Aqua | Custom Aquarium Design Experts",
  },
  description:
    "Meet the team behind Fish Me Aqua. We are passionate engineers and artists dedicated to building stunning living ecosystems that transform your space.",
};

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
      <WhyFishMeAqua
        videoUrl="https://www.youtube.com/embed/IJYJC6Pn59Q"
        videoTitle="3 minutes stress relief || A discus fish paradise || Fish Me"
      />
      <OurJourney />
    </>
  );
};

export default AboutPage;
