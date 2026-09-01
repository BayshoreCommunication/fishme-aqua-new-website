import type { Metadata } from "next";
import Breadcrumb from "@/component/shared/Breadcrumb";
import Reveal from "@/component/motion/Reveal";
import Link from "next/link";
import {
  Lock,
  Database,
  UserCheck,
  ShieldCheck,
  Share2,
  Mail,
  Clock,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Fish Me Aqua collects, uses, protects, and handles your personal data, order records, and consultation information in Bangladesh.",
};

const sections = [
  {
    id: "information-collection",
    title: "1. Information We Collect",
    icon: Database,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          At Fish Me Aqua (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;),
          we respect your privacy and are committed to safeguarding your
          personal data. We collect information directly from you when you
          interact with our website, request custom aquascaping consultations,
          or purchase aquatic goods:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-foreground/80 mb-4">
          <li>
            <strong className="text-foreground">
              Contact &amp; Account Details:
            </strong>{" "}
            Your full name, email address, mobile phone number, and delivery
            shipping address across Bangladesh divisions.
          </li>
          <li>
            <strong className="text-foreground">
              Project &amp; Consultation Data:
            </strong>{" "}
            Tank dimensions, glass thickness preferences, space photos, water
            source type (RO vs tap water), and hardscape aesthetic requirements.
          </li>
          <li>
            <strong className="text-foreground">
              Billing &amp; Transaction Info:
            </strong>{" "}
            Order transaction identifiers and payment gateway references (bKash,
            Nagad, Bank transfer). Note: We never store your raw credit card CVV
            or mobile banking PINs.
          </li>
          <li>
            <strong className="text-foreground">Technical Log Data:</strong> IP
            address, browser type, device details, and visitor session tokens
            used for real-time customer support chat.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-info",
    title: "2. How We Use Your Personal Data",
    icon: UserCheck,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          We use the information collected for legitimate commercial and
          customer service purposes, including:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-foreground/80 mb-4">
          <li>
            Fulfilling and delivering your aquatic supplies, fertilizers, live
            plants, and custom tanks.
          </li>
          <li>
            Scheduling site visits, maintenance technician dispatches, and free
            aquarium consultations.
          </li>
          <li>
            Providing responsive customer support via our website live chat and
            EmailJS contact channels.
          </li>
          <li>
            Sending automated order receipts, tracking numbers, and critical
            water chemistry maintenance reminders.
          </li>
          <li>
            Preventing fraudulent orders and maintaining account security for
            registered clients.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "3. Third-Party Data Sharing & Protection",
    icon: Share2,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          <strong>
            We never sell, rent, or trade your personal data to third parties
            for marketing purposes.
          </strong>
        </p>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          We only share necessary information with trusted third-party service
          providers who assist us in operating our business under strict
          confidentiality agreements:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-foreground/80">
          <li>
            <strong className="text-foreground">
              Logistics &amp; Courier Partners:
            </strong>{" "}
            Third-party delivery providers within Bangladesh (e.g., RedX,
            Pathao, Steadfast) for physical package delivery.
          </li>
          <li>
            <strong className="text-foreground">Communication Services:</strong>{" "}
            EmailJS and transactional email processors to deliver consultation
            confirmations and quote PDFs.
          </li>
          <li>
            <strong className="text-foreground">Legal Authorities:</strong> If
            required by Bangladeshi law, court order, or governmental
            regulations.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-security",
    title: "4. Data Security & Storage",
    icon: ShieldCheck,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          We implement rigorous administrative, technical, and physical security
          measures to safeguard your information against unauthorized access,
          alteration, or loss:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-foreground/80">
          <li>
            End-to-end SSL/TLS 256-bit encryption across all pages and checkout
            forms.
          </li>
          <li>
            Industry-standard Bcrypt password hashing for customer accounts.
          </li>
          <li>
            Strict access controls limiting customer database access only to
            authorized Fish Me Aqua technicians and administrators.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "5. Your Privacy Rights & Choices",
    icon: Lock,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          You maintain full control over your personal data. At any time, you
          have the right to:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-foreground/80 mb-4">
          <li>
            Access, review, or update your profile details from the Customer
            Account dashboard.
          </li>
          <li>
            Request permanent deletion of your account and historical
            consultation data.
          </li>
          <li>
            Opt-out of promotional newsletters or seasonal maintenance
            reminders.
          </li>
        </ul>
        <p className="text-foreground/80 leading-relaxed text-base">
          To exercise any of these rights, email us directly at{" "}
          <a
            href="mailto:privacy@fishmeaqua.com"
            className="font-semibold text-primary underline"
          >
            privacy@fishmeaqua.com
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumb
        firstPart="Legal & Compliance"
        lastWord="Privacy Policy"
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
                    <Lock className="h-3.5 w-3.5" />
                    Data Protection &amp; Privacy
                  </span>
                  <h1 className="mt-3 font-heading text-3xl font-bold uppercase tracking-wide sm:text-4xl text-foreground">
                    Privacy Policy
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
                    Policy Sections
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
                      Questions regarding data handling or privacy rights?
                    </p>
                    <a
                      href="mailto:privacy@fishmeaqua.com"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      privacy@fishmeaqua.com
                    </a>
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
