"use client";

import type { Product } from "@/app/actions/product";
import {
  getApprovedProductReviewsAction,
  type ProductReviewsData,
  type ProductReviewsResult,
} from "@/app/actions/review";
import ProductGrid from "@/component/shop/ProductGrid";
import { toShopProduct } from "@/component/shop/productAdapter";
import { useShopStore } from "@/component/shop/shopStore";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Heart,
  HelpCircle,
  Link2,
  LoaderCircle,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

interface ProductDetialsProps {
  product: Product;
  relatedProducts: Product[];
  descriptionHtml: string;
  initialReviews: ProductReviewsResult;
}

type ProductTab = "description" | "reviews";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD").format(price);

const ProductDetials = ({
  product,
  relatedProducts,
  descriptionHtml,
  initialReviews,
}: ProductDetialsProps) => {
  const images = useMemo(
    () =>
      [...new Set([product.featureImage, ...product.galleryImages])].filter(
        (image): image is string => Boolean(image),
      ),
    [product.featureImage, product.galleryImages],
  );
  const gallery = images.length
    ? images
    : ["/assets/products/CrystalGlassTank.png"];
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<ProductTab>("description");
  const [reviewsData, setReviewsData] = useState<ProductReviewsData>(() =>
    initialReviews.ok
      ? initialReviews.data
      : {
          reviews: [],
          summary: { averageRating: 0, totalReviews: 0 },
          pagination: {
            total: 0,
            page: 1,
            limit: 6,
            totalPages: 1,
            hasPreviousPage: false,
            hasNextPage: false,
          },
        },
  );
  const [reviewError, setReviewError] = useState(
    initialReviews.ok ? "" : initialReviews.error,
  );
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const { wishlist, cart, toggleWishlist, addToCart, openCart } =
    useShopStore();
  const shopProduct = toShopProduct(product);
  const isWishlisted = wishlist.includes(product._id);
  const cartQuantity =
    cart.find((item) => item.productId === product._id)?.quantity ?? 0;
  const isInStock = product.stock > 0;
  const maxQuantity = Math.max(1, Math.min(product.stock, 99));
  const hasDiscount =
    product.discountPrice !== undefined &&
    product.discountPrice < product.price;
  const currentPrice = product.discountPrice ?? product.price;
  const roundedRating = Math.round(reviewsData.summary.averageRating);

  const loadReviewPage = async (page: number) => {
    setReviewsLoading(true);
    setReviewError("");
    const result = await getApprovedProductReviewsAction(product._id, page, 6);
    if (result.ok) {
      setReviewsData(result.data);
    } else {
      setReviewError(result.error);
    }
    setReviewsLoading(false);
  };

  const updateQuantity = (nextQuantity: number) =>
    setQuantity(Math.max(1, Math.min(nextQuantity, maxQuantity)));

  const handleCart = (showCart = false) => {
    if (!isInStock) return;
    addToCart(product._id, quantity, shopProduct);
    if (showCart) openCart();
  };

  const getShareUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const shareText = product.shortDescription
    ? `${product.title} — ${product.shortDescription}`
    : product.title;

  const openShareWindow = (url: string) =>
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=600");

  const handleShare = (network: "facebook" | "x" | "whatsapp" | "linkedin") => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(shareText);
    const shareUrls: Record<typeof network, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    openShareWindow(shareUrls[network]);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      setLinkCopied(false);
    }
  };

  return (
    <div className="bg-background text-foreground">
      <section className="container py-10 sm:py-14 lg:py-20">
        <nav
          aria-label="Product breadcrumb"
          className="mb-9 flex flex-wrap items-center gap-2.5 text-sm text-foreground/55"
        >
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop" className="transition-colors hover:text-primary">
            Shop
          </Link>
          <span aria-hidden="true">/</span>
          <span>{product.category.name}</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-semibold text-foreground">
            {product.title}
          </span>
        </nav>

        <div className="mx-auto grid max-w-[1370px] items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,1fr)] lg:gap-12 xl:gap-16">
          <div className="grid min-w-0 gap-2 sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-3">
            <div className="group order-1 h-80 cursor-zoom-in overflow-hidden rounded-3xl border border-foreground/10 bg-white shadow-sm dark:border-white/10 sm:order-2 sm:h-105 lg:h-130 lg:self-start xl:h-145">
              <div className="relative h-full w-full">
                <Image
                  src={selectedImage}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 55vw"
                  className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-110 sm:p-6"
                />
              </div>
            </div>

            <div className="order-2 flex gap-3 self-start overflow-x-auto pb-1 sm:order-1 sm:flex-col sm:overflow-visible">
              {gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={selectedImage === image}
                  onClick={() => setSelectedImage(image)}
                  className={`relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border bg-white transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-full ${
                    selectedImage === image
                      ? "border-primary shadow-md shadow-primary/10"
                      : "border-foreground/10 hover:border-primary/40 dark:border-white/10"
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="88px"
                    className="object-contain p-2 transition-transform duration-300 hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex h-full flex-col">
            <p className="text-base font-semibold text-primary dark:text-teal-400">
              {product.category.name}
            </p>
            <h1 className="mt-2 font-heading text-4xl font-bold leading-tight sm:text-[2.75rem]">
              {product.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                  isInStock
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                    : "bg-red-50 text-red-600 dark:bg-red-400/10 dark:text-red-300"
                }`}
              >
                {isInStock && <Check aria-hidden="true" className="h-3 w-3" />}
                {isInStock ? `${product.stock} in stock` : "Out of stock"}
              </span>
              <span
                aria-label={
                  reviewsData.summary.totalReviews
                    ? `${reviewsData.summary.averageRating} out of 5 stars`
                    : "No rating yet"
                }
                className="flex items-center gap-1 text-amber-400"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    aria-hidden="true"
                    className={`h-4 w-4 ${
                      index < roundedRating
                        ? "fill-current"
                        : "text-foreground/20"
                    }`}
                  />
                ))}
              </span>
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className="cursor-pointer text-sm text-foreground/55 transition-colors hover:text-primary"
              >
                {reviewsData.summary.totalReviews
                  ? `${reviewsData.summary.averageRating.toFixed(1)} · ${reviewsData.summary.totalReviews} ${reviewsData.summary.totalReviews === 1 ? "review" : "reviews"}`
                  : "No reviews yet"}
              </button>
            </div>

            {product.shortDescription && (
              <p className="mt-3 line-clamp-3 text-base leading-7 text-foreground/70">
                {product.shortDescription}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              {hasDiscount && (
                <span className="text-base text-foreground/40 line-through">
                  ৳ {formatPrice(product.price)}
                </span>
              )}
              <span className="font-heading text-4xl font-bold">
                ৳ {formatPrice(currentPrice)}
              </span>
            </div>

            <div className="mt-4 border-t border-foreground/10 pt-4 dark:border-white/10">
              <p className="mb-2 text-sm font-semibold text-foreground/65">
                Quantity
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div
                  aria-label="Product quantity"
                  className="inline-flex h-12 w-fit items-center rounded-full border border-foreground/15 p-1 dark:border-white/15"
                >
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={quantity === 1}
                    onClick={() => updateQuantity(quantity - 1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-foreground/8 transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-35 dark:bg-white/10"
                  >
                    <Minus aria-hidden="true" className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={!isInStock || quantity === maxQuantity}
                    onClick={() => updateQuantity(quantity + 1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-foreground/8 transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-35 dark:bg-white/10"
                  >
                    <Plus aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
                <button
                  type="button"
                  disabled={!isInStock}
                  onClick={() => handleCart()}
                  className="inline-flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-primary px-6 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:border-foreground/15 disabled:text-foreground/35"
                >
                  <ShoppingCart aria-hidden="true" className="h-4 w-4" />
                  {cartQuantity
                    ? `Add another (${cartQuantity})`
                    : "Add to Cart"}
                </button>
              </div>
              <button
                type="button"
                disabled={!isInStock}
                onClick={() => handleCart(true)}
                className="mt-3 h-12 w-full cursor-pointer rounded-full bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/15 transition-colors hover:bg-[#008c75] disabled:cursor-not-allowed disabled:bg-foreground/15 disabled:text-foreground/40 disabled:shadow-none"
              >
                Buy Now
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/60">
              <button
                type="button"
                aria-pressed={isWishlisted}
                onClick={() => toggleWishlist(product._id, shopProduct)}
                className={`inline-flex cursor-pointer items-center gap-2 transition-colors hover:text-rose-500 ${
                  isWishlisted ? "text-rose-500" : ""
                }`}
              >
                <Heart
                  aria-hidden="true"
                  className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`}
                />
                {isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <HelpCircle aria-hidden="true" className="h-4 w-4" />
                Ask a question
              </Link>
            </div>

            <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-y border-foreground/10 py-4 text-sm dark:border-white/10">
              <div className="flex gap-2">
                <dt className="font-bold">Category:</dt>
                <dd className="text-foreground/55">{product.category.name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-bold">SKU:</dt>
                <dd className="text-foreground/55">{product.sku}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-bold">Size:</dt>
                <dd className="text-foreground/55">
                  {product.weight} {product.unit}
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold text-foreground/65">
                Share:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Share on Facebook"
                  onClick={() => handleShare("facebook")}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-foreground/8 text-foreground/65 transition-colors hover:bg-primary hover:text-white dark:bg-white/10"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Share on X"
                  onClick={() => handleShare("x")}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-foreground/8 text-foreground/65 transition-colors hover:bg-primary hover:text-white dark:bg-white/10"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M18.9 2h3.3l-7.2 8.2L23.3 22h-6.7l-5.2-6.8L5.4 22H2.1l7.7-8.8L1 2h6.9l4.7 6.2Zm-1.2 18h1.8L7.1 4h-1.9Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Share on WhatsApp"
                  onClick={() => handleShare("whatsapp")}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-foreground/8 text-foreground/65 transition-colors hover:bg-primary hover:text-white dark:bg-white/10"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.31-1.93 1.34-.5.03-1.01.22-3.39-.71-2.87-1.14-4.72-4.05-4.87-4.24-.14-.19-1.17-1.56-1.17-2.98s.75-2.11 1.02-2.4c.27-.29.58-.36.78-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.14-.3.3-.13.58.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.94.29.14.48.21.55.34.07.13.07.75-.17 1.43Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Share on LinkedIn"
                  onClick={() => handleShare("linkedin")}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-foreground/8 text-foreground/65 transition-colors hover:bg-primary hover:text-white dark:bg-white/10"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.2 8.75h3.5V21H3.2Zm6.16 0h3.35v1.68h.05c.47-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.35V21h-3.5v-5.32c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81V21H9.36Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Copy product link"
                  onClick={handleCopyLink}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-foreground/8 text-foreground/65 transition-colors hover:bg-primary hover:text-white dark:bg-white/10"
                >
                  {linkCopied ? (
                    <Check aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    <Link2 aria-hidden="true" className="h-4 w-4" />
                  )}
                </button>
              </div>
              {linkCopied && (
                <span className="text-xs font-semibold text-primary">
                  Link copied!
                </span>
              )}
            </div>

            <div className="mt-auto grid gap-3 pt-4 text-sm text-foreground/65 sm:grid-cols-2">
              <p className="flex items-center gap-2">
                <ShieldCheck
                  aria-hidden="true"
                  className="h-4 w-4 text-primary"
                />
                Secure shopping experience
              </p>
              <p className="flex items-center gap-2">
                <PackageCheck
                  aria-hidden="true"
                  className="h-4 w-4 text-primary"
                />
                Carefully packed for delivery
              </p>
            </div>
          </div>
        </div>

        <ProductInformationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          descriptionHtml={descriptionHtml}
          reviewsData={reviewsData}
          reviewsLoading={reviewsLoading}
          reviewError={reviewError}
          onReviewPageChange={loadReviewPage}
        />

        <section
          className="mt-12 sm:mt-16"
          aria-labelledby="related-products-title"
        >
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary dark:text-teal-400">
                You may also like
              </p>
              <h2
                id="related-products-title"
                className="mt-1 font-heading text-3xl font-bold sm:text-4xl"
              >
                Related Products
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm font-bold text-primary hover:underline"
            >
              View all products
            </Link>
          </div>
          {relatedProducts.length ? (
            <ProductGrid
              products={relatedProducts.map(toShopProduct)}
              viewMode="grid"
            />
          ) : (
            <div className="rounded-3xl border border-dashed border-foreground/15 px-6 py-10 text-center text-sm text-foreground/50 dark:border-white/15">
              More related products are being added soon.
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

const ProductInformationTabs = ({
  activeTab,
  onTabChange,
  descriptionHtml,
  reviewsData,
  reviewsLoading,
  reviewError,
  onReviewPageChange,
}: {
  activeTab: ProductTab;
  onTabChange: (tab: ProductTab) => void;
  descriptionHtml: string;
  reviewsData: ProductReviewsData;
  reviewsLoading: boolean;
  reviewError: string;
  onReviewPageChange: (page: number) => void;
}) => (
  <section className="mt-16 border-t border-foreground/10 pt-12 dark:border-white/10 sm:mt-20">
    <div
      role="tablist"
      aria-label="Product information"
      className="flex gap-8 border-b border-foreground/10 dark:border-white/10"
    >
      {(["description", "reviews"] as ProductTab[]).map((tab) => (
        <button
          key={tab}
          id={`${tab}-tab`}
          type="button"
          role="tab"
          aria-selected={activeTab === tab}
          aria-controls={`${tab}-panel`}
          onClick={() => onTabChange(tab)}
          className={`relative cursor-pointer pb-4 text-base font-bold capitalize transition-colors ${
            activeTab === tab
              ? "text-primary"
              : "text-foreground/45 hover:text-foreground"
          }`}
        >
          {tab}
          {tab === "reviews" && ` (${reviewsData.summary.totalReviews})`}
          {activeTab === tab && (
            <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
          )}
        </button>
      ))}
    </div>

    <div
      id="description-panel"
      role="tabpanel"
      aria-labelledby="description-tab"
      hidden={activeTab !== "description"}
      className="max-w-5xl py-10"
    >
      <h2 className="font-heading text-3xl font-bold">Product Description</h2>
      <div
        className="mt-6 text-base leading-8 text-foreground/70 [&_b]:font-bold [&_b]:text-foreground [&_em]:italic [&_h2]:mb-4 [&_h2]:mt-9 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_h4]:mb-3 [&_h4]:mt-7 [&_h4]:text-lg [&_h4]:font-bold [&_li]:mb-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:mb-5 [&_strong]:font-bold [&_strong]:text-foreground [&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />
    </div>

    <div
      id="reviews-panel"
      role="tabpanel"
      aria-labelledby="reviews-tab"
      hidden={activeTab !== "reviews"}
      className="relative py-8"
    >
      {reviewsLoading && (
        <div className="absolute inset-0 z-10 flex items-start justify-center bg-background/75 pt-20 backdrop-blur-[2px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background px-4 py-2 text-xs font-bold text-primary shadow-lg dark:border-white/10">
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
            Loading reviews…
          </span>
        </div>
      )}

      {reviewError && (
        <div
          role="alert"
          className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300"
        >
          <span>{reviewError}</span>
          <button
            type="button"
            onClick={() => onReviewPageChange(reviewsData.pagination.page)}
            className="rounded-full border border-current px-3 py-1.5 text-xs font-bold"
          >
            Try again
          </button>
        </div>
      )}

      {reviewsData.reviews.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-foreground/15 px-6 py-12 text-center dark:border-white/15">
          <Star
            aria-hidden="true"
            className="mx-auto h-9 w-9 text-foreground/20"
          />
          <h2 className="mt-4 font-heading text-2xl font-bold">
            No approved reviews yet
          </h2>
          <p className="mt-2 text-base text-foreground/55">
            Verified customer reviews will appear here after moderation.
          </p>
        </div>
      ) : (
        <div className="grid gap-7 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="h-fit rounded-3xl bg-primary/[0.055] p-6 text-center lg:sticky lg:top-28">
            <p className="font-heading text-5xl font-bold text-primary">
              {reviewsData.summary.averageRating.toFixed(1)}
            </p>
            <div
              className="mt-3 flex justify-center gap-1 text-amber-400"
              aria-label={`${reviewsData.summary.averageRating} out of 5 stars`}
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <Star
                  key={rating}
                  className={`h-5 w-5 ${
                    rating <= Math.round(reviewsData.summary.averageRating)
                      ? "fill-current"
                      : "text-foreground/15"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="mt-3 text-sm font-semibold text-foreground/55">
              Based on {reviewsData.summary.totalReviews} verified{" "}
              {reviewsData.summary.totalReviews === 1 ? "review" : "reviews"}
            </p>
          </aside>

          <div>
            <div className="grid gap-4 md:grid-cols-2">
              {reviewsData.reviews.map((review) => {
                const customerName = review.customer
                  ? `${review.customer.firstName} ${review.customer.lastName}`.trim()
                  : "Verified customer";
                const initials = customerName
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase();

                return (
                  <article
                    key={review._id}
                    className="rounded-2xl border border-foreground/[0.09] bg-background p-5 shadow-sm dark:border-white/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-extrabold text-primary">
                          {initials || "VC"}
                        </span>
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-extrabold">
                            {customerName}
                          </h3>
                          <p className="mt-0.5 flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-300">
                            <Check className="h-3 w-3" aria-hidden="true" />
                            Verified purchase
                          </p>
                        </div>
                      </div>
                      <time
                        className="shrink-0 text-[10px] text-foreground/35"
                        dateTime={review.createdAt}
                      >
                        {new Intl.DateTimeFormat("en-BD", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(review.createdAt))}
                      </time>
                    </div>

                    <div
                      className="mt-4 flex items-center gap-1 text-amber-400"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Star
                          key={rating}
                          className={`h-4 w-4 ${
                            rating <= review.rating
                              ? "fill-current"
                              : "text-foreground/15"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-foreground/65">
                      {review.comment}
                    </p>

                    {review.attachments.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-foreground/[0.07] pt-4">
                        {review.attachments.map((attachment) =>
                          attachment.type === "image" ? (
                            <a
                              key={attachment.url}
                              href={attachment.url}
                              target="_blank"
                              rel="noreferrer"
                              className="relative h-14 w-14 overflow-hidden rounded-lg border border-foreground/10 bg-white"
                              aria-label={`Open ${attachment.name}`}
                            >
                              <Image
                                src={attachment.url}
                                alt=""
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </a>
                          ) : (
                            <a
                              key={attachment.url}
                              href={attachment.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex h-14 max-w-40 items-center gap-2 rounded-lg border border-foreground/10 px-3 text-[10px] font-bold text-primary"
                            >
                              <FileText
                                className="h-4 w-4 shrink-0"
                                aria-hidden="true"
                              />
                              <span className="truncate">
                                {attachment.name}
                              </span>
                            </a>
                          ),
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {reviewsData.pagination.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between border-t border-foreground/10 pt-5 dark:border-white/10">
                <button
                  type="button"
                  disabled={
                    !reviewsData.pagination.hasPreviousPage || reviewsLoading
                  }
                  onClick={() =>
                    onReviewPageChange(reviewsData.pagination.page - 1)
                  }
                  className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-4 py-2 text-xs font-bold transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Previous
                </button>
                <span className="text-xs font-semibold text-foreground/45">
                  Page {reviewsData.pagination.page} of{" "}
                  {reviewsData.pagination.totalPages}
                </span>
                <button
                  type="button"
                  disabled={
                    !reviewsData.pagination.hasNextPage || reviewsLoading
                  }
                  onClick={() =>
                    onReviewPageChange(reviewsData.pagination.page + 1)
                  }
                  className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-4 py-2 text-xs font-bold transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </section>
);

export default ProductDetials;
