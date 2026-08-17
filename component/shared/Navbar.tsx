"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";

/* ─── Navbar Props ───────────────────────────────────────── */

/* ─── Multi-page Nav Items ──────────────────────────────── */

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Aquatic Design", href: "/services/aquatic-design" },
      { label: "Custom Aquariums", href: "/services/custom-aquariums" },
      { label: "Aquascaping", href: "/services/aquascaping" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Clients", href: "/clients" },
  { label: "Testimonial", href: "/testimonials" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

/* ─── Desktop Dropdown ──────────────────────────────────── */

function Dropdown({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isChildActive = item.children?.some((child) => child.href === pathname);
  const isActive = pathname === item.href || isChildActive;

  return (
    <div className="relative group">
      <Link
        href={item.href}
        className={`flex items-center gap-1 px-3.5 py-1.5 text-sm font-medium border border-transparent rounded-full transition-all duration-200 ${
          isActive
            ? "border-white/30 bg-white/10 text-white"
            : "text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10"
        }`}
      >
        {item.label}
        <ChevronDown
          size={14}
          className="transition-transform duration-300 group-hover:rotate-180 text-gray-400 group-hover:text-white"
        />
      </Link>

      {/* Dropdown Panel */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-slate-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-300 opacity-0 scale-95 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto z-50">
        <div className="py-2">
          {item.children?.map((child) => {
            const isSelected = pathname === child.href;
            return (
              <Link
                key={child.href}
                href={child.href}
                className={`block px-4 py-2 text-xs font-medium transition-colors ${
                  isSelected
                    ? "text-teal-400 bg-white/10 font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Menu ───────────────────────────────────────── */

function MobileMenu({
  isOpen,
  onClose,
  isDarkMode,
  setIsDarkMode,
}: {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [onClose, pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-slate-950/95 border-l border-white/10 text-white z-50 shadow-2xl transition-transform duration-300 lg:hidden flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Link
            href="/"
            onClick={onClose}
            className="flex-shrink-0 transition-none transform-none"
          >
            <Image
              src="/images/main-logo.png"
              alt="fishme logo"
              width={158}
              height={84}
              quality={100}
              className="h-8 w-auto object-contain transition-none transform-none"
              priority
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            if (item.children) {
              const isExpanded = openDropdown === item.label;
              return (
                <div key={item.label}>
                  <div
                    className={`flex items-center justify-between w-full border border-transparent rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? "border-white/30 bg-white/10 text-white"
                        : "text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex-1 px-4 py-2 text-left"
                    >
                      {item.label}
                    </Link>
                    <button
                      onClick={() =>
                        setOpenDropdown(isExpanded ? null : item.label)
                      }
                      className="pr-3 py-2"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          isExpanded
                            ? "rotate-180 text-teal-400"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="pl-4 space-y-1 my-1 border-l border-white/10 ml-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className={`block px-3 py-2 rounded-md text-xs transition-colors ${
                            pathname === child.href
                              ? "text-teal-400 font-semibold"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`block px-4 py-2 border border-transparent rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "border-white/30 bg-white/10 text-white"
                    : "text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="px-4 py-5 border-t border-white/10 space-y-3">
          <Link
            href="/contact"
            onClick={onClose}
            className="w-full bg-[#0f766e] hover:bg-[#0d9488] text-white px-5 py-2.5 rounded-full font-medium text-sm flex items-center justify-center gap-1.5 transition-all"
          >
            Book Free Consultation
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-full text-xs text-gray-300"
          >
            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-black">
              {isDarkMode ? (
                <Sun className="w-3 h-3" />
              ) : (
                <Moon className="w-3 h-3" />
              )}
            </div>
            <span>{isDarkMode ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>
    </>
  );
}

/* ─── Main Navbar Component ─────────────────────────────── */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-black/60 backdrop-blur-md border-b border-white/10 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="flex items-center justify-between px-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center transition-none transform-none"
          >
            <Image
              src="/images/main-logo.png"
              alt="Fishme Logo"
              width={158}
              height={84}
              quality={100}
              className="transition-none transform-none"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                return <Dropdown key={item.label} item={item} />;
              }

              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 text-sm font-medium border border-transparent rounded-full transition-all duration-200 ${
                    isActive
                      ? "border-white/30 bg-white/10 text-white"
                      : "text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="bg-[#0f766e] hover:bg-[#0d9488] text-white px-4 py-2 lg:px-5 lg:py-2.5 rounded-full font-medium text-xs lg:text-sm flex items-center gap-1.5 transition-all shadow-lg shadow-teal-950/40"
            >
              Book Free Consultation
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Dark / Light Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-2 bg-black/40 border border-white/20 px-3 py-1.5 rounded-full text-xs hover:bg-black/60 transition-colors"
            >
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-black">
                {isDarkMode ? (
                  <Sun className="w-3 h-3" />
                ) : (
                  <Moon className="w-3 h-3" />
                )}
              </div>
              <span className="text-gray-300">
                {isDarkMode ? "Light" : "Dark"}
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-gray-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    </>
  );
}
