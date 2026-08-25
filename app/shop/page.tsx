import { listCategoriesAction } from "@/app/actions/category";
import { listProductsAction } from "@/app/actions/product";
import Breadcrumb from "@/component/shared/Breadcrumb";
import ShopGrid from "@/component/shop/ShopGrid";

const page = async () => {
  const [productsResult, categoriesResult] = await Promise.all([
    listProductsAction({ page: 1, limit: 16 }),
    listCategoriesAction(),
  ]);
  const initialCatalog = productsResult.ok
    ? productsResult.data
    : { products: [], total: 0, page: 1, limit: 16, totalPages: 1 };
  const initialCategories = categoriesResult.ok ? categoriesResult.data : [];
  const initialProductError = productsResult.ok
    ? undefined
    : productsResult.error;
  const initialCategoriesError = categoriesResult.ok
    ? undefined
    : categoriesResult.error;

  return (
    <div>
      <Breadcrumb
        firstPart="Premium Aquatic Products"
        lastWord="& Essentials"
        backgroundImage="/assets/home/hero-bg.svg"
      />
      <ShopGrid
        initialCatalog={initialCatalog}
        initialCategories={initialCategories}
        initialProductError={initialProductError}
        initialCategoriesError={initialCategoriesError}
      />
    </div>
  );
};

export default page;
