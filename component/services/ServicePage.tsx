import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Fish Me Aqua's tailored aquatic design, installation, and maintenance services.",
};

export default function ServicePage() {
  return (
    <section className="bg-background text-foreground py-20 sm:py-28 transition-colors duration-300">
      <div className="container">
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground sm:text-4xl mb-3">
            Our Services
          </h2>
          <p className="text-xs sm:text-sm text-foreground/60 font-light leading-relaxed">
            Comprehensive aquatic design solutions tailored to your vision and
            space
          </p>
        </div>

        {/* Services Grid (4 Columns Layout like Image) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.slug}
                className="group relative flex flex-col justify-between rounded-[2rem] border border-foreground/10 dark:border-white/10 bg-white dark:bg-[#18181b] p-7 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-[#006E5C]/50 hover:shadow-2xl"
              >
                <div>
                  {/* Top Icon Box */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#006E5C]/10 text-[#006E5C] dark:bg-teal-500/10 dark:text-teal-400 border border-[#006E5C]/20 shadow-sm">
                    <Icon size={26} />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-light">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Explore Button */}
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-8 inline-flex items-center justify-between w-full px-5 py-2.5 rounded-full bg-[#006E5C] hover:bg-[#00584a] text-white text-xs sm:text-sm font-medium shadow-md transition-all duration-300 group-hover:scale-[1.02]"
                >
                  <span>Explore</span>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={14} />
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
