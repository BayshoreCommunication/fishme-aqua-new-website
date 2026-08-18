import type { Metadata } from "next";
import ProjectsGrid from "@/component/projects/ProjectsGrid";

export const metadata: Metadata = {
  title: "Featured Projects",
  description: "Explore Fish Me Aqua's portfolio of stunning aquatic installations.",
};

export default function ProjectsPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container max-w-6xl">
        <div className="mx-auto mb-7 max-w-md text-center">
          <h1 className="font-heading text-3xl font-bold text-black sm:text-4xl">Featured Projects</h1>
          <p className="mt-2 text-xs text-black/55">Explore our portfolio of stunning aquatic installations</p>
        </div>
        <ProjectsGrid />
      </div>
    </section>
  );
}
