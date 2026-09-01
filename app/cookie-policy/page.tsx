import type { Metadata } from "next";
import Breadcrumb from "@/component/shared/Breadcrumb";
import Reveal from "@/component/motion/Reveal";
import Link from "next/link";
import {
  Cookie,
  Sliders,
  Settings,
  ShieldCheck,
  Activity,
  Clock,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Understand how Fish Me Aqua uses browser cookies, localStorage, session tokens, and tracking technologies to enhance your aquarium shopping and browsing experience.",
};

const sections = [
  {
    id: "what-are-cookies",
    title: "1. What Are Cookies & Local Storage",
    icon: Cookie,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          mobile device by websites you visit. Modern web applications also use
          browser technologies like{" "}
          <code className="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary font-mono font-semibold">
            localStorage
          </code>{" "}
          and{" "}
          <code className="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary font-mono font-semibold">
            sessionStorage
          </code>{" "}
          to remember your preferences.
        </p>
        <p className="text-foreground/80 leading-relaxed text-base">
          Fish Me Aqua uses cookies and local storage tokens to ensure core your
          theme mode (Dark vs Light), and provide real-time chat support.
        </p>
      </>
    ),
  },
  {
    id: "cookies-we-use",
    title: "2. Types of Cookies We Use",
    icon: Sliders,
    content: (
      <>
        <div className="space-y-4">
          <div className="rounded-2xl border border-foreground/10 dark:border-white/10 bg-foreground/[0.01] dark:bg-white/[0.01] p-4 sm:p-5">
            <h4 className="font-bold text-sm sm:text-base text-foreground mb-1.5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Essential &amp; Authentication Cookies (Strictly Necessary)
            </h4>
            <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
              These cookies are vital for logging into your customer account,
              maintaining secure sessions (
              <code className="font-mono text-xs">
                fishme-website.session-token
              </code>
              ), and processing checkout payments. The website cannot function
              properly without these.
            </p>
          </div>

          <div className="rounded-2xl border border-foreground/10 dark:border-white/10 bg-foreground/[0.01] dark:bg-white/[0.01] p-4 sm:p-5">
            <h4 className="font-bold text-sm sm:text-base text-foreground mb-1.5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              Functional &amp; Shopping Store Preferences
            </h4>
            <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
              Used to remember your UI display theme (
              <code className="font-mono text-xs">theme: dark/light</code>) and
              persist your shopping bag and wishlist items (
              <code className="font-mono text-xs">fishme-aqua-shop-v1</code>)
              across page reloads so you don’t lose your selected aquatic
              supplies.
            </p>
          </div>

          <div className="rounded-2xl border border-foreground/10 dark:border-white/10 bg-foreground/[0.01] dark:bg-white/[0.01] p-4 sm:p-5">
            <h4 className="font-bold text-sm sm:text-base text-foreground mb-1.5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Real-Time Support &amp; Visitor Communication
            </h4>
            <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
              Enables our live chat floating widget (
              <code className="font-mono text-xs">fishme-chat-visitor-id</code>)
              so our aquarists can answer your questions in real time without
              requiring an upfront login.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "managing-cookies",
    title: "3. How You Can Manage or Disable Cookies",
    icon: Settings,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          Most web browsers automatically accept cookies, but you can modify
          your browser settings to decline or delete cookies at any time:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-base text-foreground/80 mb-4">
          <li>
            <strong>Google Chrome:</strong> Settings &rarr; Privacy and security
            &rarr; Cookies and other site data.
          </li>
          <li>
            <strong>Mozilla Firefox:</strong> Settings &rarr; Privacy &amp;
            Security &rarr; Cookies and Site Data.
          </li>
          <li>
            <strong>Apple Safari:</strong> Preferences &rarr; Privacy &rarr;
            Manage Website Data.
          </li>
        </ul>
        <p className="text-foreground/80 leading-relaxed text-base italic">
          Please note: Disabling strictly necessary cookies may prevent you from
          adding products to cart, checking out, or accessing your profile.
        </p>
      </>
    ),
  },
  {
    id: "policy-updates",
    title: "4. Updates to This Cookie Policy",
    icon: Activity,
    content: (
      <>
        <p className="text-foreground/80 leading-relaxed text-base mb-4">
          We may update this Cookie Policy from time to time to reflect changes
          in browser technologies, legal requirements, or our website features.
        </p>
        <p className="text-foreground/80 leading-relaxed text-base">
          Any updates will be posted on this page with a revised &quot;Last
          Updated&quot; timestamp at the top of the policy.
        </p>
      </>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <Breadcrumb
        firstPart="Legal & Compliance"
        lastWord="Cookie Policy"
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
                    <Cookie className="h-3.5 w-3.5" />
                    Tracking &amp; Cookies
                  </span>
                  <h1 className="mt-3 font-heading text-3xl font-bold uppercase tracking-wide sm:text-4xl text-foreground">
                    Cookie Policy
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
                    Quick Navigation
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
                      Questions regarding browser storage or cookie settings?
                    </p>
                    <Link
                      href="/contact-us"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      Contact our Technical Support &rarr;
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
