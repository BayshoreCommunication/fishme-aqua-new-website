"use server";

import { auth } from "@/auth";

const BACKEND_URL = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://api.bayshorecommunication.com"
).replace(/\/$/, "");
const ORDERS_API = `${BACKEND_URL}/api/v1/orders`;

const OBJECT_ID_PATTERN = /^[a-f\d]{24}$/i;
const PHONE_PATTERN = /^[+]?[0-9]{7,15}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POST_CODE_PATTERN = /^[0-9]{4}$/;
const DELIVERY_ZONES = ["Inside Dhaka", "Outside Dhaka"] as const;

interface OrderItemInput {
  product: string;
  quantity: number;
}

export type CreateOrderResult = {
  ok: boolean;
  error?: string;
  orderNumber?: string;
};

export type CustomerOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface CustomerOrderItem {
  product: string;
  title: string;
  image: string;
  sku: string;
  price: number;
  quantity: number;
}

export interface CustomerOrder {
  _id: string;
  orderNumber: string;
  items: CustomerOrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: "cod" | "bkash" | "nagad" | "card";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  orderStatus: CustomerOrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerOrderPagination {
  total: number;
  page: number;
  perPage: 6;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type CustomerOrdersResult =
  | {
      ok: true;
      orders: CustomerOrder[];
      pagination: CustomerOrderPagination;
    }
  | { ok: false; error: string };

export type CustomerOrderResult =
  | { ok: true; order: CustomerOrder }
  | { ok: false; error: string };

const getValue = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

const readApiError = async (
  response: Response,
  fallback = "Unable to place your order. Please try again.",
) => {
  try {
    const body = (await response.json()) as {
      message?: unknown;
      errors?: unknown;
    };
    if (Array.isArray(body.errors) && typeof body.errors[0] === "string") {
      return body.errors[0];
    }
    if (typeof body.message === "string") return body.message;
  } catch {
    // Use the safe fallback below when the API response is not JSON.
  }
  return fallback;
};

const parseItems = (value: string): OrderItemInput[] | null => {
  try {
    const input = JSON.parse(value) as unknown;
    if (!Array.isArray(input) || input.length === 0 || input.length > 50) {
      return null;
    }

    const quantities = new Map<string, number>();
    for (const value of input) {
      if (!value || typeof value !== "object") return null;
      const item = value as { productId?: unknown; quantity?: unknown };
      const product =
        typeof item.productId === "string" ? item.productId.trim() : "";
      const quantity = Number(item.quantity);
      if (
        !OBJECT_ID_PATTERN.test(product) ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 99
      ) {
        return null;
      }
      quantities.set(product, (quantities.get(product) ?? 0) + quantity);
    }

    return [...quantities].map(([product, quantity]) => ({
      product,
      quantity: Math.min(quantity, 99),
    }));
  } catch {
    return null;
  }
};

export async function createOrderAction(
  _previousState: CreateOrderResult,
  formData: FormData,
): Promise<CreateOrderResult> {
  const session = await auth();
  const accessToken = session?.user?.accessToken;
  if (!accessToken) {
    return { ok: false, error: "Please sign in before placing your order." };
  }

  const firstName = getValue(formData, "firstName");
  const lastName = getValue(formData, "lastName");
  const customerName = `${firstName} ${lastName}`.trim();
  const customerCompany = getValue(formData, "company");
  const customerPhone = getValue(formData, "phone");
  const customerEmail = getValue(formData, "email").toLowerCase();
  const notes = getValue(formData, "notes");
  const items = parseItems(getValue(formData, "items"));
  const useAlternateAddress = getValue(formData, "shipToDifferentAddress") === "on";
  const prefix = useAlternateAddress ? "shipping" : "billing";
  const division = getValue(formData, `${prefix}Division`);
  const district = getValue(formData, `${prefix}District`);
  const upazila = getValue(formData, `${prefix}Upazila`);
  const postOffice = getValue(formData, `${prefix}PostOffice`);
  const postCode = getValue(formData, `${prefix}PostCode`);
  const area = getValue(formData, `${prefix}Area`);
  const zone = getValue(formData, `${prefix}Zone`);

  if (!customerName || !customerPhone || !PHONE_PATTERN.test(customerPhone)) {
    return { ok: false, error: "Enter a valid customer name and phone number." };
  }
  if (customerEmail && !EMAIL_PATTERN.test(customerEmail)) {
    return { ok: false, error: "Enter a valid email address or leave it empty." };
  }
  if (!items) {
    return {
      ok: false,
      error: "Your cart contains an unavailable product. Please update your cart.",
    };
  }
  if (
    !division ||
    !area ||
    !DELIVERY_ZONES.includes(zone as (typeof DELIVERY_ZONES)[number])
  ) {
    return { ok: false, error: "Complete the delivery address before ordering." };
  }
  if (postCode && !POST_CODE_PATTERN.test(postCode)) {
    return { ok: false, error: "Post code must contain exactly four digits." };
  }

  try {
    const response = await fetch(ORDERS_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName,
        customerCompany: customerCompany || undefined,
        customerPhone,
        customerEmail: customerEmail || undefined,
        shippingAddress: {
          division,
          district,
          upazila,
          postOffice,
          postCode,
          area,
          zone,
        },
        items,
        paymentMethod: "cod",
        notes: notes || undefined,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) {
      return { ok: false, error: await readApiError(response) };
    }

    const body = (await response.json()) as {
      data?: { orderNumber?: unknown };
    };
    const orderNumber =
      typeof body.data?.orderNumber === "string"
        ? body.data.orderNumber.trim()
        : "";

    if (!orderNumber) {
      return { ok: false, error: "The order service returned invalid data." };
    }

    return { ok: true, orderNumber };
  } catch {
    return {
      ok: false,
      error: "Unable to connect to the order service. Please try again.",
    };
  }
}

export async function getCustomerOrdersAction(
  requestedPage = 1,
): Promise<CustomerOrdersResult> {
  const session = await auth();
  const accessToken = session?.user?.accessToken;
  if (!accessToken) return { ok: false, error: "Please sign in again." };

  const page = Number.isInteger(requestedPage)
    ? Math.max(1, requestedPage)
    : 1;

  try {
    const response = await fetch(`${ORDERS_API}/my-orders?page=${page}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      return {
        ok: false,
        error: await readApiError(response, "Unable to load your order history."),
      };
    }

    const body = (await response.json()) as {
      data?: {
        orders?: CustomerOrder[];
        pagination?: CustomerOrderPagination;
      };
    };
    if (!Array.isArray(body.data?.orders) || !body.data?.pagination) {
      return { ok: false, error: "The order service returned invalid data." };
    }

    return {
      ok: true,
      orders: body.data.orders,
      pagination: body.data.pagination,
    };
  } catch {
    return { ok: false, error: "Unable to load your order history." };
  }
}

export async function getCustomerOrderAction(
  id: string,
): Promise<CustomerOrderResult> {
  const session = await auth();
  const accessToken = session?.user?.accessToken;
  if (!accessToken) return { ok: false, error: "Please sign in again." };
  const identifier = id.trim();
  if (!identifier) return { ok: false, error: "Order identifier is required." };

  try {
    const response = await fetch(
      `${ORDERS_API}/my-orders/${encodeURIComponent(identifier)}`,
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
        error: await readApiError(response, "Unable to load this order."),
      };
    }
    const body = (await response.json()) as { data?: CustomerOrder };
    if (!body.data?._id) {
      return { ok: false, error: "The order service returned invalid data." };
    }
    return { ok: true, order: body.data };
  } catch {
    return { ok: false, error: "Unable to load this order." };
  }
}
