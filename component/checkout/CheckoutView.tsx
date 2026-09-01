"use client";

import { createOrderAction, type CreateOrderResult } from "@/app/actions/order";
import type { CustomerProfile } from "@/app/actions/user";
import { staticProducts } from "@/component/shop/staticProducts";
import { useShopStore } from "@/component/shop/shopStore";
import {
  getAllDivisions,
  getCityCorporationsByDistrict,
  getDistrictsByDivision,
  getThanasByCityCorporation,
  getUnionsByUpazila,
  getUpazilasByDistrict,
} from "bangladesh-geo-data";
import { Check, Home, LockKeyhole, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import {
  ReactNode,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const DELIVERY_ZONES = ["Inside Dhaka", "Outside Dhaka"] as const;
const OBJECT_ID_PATTERN = /^[a-f\d]{24}$/i;
const inputClassName =
  "h-12 w-full rounded-xl border border-foreground/10 bg-foreground/[0.025] px-4 text-sm text-foreground outline-none transition placeholder:text-foreground/35 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.04]";
const labelClassName = "mb-2 block text-xs font-bold text-foreground/70";
const initialOrderState: CreateOrderResult = { ok: false };

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD").format(Math.max(0, Math.round(price)));

const getInitialAddressSelection = (user: CustomerProfile | null) => {
  const address = user?.address;
  const divisions = getAllDivisions();
  const divisionId =
    divisions.find(({ name }) => name === address?.division)?.id ?? "";
  const zone =
    address?.zone ??
    (address?.division && address.division !== "Dhaka" ? "Outside Dhaka" : "");
  const districts = divisionId ? getDistrictsByDivision(divisionId) : [];
  const districtId =
    districts.find(({ name }) => name === address?.district)?.id ?? "";
  const upazilas = districtId ? getUpazilasByDistrict(districtId) : [];
  const upazilaId =
    upazilas.find(({ name }) => name === address?.upazila)?.id ?? "";
  const postOffices = upazilaId ? getUnionsByUpazila(upazilaId) : [];
  const postOfficeId =
    postOffices.find(({ postOffice }) => postOffice === address?.postOffice)
      ?.id ?? "";

  const dhakaDistrictId =
    address?.division === "Dhaka"
      ? (districts.find(({ name }) => name === "Dhaka")?.id ?? "")
      : "";
  const cityCorporations = dhakaDistrictId
    ? getCityCorporationsByDistrict(dhakaDistrictId)
    : [];
  const cityCorpId =
    zone === "Inside Dhaka"
      ? (cityCorporations.find(({ name }) => name === address?.upazila)?.id ??
        "")
      : "";
  const thanas = cityCorpId ? getThanasByCityCorporation(cityCorpId) : [];
  const thanaId =
    zone === "Inside Dhaka"
      ? (thanas.find(({ name }) => name === address?.postOffice)?.id ?? "")
      : "";

  return {
    divisionId,
    zone,
    districtId: zone === "Inside Dhaka" ? "" : districtId,
    upazilaId: zone === "Inside Dhaka" ? "" : upazilaId,
    postOfficeId: zone === "Inside Dhaka" ? "" : postOfficeId,
    postCode: address?.postCode ?? "",
    cityCorpId,
    thanaId,
  };
};

const CheckoutView = ({
  initialUser = null,
}: {
  initialUser?: CustomerProfile | null;
}) => {
  const { cart, catalog, clearCart } = useShopStore();
  const [orderState, formAction, isOrdering] = useActionState(
    createOrderAction,
    initialOrderState,
  );
  const initialAddress = useMemo(
    () => getInitialAddressSelection(initialUser),
    [initialUser],
  );
  const [divisionId, setDivisionId] = useState(initialAddress.divisionId);
  const [zone, setZone] = useState(initialAddress.zone);
  const [districtId, setDistrictId] = useState(initialAddress.districtId);
  const [upazilaId, setUpazilaId] = useState(initialAddress.upazilaId);
  const [postOfficeId, setPostOfficeId] = useState(initialAddress.postOfficeId);
  const [postCode, setPostCode] = useState(initialAddress.postCode);
  const [cityCorpId, setCityCorpId] = useState(initialAddress.cityCorpId);
  const [thanaId, setThanaId] = useState(initialAddress.thanaId);
  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
  const [shippingZone, setShippingZone] = useState("");
  const successDialogRef = useRef<HTMLDivElement>(null);

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
  const isInsideDhaka = isDhakaDivision && zone === "Inside Dhaka";
  const showOutsideDhakaFields =
    Boolean(divisionId) && (!isDhakaDivision || zone === "Outside Dhaka");
  const districtName =
    districtOptions.find(({ id }) => id === districtId)?.name ?? "";
  const upazilaName =
    upazilaOptions.find(({ id }) => id === upazilaId)?.name ?? "";
  const postOfficeName =
    postOfficeOptions.find(({ id }) => id === postOfficeId)?.postOffice ?? "";
  const cityCorporationName =
    cityCorporationOptions.find(({ id }) => id === cityCorpId)?.name ?? "";
  const thanaName = thanaOptions.find(({ id }) => id === thanaId)?.name ?? "";

  const cartProducts = cart.flatMap((item) => {
    const product =
      catalog[item.productId] ??
      staticProducts.find(({ id }) => id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const hasUnavailableItems = cart.some(
    ({ productId }) => !OBJECT_ID_PATTERN.test(productId),
  );
  const subtotal = cartProducts.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const effectiveInsideDhaka = shipToDifferentAddress
    ? shippingZone === "Inside Dhaka"
    : isInsideDhaka;
  const shipping = subtotal > 0 ? (effectiveInsideDhaka ? 80 : 150) : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!orderState.ok) return;

    clearCart();
    successDialogRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [clearCart, orderState.ok]);

  const resetAddressDetails = () => {
    setDistrictId("");
    setUpazilaId("");
    setPostOfficeId("");
    setPostCode("");
    setCityCorpId("");
    setThanaId("");
  };

  return (
    <section className="bg-background py-10 text-foreground sm:py-14 lg:py-16">
      <div className="container">
        <form
          action={formAction}
          className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-10"
          aria-label="Checkout form"
        >
          <input
            type="hidden"
            name="items"
            value={JSON.stringify(
              cart.map(({ productId, quantity }) => ({ productId, quantity })),
            )}
          />
          <input type="hidden" name="billingDivision" value={divisionName} />
          <input type="hidden" name="billingZone" value={zone} />
          <input
            type="hidden"
            name="billingDistrict"
            value={isInsideDhaka ? "Dhaka" : districtName}
          />
          <input
            type="hidden"
            name="billingUpazila"
            value={isInsideDhaka ? cityCorporationName : upazilaName}
          />
          <input
            type="hidden"
            name="billingPostOffice"
            value={isInsideDhaka ? thanaName : postOfficeName}
          />
          <input type="hidden" name="billingPostCode" value={postCode} />
          <div className="rounded-3xl border border-foreground/[0.08] bg-foreground/[0.025] p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.035] sm:p-7 lg:p-8">
            <div className="mb-7 flex items-center justify-between border-b border-foreground/10 pb-5 dark:border-white/10">
              <div>
                <h2 className="font-heading text-xl font-bold">
                  Billing details
                </h2>
                {initialUser ? (
                  <p className="mt-1 text-xs font-semibold text-primary dark:text-teal-400">
                    Your saved account details are ready to review.
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-foreground/45">
                    Fields marked with * are required.
                  </p>
                )}
              </div>
              <span className="hidden h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary sm:flex">
                <LockKeyhole aria-hidden="true" className="h-4 w-4" />
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="First name" id="checkout-first-name" required>
                <input
                  id="checkout-first-name"
                  name="firstName"
                  autoComplete="given-name"
                  defaultValue={initialUser?.firstName}
                  placeholder="Enter first name"
                  className={inputClassName}
                  required
                />
              </Field>
              <Field label="Last name" id="checkout-last-name" required>
                <input
                  id="checkout-last-name"
                  name="lastName"
                  autoComplete="family-name"
                  defaultValue={initialUser?.lastName}
                  placeholder="Enter last name"
                  className={inputClassName}
                  required
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Company name (optional)" id="checkout-company">
                  <input
                    id="checkout-company"
                    name="company"
                    autoComplete="organization"
                    defaultValue={initialUser?.companyName}
                    placeholder="Enter company name"
                    className={inputClassName}
                  />
                </Field>
              </div>

              <Field label="Phone number" id="checkout-phone" required>
                <input
                  id="checkout-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  defaultValue={initialUser?.phone}
                  placeholder="+8801XXXXXXXXX"
                  className={inputClassName}
                  pattern="[+]?[0-9]{7,15}"
                  required
                />
              </Field>
              <Field label="Email address (optional)" id="checkout-email">
                <input
                  id="checkout-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={initialUser?.email}
                  placeholder="you@example.com"
                  className={inputClassName}
                />
              </Field>

              <Field label="Division" id="checkout-division" required>
                <select
                  id="checkout-division"
                  name="division"
                  value={divisionId}
                  onChange={(event) => {
                    const nextDivision = event.target.value;
                    setDivisionId(nextDivision);
                    resetAddressDetails();
                    const nextName =
                      divisions.find(({ id }) => id === nextDivision)?.name ??
                      "";
                    setZone(nextName === "Dhaka" ? "" : "Outside Dhaka");
                  }}
                  className={inputClassName}
                  required
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
                <Field label="Delivery zone" id="checkout-zone" required>
                  <select
                    id="checkout-zone"
                    name="zone"
                    value={zone}
                    onChange={(event) => {
                      setZone(event.target.value);
                      resetAddressDetails();
                    }}
                    className={inputClassName}
                    required
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
                    id="checkout-city-corporation"
                    required
                  >
                    <select
                      id="checkout-city-corporation"
                      name="cityCorporation"
                      value={cityCorpId}
                      onChange={(event) => {
                        setCityCorpId(event.target.value);
                        setThanaId("");
                      }}
                      className={inputClassName}
                      required
                    >
                      <option value="">Select city corporation</option>
                      {cityCorporationOptions.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Thana / area" id="checkout-thana" required>
                    <select
                      id="checkout-thana"
                      name="thana"
                      value={thanaId}
                      onChange={(event) => setThanaId(event.target.value)}
                      className={inputClassName}
                      disabled={!cityCorpId}
                      required
                    >
                      <option value="">
                        {cityCorpId
                          ? "Select thana"
                          : "Select city corporation first"}
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
                  <Field label="District" id="checkout-district" required>
                    <select
                      id="checkout-district"
                      name="district"
                      value={districtId}
                      onChange={(event) => {
                        setDistrictId(event.target.value);
                        setUpazilaId("");
                        setPostOfficeId("");
                        setPostCode("");
                      }}
                      className={inputClassName}
                      required
                    >
                      <option value="">Select district</option>
                      {districtOptions.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Upazila" id="checkout-upazila" required>
                    <select
                      id="checkout-upazila"
                      name="upazila"
                      value={upazilaId}
                      onChange={(event) => {
                        setUpazilaId(event.target.value);
                        setPostOfficeId("");
                        setPostCode("");
                      }}
                      className={inputClassName}
                      disabled={!districtId}
                      required
                    >
                      <option value="">
                        {districtId
                          ? "Select upazila"
                          : "Select district first"}
                      </option>
                      {upazilaOptions.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  {upazilaId && (
                    <Field
                      label="Post office"
                      id="checkout-post-office"
                      required
                    >
                      <select
                        id="checkout-post-office"
                        name="postOffice"
                        value={postOfficeId}
                        onChange={(event) => {
                          const nextId = event.target.value;
                          setPostOfficeId(nextId);
                          setPostCode(
                            postOfficeOptions.find(({ id }) => id === nextId)
                              ?.postalCode ?? "",
                          );
                        }}
                        className={inputClassName}
                        required
                      >
                        <option value="">Select post office</option>
                        {postOfficeOptions.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.postOffice}
                          </option>
                        ))}
                      </select>
                    </Field>
                  )}
                </>
              )}

              {(isInsideDhaka || postOfficeId) && (
                <Field label="Post code" id="checkout-post-code">
                  <input
                    id="checkout-post-code"
                    value={postCode}
                    onChange={(event) => setPostCode(event.target.value)}
                    inputMode="numeric"
                    pattern="[0-9]{4}"
                    maxLength={4}
                    placeholder="Enter post code"
                    className={inputClassName}
                  />
                </Field>
              )}

              <div className="sm:col-span-2">
                <Field label="Street address" id="checkout-address" required>
                  <input
                    id="checkout-address"
                    name="billingArea"
                    autoComplete="street-address"
                    defaultValue={initialUser?.address.area}
                    placeholder="House number, road, sector or village"
                    className={inputClassName}
                    required
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Order notes (optional)" id="checkout-notes">
                  <textarea
                    id="checkout-notes"
                    name="notes"
                    rows={4}
                    placeholder="Notes about your order, e.g. delivery instructions"
                    className={`${inputClassName} h-28 resize-none py-3`}
                  />
                </Field>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-foreground/10 pt-5 text-xs text-foreground/60 dark:border-white/10">
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  name="shipToDifferentAddress"
                  checked={shipToDifferentAddress}
                  onChange={(event) => {
                    setShipToDifferentAddress(event.target.checked);
                    if (!event.target.checked) setShippingZone("");
                  }}
                  className="h-4 w-4 rounded accent-primary"
                />
                <span>Ship to a different address?</span>
              </label>
              {shipToDifferentAddress && (
                <ShippingAddressFields onZoneChange={setShippingZone} />
              )}
            </div>
          </div>

          <aside className="rounded-3xl border border-foreground/[0.08] bg-foreground/[0.035] p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.05] sm:p-7 lg:sticky lg:top-28">
            <h2 className="font-heading text-xl font-bold">Your order</h2>
            <div className="mt-6 flex items-center justify-between border-b border-foreground/15 pb-3 text-xs font-bold uppercase tracking-wider dark:border-white/15">
              <span>Product</span>
              <span>Total</span>
            </div>
            <div className="divide-y divide-foreground/10 text-xs dark:divide-white/10">
              {cartProducts.length > 0 ? (
                cartProducts.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-4 py-3.5">
                    <span className="min-w-0 flex-1 text-foreground/60">
                      {product.title}{" "}
                      <strong className="whitespace-nowrap text-foreground/40">
                        × {quantity}
                      </strong>
                    </span>
                    <span className="shrink-0 font-semibold">
                      ৳ {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center py-8 text-center text-foreground/45">
                  <ShoppingBag aria-hidden="true" className="mb-2 h-6 w-6" />
                  <span>Your cart is empty.</span>
                  <Link href="/shop" className="mt-2 font-bold text-primary">
                    Browse products
                  </Link>
                </div>
              )}
            </div>

            <SummaryRow label="Subtotal" value={`৳ ${formatPrice(subtotal)}`} />
            <SummaryRow
              label="Shipping"
              value={
                shipping
                  ? `৳ ${formatPrice(shipping)}`
                  : subtotal
                    ? "Calculated by address"
                    : "—"
              }
            />
            <div className="mt-1 flex items-center justify-between border-y border-foreground/15 py-4 dark:border-white/15">
              <span className="font-heading text-lg font-bold">Total</span>
              <span className="font-heading text-lg font-bold text-primary dark:text-teal-400">
                ৳ {formatPrice(total)}
              </span>
            </div>

            <fieldset className="mt-6">
              <legend className="text-sm font-bold">Payment method</legend>
              <div className="mt-3 space-y-2.5">
                <PaymentOption
                  value="cod"
                  label="Cash on delivery"
                  selected="cod"
                />
                <PaymentOption
                  value="bkash"
                  label="Mobile banking"
                  selected="cod"
                  badge="bKash · Nagad"
                  disabled
                />
                <PaymentOption
                  value="card"
                  label="Debit / credit card"
                  selected="cod"
                  badge="VISA · MC"
                  disabled
                />
              </div>
            </fieldset>

            <p className="mt-5 text-[11px] leading-5 text-foreground/45">
              Your personal data will be used to process your order and support
              your experience throughout this website.
            </p>
            {orderState.error && (
              <p
                role="alert"
                className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-xs font-semibold leading-5 text-rose-700 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-300"
              >
                {orderState.error}
              </p>
            )}
            {hasUnavailableItems && !orderState.ok && (
              <p
                role="alert"
                className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-xs font-semibold leading-5 text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300"
              >
                Some older cart items are no longer orderable. Remove them and
                add the current products from the shop.
              </p>
            )}
            <button
              type="submit"
              disabled={
                cartProducts.length === 0 ||
                hasUnavailableItems ||
                isOrdering ||
                orderState.ok
              }
              className="mt-5 h-12 w-full cursor-pointer rounded-full bg-primary px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(0,110,92,0.2)] transition hover:bg-[#008c75] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isOrdering
                ? "Placing order…"
                : orderState.ok
                  ? "Order placed"
                  : "Place order"}
            </button>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-foreground/40">
              <LockKeyhole aria-hidden="true" className="h-3 w-3" />
              Secure checkout
            </div>
          </aside>
        </form>
      </div>

      {orderState.ok && orderState.orderNumber && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 px-4 py-8 backdrop-blur-sm motion-safe:animate-[checkout-fade-in_240ms_ease-out_both]"
          role="presentation"
        >
          <div
            ref={successDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-success-title"
            aria-describedby="order-success-description"
            tabIndex={-1}
            className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/70 bg-background p-6 text-center shadow-[0_30px_90px_rgba(0,0,0,0.35)] outline-none motion-safe:animate-[checkout-modal-in_480ms_cubic-bezier(0.16,1,0.3,1)_both] dark:border-white/10 sm:p-9"
          >
            <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-16 h-44 w-44 rounded-full bg-teal-300/15 blur-3xl" />
            <Sparkles
              aria-hidden="true"
              className="absolute right-8 top-8 h-5 w-5 text-amber-400 motion-safe:animate-[checkout-sparkle_1.8s_ease-in-out_infinite]"
            />

            <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-primary/15 motion-safe:animate-[checkout-success-ring_1.8s_ease-out_infinite]" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-[0_14px_35px_rgba(0,110,92,0.35)] motion-safe:animate-[checkout-success-pop_600ms_cubic-bezier(0.34,1.56,0.64,1)_180ms_both]">
                <Check aria-hidden="true" className="h-9 w-9" strokeWidth={3} />
              </span>
            </div>

            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.2em] text-primary dark:text-teal-400">
              Thank you
            </p>
            <h2
              id="order-success-title"
              className="mt-2 font-heading text-2xl font-bold sm:text-3xl"
            >
              Order confirmed!
            </h2>
            <p
              id="order-success-description"
              className="mx-auto mt-3 max-w-sm text-sm leading-6 text-foreground/55"
            >
              Your cash-on-delivery order has been received. We’ll contact you
              when it is ready for delivery.
            </p>

            <div className="mx-auto mt-5 rounded-2xl border border-primary/15 bg-primary/[0.06] px-4 py-3">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                Order number
              </span>
              <strong className="mt-1 block font-heading text-lg text-primary dark:text-teal-400">
                {orderState.orderNumber}
              </strong>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-foreground/15 bg-background px-5 text-xs font-bold transition hover:border-primary hover:text-primary dark:border-white/15"
              >
                <Home aria-hidden="true" className="h-4 w-4" />
                Go to home
              </Link>
              <Link
                href="/shop"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-xs font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-[#008c75]"
              >
                <ShoppingBag aria-hidden="true" className="h-4 w-4" />
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const ShippingAddressFields = ({
  onZoneChange,
}: {
  onZoneChange: (zone: string) => void;
}) => {
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
    divisions.find(({ id }) => id === divisionId)?.name ?? "";
  const isDhakaDivision = divisionName === "Dhaka";
  const dhakaDistrictId = isDhakaDivision
    ? (districtOptions.find(({ name }) => name === "Dhaka")?.id ?? "")
    : "";
  const cityCorporationOptions = dhakaDistrictId
    ? getCityCorporationsByDistrict(dhakaDistrictId)
    : [];
  const thanaOptions = cityCorpId ? getThanasByCityCorporation(cityCorpId) : [];
  const isInsideDhaka = isDhakaDivision && zone === "Inside Dhaka";
  const showOutsideDhakaFields =
    Boolean(divisionId) && (!isDhakaDivision || zone === "Outside Dhaka");
  const districtName =
    districtOptions.find(({ id }) => id === districtId)?.name ?? "";
  const upazilaName =
    upazilaOptions.find(({ id }) => id === upazilaId)?.name ?? "";
  const postOfficeName =
    postOfficeOptions.find(({ id }) => id === postOfficeId)?.postOffice ?? "";
  const cityCorporationName =
    cityCorporationOptions.find(({ id }) => id === cityCorpId)?.name ?? "";
  const thanaName = thanaOptions.find(({ id }) => id === thanaId)?.name ?? "";

  const resetDetails = () => {
    setDistrictId("");
    setUpazilaId("");
    setPostOfficeId("");
    setPostCode("");
    setCityCorpId("");
    setThanaId("");
  };

  const updateZone = (nextZone: string) => {
    setZone(nextZone);
    onZoneChange(nextZone);
  };

  return (
    <fieldset className="mt-5 rounded-2xl border border-foreground/10 bg-background/70 p-4 dark:border-white/10 dark:bg-black/10 sm:p-5">
      <legend className="px-2 font-heading text-base font-bold text-foreground">
        Shipping address
      </legend>
      <p className="mb-5 text-xs leading-5 text-foreground/45">
        Enter the address where this order should be delivered.
      </p>

      <input type="hidden" name="shippingDivision" value={divisionName} />
      <input type="hidden" name="shippingZone" value={zone} />
      <input
        type="hidden"
        name="shippingDistrict"
        value={isInsideDhaka ? "Dhaka" : districtName}
      />
      <input
        type="hidden"
        name="shippingUpazila"
        value={isInsideDhaka ? cityCorporationName : upazilaName}
      />
      <input
        type="hidden"
        name="shippingPostOffice"
        value={isInsideDhaka ? thanaName : postOfficeName}
      />
      <input type="hidden" name="shippingPostCode" value={postCode} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Division" id="shipping-division" required>
          <select
            id="shipping-division"
            name="shippingDivisionId"
            value={divisionId}
            onChange={(event) => {
              const nextId = event.target.value;
              const nextDivision =
                divisions.find(({ id }) => id === nextId)?.name ?? "";
              const nextZone =
                nextDivision && nextDivision !== "Dhaka" ? "Outside Dhaka" : "";

              setDivisionId(nextId);
              resetDetails();
              updateZone(nextZone);
            }}
            className={inputClassName}
            required
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
          <Field label="Delivery zone" id="shipping-zone" required>
            <select
              id="shipping-zone"
              name="shippingZoneSelection"
              value={zone}
              onChange={(event) => {
                updateZone(event.target.value);
                resetDetails();
              }}
              className={inputClassName}
              required
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
              id="shipping-city-corporation"
              required
            >
              <select
                id="shipping-city-corporation"
                name="shippingCityCorporation"
                value={cityCorpId}
                onChange={(event) => {
                  setCityCorpId(event.target.value);
                  setThanaId("");
                }}
                className={inputClassName}
                required
              >
                <option value="">Select city corporation</option>
                {cityCorporationOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Thana / area" id="shipping-thana" required>
              <select
                id="shipping-thana"
                name="shippingThana"
                value={thanaId}
                onChange={(event) => setThanaId(event.target.value)}
                className={inputClassName}
                disabled={!cityCorpId}
                required
              >
                <option value="">
                  {cityCorpId
                    ? "Select thana"
                    : "Select city corporation first"}
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
            <Field label="District" id="shipping-district" required>
              <select
                id="shipping-district"
                name="shippingDistrictId"
                value={districtId}
                onChange={(event) => {
                  setDistrictId(event.target.value);
                  setUpazilaId("");
                  setPostOfficeId("");
                  setPostCode("");
                }}
                className={inputClassName}
                required
              >
                <option value="">Select district</option>
                {districtOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Upazila" id="shipping-upazila" required>
              <select
                id="shipping-upazila"
                name="shippingUpazilaId"
                value={upazilaId}
                onChange={(event) => {
                  setUpazilaId(event.target.value);
                  setPostOfficeId("");
                  setPostCode("");
                }}
                className={inputClassName}
                disabled={!districtId}
                required
              >
                <option value="">
                  {districtId ? "Select upazila" : "Select district first"}
                </option>
                {upazilaOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Field>
            {upazilaId && (
              <Field label="Post office" id="shipping-post-office" required>
                <select
                  id="shipping-post-office"
                  name="shippingPostOfficeId"
                  value={postOfficeId}
                  onChange={(event) => {
                    const nextId = event.target.value;
                    setPostOfficeId(nextId);
                    setPostCode(
                      postOfficeOptions.find(({ id }) => id === nextId)
                        ?.postalCode ?? "",
                    );
                  }}
                  className={inputClassName}
                  required
                >
                  <option value="">Select post office</option>
                  {postOfficeOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.postOffice}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </>
        )}

        {(isInsideDhaka || postOfficeId) && (
          <Field label="Post code" id="shipping-post-code">
            <input
              id="shipping-post-code"
              value={postCode}
              onChange={(event) => setPostCode(event.target.value)}
              inputMode="numeric"
              pattern="[0-9]{4}"
              maxLength={4}
              placeholder="Enter post code"
              className={inputClassName}
            />
          </Field>
        )}

        <div className="sm:col-span-2">
          <Field label="Street address" id="shipping-address" required>
            <input
              id="shipping-address"
              name="shippingArea"
              autoComplete="shipping street-address"
              placeholder="House number, road, sector or village"
              className={inputClassName}
              required
            />
          </Field>
        </div>
      </div>
    </fieldset>
  );
};

const Field = ({
  label,
  id,
  required = false,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: ReactNode;
}) => (
  <div>
    <label htmlFor={id} className={labelClassName}>
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    {children}
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between border-t border-foreground/10 py-3.5 text-xs dark:border-white/10">
    <span className="font-semibold text-foreground/60">{label}</span>
    <span className="font-bold">{value}</span>
  </div>
);

const PaymentOption = ({
  value,
  label,
  selected,
  badge,
  disabled = false,
}: {
  value: string;
  label: string;
  selected: string;
  badge?: string;
  disabled?: boolean;
}) => (
  <label
    className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 text-xs transition ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${selected === value ? "border-primary bg-primary/[0.06]" : "border-foreground/10 bg-background/60 dark:border-white/10"}`}
  >
    <input
      type="radio"
      name="paymentMethod"
      value={value}
      checked={selected === value}
      readOnly
      disabled={disabled}
      className="h-3.5 w-3.5 accent-primary"
    />
    <span className="flex-1 font-semibold">{label}</span>
    {disabled && (
      <span className="text-[9px] font-bold uppercase tracking-wide text-foreground/40">
        Soon
      </span>
    )}
    {badge && (
      <span className="rounded-full bg-background px-2 py-1 text-[9px] font-extrabold text-primary shadow-sm dark:bg-white/10 dark:text-teal-300">
        {badge}
      </span>
    )}
  </label>
);

export default CheckoutView;
