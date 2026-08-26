import { getProductAction, listProductsAction } from "@/app/actions/product";
import { getApprovedProductReviewsAction } from "@/app/actions/review";
import Breadcrumb from "@/component/shared/Breadcrumb";
import ProductDetials from "@/component/shop/ProductDetials";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";

export const generateMetadata = async ({
  params,
}: PageProps<"/shop/[slug]">): Promise<Metadata> => {
  const { slug } = await params;
  const productResult = await getProductAction(slug);
  if (!productResult.ok) return {};

  const product = productResult.data;
  const description =
    product.shortDescription || `${product.title} — available at Fish Me Aqua.`;

  return {
    title: product.title,
    description,
    openGraph: {
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

const Page = async ({ params }: PageProps<"/shop/[slug]">) => {
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
      ],
      allowedAttributes: {},
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
