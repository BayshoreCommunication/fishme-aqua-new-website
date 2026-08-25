"use server";

const BACKEND_URL = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://api.bayshorecommunication.com"
).replace(/\/$/, "");
const CATEGORIES_API = `${BACKEND_URL}/api/v1/categories`;
const OBJECT_ID_PATTERN = /^[a-f\d]{24}$/i;

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: string | null;
  isActive: boolean;
  sortOrder: number;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

export type CategoryActionResult<T> =
  { ok: true; data: T } | { ok: false; error: string };

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

export async function listCategoriesAction(): Promise<
  CategoryActionResult<Category[]>
> {
  try {
    const response = await fetch(CATEGORIES_API, {
      method: "GET",
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return {
        ok: false,
        error: await readError(response, "Unable to load categories."),
      };
    }

    const body = (await response.json()) as { data?: Category[] };
    if (!Array.isArray(body.data)) {
      return {
        ok: false,
        error: "The category service returned invalid data.",
      };
    }

    return {
      ok: true,
      data: body.data.filter((category) => category.isActive),
    };
  } catch {
    return {
      ok: false,
      error: "Unable to connect to the category service. Please try again.",
    };
  }
}

export async function getCategoryAction(
  id: string,
): Promise<CategoryActionResult<Category>> {
  const identifier = id.trim();
  if (!OBJECT_ID_PATTERN.test(identifier)) {
    return { ok: false, error: "Invalid category identifier." };
  }

  try {
    const response = await fetch(
      `${CATEGORIES_API}/${encodeURIComponent(identifier)}`,
      {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" },
      },
    );

    if (!response.ok) {
      return {
        ok: false,
        error: await readError(response, "Category not found."),
      };
    }

    const body = (await response.json()) as { data?: Category };
    if (!body.data?._id || !body.data.isActive) {
      return { ok: false, error: "Category not found." };
    }

    return { ok: true, data: body.data };
  } catch {
    return {
      ok: false,
      error: "Unable to connect to the category service. Please try again.",
    };
  }
}
