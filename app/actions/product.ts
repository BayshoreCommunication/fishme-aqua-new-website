"use server";

const BACKEND_URL = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://fishmeaqua-backend.vercel.app"
).replace(/\/$/, "");
const PRODUCTS_API = `${BACKEND_URL}/api/v1/products`;

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 16;
const MAX_LIMIT = 100;
const MAX_SEARCH_LENGTH = 100;
const OBJECT_ID_PATTERN = /^[a-f\d]{24}$/i;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type ProductUnit = "kg" | "g" | "l" | "ml" | "pcs";

export interface ProductCategoryRef {
  _id: string;
  name: string;
  slug: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  sku: string;
  category: ProductCategoryRef;
  shortDescription?: string;
  overview?: string;
  featureImage?: string;
  galleryImages: string[];
  price: number;
  discountPrice?: number;
  unit: ProductUnit;
  weight: number;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResult {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ListProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort?: ProductSort;
  featured?: boolean;
}

export type ProductSort = "default" | "price-low" | "price-high" | "name";

export type ProductActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const normalizeInteger = (
  value: number | undefined,
  fallback: number,
  maximum: number,
) => {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(maximum, Math.max(1, Math.floor(value as number)));
};

const normalizeSearch = (value: string | undefined) =>
  (value ?? "").trim().replace(/\s+/g, " ").slice(0, MAX_SEARCH_LENGTH);

async function readError(response: Response, fallback: string) {
  try {
    const body = (await response.json()) as {
      message?: unknown;
      errors?: unknown;
    };
    if (Array.isArray(body.errors) && typeof body.errors[0] === "string") {
      return body.errors[0];
    }
    return typeof body.message === "string" ? body.message : fallback;
  } catch {
    return fallback;
  }
}

export async function listProductsAction(
  params: ListProductsParams = {},
): Promise<ProductActionResult<ProductListResult>> {
  const page = normalizeInteger(
    params.page,
    DEFAULT_PAGE,
    Number.MAX_SAFE_INTEGER,
  );
  const limit = normalizeInteger(params.limit, DEFAULT_LIMIT, MAX_LIMIT);
  const category = (params.category ?? "").trim();
  const search = normalizeSearch(params.search);
  const sort: ProductSort = ["price-low", "price-high", "name"].includes(
    params.sort ?? "",
  )
    ? (params.sort as ProductSort)
    : "default";

  if (category && !OBJECT_ID_PATTERN.test(category)) {
    return { ok: false, error: "Invalid product category." };
  }

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    isActive: "true",
    sort,
  });
  if (category) query.set("category", category);
  if (search) query.set("search", search);
  if (typeof params.featured === "boolean") {
    query.set("isFeatured", String(params.featured));
  }

  try {
    const response = await fetch(`${PRODUCTS_API}?${query.toString()}`, {
      method: "GET",
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return {
        ok: false,
        error: await readError(response, "Unable to load products."),
      };
    }

    const body = (await response.json()) as { data?: ProductListResult };
    if (!body.data || !Array.isArray(body.data.products)) {
      return { ok: false, error: "The product service returned invalid data." };
    }

    return {
      ok: true,
      data: {
        ...body.data,
        products: body.data.products.filter((product) => product.isActive),
      },
    };
  } catch {
    return {
      ok: false,
      error: "Unable to connect to the product service. Please try again.",
    };
  }
}

export async function getProductAction(
  idOrSlug: string,
): Promise<ProductActionResult<Product>> {
  const identifier = idOrSlug.trim().toLowerCase();
  const isValidIdentifier =
    OBJECT_ID_PATTERN.test(identifier) ||
    (identifier.length <= 160 && SLUG_PATTERN.test(identifier));

  if (!isValidIdentifier) {
    return { ok: false, error: "Invalid product identifier." };
  }

  try {
    const response = await fetch(
      `${PRODUCTS_API}/${encodeURIComponent(identifier)}`,
      {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" },
      },
    );

    if (!response.ok) {
      return {
        ok: false,
        error: await readError(response, "Product not found."),
      };
    }

    const body = (await response.json()) as { data?: Product };
    if (!body.data?._id || !body.data.isActive) {
      return { ok: false, error: "Product not found." };
    }

    return { ok: true, data: body.data };
  } catch {
    return {
      ok: false,
      error: "Unable to connect to the product service. Please try again.",
    };
  }
}
