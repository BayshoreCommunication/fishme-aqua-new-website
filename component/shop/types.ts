export interface ShopProduct {
  id: string;
  slug?: string;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export type ShopSort = "default" | "price-low" | "price-high" | "name";
export type ShopView = "grid" | "list";

export interface ShopCategory {
  id: string;
  name: string;
  count?: number;
}
