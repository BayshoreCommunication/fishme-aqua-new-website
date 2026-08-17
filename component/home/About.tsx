import Button from "@/component/shared/Button";
import Reveal from "@/component/motion/Reveal";

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

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7-11-7Z" />
  </svg>
);

const MediaCard = ({ gradient }: { gradient: string }) => (
  <div
    className={`group relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br ${gradient}`}
  >
    <div className="absolute inset-0 bg-black/10 transition-colors duration-200 group-hover:bg-black/25" />
    <button
      type="button"
      aria-label="Play video"
      className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md transition-transform duration-200 hover:scale-105"
    >
      <PlayIcon />
    </button>
  </div>
);

const About = () => {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="container">
        <Reveal direction="up" delay={0}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <h2 className="font-heading text-3xl font-bold uppercase tracking-widest text-foreground sm:text-4xl">
              About Us
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/60 sm:text-right sm:text-base">
              FishMeAqua designs and builds premium aquariums, aquascapes,
              ponds, and nature-inspired environments, creating beautiful
              living ecosystems for homes, businesses, and commercial spaces.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Reveal direction="up" delay={150}>
            <MediaCard gradient="from-zinc-700 via-zinc-800 to-black" />
          </Reveal>
          <Reveal direction="up" delay={300}>
            <MediaCard gradient="from-teal-900 via-slate-800 to-black" />
          </Reveal>
        </div>

        <Reveal direction="up" delay={450}>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-foreground/60 sm:text-base">
              At FishMeAqua, we believe nature is more than decoration—it is
              an experience. Our mission is to transform ordinary spaces
              into inspiring environments that promote relaxation, wellness,
              and a deeper connection with the natural world.
            </p>
            <Button
              href="/about"
              variant="primary"
              className="shrink-0 text-sm"
            >
              Explore More About Fish Me Aqua
              <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                <ArrowUpRightIcon />
              </span>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
