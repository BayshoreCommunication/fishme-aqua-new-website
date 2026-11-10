import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";
import { notFound } from "next/navigation";
import Breadcrumb from "@/component/shared/Breadcrumb";
import BlogDetail from "@/component/blog/BlogDetail";
import { allBlogPosts, getBlogPost, getRelatedBlogPosts } from "@/data/blogs";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allBlogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const url = canonicalUrl(`/blog/${encodeURIComponent(slug)}`);

  return {
    title: `${post.title} | Fish Me Aqua Blog`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.image ? [{ url: post.image, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(slug, 3);

  return (
    <>
      <Breadcrumb
        firstPart="Blog &"
        lastWord="Knowledge Share"
        title={post.title}
        backgroundImage="/assets/home/services-section-background.png"
      />
      <BlogDetail post={post} relatedPosts={relatedPosts} />
    </>
  );
}
