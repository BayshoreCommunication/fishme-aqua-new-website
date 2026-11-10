import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";
import ProjectsGrid from "@/component/projects/ProjectsGrid";
import Breadcrumb from "@/component/shared/Breadcrumb";

export const metadata: Metadata = {
  title: {
    absolute: "Aquarium Projects Gallery | Fish Me Aqua Installations",
  },
  description:
    "Browse our latest aquatic installations. From luxury hotel marine tanks to peaceful home aquascapes we build environments that captivate and inspire.",
  alternates: { canonical: canonicalUrl("/projects") },
};

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumb
        firstPart="Featured"
        lastWord="Projects"
        backgroundImage="/assets/home/hero-section-background.png"
      />
      <section className="bg-background text-foreground transition-colors duration-300 py-16 sm:py-24">
        <div className="container">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Featured Projects
            </h2>
            <p className="mt-3 text-base sm:text-lg text-foreground/80 leading-relaxed font-normal">
              Check out our gallery of beautiful underwater works.
            </p>
          </div>
          <ProjectsGrid />
        </div>
      </section>
    </>
  );
}
