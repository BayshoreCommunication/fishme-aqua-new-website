import Image from "next/image";
import type { ReactNode } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  highlightedWord: string;
  description: string;
  children: ReactNode;
}

const benefits = [
  "Save your favourite aquatic products",
  "Review your cart from any device",
  "Enjoy a faster, simpler checkout",
];

const AuthShell = ({
  eyebrow,
  title,
  highlightedWord,
  description,
  children,
}: AuthShellProps) => (
  <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-[#f2f7f5] px-4 py-10 text-foreground dark:bg-[#06100e] sm:px-6 sm:py-14 lg:py-20">
    <Image
      src="/assets/home/hero-bg.svg"
      alt=""
      fill
      priority
      sizes="100vw"
      className="-z-20 object-cover opacity-[0.08] dark:opacity-20"
    />
    <div className="absolute inset-0 -z-10 bg-linear-to-br from-white/95 via-white/85 to-[#dcece7]/85 dark:from-[#06100e]/95 dark:via-[#06100e]/90 dark:to-[#0b2a24]/85" />
    <div className="absolute -left-28 top-20 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
    <div className="absolute -right-32 bottom-10 -z-10 h-80 w-80 rounded-full bg-teal-300/15 blur-3xl" />

    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_28px_90px_rgba(0,55,45,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1412]/90">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden min-h-[660px] overflow-hidden bg-[#041714] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">
          <Image
            src="/assets/home/hero-bg.svg"
            alt=""
            fill
            sizes="(max-width: 1023px) 0px, 44vw"
            className="object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#02100e] via-[#03231d]/60 to-black/20" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-teal-300" />
              Secure customer account
            </span>
          </div>

          <div className="relative z-10 max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-teal-300">
              Fish Me Aqua
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold leading-tight xl:text-5xl">
              Your aquatic world, thoughtfully connected.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              Keep the products you love close and make every step of your
              aquarium journey feel effortless.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 text-sm text-white/85"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-teal-300"
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex min-h-[600px] items-center py-10 pl-5 pr-16 sm:px-10 sm:py-14 lg:px-14 xl:px-20">
          <div className="mx-auto w-full max-w-lg">
            <div className="mb-8 sm:mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary dark:text-teal-400">
                {eyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">
                {title} <span className="title-gradient">{highlightedWord}</span>
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-foreground/60">
                {description}
              </p>
            </div>

            {children}

            <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-foreground/45">
              <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
              Your information is protected and securely handled.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AuthShell;
