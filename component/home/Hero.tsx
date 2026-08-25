import CountUp from "@/component/motion/CountUp";
import Reveal from "@/component/motion/Reveal";
import Button from "@/component/shared/Button";
import Image from "next/image";

const stats = [
  { value: 100, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Maintenance Clients" },
  { value: 6, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

const ArrowUpRightIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7M17 7H8M17 7V16" />
  </svg>
);

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.48 1.32 5L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.005c5.46 0 9.9-4.45 9.9-9.91C21.97 6.45 17.52 2 12.04 2Zm5.8 14.17c-.24.68-1.4 1.33-1.93 1.4-.5.07-1.12.1-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.9 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.38-.24.64-.14.27.1 1.68.79 1.97.94.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
  </svg>
);

const StatCard = ({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) => (
  <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-md sm:aspect-auto sm:h-44">
    <CountUp
      end={value}
      suffix={suffix}
      className="font-heading text-4xl font-bold text-white sm:text-5xl"
    />
    <span className="text-sm font-medium text-white/85">{label}</span>
  </div>
);

const Hero = () => {
  return (
    <section className="relative isolate -mt-20 flex min-h-[85vh] w-full items-start overflow-hidden bg-black pt-20 sm:items-center">
      <Image
        src="/assets/home/hero-bg.svg"
        alt="Luxury aquarium and aquascape installation"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/25" />

      <div className="container relative z-10 grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:gap-8">
        <div className="flex flex-col items-start text-left gap-6">
          <Reveal direction="up" delay={0}>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl text-left">
              Transform Your{" "}
              <span className="sm:whitespace-nowrap">
                Space with <span className="title-gradient">Living Art</span>
              </span>
            </h1>
          </Reveal>

          <Reveal direction="up" delay={150}>
            <p className="max-w-lg text-base leading-relaxed text-white/75 sm:text-lg text-left">
              Premium aquatic design solutions for luxury homes, corporate
              offices, and commercial spaces. From custom aquariums to
              breathtaking aquascapes.
            </p>
          </Reveal>

          <Reveal direction="up" delay={300} className="w-full sm:w-auto">
            <div className="flex w-full flex-row items-start justify-start gap-2 sm:w-auto sm:gap-4">
              <Button
                href="/contact-us"
                variant="primary"
                className="whitespace-nowrap px-3! py-2! text-xs sm:px-6! sm:py-3! sm:text-sm"
              >
                Book Free Consultation
                <span className="ml-2 hidden h-5 w-5 items-center justify-center rounded-full bg-white/20 sm:inline-flex">
                  <ArrowUpRightIcon />
                </span>
              </Button>

              <Button
                href="/projects"
                variant="outline"
                className="border-white! whitespace-nowrap text-white! px-3! py-2! text-xs hover:bg-white! hover:text-black! sm:px-6! sm:py-3! sm:text-sm"
              >
                View Our Projects
                <span className="ml-2 hidden h-5 w-5 items-center justify-center rounded-full bg-white/10 sm:inline-flex">
                  <ArrowUpRightIcon />
                </span>
              </Button>
            </div>
          </Reveal>

          <Reveal direction="up" delay={450} className="w-full sm:w-auto">
            <p className="flex w-full flex-wrap items-center justify-start gap-3 text-white/70 sm:w-auto">
              <span className="italic">Connect Our Community -</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                <WhatsAppIcon className="h-4 w-4" />
              </span>
              <span className="font-semibold text-white">+880 123456789</span>
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:max-w-md lg:justify-self-center">
          <div className="flex flex-col gap-4 sm:gap-6">
            <StatCard {...stats[0]} />
            <StatCard {...stats[2]} />
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 sm:mt-10">
            <StatCard {...stats[1]} />
            <StatCard {...stats[3]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
