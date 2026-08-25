"use client";

import { signupAction, type SignupResult } from "@/app/actions/auth";
import PasswordInput from "@/component/auth/PasswordInput";
import {
  getAllDivisions,
  getCityCorporationsByDistrict,
  getDistrictsByDivision,
  getThanasByCityCorporation,
  getUnionsByUpazila,
  getUpazilasByDistrict,
} from "bangladesh-geo-data";
import {
  ArrowRight,
  AtSign,
  LockKeyhole,
  LoaderCircle,
  MapPin,
  ShieldCheck,
  Smartphone,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo, useState } from "react";

const DELIVERY_ZONES = ["Inside Dhaka", "Outside Dhaka"] as const;
const inputClassName =
  "h-12 w-full rounded-xl border border-foreground/10 bg-foreground/[0.025] px-4 text-sm text-foreground outline-none transition placeholder:text-foreground/35 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.04]";
const labelClassName = "mb-2 block text-xs font-bold text-foreground/70";
const initialSignupState: SignupResult = { ok: false };

const Signup = ({ callbackUrl = "/" }: { callbackUrl?: string }) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialSignupState,
  );
  const [divisionId, setDivisionId] = useState("");
  const [zone, setZone] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [upazilaId, setUpazilaId] = useState("");
  const [postOfficeId, setPostOfficeId] = useState("");
  const [postCode, setPostCode] = useState("");
  const [cityCorpId, setCityCorpId] = useState("");
  const [thanaId, setThanaId] = useState("");

  const divisions = useMemo(() => getAllDivisions(), []);
  const districtOptions = divisionId ? getDistrictsByDivision(divisionId) : [];
  const upazilaOptions = districtId ? getUpazilasByDistrict(districtId) : [];
  const postOfficeOptions = upazilaId ? getUnionsByUpazila(upazilaId) : [];
  const divisionName =
    divisions.find((division) => division.id === divisionId)?.name ?? "";
  const isDhakaDivision = divisionName === "Dhaka";
  const dhakaDistrictId = isDhakaDivision
    ? (districtOptions.find((district) => district.name === "Dhaka")?.id ?? "")
    : "";
  const cityCorporationOptions = dhakaDistrictId
    ? getCityCorporationsByDistrict(dhakaDistrictId)
    : [];
  const thanaOptions = cityCorpId ? getThanasByCityCorporation(cityCorpId) : [];
  const districtName =
    districtOptions.find((district) => district.id === districtId)?.name ?? "";
  const upazilaName =
    upazilaOptions.find((upazila) => upazila.id === upazilaId)?.name ?? "";
  const postOfficeName =
    postOfficeOptions.find((item) => item.id === postOfficeId)?.postOffice ??
    "";
  const cityCorporationName =
    cityCorporationOptions.find((item) => item.id === cityCorpId)?.name ?? "";
  const thanaName =
    thanaOptions.find((thana) => thana.id === thanaId)?.name ?? "";
  const isInsideDhaka = isDhakaDivision && zone === "Inside Dhaka";
  const showOutsideDhakaFields =
    Boolean(divisionId) && (!isDhakaDivision || zone === "Outside Dhaka");
  const effectiveDistrict = isInsideDhaka ? "Dhaka" : districtName;
  const effectiveUpazila = isInsideDhaka ? cityCorporationName : upazilaName;
  const effectivePostOffice = isInsideDhaka ? thanaName : postOfficeName;

  useEffect(() => {
    if (state.ok && state.redirectTo) router.replace(state.redirectTo);
  }, [router, state.ok, state.redirectTo]);

  const resetAddressDetails = () => {
    setDistrictId("");
    setUpazilaId("");
    setPostOfficeId("");
    setPostCode("");
    setCityCorpId("");
    setThanaId("");
  };
  const handleDivisionChange = (id: string) => {
    setDivisionId(id);
    resetAddressDetails();
    const name = divisions.find((division) => division.id === id)?.name ?? "";
    setZone(name === "Dhaka" ? "" : "Outside Dhaka");
  };
  const handleZoneChange = (value: string) => {
    setZone(value);
    resetAddressDetails();
  };
  const handleDistrictChange = (id: string) => {
    setDistrictId(id);
    setUpazilaId("");
    setPostOfficeId("");
    setPostCode("");
  };
  const handleUpazilaChange = (id: string) => {
    setUpazilaId(id);
    setPostOfficeId("");
    setPostCode("");
  };
  const handlePostOfficeChange = (id: string) => {
    setPostOfficeId(id);
    setPostCode(
      postOfficeOptions.find((item) => item.id === id)?.postalCode ?? "",
    );
  };

  return (
    <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[#f2f7f5] px-4 py-10 text-foreground dark:bg-[#06100e] sm:px-6 sm:py-14 lg:py-20">
      <Image
        src="/assets/home/hero-bg.svg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover opacity-[0.08] dark:opacity-20"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-white/95 via-white/85 to-[#dcece7]/85 dark:from-[#06100e]/95 dark:via-[#06100e]/90 dark:to-[#0b2a24]/85" />
      <div className="absolute -left-28 top-20 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -right-32 bottom-10 -z-10 h-80 w-80 rounded-full bg-teal-300/15 blur-3xl" />

      <div className="mx-auto w-full max-w-5xl rounded-[2rem] border border-white/70 bg-white/90 py-8 pl-5 pr-14 shadow-[0_28px_90px_rgba(0,55,45,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1412]/90 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary dark:text-teal-400">
            Create an account
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Create your customer <span className="title-gradient">account</span>
          </h1>
          <p className="mt-3 text-sm leading-6 text-foreground/55">
            Enter your details and delivery address for a faster checkout.
          </p>
        </div>

        <form
          action={formAction}
          className="space-y-6"
          aria-label="Customer sign up form"
        >
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <input type="hidden" name="division" value={divisionName} />
          <input type="hidden" name="zone" value={zone} />
          <input type="hidden" name="district" value={effectiveDistrict} />
          <input type="hidden" name="upazila" value={effectiveUpazila} />
          <input type="hidden" name="postOffice" value={effectivePostOffice} />

          {state.error && (
            <div
              role="alert"
              aria-live="polite"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300"
            >
              <p className="font-bold">{state.error}</p>
              {state.fieldErrors && (
                <ul className="mt-1 list-disc space-y-0.5 pl-5 text-xs">
                  {Object.entries(state.fieldErrors).map(([field, message]) => (
                    <li key={field}>{message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <fieldset className="rounded-2xl border border-foreground/[0.08] bg-background/60 p-5 sm:p-6">
            <legend className="sr-only">Personal information</legend>
            <SectionHeading
              icon={<UserRound className="h-4 w-4" />}
              title="Personal information"
              description="Tell us who this account belongs to."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="First name"
                id="signup-first-name"
                required
                error={state.fieldErrors?.firstName}
              >
                <input
                  id="signup-first-name"
                  name="firstName"
                  autoComplete="given-name"
                  placeholder="Enter first name"
                  className={inputClassName}
                  required
                  maxLength={50}
                  aria-invalid={Boolean(state.fieldErrors?.firstName)}
                  aria-describedby={
                    state.fieldErrors?.firstName
                      ? "signup-first-name-error"
                      : undefined
                  }
                />
              </Field>
              <Field
                label="Last name"
                id="signup-last-name"
                required
                error={state.fieldErrors?.lastName}
              >
                <input
                  id="signup-last-name"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder="Enter last name"
                  className={inputClassName}
                  required
                  maxLength={50}
                  aria-invalid={Boolean(state.fieldErrors?.lastName)}
                  aria-describedby={
                    state.fieldErrors?.lastName
                      ? "signup-last-name-error"
                      : undefined
                  }
                />
              </Field>
              <div>
                <label htmlFor="signup-phone" className={labelClassName}>
                  Phone number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Smartphone
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary"
                  />
                  <input
                    id="signup-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+8801XXXXXXXXX"
                    className={`${inputClassName} pl-11`}
                    required
                    pattern="[+]?[0-9]{7,15}"
                    title="Use 7 to 15 digits, optionally starting with +"
                    aria-invalid={Boolean(state.fieldErrors?.phone)}
                    aria-describedby={
                      state.fieldErrors?.phone
                        ? "signup-phone-error"
                        : undefined
                    }
                  />
                </div>
                {state.fieldErrors?.phone && (
                  <p
                    id="signup-phone-error"
                    className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                  >
                    {state.fieldErrors.phone}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="signup-email" className={labelClassName}>
                  Email address{" "}
                  <span className="font-normal text-foreground/40">
                    (optional)
                  </span>
                </label>
                <div className="relative">
                  <AtSign
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary"
                  />
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`${inputClassName} pl-11`}
                    aria-invalid={Boolean(state.fieldErrors?.email)}
                    aria-describedby={
                      state.fieldErrors?.email
                        ? "signup-email-error"
                        : undefined
                    }
                  />
                </div>
                {state.fieldErrors?.email && (
                  <p
                    id="signup-email-error"
                    className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                  >
                    {state.fieldErrors.email}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-foreground/[0.08] bg-background/60 p-5 sm:p-6">
            <legend className="sr-only">Shipping address</legend>
            <SectionHeading
              icon={<MapPin className="h-4 w-4" />}
              title="Shipping address"
              description="Add the location where you want orders delivered."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Division"
                id="signup-division"
                required
                error={state.fieldErrors?.division}
              >
                <select
                  id="signup-division"
                  name="divisionId"
                  value={divisionId}
                  onChange={(event) => handleDivisionChange(event.target.value)}
                  className={inputClassName}
                  required
                  aria-invalid={Boolean(state.fieldErrors?.division)}
                  aria-describedby={
                    state.fieldErrors?.division
                      ? "signup-division-error"
                      : undefined
                  }
                >
                  <option value="">Select division</option>
                  {divisions.map((division) => (
                    <option key={division.id} value={division.id}>
                      {division.name}
                    </option>
                  ))}
                </select>
              </Field>

              {isDhakaDivision && (
                <Field
                  label="Delivery zone"
                  id="signup-zone"
                  required
                  error={state.fieldErrors?.zone}
                >
                  <select
                    id="signup-zone"
                    name="zoneSelection"
                    value={zone}
                    onChange={(event) => handleZoneChange(event.target.value)}
                    className={inputClassName}
                    required
                    aria-invalid={Boolean(state.fieldErrors?.zone)}
                    aria-describedby={
                      state.fieldErrors?.zone ? "signup-zone-error" : undefined
                    }
                  >
                    <option value="">Select delivery zone</option>
                    {DELIVERY_ZONES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              {isInsideDhaka && (
                <>
                  <Field
                    label="City corporation"
                    id="signup-city-corporation"
                    required
                    error={state.fieldErrors?.upazila}
                  >
                    <select
                      id="signup-city-corporation"
                      name="cityCorporationId"
                      value={cityCorpId}
                      onChange={(event) => {
                        setCityCorpId(event.target.value);
                        setThanaId("");
                      }}
                      className={inputClassName}
                      required
                      aria-invalid={Boolean(state.fieldErrors?.upazila)}
                      aria-describedby={
                        state.fieldErrors?.upazila
                          ? "signup-city-corporation-error"
                          : undefined
                      }
                    >
                      <option value="">Select city corporation</option>
                      {cityCorporationOptions.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    label="Thana / area"
                    id="signup-thana"
                    required
                    error={state.fieldErrors?.postOffice}
                  >
                    <select
                      id="signup-thana"
                      name="thanaId"
                      value={thanaId}
                      onChange={(event) => setThanaId(event.target.value)}
                      className={inputClassName}
                      disabled={!cityCorpId}
                      required
                      aria-invalid={Boolean(state.fieldErrors?.postOffice)}
                      aria-describedby={
                        state.fieldErrors?.postOffice
                          ? "signup-thana-error"
                          : undefined
                      }
                    >
                      <option value="">
                        {cityCorpId
                          ? "Select thana"
                          : "Select a city corporation first"}
                      </option>
                      {thanaOptions.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                </>
              )}

              {showOutsideDhakaFields && (
                <>
                  <Field
                    label="District"
                    id="signup-district"
                    required
                    error={state.fieldErrors?.district}
                  >
                    <select
                      id="signup-district"
                      name="districtId"
                      value={districtId}
                      onChange={(event) =>
                        handleDistrictChange(event.target.value)
                      }
                      className={inputClassName}
                      required
                      aria-invalid={Boolean(state.fieldErrors?.district)}
                      aria-describedby={
                        state.fieldErrors?.district
                          ? "signup-district-error"
                          : undefined
                      }
                    >
                      <option value="">Select district</option>
                      {districtOptions.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    label="Upazila"
                    id="signup-upazila"
                    required
                    error={state.fieldErrors?.upazila}
                  >
                    <select
                      id="signup-upazila"
                      name="upazilaId"
                      value={upazilaId}
                      onChange={(event) =>
                        handleUpazilaChange(event.target.value)
                      }
                      className={inputClassName}
                      disabled={!districtId}
                      required
                      aria-invalid={Boolean(state.fieldErrors?.upazila)}
                      aria-describedby={
                        state.fieldErrors?.upazila
                          ? "signup-upazila-error"
                          : undefined
                      }
                    >
                      <option value="">
                        {districtId
                          ? "Select upazila"
                          : "Select a district first"}
                      </option>
                      {upazilaOptions.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  {upazilaId && (
                    <>
                      <Field
                        label="Post office"
                        id="signup-post-office"
                        required
                        error={state.fieldErrors?.postOffice}
                      >
                        <select
                          id="signup-post-office"
                          name="postOfficeId"
                          value={postOfficeId}
                          onChange={(event) =>
                            handlePostOfficeChange(event.target.value)
                          }
                          className={inputClassName}
                          required
                          aria-invalid={Boolean(state.fieldErrors?.postOffice)}
                          aria-describedby={
                            state.fieldErrors?.postOffice
                              ? "signup-post-office-error"
                              : undefined
                          }
                        >
                          <option value="">Select post office</option>
                          {postOfficeOptions.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.postOffice}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field
                        label="Post code"
                        id="signup-post-code"
                        error={state.fieldErrors?.postCode}
                      >
                        <input
                          id="signup-post-code"
                          name="postCode"
                          value={postCode}
                          onChange={(event) => setPostCode(event.target.value)}
                          placeholder="Auto-filled from post office"
                          className={inputClassName}
                          inputMode="numeric"
                          pattern="[0-9]{4}"
                          maxLength={4}
                          aria-invalid={Boolean(state.fieldErrors?.postCode)}
                          aria-describedby={
                            state.fieldErrors?.postCode
                              ? "signup-post-code-error"
                              : undefined
                          }
                        />
                      </Field>
                    </>
                  )}
                </>
              )}

              {isInsideDhaka && (
                <Field
                  label="Post code"
                  id="signup-post-code"
                  error={state.fieldErrors?.postCode}
                >
                  <input
                    id="signup-post-code"
                    name="postCode"
                    value={postCode}
                    onChange={(event) => setPostCode(event.target.value)}
                    placeholder="Enter post code"
                    className={inputClassName}
                    inputMode="numeric"
                    pattern="[0-9]{4}"
                    maxLength={4}
                    aria-invalid={Boolean(state.fieldErrors?.postCode)}
                    aria-describedby={
                      state.fieldErrors?.postCode
                        ? "signup-post-code-error"
                        : undefined
                    }
                  />
                </Field>
              )}
              <div className="sm:col-span-2">
                <Field
                  label="Area / street"
                  id="signup-area"
                  required
                  error={state.fieldErrors?.area}
                >
                  <input
                    id="signup-area"
                    name="area"
                    autoComplete="street-address"
                    placeholder="House, road, sector or village"
                    className={inputClassName}
                    required
                    minLength={3}
                    aria-invalid={Boolean(state.fieldErrors?.area)}
                    aria-describedby={
                      state.fieldErrors?.area ? "signup-area-error" : undefined
                    }
                  />
                </Field>
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-foreground/[0.08] bg-background/60 p-5 sm:p-6">
            <legend className="sr-only">Account security</legend>
            <SectionHeading
              icon={<LockKeyhole className="h-4 w-4" />}
              title="Account security"
              description="Use at least 8 characters for a secure password."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Password"
                id="signup-password"
                required
                error={state.fieldErrors?.password}
              >
                <PasswordInput
                  id="signup-password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  required
                  ariaInvalid={Boolean(state.fieldErrors?.password)}
                  ariaDescribedBy={
                    state.fieldErrors?.password
                      ? "signup-password-error"
                      : undefined
                  }
                />
              </Field>
              <Field
                label="Confirm password"
                id="signup-confirm-password"
                required
                error={state.fieldErrors?.confirmPassword}
              >
                <PasswordInput
                  id="signup-confirm-password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Enter password again"
                  required
                  ariaInvalid={Boolean(state.fieldErrors?.confirmPassword)}
                  ariaDescribedBy={
                    state.fieldErrors?.confirmPassword
                      ? "signup-confirm-password-error"
                      : undefined
                  }
                />
              </Field>
            </div>
          </fieldset>

          <div className="flex flex-col gap-5 px-1 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex max-w-xl cursor-pointer items-start gap-2.5 text-xs leading-5 text-foreground/55">
              <input
                type="checkbox"
                name="terms"
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-foreground/20 accent-primary"
                required
                aria-invalid={Boolean(state.fieldErrors?.terms)}
              />
              <span>
                I agree to the{" "}
                <Link
                  href="/terms-of-service"
                  className="font-semibold text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {state.fieldErrors?.terms && (
              <p className="text-xs text-red-600 dark:text-red-400 sm:order-3 sm:w-full">
                {state.fieldErrors.terms}
              </p>
            )}
            <button
              type="submit"
              disabled={isPending}
              className="group flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-[#008c75] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {isPending ? (
                <>
                  <LoaderCircle
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin"
                  />
                  Creating account…
                </>
              ) : (
                <>
                  Create account{" "}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 border-t border-foreground/[0.08] pt-6 text-center">
          <p className="text-sm text-foreground/55">
            Already have an account?{" "}
            <Link
              href={`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="font-bold text-primary transition-colors hover:text-[#008c75]"
            >
              Sign in
            </Link>
          </p>
          <p className="mt-3 flex items-center justify-center gap-2 text-[11px] text-foreground/40">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
            Your information is protected and securely handled.
          </p>
        </div>
      </div>
    </section>
  );
};

const SectionHeading = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="mb-5 flex items-center gap-3">
    <span
      aria-hidden="true"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
    >
      {icon}
    </span>
    <div>
      <h2 className="text-sm font-bold">{title}</h2>
      <p className="mt-0.5 text-xs text-foreground/45">{description}</p>
    </div>
  </div>
);

const Field = ({
  label,
  id,
  required = false,
  error,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label htmlFor={id} className={labelClassName}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && (
      <p
        id={`${id}-error`}
        className="mt-1.5 text-xs text-red-600 dark:text-red-400"
      >
        {error}
      </p>
    )}
  </div>
);

export default Signup;
