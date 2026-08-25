"use client";

import { signoutAction } from "@/app/actions/auth";
import Button from "@/component/shared/Button";
import ThemeToggle from "@/component/shared/ThemeToggle";
import {
  Heart,
  LogIn,
  LogOut,
  ShoppingBag,
  User,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useSyncExternalStore } from "react";

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
    children: [
      { label: "Custom Aquariums", href: "/services/custom-aquariums" },
      { label: "Aquascaping", href: "/services/aquascaping" },
      { label: "Maintenance", href: "/services/maintenance" },
      { label: "Pond Design", href: "/services/pond-design" },
    ],
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
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
  >
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

const CloseIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const subscribeToScroll = (callback: () => void) => {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
};

const getScrolledSnapshot = () => window.scrollY > 20;

const getScrolledServerSnapshot = () => false;

const Navbar = ({ user = null }: NavbarProps) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrolledSnapshot,
    getScrolledServerSnapshot,
  );
  const hasSolidBackground = scrolled || authRoutes.has(pathname);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        hasSolidBackground
          ? "border-b border-white/10 bg-black backdrop-blur-md shadow-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center">
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
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="group relative">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 font-sans text-sm font-medium text-white/90 transition-colors hover:text-primary"
                >
                  {link.label}
                  <ChevronDownIcon className="transition-transform duration-200 group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-0 top-full z-10 w-56 translate-y-1 rounded-2xl border border-black/5 bg-white p-2 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block rounded-xl px-3 py-2 font-sans text-sm text-black/70 transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : link.label === "Shop" ? (
              <Link
                key={link.label}
                href={link.href}
                className="whitespace-nowrap rounded-full border border-white/30 px-4 py-2 font-sans text-sm font-medium text-white/90 transition-colors hover:border-primary hover:text-primary"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="whitespace-nowrap rounded-full px-3 py-2 font-sans text-sm font-medium text-white/90 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button
            href="/contact-us"
            variant="primary"
            className="!px-5 !py-2.5 text-sm"
          >
            Book Free Consultation
            <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
              <ArrowUpRightIcon />
            </span>
          </Button>
          <CustomerMenu user={user} />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <CustomerMenu user={user} compact />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex items-center justify-center rounded-full p-2 text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-md lg:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 font-sans text-sm font-medium text-white/90"
                  >
                    {link.label}
                    <ChevronDownIcon
                      className={`transition-transform duration-200 ${
                        mobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-lg px-3 py-2 font-sans text-sm text-white/70 hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg px-3 py-2 font-sans text-sm font-semibold text-primary"
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
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 font-sans text-sm font-medium text-white/90 hover:text-primary"
                >
                  {link.label}
                </Link>
              ),
            )}

            <Button
              href="/contact-us"
              variant="primary"
              className="mt-2 w-full !py-3 text-sm"
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
        aria-label="Sign in"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 text-xs font-bold text-white transition hover:border-primary hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <LogIn aria-hidden="true" className="h-4 w-4" />
        <span className={compact ? "sr-only" : "hidden 2xl:inline"}>
          Sign in
        </span>
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
        className="flex h-10 w-10 cursor-pointer list-none items-center justify-center overflow-hidden rounded-full border border-white/30 bg-primary text-sm font-extrabold text-white shadow-md transition hover:border-white hover:bg-[#008c75] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden"
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
          onClick={closeMenu}
          className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-black/70 transition hover:bg-primary/10 hover:text-primary dark:text-white/70"
        >
          <User aria-hidden="true" className="h-4 w-4" />
          Profile
        </Link>
        <Link
          href="/cart"
          onClick={closeMenu}
          className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-black/70 transition hover:bg-primary/10 hover:text-primary dark:text-white/70"
        >
          <ShoppingBag aria-hidden="true" className="h-4 w-4" />
          Shopping cart
        </Link>
        <Link
          href="/wishlist"
          onClick={closeMenu}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-black/70 transition hover:bg-primary/10 hover:text-primary dark:text-white/70"
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
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-400/10"
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
