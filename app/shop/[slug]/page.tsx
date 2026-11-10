import { getProductAction, listProductsAction } from "@/app/actions/product";
import { getApprovedProductReviewsAction } from "@/app/actions/review";
import Breadcrumb from "@/component/shared/Breadcrumb";
import ProductDetials from "@/component/shop/ProductDetials";
import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";
import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";

// http(s) URLs in already-escaped text; stops at whitespace, quotes and tags.
const PLAIN_URL_PATTERN = /\bhttps?:\/\/[^\s<>"']+/g;

type ShopDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({
  params,
}: ShopDetailPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const productResult = await getProductAction(slug);
  if (!productResult.ok) return {};

  const product = productResult.data;
  const description =
    product.shortDescription || `${product.title} — available at Fish Me Aqua.`;

  const url = canonicalUrl(`/shop/${encodeURIComponent(product.slug)}`);

  return {
    title: product.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: product.title,
      description,
      type: "website",
      images: product.featureImage
        ? [{ url: product.featureImage, alt: product.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: product.featureImage ? [product.featureImage] : undefined,
    },
  };
};

const Page = async ({ params }: ShopDetailPageProps) => {
  const { slug } = await params;
  const productResult = await getProductAction(slug);

  if (!productResult.ok) notFound();

  const product = productResult.data;
  const [relatedResult, reviewsResult] = await Promise.all([
    listProductsAction({
      category: product.category._id,
      limit: 4,
    }),
    getApprovedProductReviewsAction(product._id),
  ]);
  const relatedProducts = relatedResult.ok
    ? relatedResult.data.products
        .filter((relatedProduct) => relatedProduct._id !== product._id)
        .slice(0, 3)
    : [];
  const descriptionHtml = sanitizeHtml(
    product.overview ||
      product.shortDescription ||
      "More information about this product will be available soon.",
    {
      allowedTags: [
        "p",
        "br",
        "strong",
        "b",
        "em",
        "i",
        "h2",
        "h3",
        "h4",
        "ul",
        "ol",
        "li",
        "a",
      ],
      allowedAttributes: { a: ["href", "target", "rel"] },
      allowedSchemes: ["http", "https", "mailto", "tel"],
      // Every link opens in a new tab.
      transformTags: {
        a: sanitizeHtml.simpleTransform("a", {
          target: "_blank",
          rel: "noopener noreferrer",
        }),
      },
      // Plain-text URLs (no <a> tag) become clickable links too.
      textFilter: (text, tagName) =>
        tagName === "a"
          ? text
          : text.replace(PLAIN_URL_PATTERN, (url) => {
              const trailing = url.match(/[.,;:!?)]+$/)?.[0] ?? "";
              const href = url.slice(0, url.length - trailing.length);
              return `<a href="${href}" target="_blank" rel="noopener noreferrer">${href}</a>${trailing}`;
            }),
    },
  );

  return (
    <div>
      <Breadcrumb
        firstPart="Premium Aquatic Products"
        lastWord="& Essentials"
        backgroundImage="/assets/home/hero-bg.svg"
      />{" "}
      <ProductDetials
        product={product}
        relatedProducts={relatedProducts}
        descriptionHtml={descriptionHtml}
        initialReviews={reviewsResult}
      />
    </div>
  );
};

export default Page;
