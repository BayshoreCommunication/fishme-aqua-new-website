import type { Metadata } from "next";
import ProjectsGrid from "@/component/projects/ProjectsGrid";
import Breadcrumb from "@/component/shared/Breadcrumb";

export const metadata: Metadata = {
  title: "Featured Projects",
  description:
    "Explore Fish Me Aqua's portfolio of stunning aquatic installations.",
};

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumb
        firstPart="Featured"
        lastWord="Projects"
        backgroundImage="/assets/home/hero-section-background.png"
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto mb-7 max-w-md text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-2 text-base text-foreground/75 leading-relaxed">
              Explore our portfolio of stunning aquatic installations
            </p>
          </div>
          <ProjectsGrid />
        </div>
      </section>
    </>
  );
}
