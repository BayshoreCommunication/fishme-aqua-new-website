"use client";

import { listCategoriesAction, type Category } from "@/app/actions/category";
import {
  listProductsAction,
  type ProductListResult,
} from "@/app/actions/product";
import LeftCategories from "@/component/shop/LeftCategories";
import ProductGrid from "@/component/shop/ProductGrid";
import { toShopProduct } from "@/component/shop/productAdapter";
import { useShopStore } from "@/component/shop/shopStore";
import { staticProducts } from "@/component/shop/staticProducts";
import TopFillter from "@/component/shop/TopFillter";
import type {
  ShopCategory,
  ShopProduct,
  ShopSort,
  ShopView,
} from "@/component/shop/types";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

const PRODUCTS_PER_PAGE = 16;

interface ShopGridProps {
  initialCatalog: ProductListResult;
  initialCategories: Category[];
  initialProductError?: string;
  initialCategoriesError?: string;
}

const ShopGrid = ({
  initialCatalog,
  initialCategories,
  initialProductError,
  initialCategoriesError,
}: ShopGridProps) => {
  const [products, setProducts] = useState<ShopProduct[]>(() =>
    initialCatalog.products.map(toShopProduct),
  );
  const [totalResults, setTotalResults] = useState(initialCatalog.total);
  const [allProductsTotal, setAllProductsTotal] = useState(
    initialCatalog.total,
  );
  const [totalPages, setTotalPages] = useState(initialCatalog.totalPages);
  const [catalogCategories, setCatalogCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState<ShopSort>("default");
  const [viewMode, setViewMode] = useState<ShopView>("grid");
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialCatalog.page || 1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productError, setProductError] = useState(initialProductError ?? "");
  const [categoriesError, setCategoriesError] = useState(
    initialCategoriesError ?? "",
  );
  const [reloadKey, setReloadKey] = useState(0);
  const firstRequest = useRef(true);
  const requestSequence = useRef(0);
  const { wishlist, catalog } = useShopStore();

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedSearch(searchQuery.trim()),
      350,
    );
    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (firstRequest.current) {
      firstRequest.current = false;
      return;
    }

    const requestId = ++requestSequence.current;
    setIsLoading(true);
    setProductError("");

    void listProductsAction({
      page: currentPage,
      limit: PRODUCTS_PER_PAGE,
      category: selectedCategory === "all" ? undefined : selectedCategory,
      search: debouncedSearch || undefined,
      sort: sortBy,
    }).then((result) => {
      if (requestId !== requestSequence.current) return;
      setIsLoading(false);

      if (!result.ok) {
        setProducts([]);
        setTotalResults(0);
        setTotalPages(1);
        setProductError(result.error);
        return;
      }

      setProducts(result.data.products.map(toShopProduct));
      setTotalResults(result.data.total);
      setTotalPages(result.data.totalPages);
      if (selectedCategory === "all" && !debouncedSearch) {
        setAllProductsTotal(result.data.total);
      }
    });
  }, [currentPage, debouncedSearch, reloadKey, selectedCategory, sortBy]);

  useEffect(() => {
    if (reloadKey === 0) return;

    void listCategoriesAction().then((result) => {
      if (!result.ok) {
        setCategoriesError(result.error);
        return;
      }
      setCatalogCategories(result.data);
      setCategoriesError("");
    });
  }, [reloadKey]);

  const error = [productError, categoriesError].filter(Boolean).join(" ");

  const categories = useMemo<ShopCategory[]>(
    () => [
      { id: "all", name: "All Products", count: allProductsTotal },
      ...catalogCategories.map((category) => ({
        id: category._id,
        name: category.name,
        count: category.productCount ?? 0,
      })),
    ],
    [allProductsTotal, catalogCategories],
  );

  const wishlistProducts = useMemo(() => {
    const available = {
      ...Object.fromEntries(
        staticProducts.map((product) => [product.id, product]),
      ),
      ...catalog,
    };
    const saved = wishlist.flatMap((id) =>
      available[id] ? [available[id]] : [],
    );
    return [...saved].sort((first, second) => {
      if (sortBy === "price-low") return first.price - second.price;
      if (sortBy === "price-high") return second.price - first.price;
      if (sortBy === "name") return first.title.localeCompare(second.title);
      return 0;
    });
  }, [catalog, sortBy, wishlist]);

  const wishlistTotalPages = Math.max(
    1,
    Math.ceil(wishlistProducts.length / PRODUCTS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(
    currentPage,
    showWishlistOnly ? wishlistTotalPages : Math.max(1, totalPages),
  );
  const pageStart = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = showWishlistOnly
    ? wishlistProducts.slice(pageStart, pageStart + PRODUCTS_PER_PAGE)
    : products;
  const visibleTotal = showWishlistOnly
    ? wishlistProducts.length
    : totalResults;
  const visibleTotalPages = showWishlistOnly
    ? wishlistTotalPages
    : Math.max(1, totalPages);

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowWishlistOnly(false);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };
  const updateSearch = (query: string) => {
    setSearchQuery(query);
    setShowWishlistOnly(false);
    setCurrentPage(1);
  };
  const updateSort = (sort: ShopSort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };
  const toggleWishlistFilter = () => {
    setShowWishlistOnly((current) => !current);
    setCurrentPage(1);
  };

  return (
    <section className="bg-background py-14 text-foreground transition-colors duration-300 sm:py-20">
      <div className="container">
        <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary dark:text-teal-400">
            Curated for healthy aquariums
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Shop Aquatic Essentials
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-foreground/60">
            Premium products for maintaining your aquatic paradise
          </p>
        </header>

        <TopFillter
          searchQuery={searchQuery}
          sortBy={sortBy}
          viewMode={viewMode}
          resultsStart={visibleTotal ? pageStart + 1 : 0}
          resultsEnd={Math.min(pageStart + PRODUCTS_PER_PAGE, visibleTotal)}
          totalResults={visibleTotal}
          wishlistCount={wishlist.length}
          showWishlistOnly={showWishlistOnly}
          isFilterOpen={isFilterOpen}
          onSearchChange={updateSearch}
          onSortChange={updateSort}
          onViewChange={setViewMode}
          onToggleWishlist={toggleWishlistFilter}
          onToggleFilter={() => setIsFilterOpen((current) => !current)}
        />

        <div
          id="mobile-shop-categories"
          className={`${isFilterOpen ? "mt-5 block" : "hidden"} lg:hidden`}
        >
          <LeftCategories
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={selectCategory}
          />
        </div>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:gap-8">
          <div className="hidden lg:block">
            <LeftCategories
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={selectCategory}
            />
          </div>

          <div className="min-w-0">
            {error && (
              <div
                role="alert"
                className="mb-5 flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="flex items-center gap-2">
                  <AlertCircle
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0"
                  />
                  {error}
                </span>
                <button
                  type="button"
                  onClick={() => setReloadKey((key) => key + 1)}
                  className="w-fit rounded-full border border-current px-4 py-2 text-xs font-bold"
                >
                  Try again
                </button>
              </div>
            )}

            <div className="relative min-h-80" aria-busy={isLoading}>
              {isLoading && (
                <div className="absolute inset-0 z-20 flex items-start justify-center rounded-3xl bg-background/75 pt-24 backdrop-blur-[2px]">
                  <span className="flex items-center gap-2 rounded-full border border-foreground/10 bg-background px-4 py-2 text-xs font-bold text-primary shadow-lg dark:border-white/10">
                    <LoaderCircle
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin"
                    />
                    Loading products…
                  </span>
                </div>
              )}
              <ProductGrid products={visibleProducts} viewMode={viewMode} />
            </div>

            {visibleTotalPages > 1 && (
              <nav
                aria-label="Product pagination"
                className="mt-10 flex flex-wrap items-center justify-center gap-2"
              >
                <PaginationButton
                  label="Previous page"
                  disabled={safeCurrentPage === 1 || isLoading}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                >
                  <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                </PaginationButton>

                {getVisiblePages(safeCurrentPage, visibleTotalPages).map(
                  (page, index) =>
                    page === "ellipsis" ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="flex h-9 min-w-9 items-center justify-center text-xs text-foreground/40"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={page}
                        type="button"
                        aria-label={`Page ${page}`}
                        aria-current={
                          safeCurrentPage === page ? "page" : undefined
                        }
                        disabled={isLoading}
                        onClick={() => setCurrentPage(page)}
                        className={`flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-full px-3 text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                          safeCurrentPage === page
                            ? "bg-primary text-white shadow-md shadow-primary/15"
                            : "border border-foreground/15 text-foreground/60 hover:border-primary hover:text-primary dark:border-white/15"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                )}

                <PaginationButton
                  label="Next page"
                  disabled={safeCurrentPage === visibleTotalPages || isLoading}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(visibleTotalPages, page + 1),
                    )
                  }
                >
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </PaginationButton>
              </nav>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const getVisiblePages = (current: number, total: number) => {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const pages: Array<number | "ellipsis"> = [1];
  if (current > 4) pages.push("ellipsis");
  for (
    let page = Math.max(2, current - 1);
    page <= Math.min(total - 1, current + 1);
    page += 1
  ) {
    pages.push(page);
  }
  if (current < total - 3) pages.push("ellipsis");
  pages.push(total);
  return pages;
};

const PaginationButton = ({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    type="button"
    aria-label={label}
    disabled={disabled}
    onClick={onClick}
    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-foreground/15 text-foreground/60 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-35 dark:border-white/15"
  >
    {children}
  </button>
);

export default ShopGrid;
