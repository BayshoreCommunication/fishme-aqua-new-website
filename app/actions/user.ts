"use server";

import { auth } from "@/auth";

const BACKEND_URL = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://fishmeaqua-backend.vercel.app"
).replace(/\/$/, "");
const ME_API = `${BACKEND_URL}/api/v1/users/me`;

export interface CustomerAddress {
  division?: string;
  district?: string;
  upazila?: string;
  postOffice?: string;
  postCode?: string;
  area?: string;
  zone?: "Inside Dhaka" | "Outside Dhaka";
}

export interface CustomerProfile {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
  email: string;
  address: CustomerAddress;
  shipToDifferentAddress: boolean;
  shippingAddress: CustomerAddress;
  createdAt: string;
  updatedAt: string;
}

export type GetMeResult =
  | { ok: true; data: CustomerProfile }
  | { ok: false; authenticated: boolean; error?: string };

interface BackendUser {
  _id?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  companyName?: unknown;
  phone?: unknown;
  email?: unknown;
  role?: unknown;
  address?: unknown;
  shipToDifferentAddress?: unknown;
  shippingAddress?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
}

const asString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const normalizeAddress = (value: unknown): CustomerAddress => {
  if (!value || typeof value !== "object") return {};
  const address = value as Record<string, unknown>;
  const zone = asString(address.zone);

  return {
    division: asString(address.division),
    district: asString(address.district),
    upazila: asString(address.upazila),
    postOffice: asString(address.postOffice),
    postCode: asString(address.postCode),
    area: asString(address.area),
    zone:
      zone === "Inside Dhaka" || zone === "Outside Dhaka" ? zone : undefined,
  };
};

const normalizeCustomer = (user: BackendUser): CustomerProfile | null => {
  const id = asString(user._id);
  if (!id || user.role !== "customer") return null;

  return {
    id,
    firstName: asString(user.firstName),
    lastName: asString(user.lastName),
    companyName: asString(user.companyName),
    phone: asString(user.phone),
    email: asString(user.email),
    address: normalizeAddress(user.address),
    shipToDifferentAddress: user.shipToDifferentAddress === true,
    shippingAddress: normalizeAddress(user.shippingAddress),
    createdAt: asString(user.createdAt),
    updatedAt: asString(user.updatedAt),
  };
};

const readApiError = async (response: Response, fallback: string) => {
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
    // Use the safe fallback for non-JSON API responses.
  }
  return fallback;
};

const valueFrom = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

const addressFrom = (formData: FormData, prefix: string): CustomerAddress => ({
  division: valueFrom(formData, `${prefix}Division`),
  district: valueFrom(formData, `${prefix}District`),
  upazila: valueFrom(formData, `${prefix}Upazila`),
  postOffice: valueFrom(formData, `${prefix}PostOffice`),
  postCode: valueFrom(formData, `${prefix}PostCode`),
  area: valueFrom(formData, `${prefix}Area`),
  zone: valueFrom(formData, `${prefix}Zone`) as CustomerAddress["zone"],
});

export type ProfileMutationResult =
  | { ok: true; data: CustomerProfile; message: string }
  | { ok: false; error: string };

export type PasswordMutationResult =
  | { ok: true; message: string }
  | { ok: false; error: string };

export async function getMeAction(): Promise<GetMeResult> {
  const session = await auth();
  const accessToken = session?.user?.accessToken;

  if (!accessToken) return { ok: false, authenticated: false };

  try {
    const response = await fetch(ME_API, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      return {
        ok: false,
        authenticated: response.status !== 401,
        error: "Unable to load your customer profile.",
      };
    }

    const body = (await response.json()) as { data?: BackendUser };
    const user = body.data;
    const profile = user ? normalizeCustomer(user) : null;

    if (!profile) {
      return {
        ok: false,
        authenticated: true,
        error: "The profile service returned invalid customer data.",
      };
    }

    return {
      ok: true,
      data: profile,
    };
  } catch {
    return {
      ok: false,
      authenticated: true,
      error: "Unable to connect to the profile service.",
    };
  }
}

export async function updateProfileAction(
  formData: FormData,
): Promise<ProfileMutationResult> {
  const session = await auth();
  const accessToken = session?.user?.accessToken;
  if (!accessToken) return { ok: false, error: "Please sign in again." };

  const section = valueFrom(formData, "section");
  let payload: Record<string, unknown>;

  if (section === "basic") {
    payload = {
      firstName: valueFrom(formData, "firstName"),
      lastName: valueFrom(formData, "lastName"),
      companyName: valueFrom(formData, "companyName"),
      phone: valueFrom(formData, "phone"),
      email: valueFrom(formData, "email") || undefined,
    };
  } else if (section === "billing") {
    payload = { address: addressFrom(formData, "billing") };
  } else if (section === "shipping") {
    payload = {
      shipToDifferentAddress: true,
      shippingAddress: addressFrom(formData, "shipping"),
    };
  } else if (section === "shipping-preference") {
    payload = { shipToDifferentAddress: false };
  } else {
    return { ok: false, error: "Unknown profile section." };
  }

  try {
    const response = await fetch(ME_API, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return {
        ok: false,
        error: await readApiError(response, "Unable to update your profile."),
      };
    }

    const body = (await response.json()) as { data?: BackendUser };
    const profile = body.data ? normalizeCustomer(body.data) : null;
    if (!profile) {
      return { ok: false, error: "The profile service returned invalid data." };
    }

    return {
      ok: true,
      data: profile,
      message: "Profile updated successfully.",
    };
  } catch {
    return { ok: false, error: "Unable to connect to the profile service." };
  }
}

export async function changeCustomerPasswordAction(
  formData: FormData,
): Promise<PasswordMutationResult> {
  const session = await auth();
  const accessToken = session?.user?.accessToken;
  if (!accessToken) return { ok: false, error: "Please sign in again." };

  const currentPassword = valueFrom(formData, "currentPassword");
  const newPassword = valueFrom(formData, "newPassword");
  const confirmPassword = valueFrom(formData, "confirmPassword");
  if (!currentPassword || newPassword.length < 8) {
    return {
      ok: false,
      error:
        "Enter your current password and a new password of at least 8 characters.",
    };
  }
  if (newPassword !== confirmPassword) {
    return { ok: false, error: "New passwords do not match." };
  }

  try {
    const response = await fetch(`${ME_API}/password`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      return {
        ok: false,
        error: await readApiError(response, "Unable to change your password."),
      };
    }
    return { ok: true, message: "Password updated successfully." };
  } catch {
    return { ok: false, error: "Unable to connect to the profile service." };
  }
}
