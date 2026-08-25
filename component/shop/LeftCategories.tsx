import { ChevronRight } from "lucide-react";
import type { ShopCategory } from "@/component/shop/types";

interface LeftCategoriesProps {
  categories: ShopCategory[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const LeftCategories = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: LeftCategoriesProps) => (
  <aside
    aria-label="Product categories"
    className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03] lg:sticky lg:top-28"
  >
    <div className="mb-3 border-b border-foreground/10 pb-4 dark:border-white/10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-teal-400">
        Browse products
      </p>
      <h2 className="mt-1 font-heading text-xl font-bold text-foreground">
        Categories
      </h2>
    </div>

    <nav className="space-y-1" aria-label="Shop categories">
      {categories.map((category) => {
        const isActive = category.id === selectedCategory;

        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelectCategory(category.id)}
            className={`group flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              isActive
                ? "bg-primary font-semibold text-white shadow-md shadow-primary/15"
                : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground dark:hover:bg-white/5"
            }`}
          >
            <ChevronRight
              aria-hidden="true"
              className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                isActive ? "rotate-90 text-white" : "text-foreground/35"
              }`}
            />
            <span className="min-w-0 flex-1 truncate">{category.name}</span>
            {category.count !== undefined && (
              <span
                className={`inline-flex min-w-7 items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "bg-foreground/5 text-foreground/55 dark:bg-white/10"
                }`}
              >
                {String(category.count).padStart(2, "0")}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  </aside>
);

export default LeftCategories;
