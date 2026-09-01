import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play, Check } from "lucide-react";
import { notFound } from "next/navigation";
import Breadcrumb from "@/component/shared/Breadcrumb";
import { getService, services } from "@/data/services";
import Button from "@/component/shared/Button";

type ServiceDetailPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getService(resolvedParams.slug);
  return service
    ? { title: service.title, description: service.description }
    : {};
}

// Sub-features specific to Aquarium Solutions
const aquariumSubFeatures = [
  {
    title: "Residential Aquariums",
    description:
      "Enhance your home with stunning aquatic displays designed to complement your interior style while creating a relaxing and captivating atmosphere.",
    image: "/assets/services/residential.png",
  },
  {
    title: "Commercial Aquariums",
    description:
      "Create a memorable experience for clients, guests, and visitors with professionally designed aquariums for offices, hotels, restaurants, hospitals, and commercial spaces.",
    image: "/assets/services/commercial.png",
  },
  {
    title: "Wall Aquariums",
    description:
      "Space-saving built-in aquarium systems that seamlessly integrate into walls, adding elegance and a modern architectural feature to any environment.",
    image: "/assets/services/wall.png",
  },
  {
    title: "Room Divider Aquariums",
    description:
      "Functional living displays that beautifully separate spaces while maintaining openness, visibility, and visual impact.",
    image: "/assets/services/divider.png",
  },
  {
    title: "Luxury Custom Aquariums",
    description:
      "Fully bespoke aquarium solutions crafted to the highest standards, featuring premium materials, advanced filtration systems, and unique designs tailored to your lifestyle or brand.",
    image: "/assets/services/luxury.png",
  },
];

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const resolvedParams = await params;
  const service = getService(resolvedParams.slug);
  if (!service) notFound();

  return (
    <>
      <Breadcrumb
        title={service.title}
        backgroundImage="/assets/home/services-section-background.png"
      />

      <section className="bg-background text-foreground py-20 sm:py-28 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT COLUMN: Creative Animated Sidebar Tabs */}
            <aside className="lg:col-span-3 lg:sticky lg:top-28 p-2 rounded-2xl bg-foreground/[0.02] dark:bg-white/[0.03] backdrop-blur-xl border border-foreground/10 dark:border-white/10 transition-all duration-300">
              <div className="px-4 py-3 border-b border-foreground/10 dark:border-white/10 mb-2">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#006E5C] dark:text-teal-400">
                  Service Categories
                </h3>
              </div>

              <nav className="flex flex-col gap-1.5 p-1">
                {services.map((item, idx) => {
                  const isActive = item.slug === resolvedParams.slug;
                  return (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}`}
                      style={{ transitionDelay: `${idx * 40}ms` }}
                      className={`group relative px-5 py-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-between overflow-hidden ${
                        isActive
                          ? "bg-[#006E5C] text-white font-semibold scale-[1.02]"
                          : "text-foreground/75 hover:bg-foreground/5 dark:hover:bg-white/10 hover:text-foreground hover:translate-x-1"
                      }`}
                    >
                      {!isActive && (
                        <span className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      )}

                      <span className="relative z-10 flex items-center gap-3">
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-white scale-125"
                              : "bg-foreground/30 group-hover:bg-[#006E5C] group-hover:scale-110"
                          }`}
                        />
                        <span className="tracking-wide">{item.title}</span>
                      </span>

                      {isActive ? (
                        <span className="relative z-10 flex h-5 w-5 items-center justify-center bg-white/20 text-white animate-pulse">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      ) : (
                        <span className="relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#006E5C] dark:text-teal-400">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </aside>

            {/* RIGHT COLUMN: Main Content Area */}
            <div className="lg:col-span-9 space-y-12">
              {/* Header Title & Overview */}
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  {service.title}
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-foreground/70 font-light">
                  {service.overview}
                </p>
              </div>

              {/* Featured Banner with Rounded Play Button */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black border border-foreground/10 dark:border-white/10 group cursor-pointer">
                <Image
                  src={service.image || "/assets/home/about-1.png"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors" />

                {/* Fully Rounded Play Button */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  <Play size={28} className="fill-white ml-1" />
                </div>
              </div>

              {/* Sub-features Grid Section (No padding, no shadow, no border) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                {aquariumSubFeatures.map((feat, index) => (
                  <div
                    key={index}
                    className={`flex flex-col bg-transparent ${
                      index === 4 ? "md:col-span-2" : ""
                    }`}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden mb-4 bg-black/10">
                      <Image
                        src={feat.image}
                        alt={feat.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* What's Included Highlights Section */}
              <div className="   ">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
                  What&apos;s included
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-xs sm:text-sm text-foreground/80 font-light"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[#006E5C]/10 text-[#006E5C] dark:text-teal-400">
                        <Check size={14} />
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Consultation CTA */}
              <div className="text-center pt-8">
                <Button
                  href="/contact-us"
                  variant="primary"
                  className="px-9 py-4 text-sm font-medium bg-[#006E5C] hover:bg-[#00584a] text-white transition-all duration-300 inline-flex items-center gap-2"
                >
                  <span>Book Free Consultation</span>
                  <span className="inline-flex h-5 w-5 items-center justify-center bg-white/20">
                    <ArrowUpRight size={14} />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
