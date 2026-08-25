import type { Metadata } from "next";
import { Mulish, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import Footer from "@/component/layout/Footer";
import FloatingActions from "@/component/layout/FloatingActions";
import AuthenticatedNavbar from "@/component/layout/AuthenticatedNavbar";
import Navbar from "@/component/layout/Navbar";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const primarySiteUrl = "https://www.fishmeaqua.com";
const deploymentHost =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL;
const siteUrl = deploymentHost
  ? deploymentHost.startsWith("http")
    ? deploymentHost
    : `https://${deploymentHost}`
  : primarySiteUrl;
const siteName = "Fish Me Aqua";
const siteTitle =
  "Fish Me Aqua | Premium Aquariums, Aquascaping & Fish Supplies";
const siteDescription =
  "Discover custom aquariums, professional aquascaping, maintenance services, and quality fish-keeping supplies from Fish Me Aqua in Bangladesh.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Fish Me Aqua",
    "aquarium Bangladesh",
    "custom aquarium",
    "aquascaping",
    "aquarium maintenance",
    "aquarium fish supplies",
    "fish food",
    "aquarium accessories",
  ],
  authors: [{ name: siteName, url: primarySiteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "Aquarium services and supplies",
  alternates: {
    canonical: primarySiteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: primarySiteUrl,
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 2400,
        height: 1260,
        alt: "Fish Me Aqua — Premium aquariums and aquascaping",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${playfairDisplay.variable} ${mulish.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var isDark=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-theme",isDark?"dark":"light");}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<Navbar />}>
          <AuthenticatedNavbar />
        </Suspense>
        <main className="flex flex-1 flex-col pt-20">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
