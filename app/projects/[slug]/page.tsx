import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Play } from "lucide-react";
import { notFound } from "next/navigation";
import projects from "@/data/FeaturedProjects.json";
import Button from "@/component/shared/Button";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: String(project.id) }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const matchedProject = projects.find((item) => String(item.id) === slug);
  return matchedProject ? { title: matchedProject.title, description: matchedProject.description } : {};
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => String(item.id) === slug);
  if (!project) notFound();

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container max-w-5xl">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-[#004e41]"><ArrowLeft size={17} />All projects</Link>
        <div className="mt-8 overflow-hidden rounded-3xl border border-black/10 bg-black shadow-xl">
          <div className="relative aspect-video"><Image src={project.image} alt={project.title} fill priority className="object-cover" /><div className="absolute inset-0 bg-black/30" /><span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-white/20 text-white backdrop-blur"><Play size={23} className="ml-1 fill-white" /></span></div>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_0.7fr]">
          <div><p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">{project.category}</p><h1 className="mt-3 font-heading text-4xl font-bold text-black sm:text-5xl">{project.title}</h1><p className="mt-6 text-lg leading-relaxed text-black/65">{project.description}</p><div className="mt-10 border-t border-black/10 pt-7"><h2 className="text-2xl font-bold text-black">Project highlights</h2><ul className="mt-5 space-y-3 text-sm text-black/65"><li className="flex gap-3"><Check size={19} className="shrink-0 text-primary" />Custom design tailored to the surrounding space</li><li className="flex gap-3"><Check size={19} className="shrink-0 text-primary" />Professional installation and equipment setup</li><li className="flex gap-3"><Check size={19} className="shrink-0 text-primary" />Long-term care guidance from our aquatic specialists</li></ul></div></div>
          <aside className="h-fit rounded-3xl bg-[#073c35] p-8 text-white"><h2 className="text-2xl font-bold">Have a project in mind?</h2><p className="mt-4 text-sm leading-relaxed text-white/75">Let&apos;s turn your space into a living ecosystem.</p><Button href="/contact-us" variant="primary" className="mt-7 w-full !bg-white !text-primary">Start your project <ArrowUpRight size={16} className="ml-2" /></Button></aside>
        </div>
      </div>
    </section>
  );
}
