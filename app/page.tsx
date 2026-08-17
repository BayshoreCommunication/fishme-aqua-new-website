import About from "@/component/home/About";
import FeaturedProjects from "@/component/home/FeaturedProjects";
import Hero from "@/component/home/Hero";
import Services from "@/component/home/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <FeaturedProjects />
    </>
  );
}
