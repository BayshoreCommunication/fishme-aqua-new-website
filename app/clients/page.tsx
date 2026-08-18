import type { Metadata } from "next";
import Breadcrumb from "@/component/shared/Breadcrumb";
import ClientsGrid from "@/component/clients/ClientsGrid";
import WhatOurClientsSay from "@/component/home/WhatOurClientsSay";

export const metadata: Metadata = {
  title: "Our Clients",
  description:
    "Meet the homeowners, resorts, and organizations trusted by Fish Me Aqua.",
};

export default function ClientsPage() {
  return (
    <>
      <Breadcrumb
        firstPart="Trusted by Leading"
        lastWord="Brands & Homeowners"
        backgroundImage="/assets/home/services-section-background.png"
      />
      <section className=" py-16 sm:py-20 bg-foreground/3 dark:bg-white/2">
        <div className="container ">
          <div className="mx-auto mb-7 max-w-md text-center">
            <h1 className="font-heading text-3xl font-bold text-black sm:text-4xl">
              Our Valued Clients
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-black/55">
              Proudly serving homeowners, businesses, resorts, and organizations
              with custom aquatic solutions and professional expertise.
            </p>
          </div>
          <ClientsGrid />
        </div>
      </section>
      <WhatOurClientsSay />
    </>
  );
}
