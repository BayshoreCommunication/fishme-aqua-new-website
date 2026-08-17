import Image from "next/image";
import Link from "next/link";
import Button from "@/component/shared/Button";

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.48 1.32 5L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.005c5.46 0 9.9-4.45 9.9-9.91C21.97 6.45 17.52 2 12.04 2Zm5.8 14.17c-.24.68-1.4 1.33-1.93 1.4-.5.07-1.12.1-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.9 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.38-.24.64-.14.27.1 1.68.79 1.97.94.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8Z" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6M9 13h6M9 17h6" />
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92Z" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.57 14.24 3.57c-2.4 0-4.04 1.47-4.04 4.16v2.16H7.5v3.1h2.7V21Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.94 8.5H3.56V20.4h3.38ZM5.25 3.6a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.4 20.4h-3.37v-6.1c0-1.46-.03-3.33-2.03-3.33-2.04 0-2.35 1.6-2.35 3.22v6.21H9.28V8.5h3.24v1.63h.05c.45-.86 1.56-1.77 3.2-1.77 3.43 0 4.06 2.25 4.06 5.18Z" />
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.1-9.3L1 2h7.2l5 6.6Zm-1.2 18h1.7L6.4 3.9H4.6Z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12s0-3.4-.43-5A2.78 2.78 0 0 0 19.6 5c-2-.5-9.6-.5-9.6-.5S2.4 4.5.4 5A2.78 2.78 0 0 0 .43 7C0 8.6 0 12 0 12s0 3.4.43 5A2.78 2.78 0 0 0 2.4 19c2 .5 9.6.5 9.6.5s7.6 0 9.6-.5a2.78 2.78 0 0 0 1.97-2c.43-1.6.43-5 .43-5ZM9.6 15.5v-7l6.4 3.5Z" />
  </svg>
);

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "YouTube", href: "https://youtube.com", icon: YouTubeIcon },
];

const serviceLinks = [
  { label: "Custom Aquariums", href: "/services/custom-aquariums" },
  { label: "Aquascaping", href: "/services/aquascaping" },
  { label: "Pond Design", href: "/services/pond-design" },
  { label: "Fountains", href: "/services/fountains" },
  { label: "Terrariums", href: "/services/terrariums" },
  { label: "Maintenance", href: "/services/maintenance" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonial" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];

const legalLinks = [
  { label: "Disclaimers", href: "/disclaimers" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

const stats = [
  { icon: ClockIcon, title: "Response Time", value: "Under 24 Hours" },
  { icon: StarIcon, title: "Free Consultation", value: "Always included" },
  { icon: DocumentIcon, title: "Custom Quote", value: "No Obligation" },
];

const Footer = () => {
  return (
    <footer className="bg-[#0b0b0b] pb-10 pt-20 sm:pt-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src="/assets/home/hero-bg.svg"
            alt="Aquascape underwater plants"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#001824]/90 via-[#013145]/75 to-black/70" />

          <div className="relative z-10 flex flex-col gap-6 px-6 py-12 sm:px-12 sm:py-16 lg:w-[30%]">
            <h2 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
              Ready to{" "}
              <span className="bg-gradient-to-r from-sky-300 to-primary bg-clip-text text-transparent">
                Transform
              </span>{" "}
              Your Space?
            </h2>
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">
              Let&apos;s create something extraordinary together. Book a
              free consultation with our aquatic design experts today.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button href="/contact-us" variant="primary" className="text-sm">
                Book Free Consultation
                <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <CalendarIcon />
                </span>
              </Button>
              <Button
                href="https://wa.me/880123456789"
                variant="outline"
                className="!border-white/40 !text-white text-sm hover:!bg-white hover:!text-black"
              >
                WhatsApp Us
                <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                  <WhatsAppIcon />
                </span>
              </Button>
            </div>
          </div>

          <div className="relative z-10 mx-6 mb-6 grid grid-cols-1 gap-6 rounded-2xl border border-white/15 bg-white/10 px-6 py-5 backdrop-blur-md sm:mx-12 sm:mb-8 sm:grid-cols-3 sm:divide-x sm:divide-white/15">
            {stats.map(({ icon: Icon, title, value }) => (
              <div key={title} className="flex items-center gap-3 sm:pl-6 sm:first:pl-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary">
                  <Icon />
                </span>
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="text-sm text-white/60">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1fr]">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:pr-10">
            <Image
              src="/assets/logo/fishme-logo.svg"
              alt="Fish Me Aqua"
              width={943}
              height={505}
              className="h-16 w-auto"
            />
            <p className="mt-4 max-w-sm text-base leading-relaxed text-white/60">
              Transform your space with premium aquatic design. Creating
              living art through custom aquariums, aquascaping, and water
              features.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-primary"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="text-center sm:text-left lg:border-l lg:border-white/10 lg:pl-8">
            <h3 className="text-base font-semibold uppercase tracking-widest text-white">
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-white/60 transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left lg:border-l lg:border-white/10 lg:pl-8">
            <h3 className="text-base font-semibold uppercase tracking-widest text-white">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-white/60 transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left lg:border-l lg:border-white/10 lg:pl-8">
            <h3 className="text-base font-semibold uppercase tracking-widest text-white">
              Legal
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-white/60 transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left lg:border-l lg:border-white/10 lg:pl-8">
            <h3 className="text-base font-semibold uppercase tracking-widest text-white">
              Address
            </h3>
            <ul className="mt-4 flex flex-col items-center gap-5 sm:items-stretch sm:gap-4">
              <li className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:gap-3 sm:text-left">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary sm:h-8 sm:w-8">
                  <LocationIcon />
                </span>
                <div>
                  <p className="text-sm uppercase tracking-wide text-white/40">
                    Location
                  </p>
                  <p className="text-base text-white/70">
                    123 Ocean Drive, Aqua City, AC 12345
                  </p>
                </div>
              </li>
              <li className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:gap-3 sm:text-left">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary sm:h-8 sm:w-8">
                  <PhoneIcon />
                </span>
                <div>
                  <p className="text-sm uppercase tracking-wide text-white/40">
                    Contact
                  </p>
                  <p className="text-base text-white/70">+1 (555) 123-4567</p>
                </div>
              </li>
              <li className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:gap-3 sm:text-left">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary sm:h-8 sm:w-8">
                  <MailIcon />
                </span>
                <div>
                  <p className="text-sm uppercase tracking-wide text-white/40">
                    Email
                  </p>
                  <p className="text-base text-white/70">
                    hello@fishmeaqua.com
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>{new Date().getFullYear()} Fish Me Aqua © All Rights Reserved</p>
          <p>
            Design &amp; Development{" "}
            <span className="font-medium text-primary">
              Bayshore Communication
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
