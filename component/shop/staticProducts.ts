import ProductsData from "@/data/ProductsData.json";
import type { ShopProduct } from "@/component/shop/types";

export const staticProducts: ShopProduct[] = ProductsData.map((product) => ({
  ...product,
  id: String(product.id),
}));
