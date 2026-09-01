import { listProductsAction } from "@/app/actions/product";
import Link from "next/link";

import Reveal from "@/component/motion/Reveal";
import ProductGrid from "@/component/shop/ProductGrid";
import { toShopProduct } from "@/component/shop/productAdapter";

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

const ShopAquaticEssentials = async () => {
  const result = await listProductsAction({ featured: true, limit: 4 });
  const featuredProducts = result.ok
    ? result.data.products.map(toShopProduct)
    : [];

  return (
    <section className="bg-background py-16 text-foreground transition-colors duration-300 md:py-20">
      <div className="container">
        <Reveal direction="up" delay={0}>
          <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary dark:text-teal-400">
              Curated for healthy aquariums
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Shop Aquatic Essentials
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-base sm:text-lg leading-relaxed text-foreground/80">
              Premium products for maintaining your aquatic paradise
            </p>
          </header>
        </Reveal>

        {featuredProducts.length ? (
          <ProductGrid
            products={featuredProducts}
            viewMode="grid"
            desktopColumns={4}
          />
        ) : (
          <div className="rounded-3xl border border-dashed border-foreground/15 px-6 py-12 text-center text-sm text-foreground/55 dark:border-white/15">
            Featured products will be available soon.
          </div>
        )}

        <Reveal direction="up" delay={300}>
          <div className="mt-12 text-center sm:mt-14">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-8 py-3.5 text-xs font-medium text-foreground shadow-sm transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white dark:border-white/20 dark:bg-white/5 sm:text-sm"
            >
              <span>Explore All Products</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-foreground/10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-white/20 dark:bg-white/10">
                <ArrowUpRightIcon />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ShopAquaticEssentials;
