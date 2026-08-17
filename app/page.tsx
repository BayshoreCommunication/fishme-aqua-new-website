import About from "@/component/home/About";
import Clients from "@/component/home/Clients";
import FeaturedProjects from "@/component/home/FeaturedProjects";
import Hero from "@/component/home/Hero";
import Services from "@/component/home/Services";
import WhyFishMeAqua from "@/component/home/WhyFishMeAqua";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <FeaturedProjects />
      <WhyFishMeAqua />
      <Clients />
    </>
  );
}
