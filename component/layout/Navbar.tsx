"use client";

import { signoutAction } from "@/app/actions/auth";
import Button from "@/component/shared/Button";
import ThemeToggle from "@/component/shared/ThemeToggle";
import {
  ChevronRight,
  Heart,
  LogIn,
  LogOut,
  ShoppingBag,
  User,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";

export interface NavbarUser {
  name: string | null;
  email: string | null;
  image: string | null;
}

interface NavbarProps {
  user?: NavbarUser | null;
}

type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    })),
  },
  { label: "Projects", href: "/projects" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Clients", href: "/clients" },
  { label: "Testimonial", href: "/testimonial" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

const authRoutes = new Set(["/sign-in", "/sign-up"]);

const ChevronDownIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

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

const MenuIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

const CloseIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const normalizePath = (path: string) => {
  if (!path) return "/";
  const trimmed = path.split("?")[0].split("#")[0];
  if (trimmed.length > 1 && trimmed.endsWith("/")) {
    return trimmed.slice(0, -1);
  }
  return trimmed || "/";
};

const isRouteActive = (href: string, currentPath: string) => {
  const normCurrent = normalizePath(currentPath);
  const normHref = normalizePath(href);

  if (normHref === "/") {
    return normCurrent === "/";
  }

  return normCurrent === normHref || normCurrent.startsWith(`${normHref}/`);
};

const isParentNavActive = (link: NavLink, currentPath: string) => {
  if (isRouteActive(link.href, currentPath)) return true;
  if (link.children?.some((child) => isRouteActive(child.href, currentPath))) {
    return true;
  }
  return false;
};

const Navbar = ({ user = null }: NavbarProps) => {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);
  const [isPending, startTransition] = useTransition();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sync active path with pathname when route changes
  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  // Handle instant optimistic active state change on click
  const handleNavClick = (href: string) => {
    setActivePath(href);
    startTransition(() => {
      // Transition state for smooth non-blocking feel
    });
  };

  // Optimized lightweight passive scroll listener using requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    if (window.scrollY > 20) setScrolled(true);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasSolidBackground = useMemo(
    () => scrolled || authRoutes.has(pathname),
    [scrolled, pathname],
  );

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-150 ${
        hasSolidBackground
          ? "border-b border-white/10 bg-black backdrop-blur-md shadow-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Top Loading Progress Line for instant feedback */}
      {isPending && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#006E5C] to-teal-300 animate-pulse z-50" />
      )}

      <div className="container flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          prefetch={true}
          onClick={() => handleNavClick("/")}
          className="flex shrink-0 items-center transition-transform active:scale-95"
        >
          <Image
            src="/assets/logo/fishme-logo.svg"
            alt="Fish Me Aqua"
            width={943}
            height={505}
            priority
            className="h-11 w-auto md:h-12 lg:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isParentActive = isParentNavActive(link, activePath);

            return link.children ? (
              <div key={link.label} className="group relative">
                <Link
                  href={link.href}
                  prefetch={true}
                  onClick={() => handleNavClick(link.href)}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1.5 font-sans text-sm transition-all duration-150 active:scale-95 ${
                    isParentActive
                      ? "border border-white text-white font-medium"
                      : "border border-transparent text-white/80 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronDownIcon className="transition-transform duration-150 group-hover:rotate-180" />
                </Link>
                {(() => {
                  const midpoint = Math.ceil(link.children.length / 2);
                  const leftColumn = link.children.slice(0, midpoint);
                  const rightColumn = link.children.slice(midpoint);

                  return (
                    <div className="invisible absolute -left-14 top-full z-50 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                      <div className="w-[580px] rounded-3xl border border-white/10 bg-[#121615]/95 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl">
                        <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-x-6">
                          {/* Left Column (5 items) */}
                          <div className="flex flex-col gap-3">
                            {leftColumn.map((child) => {
                              const isChildActive = isRouteActive(
                                child.href,
                                activePath,
                              );
                              return (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  prefetch={true}
                                  onClick={() => handleNavClick(child.href)}
                                  className={`group/item flex items-center justify-between rounded-xl px-2 py-1.5 font-sans text-sm tracking-wide transition-colors ${
                                    isChildActive
                                      ? "font-semibold text-primary"
                                      : "font-medium text-white/90 hover:text-primary"
                                  }`}
                                >
                                  <span>{child.label}</span>
                                  <ChevronRight
                                    className={`h-4 w-4 shrink-0 transition-all duration-150 group-hover/item:translate-x-0.5 ${
                                      isChildActive
                                        ? "text-primary"
                                        : "text-white/70 group-hover/item:text-primary"
                                    }`}
                                  />
                                </Link>
                              );
                            })}
                          </div>

                          {/* Center Vertical Divider */}
                          <div className="my-0.5 w-px bg-white/20 self-stretch" />

                          {/* Right Column (4 items) */}
                          <div className="flex flex-col gap-3">
                            {rightColumn.map((child) => {
                              const isChildActive = isRouteActive(
                                child.href,
                                activePath,
                              );
                              return (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  prefetch={true}
                                  onClick={() => handleNavClick(child.href)}
                                  className={`group/item flex items-center justify-between rounded-xl px-2 py-1.5 font-sans text-sm tracking-wide transition-colors ${
                                    isChildActive
                                      ? "font-semibold text-primary"
                                      : "font-medium text-white/90 hover:text-primary"
                                  }`}
                                >
                                  <span>{child.label}</span>
                                  <ChevronRight
                                    className={`h-4 w-4 shrink-0 transition-all duration-150 group-hover/item:translate-x-0.5 ${
                                      isChildActive
                                        ? "text-primary"
                                        : "text-white/70 group-hover/item:text-primary"
                                    }`}
                                  />
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                prefetch={true}
                onClick={() => handleNavClick(link.href)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 font-sans text-sm transition-all duration-150 active:scale-95 ${
                  isParentActive
                    ? "border border-white text-white font-medium"
                    : "border border-transparent text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button
            href="/contact-us"
            variant="primary"
            className="!px-5 !py-2.5 text-sm active:scale-95"
          >
            Book Free Consultation
            <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
              <ArrowUpRightIcon />
            </span>
          </Button>
          <CustomerMenu user={user} />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 lg:hidden">
          <CustomerMenu user={user} compact />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex items-center justify-center rounded-full p-2 text-white active:scale-90"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white transition-all hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-md lg:hidden max-h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const isParentActive = isParentNavActive(link, activePath);

              return link.children ? (
                <div key={link.label}>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 font-sans text-sm transition-colors active:scale-98 ${
                      isParentActive
                        ? "border border-white/60 bg-white/10 font-medium text-white"
                        : "border border-transparent font-medium text-white/90"
                    }`}
                  >
                    {link.label}
                    <ChevronDownIcon
                      className={`transition-transform duration-150 ${
                        mobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                      {link.children.map((child) => {
                        const isChildActive = isRouteActive(
                          child.href,
                          activePath,
                        );
                        return (
                          <Link
                            key={child.label}
                            href={child.href}
                            prefetch={true}
                            onClick={() => {
                              handleNavClick(child.href);
                              setMobileOpen(false);
                            }}
                            className={`flex items-center justify-between rounded-lg px-3 py-2 font-sans text-sm transition-colors active:scale-98 ${
                              isChildActive
                                ? "bg-white/10 font-semibold text-primary"
                                : "text-white/70 hover:text-primary"
                            }`}
                          >
                            <span>{child.label}</span>
                            <ChevronRight
                              className={`h-3.5 w-3.5 ${
                                isChildActive ? "text-primary" : "text-white/40"
                              }`}
                            />
                          </Link>
                        );
                      })}
                      <Link
                        href={link.href}
                        prefetch={true}
                        onClick={() => {
                          handleNavClick(link.href);
                          setMobileOpen(false);
                        }}
                        className={`rounded-lg px-3 py-2 font-sans text-sm font-semibold transition-colors ${
                          activePath === link.href
                            ? "bg-white/10 text-primary"
                            : "text-primary hover:underline"
                        }`}
                      >
                        View all services
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  prefetch={true}
                  onClick={() => {
                    handleNavClick(link.href);
                    setMobileOpen(false);
                  }}
                  className={`rounded-xl px-3.5 py-2.5 font-sans text-sm transition-colors active:scale-98 ${
                    isParentActive
                      ? "border border-white/60 bg-white/10 font-medium text-white"
                      : "border border-transparent font-medium text-white/90 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Button
              href="/contact-us"
              variant="primary"
              className="mt-2 w-full !py-3 text-sm active:scale-98"
            >
              Book Free Consultation
              <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                <ArrowUpRightIcon />
              </span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

const CustomerMenu = ({
  user,
  compact = false,
}: {
  user: NavbarUser | null;
  compact?: boolean;
}) => {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => menuRef.current?.removeAttribute("open");

  if (!user) {
    return (
      <Link
        href="/sign-in"
        prefetch={true}
        aria-label="Sign in"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 text-xs font-bold text-white transition hover:border-primary hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95"
        className={`inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white transition-all hover:border-primary hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 ${
          compact ? "w-10" : "gap-2 px-3.5 text-xs font-bold"
        }`}
      >
        <LogIn aria-hidden="true" className="h-4 w-4" />
        <span className={compact ? "sr-only" : "hidden 2xl:inline"}>
          Sign in
        </span>
        <LogIn aria-hidden="true" className="h-[19px] w-[19px]" />
        {!compact && (
          <span className="hidden 2xl:inline">
            Sign in
          </span>
        )}
      </Link>
    );
  }

  const displayName = user.name || user.email || "Customer";
  const initial = displayName.trim().charAt(0).toUpperCase();
  const avatarUrl = user.image?.startsWith("http") ? user.image : null;

  return (
    <details ref={menuRef} className="group relative">
      <summary
        aria-label="Open customer menu"
        className="flex h-10 w-10 cursor-pointer list-none items-center justify-center overflow-hidden rounded-full border border-white/30 bg-primary text-sm font-extrabold text-white shadow-md transition hover:border-white hover:bg-[#008c75] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 [&::-webkit-details-marker]:hidden"
      >
        {avatarUrl ? (
          <span
            aria-hidden="true"
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url("${avatarUrl}")` }}
          />
        ) : initial ? (
          <span aria-hidden="true">{initial}</span>
        ) : (
          <UserRound aria-hidden="true" className="h-5 w-5" />
        )}
      </summary>

      <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-64 overflow-hidden rounded-2xl border border-black/10 bg-white p-2 text-black shadow-[0_20px_60px_rgba(0,0,0,0.22)] dark:border-white/10 dark:bg-[#101917] dark:text-white">
        <div className="border-b border-black/[0.07] px-3 py-3 dark:border-white/10">
          <p className="truncate text-sm font-bold">{displayName}</p>
          {user.email && user.email !== displayName && (
            <p className="mt-1 truncate text-xs text-black/50 dark:text-white/50">
              {user.email}
            </p>
          )}
        </div>
        <Link
          href="/profile"
          prefetch={true}
          onClick={closeMenu}
          className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-black/70 transition hover:bg-primary/10 hover:text-primary dark:text-white/70 active:scale-98"
        >
          <User aria-hidden="true" className="h-4 w-4" />
          Profile
        </Link>
        <Link
          href="/cart"
          prefetch={true}
          onClick={closeMenu}
          className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-black/70 transition hover:bg-primary/10 hover:text-primary dark:text-white/70 active:scale-98"
        >
          <ShoppingBag aria-hidden="true" className="h-4 w-4" />
          Shopping cart
        </Link>
        <Link
          href="/wishlist"
          prefetch={true}
          onClick={closeMenu}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-black/70 transition hover:bg-primary/10 hover:text-primary dark:text-white/70 active:scale-98"
        >
          <Heart aria-hidden="true" className="h-4 w-4" />
          Wishlist
        </Link>
        <form
          action={signoutAction}
          className="mt-1 border-t border-black/[0.07] pt-1 dark:border-white/10"
        >
          <button
            type="submit"
            onClick={closeMenu}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-400/10 cursor-pointer active:scale-98"
          >
            <LogOut aria-hidden="true" className="h-4 w-4" />
            Sign out
          </button>
        </form>
      </div>
    </details>
  );
};

export default Navbar;
