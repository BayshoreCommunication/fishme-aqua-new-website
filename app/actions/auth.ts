"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

const BACKEND_URL = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://fishmeaqua-backend.vercel.app"
).replace(/\/$/, "");
const API = `${BACKEND_URL}/api/v1`;

// ── Types ─────────────────────────────────────────────────────────────────────

export type SigninResult = { ok: boolean; error?: string; redirectTo?: string };

export type SignupField =
  | "firstName"
  | "lastName"
  | "phone"
  | "email"
  | "division"
  | "zone"
  | "district"
  | "upazila"
  | "postOffice"
  | "postCode"
  | "area"
  | "password"
  | "confirmPassword"
  | "terms";

export type SignupResult = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<SignupField, string>>;
  redirectTo?: string;
};

const PHONE_PATTERN = /^[+]?[0-9]{7,15}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POST_CODE_PATTERN = /^[0-9]{4}$/;
const BD_DIVISIONS = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
] as const;

const getFormValue = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

const getPasswordValue = (formData: FormData) => {
  const value = formData.get("password");
  return typeof value === "string" ? value : "";
};

const safeRedirect = (value: string, fallback: string) =>
  value.startsWith("/") && !value.startsWith("//") ? value : fallback;

const isCredentialsError = (error: unknown) =>
  error instanceof AuthError && error.type === "CredentialsSignin";

async function parseApiError(response: Response, fallback: string) {
  try {
    const body = (await response.json()) as {
      message?: string;
      errors?: string[];
    };
    return body.errors?.[0] || body.message || fallback;
  } catch {
    return fallback;
  }
}

// ── Sign out ──────────────────────────────────────────────────────────────────

export async function signoutAction(): Promise<void> {
  await signOut({ redirectTo: "/sign-in" });
}

// ── Customer auth ─────────────────────────────────────────────────────────────

export async function signinAction(
  _prevState: SigninResult,
  formData: FormData,
): Promise<SigninResult> {
  const identifier =
    getFormValue(formData, "identifier") ||
    getFormValue(formData, "email") ||
    getFormValue(formData, "phone");
  const password = getPasswordValue(formData);
  const callbackUrl = safeRedirect(getFormValue(formData, "callbackUrl"), "/");

  if (!identifier || !password) {
    return { ok: false, error: "Email or phone and password are required." };
  }

  if (!EMAIL_PATTERN.test(identifier) && !PHONE_PATTERN.test(identifier)) {
    return { ok: false, error: "Enter a valid email address or phone number." };
  }

  try {
    await signIn("customer-credentials", {
      identifier,
      password,
      redirect: false,
    });
    return { ok: true, redirectTo: callbackUrl };
  } catch (error: unknown) {
    if (isCredentialsError(error)) {
      return { ok: false, error: "Invalid email, phone, or password." };
    }
    return { ok: false, error: "Unable to sign in. Please try again." };
  }
}

export async function signupAction(
  _prevState: SignupResult,
  formData: FormData,
): Promise<SignupResult> {
  const firstName = getFormValue(formData, "firstName");
  const lastName = getFormValue(formData, "lastName");
  const phone = getFormValue(formData, "phone");
  const email = getFormValue(formData, "email").toLowerCase();
  const division = getFormValue(formData, "division");
  const zone = getFormValue(formData, "zone");
  const district = getFormValue(formData, "district");
  const upazila = getFormValue(formData, "upazila");
  const postOffice = getFormValue(formData, "postOffice");
  const postCode = getFormValue(formData, "postCode");
  const area = getFormValue(formData, "area");
  const password = getPasswordValue(formData);
  const confirmPasswordValue = formData.get("confirmPassword");
  const confirmPassword =
    typeof confirmPasswordValue === "string" ? confirmPasswordValue : "";
  const acceptedTerms = getFormValue(formData, "terms") === "on";
  const callbackUrl = safeRedirect(getFormValue(formData, "callbackUrl"), "/");

  const fieldErrors: SignupResult["fieldErrors"] = {};
  if (!firstName) fieldErrors.firstName = "First name is required.";
  else if (firstName.length > 50) {
    fieldErrors.firstName = "First name must be 50 characters or fewer.";
  }
  if (!lastName) fieldErrors.lastName = "Last name is required.";
  else if (lastName.length > 50) {
    fieldErrors.lastName = "Last name must be 50 characters or fewer.";
  }
  if (`${firstName} ${lastName}`.trim().length > 100) {
    fieldErrors.lastName = "Full name must be 100 characters or fewer.";
  }
  if (!phone) fieldErrors.phone = "Phone number is required.";
  else if (!PHONE_PATTERN.test(phone)) {
    fieldErrors.phone = "Enter a valid phone number using 7 to 15 digits.";
  }
  if (email && !EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (!BD_DIVISIONS.includes(division as (typeof BD_DIVISIONS)[number])) {
    fieldErrors.division = "Select a valid division.";
  }
  if (!zone || !["Inside Dhaka", "Outside Dhaka"].includes(zone)) {
    fieldErrors.zone = "Select a valid delivery zone.";
  }
  if (!district) fieldErrors.district = "District is required.";
  if (!upazila)
    fieldErrors.upazila = "Upazila or city corporation is required.";
  if (!postOffice) fieldErrors.postOffice = "Post office or thana is required.";
  if (postCode && !POST_CODE_PATTERN.test(postCode)) {
    fieldErrors.postCode = "Post code must contain exactly 4 digits.";
  }
  if (area.length < 3) {
    fieldErrors.area = "Enter your house, road, sector, or village.";
  }
  if (password.length < 8 || password.length > 72) {
    fieldErrors.password = "Password must be between 8 and 72 characters.";
  }
  if (!confirmPassword) {
    fieldErrors.confirmPassword = "Confirm your password.";
  } else if (password !== confirmPassword) {
    fieldErrors.confirmPassword = "Passwords do not match.";
  }
  if (!acceptedTerms) {
    fieldErrors.terms = "You must accept the terms and privacy policy.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error: "Please correct the highlighted fields before signing up.",
      fieldErrors,
    };
  }

  const name = `${firstName} ${lastName}`.trim();
  const address = {
    division,
    district,
    upazila,
    postOffice,
    postCode: postCode || undefined,
    area,
    zone,
  };

  try {
    const response = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email: email || undefined,
        phone: phone || undefined,
        address,
        password,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        ok: false,
        error: await parseApiError(response, "Unable to create your account."),
      };
    }

    await signIn("customer-credentials", {
      identifier: phone,
      password,
      redirect: false,
    });

    return { ok: true, redirectTo: callbackUrl };
  } catch (error: unknown) {
    if (isCredentialsError(error)) {
      return {
        ok: false,
        error: "Account created, but automatic sign-in failed. Please sign in.",
      };
    }
    return { ok: false, error: "Unable to create your account. Try again." };
  }
}
