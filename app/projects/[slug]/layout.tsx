import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";

// The project page is a client component, so its canonical URL is set here.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    alternates: {
      canonical: canonicalUrl(`/projects/${encodeURIComponent(slug)}`),
    },
  };
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
