import type { Product } from "@/app/actions/product";
import type { ShopProduct } from "@/component/shop/types";

const FALLBACK_IMAGE = "/assets/products/CrystalGlassTank.png";

export const toShopProduct = (product: Product): ShopProduct => ({
  id: product._id,
  slug: product.slug,
  title: product.title,
  price: product.discountPrice ?? product.price,
  category: product.category?.name || "Aquatic essentials",
  image: product.featureImage || product.galleryImages?.[0] || FALLBACK_IMAGE,
  description:
    product.shortDescription ||
    product.overview ||
    "Premium aquatic product from Fish Me Aqua.",
});
