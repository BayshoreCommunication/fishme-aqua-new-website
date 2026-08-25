"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, Minus, Plus, X } from "lucide-react";
import { staticProducts } from "@/component/shop/staticProducts";
import { useShopStore } from "@/component/shop/shopStore";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD").format(price);

const Wishlist = () => {
  const { wishlist, catalog, addToCart, toggleWishlist } = useShopStore();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const products = [
    ...staticProducts,
    ...Object.values(catalog).filter(
      (product) => !staticProducts.some(({ id }) => id === product.id),
    ),
  ];
  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id),
  );

  const getQuantity = (productId: string) => quantities[productId] ?? 1;

  const updateQuantity = (productId: string, quantity: number) => {
    setQuantities((current) => ({
      ...current,
      [productId]: Math.max(1, Math.min(quantity, 99)),
    }));
  };

  return (
    <section className="bg-background py-12 text-foreground sm:py-16 lg:py-20">
      <div className="container max-w-7xl">
        <header className="mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-teal-400">
            Saved products
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            Wishlist
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-3 flex items-center gap-1.5 text-xs text-foreground/45"
          >
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <ChevronRight aria-hidden="true" className="h-3 w-3" />
            <span aria-current="page" className="font-semibold text-foreground">
              Wishlist
            </span>
          </nav>
        </header>

        {wishlistProducts.length === 0 ? (
          <div className="flex min-h-96 flex-col items-center justify-center rounded-3xl border border-dashed border-foreground/15 bg-foreground/[0.02] px-6 text-center dark:border-white/15 dark:bg-white/[0.02]">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-500/8 text-rose-500">
              <Heart aria-hidden="true" className="h-8 w-8" />
            </span>
            <h2 className="mt-5 font-heading text-2xl font-bold">
              Your wishlist is empty
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground/55">
              Select the heart on any product to save it here for later.
            </p>
            <Link
              href="/shop"
              className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008c75]"
            >
              Explore products
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-background shadow-sm dark:border-white/10">
            <div className="hidden grid-cols-[minmax(0,2.2fr)_0.75fr_0.9fr_1fr_0.65fr] items-center gap-5 bg-foreground/[0.04] px-6 py-4 text-xs font-bold text-foreground/65 dark:bg-white/[0.05] md:grid lg:px-8">
              <span>Product</span>
              <span>Price</span>
              <span className="text-center">Quantity</span>
              <span className="text-center">Action</span>
              <span className="sr-only">Remove</span>
            </div>

            <div className="divide-y divide-foreground/10 dark:divide-white/10">
              {wishlistProducts.map((product) => {
                const quantity = getQuantity(product.id);

                return (
                  <article
                    key={product.id}
                    className="grid gap-5 p-5 md:grid-cols-[minmax(0,2.2fr)_0.75fr_0.9fr_1fr_0.65fr] md:items-center md:px-6 md:py-6 lg:px-8"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] dark:border-white/10 dark:bg-white/[0.04]">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-primary dark:text-teal-400 md:hidden">
                          {product.category}
                        </span>
                        <h2 className="truncate text-sm font-semibold">
                          {product.title}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:block">
                      <span className="text-xs text-foreground/45 md:hidden">
                        Price
                      </span>
                      <span className="text-sm font-semibold">
                        ৳ {formatPrice(product.price)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between md:justify-center">
                      <span className="text-xs text-foreground/45 md:hidden">
                        Quantity
                      </span>
                      <div className="inline-flex items-center rounded-full border border-foreground/15 p-1 dark:border-white/15">
                        <button
                          type="button"
                          aria-label={`Decrease ${product.title} quantity`}
                          disabled={quantity === 1}
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-foreground/20 text-background transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/25 dark:text-white"
                        >
                          <Minus aria-hidden="true" className="h-3 w-3" />
                        </button>
                        <span
                          aria-label={`${quantity} selected`}
                          className="min-w-9 text-center text-xs font-semibold"
                        >
                          {quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase ${product.title} quantity`}
                          disabled={quantity === 99}
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-foreground/20 text-background transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/25 dark:text-white"
                        >
                          <Plus aria-hidden="true" className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(product.id, quantity, product)}
                      className="mx-auto w-full cursor-pointer rounded-full bg-primary px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#008c75] md:w-auto md:min-w-32 md:py-2.5"
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      aria-label={`Remove ${product.title} from wishlist`}
                      onClick={() => toggleWishlist(product.id, product)}
                      className="mx-auto inline-flex cursor-pointer items-center gap-1 text-xs text-foreground/40 transition-colors hover:text-rose-500 md:mx-0 md:justify-self-end"
                    >
                      <X aria-hidden="true" className="h-3 w-3" />
                      Remove
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
