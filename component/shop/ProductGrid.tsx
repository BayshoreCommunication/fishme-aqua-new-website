"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import type { ShopProduct, ShopView } from "@/component/shop/types";
import { useShopStore } from "@/component/shop/shopStore";

interface ProductGridProps {
  products: ShopProduct[];
  viewMode: ShopView;
  desktopColumns?: 3 | 4;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD").format(price);

const ProductGrid = ({
  products,
  viewMode,
  desktopColumns = 3,
}: ProductGridProps) => {
  const { wishlist, cart, toggleWishlist, addToCart } = useShopStore();

  if (products.length === 0) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-foreground/15 bg-foreground/[0.02] px-6 text-center dark:border-white/15 dark:bg-white/[0.02]">
        <SearchEmptyIcon />
        <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
          No products found
        </h3>
        <p className="mt-1 max-w-sm text-sm text-foreground/55">
          Try another search term or select a different category.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? desktopColumns === 4
            ? "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
            : "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
          : "grid grid-cols-1 gap-4 md:grid-cols-2"
      }
    >
      {products.map((product) => {
        const isWishlisted = wishlist.includes(product.id);
        const cartQuantity =
          cart.find((item) => item.productId === product.id)?.quantity ?? 0;

        return (
          <article
            key={product.id}
            className={`group relative overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/5 dark:border-white/10 ${
              viewMode === "list" ? "flex min-h-44" : "flex flex-col"
            }`}
          >
            {product.slug && (
              <Link
                href={`/shop/${product.slug}`}
                aria-label={`View ${product.title} details`}
                className="absolute inset-0 z-[1] rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
              />
            )}
            <div
              className={`relative shrink-0 overflow-hidden bg-white ${
                viewMode === "list"
                  ? "min-h-44 w-36 sm:w-44"
                  : "aspect-[4/3] w-full"
              }`}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes={
                  viewMode === "list"
                    ? "176px"
                    : "(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
                }
                className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.08] sm:p-4"
              />

              <button
                type="button"
                aria-label={`${isWishlisted ? "Remove" : "Add"} ${product.title} ${
                  isWishlisted ? "from" : "to"
                } wishlist`}
                aria-pressed={isWishlisted}
                onClick={() => toggleWishlist(product.id, product)}
                className={`absolute right-2.5 top-2.5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border backdrop-blur-md transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isWishlisted
                    ? "border-white/60 bg-white/90 text-rose-500 dark:border-white/20 dark:bg-black/45 dark:text-rose-400"
                    : "border-white/60 bg-white/85 text-slate-700 hover:scale-105 dark:border-white/20 dark:bg-black/35 dark:text-white"
                }`}
              >
                <Heart
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 ${isWishlisted ? "fill-current" : ""}`}
                />
              </button>
            </div>

            <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
              <span className="mb-2 w-fit max-w-full truncate rounded-full border border-primary/15 bg-primary/5 px-2.5 py-1 text-[9px] font-bold text-primary dark:text-teal-400">
                {product.category}
              </span>
              <h3 className="line-clamp-2 text-sm font-bold leading-snug text-foreground sm:text-base">
                {product.title}
              </h3>
              {viewMode === "list" && (
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-foreground/55">
                  {product.description}
                </p>
              )}

              <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="whitespace-nowrap text-sm font-bold text-foreground">
                  ৳ {formatPrice(product.price)}
                </p>
                <button
                  type="button"
                  onClick={() => addToCart(product.id, 1, product)}
                  aria-label={`Add ${product.title} to cart${
                    cartQuantity ? `, ${cartQuantity} currently in cart` : ""
                  }`}
                  className="relative z-10 inline-flex min-h-9 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-primary px-3 text-[10px] font-semibold text-white transition-colors hover:bg-[#008c75] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <ShoppingCart aria-hidden="true" className="h-3.5 w-3.5" />
                  <span>
                    {cartQuantity
                      ? `Add another (${cartQuantity})`
                      : "Add to cart"}
                  </span>
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

const SearchEmptyIcon = () => (
  <svg
    aria-hidden="true"
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    className="text-primary/60"
  >
    <circle cx="23" cy="23" r="14" stroke="currentColor" strokeWidth="2" />
    <path
      d="m34 34 10 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M18 23h10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default ProductGrid;
