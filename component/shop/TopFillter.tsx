import {
  ChevronDown,
  Grid2X2,
  Heart,
  List,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import type { ShopSort, ShopView } from "@/component/shop/types";

interface TopFillterProps {
  searchQuery: string;
  sortBy: ShopSort;
  viewMode: ShopView;
  resultsStart: number;
  resultsEnd: number;
  totalResults: number;
  wishlistCount: number;
  showWishlistOnly: boolean;
  isFilterOpen: boolean;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: ShopSort) => void;
  onViewChange: (view: ShopView) => void;
  onToggleWishlist: () => void;
  onToggleFilter: () => void;
}

const TopFillter = ({
  searchQuery,
  sortBy,
  viewMode,
  resultsStart,
  resultsEnd,
  totalResults,
  wishlistCount,
  showWishlistOnly,
  isFilterOpen,
  onSearchChange,
  onSortChange,
  onViewChange,
  onToggleWishlist,
  onToggleFilter,
}: TopFillterProps) => (
  <div className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-background p-3 shadow-sm dark:border-white/10 sm:p-4 xl:flex-row xl:items-center xl:justify-between">
    <div className="flex flex-wrap items-center gap-2.5">
      <button
        type="button"
        aria-expanded={isFilterOpen}
        aria-controls="mobile-shop-categories"
        onClick={onToggleFilter}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/15 transition-colors hover:bg-[#008c75] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
      >
        <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
        Filters
      </button>

      <label className="relative">
        <span className="sr-only">Sort products</span>
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value as ShopSort)}
          className="h-10 cursor-pointer appearance-none rounded-full border border-foreground/15 bg-background pl-4 pr-10 text-xs font-medium text-foreground outline-none transition-colors hover:border-primary/50 focus:border-primary dark:border-white/15"
        >
          <option value="default">Default sorting</option>
          <option value="price-low">Price: Low to high</option>
          <option value="price-high">Price: High to low</option>
          <option value="name">Name: A to Z</option>
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/45"
        />
      </label>

      <div
        className="inline-flex rounded-full border border-foreground/10 bg-foreground/[0.03] p-1 dark:border-white/10 dark:bg-white/5"
        aria-label="Product view"
      >
        <button
          type="button"
          aria-label="Grid view"
          aria-pressed={viewMode === "grid"}
          onClick={() => onViewChange("grid")}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors ${
            viewMode === "grid"
              ? "bg-primary text-white shadow-sm"
              : "text-foreground/45 hover:text-foreground"
          }`}
        >
          <Grid2X2 aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="List view"
          aria-pressed={viewMode === "list"}
          onClick={() => onViewChange("list")}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors ${
            viewMode === "list"
              ? "bg-primary text-white shadow-sm"
              : "text-foreground/45 hover:text-foreground"
          }`}
        >
          <List aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        aria-pressed={showWishlistOnly}
        onClick={onToggleWishlist}
        className={`inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border px-3.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
          showWishlistOnly
            ? "border-rose-500 bg-rose-500 text-white"
            : "border-foreground/15 text-foreground/60 hover:border-rose-400 hover:text-rose-500 dark:border-white/15"
        }`}
      >
        <Heart
          aria-hidden="true"
          className={`h-3.5 w-3.5 ${showWishlistOnly ? "fill-current" : ""}`}
        />
        Wishlist
        <span
          className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
            showWishlistOnly ? "bg-white/15" : "bg-foreground/5 dark:bg-white/10"
          }`}
        >
          {wishlistCount}
        </span>
      </button>

      <p className="text-xs text-foreground/50" aria-live="polite">
        {totalResults === 0
          ? "No products found"
          : `Showing ${resultsStart}–${resultsEnd} of ${totalResults} results`}
      </p>
    </div>

    <label className="relative block w-full xl:w-72">
      <span className="sr-only">Search products</span>
      <input
        type="search"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search products..."
        className="h-11 w-full rounded-full border border-foreground/15 bg-background pl-4 pr-12 text-sm text-foreground outline-none transition-all placeholder:text-foreground/35 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-white/15"
      />
      <span className="pointer-events-none absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white">
        <Search aria-hidden="true" className="h-4 w-4" />
      </span>
    </label>
  </div>
);

export default TopFillter;
