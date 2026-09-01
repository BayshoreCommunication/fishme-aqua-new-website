import type { Metadata } from "next";
import Breadcrumb from "@/component/shared/Breadcrumb";
import Reveal from "@/component/motion/Reveal";
import Link from "next/link";
import {
  AlertTriangle,
  Fish,
  ShieldAlert,
  Zap,
  Building,
  HelpCircle,
  Clock,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimers",
  description:
    "Read the legal, livestock, installation, and safety disclaimers for Fish Me Aqua custom aquariums, aquascaping, and maintenance services.",
};

const sections = [
  {
    id: "general-advice",
    title: "1. General Information & Care Advice",
    icon: HelpCircle,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          All guides, blog articles, water parameter recommendations, and
          aquatic care tips published on the Fish Me Aqua website
          (fishmeaqua.com) are provided solely for educational and informational
          purposes.
        </p>
        <p className="text-foreground/80 leading-relaxed text-base">
          While our certified aquarists make every effort to provide accurate,
          up-to-date information, individual aquarium conditions (such as tap
          water chemistry, bioload, filtration efficiency, and lighting
          schedules) vary widely. Fish Me Aqua does not accept liability for
          livestock loss or equipment damage resulting from the self-application
          of online advice without an on-site consultation by our team.
        </p>
      </>
    ),
  },
  {
    id: "livestock-ecosystem",
    title: "2. Living Ecosystems & Livestock Care",
    icon: Fish,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          Aquatic plants, ornamental fish, freshwater shrimp, and biological
          ecosystems are delicate living organisms. Their health and longevity
          depend heavily on proper acclimation, continuous biological
          filtration, nitrogen cycle stability, and compatible tank mates.
        </p>
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5 mb-4">
          <h4 className="font-semibold text-amber-600 dark:text-amber-400 text-sm mb-1.5 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            Live Arrival Guarantee (DOA) Terms
          </h4>
          <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
            For online livestock orders, our Live Arrival Guarantee requires the
            customer to provide clear, unedited unboxing video footage within 2
            hours of delivery receipt if any livestock is Dead On Arrival (DOA).
            Once livestock has been introduced into the customer’s private tank,
            Fish Me Aqua cannot guarantee survival due to unmonitored water
            parameters.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "structural-weight",
    title: "3. Structural Weight & Premise Load Capacity",
    icon: Building,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          Custom glass aquariums, large rimless tanks, and hardscapes
          constructed with Seiryu stone, Dragon stone, Driftwood, and dense
          aquatic substrate exert substantial downward load (typically 1.2 to
          1.5 kg per liter of water volume).
        </p>
        <p className="text-foreground/80 leading-relaxed text-base">
          It is the customer’s sole responsibility to ensure that their floor,
          building structure, subfloor joists, or custom cabinetry possess
          adequate load-bearing capacity. Fish Me Aqua provides tank weight
          specifications upon request, but is not responsible for structural
          deficiencies of the client&apos;s premises.
        </p>
      </>
    ),
  },
  {
    id: "electrical-safety",
    title: "4. Electrical Equipment, Water & CO2 Safety",
    icon: Zap,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          Operating high-tech aquariums involves submerging electrical equipment
          (heaters, powerheads, return pumps, UV sterilizers) in water alongside
          high-pressure pressurized CO2 injection systems and high-intensity LED
          fixtures.
        </p>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          Customers must always utilize dedicated Ground Fault Circuit
          Interrupter (GFCI) outlets, ensure all power cords have &quot;drip
          loops&quot;, and strictly disconnect all equipment from mains
          electricity before putting hands in the water during maintenance.
        </p>
      </>
    ),
  },
  {
    id: "liability-limitation",
    title: "5. Limitation of Liability",
    icon: ShieldAlert,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          To the maximum extent permitted by applicable law, Fish Me Aqua, its
          directors, employees, and field technicians shall not be liable for
          any indirect, incidental, or consequential damages — including water
          damage to flooring/carpeting resulting from customer alteration of
          plumbing, glass scratching from abrasive magnetic cleaners, or
          livestock losses due to localized power grid outages.
        </p>
        <p className="text-foreground/80 leading-relaxed text-base">
          Our total liability under any service contract shall not exceed the
          total amount paid by the customer for the specific installation or
          maintenance visit in dispute.
        </p>
      </>
    ),
  },
];

export default function DisclaimersPage() {
  return (
    <>
      <Breadcrumb
        firstPart="Legal & Compliance"
        lastWord="Disclaimers"
        backgroundImage="/assets/home/services-section-background.png"
      />

      <section className="bg-background py-16 sm:py-24 text-foreground transition-colors duration-300">
        <div className="container">
          {/* Header Banner */}
          <Reveal direction="up" delay={0}>
            <div className="mb-12 border-b border-foreground/10 dark:border-white/10 pb-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    Official Legal Notice
                  </span>
                  <h1 className="mt-3 font-heading text-3xl font-bold uppercase tracking-wide sm:text-4xl text-foreground">
                    Legal &amp; Operational Disclaimers
                  </h1>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/60">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Last Updated: September 2026</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Main Grid: Sticky Navigation Sidebar + Content Blocks */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28">
              <Reveal direction="up" delay={50}>
                <div className="rounded-3xl border border-foreground/10 dark:border-white/10 bg-foreground/[0.02] dark:bg-white/[0.02] p-6 backdrop-blur-md">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
                    Table of Contents
                  </h3>
                  <nav className="flex flex-col gap-2">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-foreground/75 transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        <span className="truncate">{section.title}</span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 text-primary" />
                      </a>
                    ))}
                  </nav>

                  <div className="mt-6 border-t border-foreground/10 dark:border-white/10 pt-6">
                    <p className="text-xs text-foreground/60 leading-relaxed">
                      Need custom consultation on aquarium load or water safety?
                    </p>
                    <Link
                      href="/contact-us"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      Speak with our Aquascaping Engineers &rarr;
                    </Link>
                  </div>
                </div>
              </Reveal>
            </aside>

            {/* Main Content Articles */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Reveal key={section.id} direction="up" delay={index * 50}>
                    <article
                      id={section.id}
                      className="scroll-mt-32 rounded-3xl border border-foreground/10 dark:border-white/10 bg-foreground/[0.02] dark:bg-white/[0.02] p-6 sm:p-8 transition-colors duration-200 hover:border-foreground/20 dark:hover:border-white/20"
                    >
                      <div className="flex items-center gap-3.5 mb-4 border-b border-foreground/5 dark:border-white/5 pb-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                          {section.title}
                        </h2>
                      </div>
                      <div className="pt-2">{section.content}</div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
