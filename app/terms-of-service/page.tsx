import type { Metadata } from "next";
import Breadcrumb from "@/component/shared/Breadcrumb";
import Reveal from "@/component/motion/Reveal";
import Link from "next/link";
import {
  FileText,
  CreditCard,
  Truck,
  RotateCcw,
  Wrench,
  Scale,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review the terms, conditions, payment guidelines, custom project contracts, and warranty policies of Fish Me Aqua in Bangladesh.",
};

const sections = [
  {
    id: "acceptance-of-terms",
    title: "1. Acceptance of Terms",
    icon: FileText,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          Welcome to Fish Me Aqua. By accessing our website (fishmeaqua.com),
          purchasing aquatic products, or booking custom aquascaping design,
          installation, and maintenance services, you agree to be bound by these
          Terms of Service and all applicable laws of Bangladesh.
        </p>
        <p className="text-foreground/80 leading-relaxed text-base">
          If you do not agree to these terms, please refrain from using our
          online services or entering into commercial contracts with Fish Me
          Aqua.
        </p>
      </>
    ),
  },
  {
    id: "custom-projects",
    title: "2. Custom Aquascaping & Installation Contracts",
    icon: Sparkles,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          All custom-built rimless tanks, ultra-clear glass aquariums, Nature
          Aquarium hardscapes, and indoor pond installations are governed by
          individualized project proposals and design specifications approved by
          the client.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-foreground/80 mb-4">
          <li>
            <strong className="text-foreground">Site Preparation:</strong> The
            client must ensure the installation site has level flooring,
            available GFCI electrical connections, and access to a reliable
            water supply before scheduled technician arrival.
          </li>
          <li>
            <strong className="text-foreground">Design Approval:</strong> Once
            3D renders or hardscape stone/wood layouts are formally signed off
            by the client, subsequent structural modifications may incur
            additional material and labor charges.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "pricing-payments",
    title: "3. Pricing, Invoicing & Payment Terms",
    icon: CreditCard,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          All prices for shop products and standard services are listed in
          Bangladeshi Taka (BDT) and are subject to change without prior notice.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-foreground/80 mb-4">
          <li>
            <strong className="text-foreground">Online Shop Orders:</strong>{" "}
            Full payment must be settled via supported digital payment gateways
            (bKash, Nagad, credit/debit card, or verified Cash On Delivery where
            eligible) prior to shipment dispatch.
          </li>
          <li>
            <strong className="text-foreground">
              Custom Project Milestones:
            </strong>{" "}
            Custom tank fabrication and aquascaping installations require a 50%
            advance deposit upon contract signing, 30% upon glass/hardware
            delivery to the site, and the remaining 20% upon successful
            biological fill and planting commissioning.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "delivery-shipping",
    title: "4. Shipping & Fragile Glass Handling",
    icon: Truck,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          Fish Me Aqua delivers products across Dhaka city and all divisions of
          Bangladesh through dedicated courier partners and specialized
          wooden-crated delivery vans for fragile rimless aquariums.
        </p>
        <p className="text-foreground/80 leading-relaxed text-base">
          Clients are required to inspect the exterior glass condition and seals
          in the presence of the delivery team. Any physical shipping transit
          damage must be reported within 24 hours of receipt with photo/video
          documentation.
        </p>
      </>
    ),
  },
  {
    id: "returns-refunds",
    title: "5. Returns, Replacements & Warranty",
    icon: RotateCcw,
    content: (
      <>
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-foreground/80 mb-4">
          <li>
            <strong className="text-foreground">
              Dry Goods &amp; Hardware:
            </strong>{" "}
            Unopened canister filters, LED lighting units, CO2 regulators, and
            accessories may be returned within 7 calendar days in original
            packaging for replacement or store credit.
          </li>
          <li>
            <strong className="text-foreground">Live Aquatic Plants:</strong>{" "}
            Submersed/tissue culture plants are backed by our 24-hour freshness
            arrival warranty.
          </li>
          <li>
            <strong className="text-foreground">
              Manufacturer Warranties:
            </strong>{" "}
            External electronic equipment (chillers, pumps, wavemakers) carry
            standard manufacturer warranties as indicated on the product box.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "maintenance-plans",
    title: "6. Maintenance Subscriptions & Service Cancellation",
    icon: Wrench,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          Monthly and bi-weekly routine maintenance contracts cover scheduled
          water changes, mechanical filter media cleansing, plant trimming, and
          water parameter testing.
        </p>
        <p className="text-foreground/80 leading-relaxed text-base">
          Either party may cancel a recurring monthly maintenance subscription
          by providing a minimum of 14 calendar days written notice prior to the
          next billing cycle.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "7. Governing Law & Dispute Resolution",
    icon: Scale,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base">
          These Terms of Service and any separate commercial agreements shall be
          governed by and construed in accordance with the laws of the
          People&apos;s Republic of Bangladesh. Any legal disputes arising under
          these terms shall be subject to the exclusive jurisdiction of the
          competent courts in Dhaka, Bangladesh.
        </p>
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <Breadcrumb
        firstPart="Legal & Compliance"
        lastWord="Terms of Service"
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
                    <FileText className="h-3.5 w-3.5" />
                    Commercial Agreement
                  </span>
                  <h1 className="mt-3 font-heading text-3xl font-bold uppercase tracking-wide sm:text-4xl text-foreground">
                    Terms of Service
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
                    Table of Terms
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
                      Need custom commercial terms for corporate or resort
                      projects?
                    </p>
                    <Link
                      href="/contact-us"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      Contact our Project Desk &rarr;
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
