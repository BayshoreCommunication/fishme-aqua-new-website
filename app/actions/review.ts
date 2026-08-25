"use server";

import { auth } from "@/auth";

const BACKEND_URL = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://api.bayshorecommunication.com"
).replace(/\/$/, "");
const REVIEWS_API = `${BACKEND_URL}/api/v1/reviews`;

export type CustomerReviewStatus = "pending" | "approved" | "rejected";

export interface CustomerReviewAttachment {
  url: string;
  name: string;
  type: "image" | "pdf";
}

export interface CustomerReview {
  _id: string;
  order: string;
  product:
    | string
    | {
        _id: string;
        title?: string;
        slug?: string;
        sku?: string;
        featureImage?: string;
      };
  customer: string;
  rating: number;
  comment: string;
  attachments: CustomerReviewAttachment[];
  status: CustomerReviewStatus;
  moderationNote?: string;
  createdAt: string;
  updatedAt: string;
}

export type SubmitReviewResult =
  | { ok: true; review: CustomerReview; message: string }
  | { ok: false; error: string };

export type OrderReviewsResult =
  | { ok: true; reviews: CustomerReview[] }
  | { ok: false; error: string };

export interface PublicReviewCustomer {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface ApprovedProductReview {
  _id: string;
  customer: PublicReviewCustomer | null;
  rating: number;
  comment: string;
  attachments: CustomerReviewAttachment[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductReviewsData {
  reviews: ApprovedProductReview[];
  summary: {
    averageRating: number;
    totalReviews: number;
  };
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export type ProductReviewsResult =
  | { ok: true; data: ProductReviewsData }
  | { ok: false; error: string };

const ALLOWED_ATTACHMENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);
const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;
const OBJECT_ID_PATTERN = /^[a-f\d]{24}$/i;

const readApiError = async (response: Response, fallback: string) => {
  try {
    const body = (await response.json()) as { message?: unknown; errors?: unknown };
    if (Array.isArray(body.errors) && typeof body.errors[0] === "string") {
      return body.errors[0];
    }
    if (typeof body.message === "string") return body.message;
  } catch {
    // Use the safe fallback for non-JSON responses.
  }
  return fallback;
};

export async function submitCustomerReviewAction(
  orderId: string,
  productId: string,
  formData: FormData,
): Promise<SubmitReviewResult> {
  const session = await auth();
  const accessToken = session?.user?.accessToken;
  if (!accessToken) return { ok: false, error: "Please sign in again." };
  if (!orderId.trim() || !OBJECT_ID_PATTERN.test(productId)) {
    return { ok: false, error: "Invalid order or product." };
  }

  const rating = Number(formData.get("rating"));
  const commentValue = formData.get("comment");
  const comment = typeof commentValue === "string" ? commentValue.trim() : "";
  const attachments = formData
    .getAll("attachments")
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false, error: "Choose a rating between 1 and 5." };
  }
  if (comment.length < 3 || comment.length > 1000) {
    return { ok: false, error: "Review must be between 3 and 1000 characters." };
  }
  if (attachments.length > 5) {
    return { ok: false, error: "You can attach up to five files." };
  }
  for (const file of attachments) {
    if (!ALLOWED_ATTACHMENT_TYPES.has(file.type)) {
      return { ok: false, error: "Only JPG, PNG, WEBP, and PDF files are allowed." };
    }
    if (file.size > MAX_ATTACHMENT_SIZE) {
      return { ok: false, error: `${file.name} is larger than 5MB.` };
    }
  }

  const payload = new FormData();
  payload.set("rating", String(rating));
  payload.set("comment", comment);
  attachments.forEach((file) => payload.append("attachments", file, file.name));

  try {
    const response = await fetch(
      `${REVIEWS_API}/orders/${encodeURIComponent(orderId)}/products/${productId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: payload,
        cache: "no-store",
        signal: AbortSignal.timeout(30_000),
      },
    );
    if (!response.ok) {
      return {
        ok: false,
        error: await readApiError(response, "Unable to submit your review."),
      };
    }

    const body = (await response.json()) as {
      message?: string;
      data?: CustomerReview;
    };
    if (!body.data?._id) {
      return { ok: false, error: "The review service returned invalid data." };
    }
    return {
      ok: true,
      review: body.data,
      message: body.message || "Review submitted for approval.",
    };
  } catch {
    return { ok: false, error: "Unable to connect to the review service." };
  }
}

export async function getCustomerOrderReviewsAction(
  orderId: string,
): Promise<OrderReviewsResult> {
  const session = await auth();
  const accessToken = session?.user?.accessToken;
  if (!accessToken) return { ok: false, error: "Please sign in again." };

  try {
    const response = await fetch(
      `${REVIEWS_API}/orders/${encodeURIComponent(orderId)}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      },
    );
    if (!response.ok) {
      return {
        ok: false,
        error: await readApiError(response, "Unable to load your reviews."),
      };
    }

    const body = (await response.json()) as { data?: CustomerReview[] };
    return { ok: true, reviews: Array.isArray(body.data) ? body.data : [] };
  } catch {
    return { ok: false, error: "Unable to connect to the review service." };
  }
}

export async function getApprovedProductReviewsAction(
  productId: string,
  requestedPage = 1,
  requestedLimit = 6,
): Promise<ProductReviewsResult> {
  if (!OBJECT_ID_PATTERN.test(productId)) {
    return { ok: false, error: "Invalid product." };
  }
  const page = Number.isInteger(requestedPage) ? Math.max(1, requestedPage) : 1;
  const limit = Number.isInteger(requestedLimit)
    ? Math.min(20, Math.max(1, requestedLimit))
    : 6;

  try {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    const response = await fetch(
      `${REVIEWS_API}/products/${productId}?${query.toString()}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      },
    );
    if (!response.ok) {
      return {
        ok: false,
        error: await readApiError(response, "Unable to load product reviews."),
      };
    }

    const body = (await response.json()) as { data?: ProductReviewsData };
    if (!body.data || !Array.isArray(body.data.reviews)) {
      return { ok: false, error: "The review service returned invalid data." };
    }
    return { ok: true, data: body.data };
  } catch {
    return { ok: false, error: "Unable to connect to the review service." };
  }
}
