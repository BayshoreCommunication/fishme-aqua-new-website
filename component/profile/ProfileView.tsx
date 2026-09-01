"use client";

import {
  changeCustomerPasswordAction,
  type CustomerAddress,
  type CustomerProfile,
  updateProfileAction,
} from "@/app/actions/user";
import {
  getCustomerOrderAction,
  getCustomerOrdersAction,
  type CustomerOrder,
  type CustomerOrdersResult,
  type CustomerOrderStatus,
} from "@/app/actions/order";
import {
  getCustomerOrderReviewsAction,
  submitCustomerReviewAction,
  type CustomerReview,
} from "@/app/actions/review";
import {
  getAllDivisions,
  getCityCorporationsByDistrict,
  getDistrictsByDivision,
  getThanasByCityCorporation,
  getUnionsByUpazila,
  getUpazilasByDistrict,
} from "bangladesh-geo-data";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  ImageIcon,
  KeyRound,
  LockKeyhole,
  LoaderCircle,
  Mail,
  MapPin,
  Package,
  PackageCheck,
  Paperclip,
  Pencil,
  Phone,
  ReceiptText,
  Send,
  ShieldCheck,
  Star,
  Truck,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  type ReactNode,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

type View = "details" | "orders";
type EditSection = "basic" | "password" | "billing" | "shipping" | null;
type Notice = { type: "success" | "error"; text: string } | null;
type SavedAddress = {
  division: string;
  zone: "Inside Dhaka" | "Outside Dhaka" | "";
  city: string;
  district: string;
  upazila: string;
  postOffice: string;
  area: string;
  postCode: string;
  street: string;
};

const DELIVERY_ZONES = ["Inside Dhaka", "Outside Dhaka"] as const;
const inputClass =
  "h-12 w-full rounded-xl border border-foreground/10 bg-foreground/[0.025] px-4 text-sm text-foreground outline-none transition placeholder:text-foreground/35 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.04]";

const statusStyle: Record<CustomerOrderStatus, string> = {
  pending:
    "border-slate-200 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300",
  processing:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300",
  shipped:
    "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300",
  delivered:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300",
  cancelled:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300",
};

const statusIcon: Record<CustomerOrderStatus, typeof Clock3> = {
  pending: Clock3,
  processing: Clock3,
  shipped: Truck,
  delivered: PackageCheck,
  cancelled: X,
};

const formatDate = (value: string, options?: Intl.DateTimeFormatOptions) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  }).format(date);
};

const formatMoney = (value: number) =>
  `৳${new Intl.NumberFormat("en-BD").format(Math.max(0, value))}`;

const toSavedAddress = (address: CustomerAddress = {}): SavedAddress => {
  const insideDhaka = address.zone === "Inside Dhaka";
  return {
    division: address.division ?? "",
    zone: address.zone ?? "",
    city: insideDhaka ? (address.upazila ?? "") : "",
    district: address.district ?? "",
    upazila: insideDhaka ? "" : (address.upazila ?? ""),
    postOffice: address.postOffice ?? "",
    area: insideDhaka
      ? (address.postOffice ?? "")
      : address.upazila || address.postOffice || "",
    postCode: address.postCode ?? "",
    street: address.area ?? "",
  };
};

const ProfileView = ({
  initialProfile,
  initialOrders,
}: {
  initialProfile: CustomerProfile;
  initialOrders: CustomerOrdersResult;
}) => {
  const [profile, setProfile] = useState(initialProfile);
  const [ordersResult, setOrdersResult] = useState(initialOrders);
  const [view, setView] = useState<View>("details");
  const [editing, setEditing] = useState<EditSection>(null);
  const [saved, setSaved] = useState<EditSection>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [isPending, startTransition] = useTransition();
  const [hasDifferentShipping, setHasDifferentShipping] = useState(
    initialProfile.shipToDifferentAddress,
  );

  const billingAddress = toSavedAddress(profile.address);
  const shippingAddress = toSavedAddress(profile.shippingAddress);
  const fullName =
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    "Customer";
  const orderCount = ordersResult.ok ? ordersResult.pagination.total : 0;

  const finishSuccess = (section: Exclude<EditSection, null>, text: string) => {
    setEditing(null);
    setSaved(section);
    setNotice({ type: "success", text });
    window.setTimeout(() => setSaved(null), 2000);
  };

  const saveSection = (section: Exclude<EditSection, null>) => {
    const form = document.getElementById(
      `profile-${section}-form`,
    ) as HTMLFormElement | null;
    if (!form || !form.reportValidity()) return;
    const formData = new FormData(form);
    setNotice(null);

    startTransition(async () => {
      if (section === "password") {
        const result = await changeCustomerPasswordAction(formData);
        if (!result.ok) {
          setNotice({ type: "error", text: result.error });
          return;
        }
        form.reset();
        finishSuccess(section, result.message);
        return;
      }

      const result = await updateProfileAction(formData);
      if (!result.ok) {
        setNotice({ type: "error", text: result.error });
        return;
      }
      setProfile(result.data);
      setHasDifferentShipping(result.data.shipToDifferentAddress);
      finishSuccess(section, result.message);
    });
  };

  const changeShippingPreference = (enabled: boolean) => {
    setNotice(null);
    if (enabled) {
      setHasDifferentShipping(true);
      setEditing("shipping");
      return;
    }

    const previous = hasDifferentShipping;
    setHasDifferentShipping(false);
    if (editing === "shipping") setEditing(null);
    const formData = new FormData();
    formData.set("section", "shipping-preference");
    startTransition(async () => {
      const result = await updateProfileAction(formData);
      if (!result.ok) {
        setHasDifferentShipping(previous);
        setNotice({ type: "error", text: result.error });
        return;
      }
      setProfile(result.data);
      setNotice({
        type: "success",
        text: "Billing address will be used for delivery.",
      });
    });
  };

  const loadOrders = (page: number) => {
    startTransition(async () => {
      const result = await getCustomerOrdersAction(page);
      setOrdersResult(result);
    });
  };

  return (
    <section className="bg-[#f6f9f8] py-10 text-foreground dark:bg-[#08110f] sm:py-14 lg:py-16">
      <div className="container">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
              Customer account
            </p>
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              Welcome back, {profile.firstName || "Customer"}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-foreground/55">
              Manage your personal information, delivery addresses, and recent
              orders in one place.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(0,110,92,0.2)] transition hover:-translate-y-0.5 hover:bg-[#008c75]"
          >
            Continue shopping
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_18px_60px_rgba(14,48,42,0.06)] dark:border-white/10 dark:bg-white/[0.035] lg:sticky lg:top-28">
            <div className="bg-linear-to-br from-[#007461] to-[#004a3f] p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-xl font-black">
                  {profile.firstName.charAt(0).toUpperCase()}
                  {profile.lastName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-extrabold">{fullName}</p>
                  <p className="mt-1 truncate text-xs text-white/65">
                    {profile.email || profile.phone}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-black/10 px-3 py-2 text-xs text-white/75">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Customer since{" "}
                {formatDate(profile.createdAt, { month: "long" })}
              </div>
            </div>
            <nav
              className="grid grid-cols-2 gap-2 p-3 lg:grid-cols-1"
              aria-label="Profile sections"
            >
              <NavigationButton
                active={view === "details"}
                icon={UserRound}
                label="Profile details"
                onClick={() => setView("details")}
              />
              <NavigationButton
                active={view === "orders"}
                icon={Package}
                label="Order history"
                count={orderCount}
                onClick={() => setView("orders")}
              />
            </nav>
          </aside>

          <div className="min-w-0">
            {notice && (
              <div
                role="alert"
                className={`mb-5 rounded-2xl border px-4 py-3 text-sm font-bold ${
                  notice.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300"
                }`}
              >
                {notice.text}
              </div>
            )}

            {view === "details" ? (
              <div className="space-y-5">
                <InfoCard
                  title="Basic information"
                  subtitle="Your personal and contact details."
                  icon={UserRound}
                  isEditing={editing === "basic"}
                  isSaved={saved === "basic"}
                  isPending={isPending}
                  onEdit={() => setEditing("basic")}
                  onCancel={() => setEditing(null)}
                  onSave={() => saveSection("basic")}
                >
                  {editing === "basic" ? (
                    <form
                      id="profile-basic-form"
                      className="grid gap-4 sm:grid-cols-2"
                    >
                      <input type="hidden" name="section" value="basic" />
                      <Field
                        name="firstName"
                        label="First name"
                        value={profile.firstName}
                        required
                      />
                      <Field
                        name="lastName"
                        label="Last name"
                        value={profile.lastName}
                      />
                      <Field
                        name="companyName"
                        label="Company name"
                        value={profile.companyName}
                      />
                      <Field
                        name="phone"
                        label="Phone number"
                        value={profile.phone}
                        required
                      />
                      <div className="sm:col-span-2">
                        <Field
                          name="email"
                          label="Email address"
                          value={profile.email}
                          type="email"
                        />
                      </div>
                    </form>
                  ) : (
                    <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                      <Detail
                        icon={UserRound}
                        label="Full name"
                        value={fullName}
                      />
                      <Detail
                        icon={Building2}
                        label="Company"
                        value={profile.companyName || "Not provided"}
                      />
                      <Detail
                        icon={Mail}
                        label="Email address"
                        value={profile.email || "Not provided"}
                      />
                      <Detail
                        icon={Phone}
                        label="Phone number"
                        value={profile.phone || "Not provided"}
                      />
                    </div>
                  )}
                </InfoCard>

                <InfoCard
                  title="Account password"
                  subtitle="Keep your customer account secure."
                  icon={LockKeyhole}
                  isEditing={editing === "password"}
                  isSaved={saved === "password"}
                  isPending={isPending}
                  onEdit={() => setEditing("password")}
                  onCancel={() => setEditing(null)}
                  onSave={() => saveSection("password")}
                  editLabel="Change password"
                >
                  {editing === "password" ? (
                    <form id="profile-password-form">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <PasswordField
                            name="currentPassword"
                            label="Current password"
                            id="profile-current-password"
                            placeholder="Enter your current password"
                            autoComplete="current-password"
                          />
                        </div>
                        <PasswordField
                          name="newPassword"
                          label="New password"
                          id="profile-new-password"
                          placeholder="Minimum 8 characters"
                          autoComplete="new-password"
                        />
                        <PasswordField
                          name="confirmPassword"
                          label="Confirm new password"
                          id="profile-confirm-password"
                          placeholder="Enter new password again"
                          autoComplete="new-password"
                        />
                      </div>
                      <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-primary/[0.055] px-3.5 py-3 text-xs leading-5 text-foreground/55">
                        <ShieldCheck
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        Use at least 8 characters with letters, numbers, and
                        symbols.
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/[0.045] text-primary">
                          <KeyRound className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-sm font-extrabold tracking-[0.2em] text-foreground/65">
                            ••••••••••••
                          </p>
                          <p className="mt-1 text-xs text-foreground/40">
                            Password is securely encrypted
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                        <ShieldCheck
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />{" "}
                        Password protected
                      </span>
                    </div>
                  )}
                </InfoCard>

                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-foreground/[0.08] bg-white px-4 py-4 shadow-[0_10px_35px_rgba(14,48,42,0.035)] dark:border-white/10 dark:bg-white/[0.035] sm:items-center">
                  <input
                    type="checkbox"
                    checked={hasDifferentShipping}
                    disabled={isPending}
                    onChange={(event) =>
                      changeShippingPreference(event.target.checked)
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-foreground/20 accent-primary sm:mt-0"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-extrabold">
                      Use a different shipping address
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-foreground/45">
                      Turn this off to use your saved billing address for
                      delivery.
                    </span>
                  </span>
                  {hasDifferentShipping && (
                    <span className="hidden rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-primary sm:inline-flex">
                      Separate address
                    </span>
                  )}
                </label>

                <div
                  className={`grid gap-5 ${hasDifferentShipping ? "xl:grid-cols-2" : ""}`}
                >
                  <InfoCard
                    title="Billing address"
                    subtitle="Your saved account address, used for delivery by default."
                    icon={ReceiptText}
                    isEditing={editing === "billing"}
                    isSaved={saved === "billing"}
                    isPending={isPending}
                    onEdit={() => setEditing("billing")}
                    onCancel={() => setEditing(null)}
                    onSave={() => saveSection("billing")}
                  >
                    {editing === "billing" ? (
                      <form id="profile-billing-form">
                        <input type="hidden" name="section" value="billing" />
                        <AddressForm
                          address={billingAddress}
                          prefix="billing"
                        />
                      </form>
                    ) : (
                      <AddressDetails address={billingAddress} />
                    )}
                  </InfoCard>

                  {hasDifferentShipping && (
                    <InfoCard
                      title="Shipping address"
                      subtitle="Shown only when delivery is different from billing."
                      icon={Truck}
                      isEditing={editing === "shipping"}
                      isSaved={saved === "shipping"}
                      isPending={isPending}
                      onEdit={() => setEditing("shipping")}
                      onCancel={() => setEditing(null)}
                      onSave={() => saveSection("shipping")}
                    >
                      {editing === "shipping" ? (
                        <form id="profile-shipping-form">
                          <input
                            type="hidden"
                            name="section"
                            value="shipping"
                          />
                          <AddressForm
                            address={shippingAddress}
                            prefix="shipping"
                          />
                        </form>
                      ) : (
                        <AddressDetails address={shippingAddress} />
                      )}
                    </InfoCard>
                  )}
                </div>
              </div>
            ) : (
              <OrderHistory
                result={ordersResult}
                isPending={isPending}
                onPageChange={loadOrders}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const NavigationButton = ({
  active,
  icon: Icon,
  label,
  count,
  onClick,
}: {
  active: boolean;
  icon: typeof UserRound;
  label: string;
  count?: number;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-extrabold transition ${active ? "bg-primary/10 text-primary" : "text-foreground/55 hover:bg-foreground/[0.04] hover:text-foreground"}`}
  >
    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
    <span className="min-w-0 flex-1 truncate">{label}</span>
    {count !== undefined && (
      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-foreground/[0.06] px-1.5 text-[11px]">
        {count}
      </span>
    )}
  </button>
);

const InfoCard = ({
  title,
  subtitle,
  icon: Icon,
  isEditing,
  isSaved,
  isPending,
  onEdit,
  onCancel,
  onSave,
  editLabel = "Edit",
  children,
}: {
  title: string;
  subtitle: string;
  icon: typeof UserRound;
  isEditing: boolean;
  isSaved: boolean;
  isPending: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  editLabel?: string;
  children: ReactNode;
}) => (
  <article className="rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_18px_60px_rgba(14,48,42,0.055)] dark:border-white/10 dark:bg-white/[0.035] sm:p-6">
    <div className="mb-6 flex items-start justify-between gap-4 border-b border-foreground/[0.07] pb-5">
      <div className="flex min-w-0 items-start gap-3.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-base font-extrabold sm:text-lg">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-foreground/45">
            {subtitle}
          </p>
        </div>
      </div>
      {isEditing ? (
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          aria-label={`Cancel editing ${title}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/10 text-foreground/50 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-400/10"
        >
          <X className="h-4 w-4" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-foreground/10 px-3.5 text-xs font-extrabold text-foreground/60 transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
        >
          {isSaved ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Pencil className="h-3.5 w-3.5" />
          )}
          <span className="hidden sm:inline">
            {isSaved ? "Saved" : editLabel}
          </span>
        </button>
      )}
    </div>
    {children}
    {isEditing && (
      <div className="mt-6 flex justify-end gap-3 border-t border-foreground/[0.07] pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="rounded-full border border-foreground/10 px-4 py-2.5 text-xs font-extrabold text-foreground/60 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#008c75] disabled:cursor-wait disabled:opacity-60"
        >
          <Check className="h-4 w-4" />
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    )}
  </article>
);

const Detail = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
    <div className="min-w-0">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.09em] text-foreground/35">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-bold leading-6 text-foreground/75">
        {value}
      </p>
    </div>
  </div>
);

const Field = ({
  name,
  label,
  value,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  value: string;
  type?: string;
  required?: boolean;
}) => (
  <label>
    <span className="mb-1.5 block text-xs font-bold text-foreground/55">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </span>
    <input
      name={name}
      type={type}
      defaultValue={value}
      className={inputClass}
      required={required}
    />
  </label>
);

const PasswordField = ({
  name,
  label,
  id,
  placeholder,
  autoComplete,
}: {
  name: string;
  label: string;
  id: string;
  placeholder: string;
  autoComplete: "current-password" | "new-password";
}) => (
  <div>
    <label
      htmlFor={id}
      className="mb-2 block text-xs font-bold text-foreground/70"
    >
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <LockKeyhole
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary"
        aria-hidden="true"
      />
      <input
        id={id}
        name={name}
        type="password"
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`${inputClass} pl-11`}
        minLength={8}
        required
      />
    </div>
  </div>
);

const AddressDetails = ({ address }: { address: SavedAddress }) => {
  const locality = [
    address.area,
    address.city || address.district,
    address.postCode,
  ]
    .filter(Boolean)
    .join(", ");
  return (
    <div>
      <div className="mb-5 flex items-start gap-3 rounded-2xl bg-primary/[0.055] p-4">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-extrabold leading-6">
            {address.street || "No address saved"}
          </p>
          <p className="mt-1 text-xs leading-5 text-foreground/50">
            {locality || "Add your address details"}
          </p>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-x-5 gap-y-4">
        {[
          ["Division", address.division],
          ["Delivery zone", address.zone],
          ["Thana / area", address.area],
          ["Post code", address.postCode],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-foreground/35">
              {label}
            </dt>
            <dd className="mt-1 text-xs font-bold leading-5 text-foreground/70">
              {value || "—"}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

const getSavedAddressSelection = (address: SavedAddress) => {
  const divisions = getAllDivisions();
  const divisionId =
    divisions.find(({ name }) => name === address.division)?.id ?? "";
  const districts = divisionId ? getDistrictsByDivision(divisionId) : [];
  const districtId =
    districts.find(({ name }) => name === address.district)?.id ?? "";
  const upazilas = districtId ? getUpazilasByDistrict(districtId) : [];
  const upazilaId =
    upazilas.find(({ name }) => name === address.upazila)?.id ?? "";
  const postOffices = upazilaId ? getUnionsByUpazila(upazilaId) : [];
  const postOfficeId =
    postOffices.find(({ postOffice }) => postOffice === address.postOffice)
      ?.id ?? "";
  const dhakaDistrictId =
    address.division === "Dhaka"
      ? (districts.find(({ name }) => name === "Dhaka")?.id ?? "")
      : "";
  const cityCorporations = dhakaDistrictId
    ? getCityCorporationsByDistrict(dhakaDistrictId)
    : [];
  const cityCorpId =
    cityCorporations.find(({ name }) => name === address.city)?.id ?? "";
  const thanas = cityCorpId ? getThanasByCityCorporation(cityCorpId) : [];
  const thanaId =
    thanas.find(
      ({ name }) => name === address.postOffice || name === address.area,
    )?.id ?? "";
  return {
    divisionId,
    districtId,
    upazilaId,
    postOfficeId,
    cityCorpId,
    thanaId,
  };
};

const AddressForm = ({
  address,
  prefix,
}: {
  address: SavedAddress;
  prefix: string;
}) => {
  const initial = useMemo(() => getSavedAddressSelection(address), [address]);
  const divisions = useMemo(() => getAllDivisions(), []);
  const [divisionId, setDivisionId] = useState(initial.divisionId);
  const [zone, setZone] = useState<string>(address.zone);
  const [districtId, setDistrictId] = useState(initial.districtId);
  const [upazilaId, setUpazilaId] = useState(initial.upazilaId);
  const [postOfficeId, setPostOfficeId] = useState(initial.postOfficeId);
  const [cityCorpId, setCityCorpId] = useState(initial.cityCorpId);
  const [thanaId, setThanaId] = useState(initial.thanaId);
  const [postCode, setPostCode] = useState(address.postCode);
  const districtOptions = divisionId ? getDistrictsByDivision(divisionId) : [];
  const upazilaOptions = districtId ? getUpazilasByDistrict(districtId) : [];
  const postOfficeOptions = upazilaId ? getUnionsByUpazila(upazilaId) : [];
  const divisionName =
    divisions.find(({ id }) => id === divisionId)?.name ?? "";
  const isDhakaDivision = divisionName === "Dhaka";
  const dhakaDistrictId = isDhakaDivision
    ? (districtOptions.find(({ name }) => name === "Dhaka")?.id ?? "")
    : "";
  const cityOptions = dhakaDistrictId
    ? getCityCorporationsByDistrict(dhakaDistrictId)
    : [];
  const thanaOptions = cityCorpId ? getThanasByCityCorporation(cityCorpId) : [];
  const isInsideDhaka = isDhakaDivision && zone === "Inside Dhaka";
  const showOutside =
    Boolean(divisionId) && (!isDhakaDivision || zone === "Outside Dhaka");
  const districtName =
    districtOptions.find(({ id }) => id === districtId)?.name ?? "";
  const upazilaName =
    upazilaOptions.find(({ id }) => id === upazilaId)?.name ?? "";
  const postOfficeName =
    postOfficeOptions.find(({ id }) => id === postOfficeId)?.postOffice ?? "";
  const cityName = cityOptions.find(({ id }) => id === cityCorpId)?.name ?? "";
  const thanaName = thanaOptions.find(({ id }) => id === thanaId)?.name ?? "";

  const reset = () => {
    setDistrictId("");
    setUpazilaId("");
    setPostOfficeId("");
    setCityCorpId("");
    setThanaId("");
    setPostCode("");
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <input type="hidden" name={`${prefix}Division`} value={divisionName} />
      <input type="hidden" name={`${prefix}Zone`} value={zone} />
      <input
        type="hidden"
        name={`${prefix}District`}
        value={isInsideDhaka ? "Dhaka" : districtName}
      />
      <input
        type="hidden"
        name={`${prefix}Upazila`}
        value={isInsideDhaka ? cityName : upazilaName}
      />
      <input
        type="hidden"
        name={`${prefix}PostOffice`}
        value={isInsideDhaka ? thanaName : postOfficeName}
      />
      <input type="hidden" name={`${prefix}PostCode`} value={postCode} />
      <AddressField label="Division" id={`${prefix}-division`} required>
        <select
          id={`${prefix}-division`}
          value={divisionId}
          onChange={(event) => {
            const id = event.target.value;
            setDivisionId(id);
            reset();
            setZone(
              divisions.find((item) => item.id === id)?.name === "Dhaka"
                ? ""
                : "Outside Dhaka",
            );
          }}
          className={inputClass}
          required
        >
          <option value="">Select division</option>
          {divisions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </AddressField>
      {isDhakaDivision && (
        <AddressField label="Delivery zone" id={`${prefix}-zone`} required>
          <select
            id={`${prefix}-zone`}
            value={zone}
            onChange={(event) => {
              setZone(event.target.value);
              reset();
            }}
            className={inputClass}
            required
          >
            <option value="">Select delivery zone</option>
            {DELIVERY_ZONES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </AddressField>
      )}
      {isInsideDhaka && (
        <>
          <AddressField label="City corporation" id={`${prefix}-city`} required>
            <select
              id={`${prefix}-city`}
              value={cityCorpId}
              onChange={(event) => {
                setCityCorpId(event.target.value);
                setThanaId("");
              }}
              className={inputClass}
              required
            >
              <option value="">Select city corporation</option>
              {cityOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </AddressField>
          <AddressField label="Thana / area" id={`${prefix}-thana`} required>
            <select
              id={`${prefix}-thana`}
              value={thanaId}
              onChange={(event) => setThanaId(event.target.value)}
              className={inputClass}
              disabled={!cityCorpId}
              required
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
          </AddressField>
        </>
      )}
      {showOutside && (
        <>
          <AddressField label="District" id={`${prefix}-district`} required>
            <select
              id={`${prefix}-district`}
              value={districtId}
              onChange={(event) => {
                setDistrictId(event.target.value);
                setUpazilaId("");
                setPostOfficeId("");
                setPostCode("");
              }}
              className={inputClass}
              required
            >
              <option value="">Select district</option>
              {districtOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </AddressField>
          <AddressField label="Upazila" id={`${prefix}-upazila`} required>
            <select
              id={`${prefix}-upazila`}
              value={upazilaId}
              onChange={(event) => {
                setUpazilaId(event.target.value);
                setPostOfficeId("");
                setPostCode("");
              }}
              className={inputClass}
              disabled={!districtId}
              required
            >
              <option value="">
                {districtId ? "Select upazila" : "Select a district first"}
              </option>
              {upazilaOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </AddressField>
          {upazilaId && (
            <>
              <AddressField
                label="Post office"
                id={`${prefix}-post-office`}
                required
              >
                <select
                  id={`${prefix}-post-office`}
                  value={postOfficeId}
                  onChange={(event) => {
                    const id = event.target.value;
                    setPostOfficeId(id);
                    setPostCode(
                      postOfficeOptions.find((item) => item.id === id)
                        ?.postalCode ?? "",
                    );
                  }}
                  className={inputClass}
                  required
                >
                  <option value="">Select post office</option>
                  {postOfficeOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.postOffice}
                    </option>
                  ))}
                </select>
              </AddressField>
              <PostCodeField
                prefix={prefix}
                value={postCode}
                setValue={setPostCode}
                autoFilled
              />
            </>
          )}
        </>
      )}
      {isInsideDhaka && (
        <PostCodeField
          prefix={prefix}
          value={postCode}
          setValue={setPostCode}
        />
      )}
      <div className="sm:col-span-2">
        <AddressField label="Area / street" id={`${prefix}-area`} required>
          <input
            id={`${prefix}-area`}
            name={`${prefix}Area`}
            defaultValue={address.street}
            placeholder="House, road, sector or village"
            className={inputClass}
            autoComplete="street-address"
            required
          />
        </AddressField>
      </div>
    </div>
  );
};

const PostCodeField = ({
  prefix,
  value,
  setValue,
  autoFilled = false,
}: {
  prefix: string;
  value: string;
  setValue: (value: string) => void;
  autoFilled?: boolean;
}) => (
  <AddressField label="Post code" id={`${prefix}-post-code`}>
    <input
      id={`${prefix}-post-code`}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder={
        autoFilled ? "Auto-filled from post office" : "Enter post code"
      }
      className={inputClass}
      inputMode="numeric"
      pattern="[0-9]{4}"
      maxLength={4}
    />
  </AddressField>
);

const AddressField = ({
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
    <label
      htmlFor={id}
      className="mb-2 block text-xs font-bold text-foreground/70"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const OrderHistory = ({
  result,
  isPending,
  onPageChange,
}: {
  result: CustomerOrdersResult;
  isPending: boolean;
  onPageChange: (page: number) => void;
}) => {
  const [expanded, setExpanded] = useState<CustomerOrder | null>(null);
  const [detailError, setDetailError] = useState("");
  const [loadingDetail, startDetailTransition] = useTransition();

  const toggleDetails = (order: CustomerOrder) => {
    if (expanded?._id === order._id) {
      setExpanded(null);
      return;
    }
    setDetailError("");
    startDetailTransition(async () => {
      const response = await getCustomerOrderAction(order._id);
      if (!response.ok) {
        setDetailError(response.error);
        return;
      }
      setExpanded(response.order);
    });
  };

  if (!result.ok)
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm font-bold text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300">
        {result.error}
      </div>
    );

  return (
    <div className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_18px_60px_rgba(14,48,42,0.055)] dark:border-white/10 dark:bg-white/[0.035]">
      <div className="flex flex-col justify-between gap-3 border-b border-foreground/[0.07] p-5 sm:flex-row sm:items-center sm:p-6">
        <div>
          <h3 className="text-xl font-extrabold">Order history</h3>
          <p className="mt-1 text-sm text-foreground/45">
            Review your purchases and delivery progress.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-xs font-extrabold text-primary">
          <Package className="h-4 w-4" />
          {result.pagination.total} total orders
        </span>
      </div>
      {detailError && (
        <p
          role="alert"
          className="m-5 rounded-xl bg-red-50 px-4 py-3 text-xs font-bold text-red-700"
        >
          {detailError}
        </p>
      )}
      {result.orders.length === 0 ? (
        <div className="p-10 text-center">
          <Package className="mx-auto h-10 w-10 text-primary/40" />
          <h4 className="mt-4 font-extrabold">No orders yet</h4>
          <p className="mt-2 text-sm text-foreground/45">
            Your completed checkout orders will appear here.
          </p>
          <Link
            href="/shop"
            className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-xs font-extrabold text-white"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-foreground/[0.07]">
          {result.orders.map((order) => {
            const StatusIcon = statusIcon[order.orderStatus];
            const isOpen = expanded?._id === order._id;
            const itemCount = order.items.reduce(
              (sum, item) => sum + item.quantity,
              0,
            );
            return (
              <article key={order._id} className="p-5 sm:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex min-w-0 items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-foreground/[0.045] text-primary">
                      <Package className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h4 className="text-sm font-extrabold">
                          Order #{order.orderNumber}
                        </h4>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-extrabold capitalize ${statusStyle[order.orderStatus]}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {order.orderStatus}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground/45">
                        <span>{formatDate(order.createdAt)}</span>
                        <span>
                          {itemCount} {itemCount === 1 ? "item" : "items"}
                        </span>
                        <span className="uppercase">{order.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-5 border-t border-foreground/[0.06] pt-4 xl:border-0 xl:pt-0">
                    <div className="xl:text-right">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-foreground/35">
                        Order total
                      </p>
                      <p className="mt-1 font-extrabold">
                        {formatMoney(order.total)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDetails(order)}
                      disabled={loadingDetail}
                      className="inline-flex h-10 items-center gap-1.5 rounded-full border border-foreground/10 px-4 text-xs font-extrabold text-foreground/60 hover:border-primary/30 hover:bg-primary/5 hover:text-primary disabled:opacity-50"
                    >
                      {isOpen ? "Hide details" : "View details"}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                </div>
                {isOpen && expanded && <OrderDetails order={expanded} />}
              </article>
            );
          })}
        </div>
      )}
      {result.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-foreground/[0.07] px-5 py-4 sm:px-6">
          <button
            type="button"
            disabled={!result.pagination.hasPreviousPage || isPending}
            onClick={() => onPageChange(result.pagination.page - 1)}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 text-xs font-extrabold disabled:opacity-35"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Previous
          </button>
          <span className="text-xs font-bold text-foreground/45">
            Page {result.pagination.page} of {result.pagination.totalPages}
          </span>
          <button
            type="button"
            disabled={!result.pagination.hasNextPage || isPending}
            onClick={() => onPageChange(result.pagination.page + 1)}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 text-xs font-extrabold disabled:opacity-35"
          >
            Next
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

const OrderDetails = ({ order }: { order: CustomerOrder }) => {
  const canReview =
    order.orderStatus === "delivered" && order.paymentStatus === "paid";

  return (
    <div className="mt-5 space-y-4">
      <div className="rounded-2xl bg-foreground/[0.025] p-4">
        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={`${item.product}-${item.sku}`}
              className="flex items-center justify-between gap-4 border-b border-foreground/[0.07] pb-3 last:border-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{item.title}</p>
                <p className="mt-1 text-xs text-foreground/40">
                  SKU: {item.sku} · Qty {item.quantity}
                </p>
              </div>
              <p className="shrink-0 text-sm font-extrabold">
                {formatMoney(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-foreground/[0.07] pt-4 text-xs sm:grid-cols-4">
          {[
            ["Subtotal", formatMoney(order.subtotal)],
            ["Delivery", formatMoney(order.deliveryFee)],
            ["Payment", order.paymentStatus],
            ["Total", formatMoney(order.total)],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-foreground/40">{label}</dt>
              <dd className="mt-1 font-extrabold capitalize">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {canReview && <OrderReviewSection order={order} />}
    </div>
  );
};

type ReviewDraft = { rating: number; comment: string; attachments: File[] };

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.ceil(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getReviewProductKey = (product: CustomerOrder["items"][number]) =>
  `${product.product}-${product.sku}`;

const OrderReviewSection = ({ order }: { order: CustomerOrder }) => {
  const [drafts, setDrafts] = useState<Record<string, ReviewDraft>>({});
  const [reviewsByProduct, setReviewsByProduct] = useState<
    Record<string, CustomerReview>
  >({});
  const [feedback, setFeedback] = useState<
    Record<string, { type: "success" | "error"; text: string }>
  >({});
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [submittingKey, setSubmittingKey] = useState<string | null>(null);
  const [reviewToast, setReviewToast] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!reviewToast) return;
    const timeoutId = window.setTimeout(() => setReviewToast(null), 4000);
    return () => window.clearTimeout(timeoutId);
  }, [reviewToast]);

  useEffect(() => {
    const timeoutId = window.setTimeout(async () => {
      const result = await getCustomerOrderReviewsAction(order._id);
      if (result.ok) {
        const nextReviews: Record<string, CustomerReview> = {};
        const nextDrafts: Record<string, ReviewDraft> = {};

        result.reviews.forEach((review) => {
          const productId =
            typeof review.product === "string"
              ? review.product
              : review.product._id;
          nextReviews[productId] = review;
          const item = order.items.find(({ product }) => product === productId);
          if (item) {
            nextDrafts[getReviewProductKey(item)] = {
              rating: review.rating,
              comment: review.comment,
              attachments: [],
            };
          }
        });

        setReviewsByProduct(nextReviews);
        setDrafts((current) => ({ ...nextDrafts, ...current }));
      }
      setLoadingReviews(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [order]);

  const updateDraft = (key: string, update: Partial<ReviewDraft>) => {
    setDrafts((current) => ({
      ...current,
      [key]: {
        rating: current[key]?.rating ?? 0,
        comment: current[key]?.comment ?? "",
        attachments: current[key]?.attachments ?? [],
        ...update,
      },
    }));
    setFeedback((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const allProductsReviewed = order.items.every(
    (item) => reviewsByProduct[item.product],
  );

  return (
    <section
      aria-labelledby={`reviews-${order._id}`}
      className="overflow-hidden rounded-2xl border border-primary/15 bg-primary/[0.035]"
    >
      {reviewToast && (
        <div
          role={reviewToast.type === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`fixed bottom-5 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-2xl border px-4 py-3.5 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur sm:bottom-6 sm:right-6 ${
            reviewToast.type === "success"
              ? "border-emerald-200 bg-emerald-50/95 text-emerald-800 dark:border-emerald-400/20 dark:bg-[#12352e]/95 dark:text-emerald-200"
              : "border-red-200 bg-red-50/95 text-red-800 dark:border-red-400/20 dark:bg-[#3a1717]/95 dark:text-red-200"
          }`}
        >
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-current/10">
            {reviewToast.type === "success" ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <X className="h-4 w-4" aria-hidden="true" />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold">
              {reviewToast.type === "success"
                ? "Review submitted"
                : "Submission failed"}
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 opacity-80">
              {reviewToast.text}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setReviewToast(null)}
            aria-label="Dismiss notification"
            className="rounded-lg p-1 opacity-55 transition hover:bg-black/5 hover:opacity-100"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
      <div className="flex flex-col justify-between gap-3 border-b border-primary/10 px-4 py-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Star className="h-4 w-4" aria-hidden="true" />
            </span>
            <h5 id={`reviews-${order._id}`} className="text-sm font-extrabold">
              Review your products
            </h5>
          </div>
          <p className="mt-2 text-xs leading-5 text-foreground/45">
            This order is delivered and paid. Share a separate review for each
            product below.
          </p>
        </div>
        <span className="inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
          {loadingReviews
            ? "Checking reviews…"
            : allProductsReviewed
              ? "Reviews submitted"
              : "Review available"}
        </span>
      </div>

      <div className="divide-y divide-primary/10">
        {order.items.map((item, index) => {
          const key = getReviewProductKey(item);
          const draft = drafts[key] ?? {
            rating: 0,
            comment: "",
            attachments: [],
          };
          const existingReview = reviewsByProduct[item.product];
          const isApproved = existingReview?.status === "approved";
          const isSubmitting = submittingKey === key;
          const itemFeedback = feedback[key];
          const attachmentInputId = `review-attachments-${order._id}-${index}`;

          return (
            <form
              key={key}
              onSubmit={async (event) => {
                event.preventDefault();
                if (!draft.rating || !draft.comment.trim()) return;
                setSubmittingKey(key);
                setFeedback((current) => {
                  const next = { ...current };
                  delete next[key];
                  return next;
                });

                const reviewForm = new FormData();
                reviewForm.set("rating", String(draft.rating));
                reviewForm.set("comment", draft.comment.trim());
                draft.attachments.forEach((file) =>
                  reviewForm.append("attachments", file, file.name),
                );

                const result = await submitCustomerReviewAction(
                  order._id,
                  item.product,
                  reviewForm,
                );
                if (result.ok) {
                  setReviewsByProduct((current) => ({
                    ...current,
                    [item.product]: result.review,
                  }));
                  setDrafts((current) => ({
                    ...current,
                    [key]: { ...draft, attachments: [] },
                  }));
                  setFeedback((current) => ({
                    ...current,
                    [key]: { type: "success", text: result.message },
                  }));
                  setReviewToast({
                    type: "success",
                    text: "Review submitted successfully and sent for approval.",
                  });
                } else {
                  setFeedback((current) => ({
                    ...current,
                    [key]: { type: "error", text: result.error },
                  }));
                  setReviewToast({ type: "error", text: result.error });
                }
                setSubmittingKey(null);
              }}
              className="p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-black text-primary shadow-sm dark:bg-white/10">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div>
                      <h6 className="text-sm font-extrabold">{item.title}</h6>
                      <p className="mt-1 text-[11px] text-foreground/40">
                        SKU: {item.sku} · Purchased quantity {item.quantity}
                      </p>
                    </div>
                    {existingReview && (
                      <span
                        className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold capitalize ${
                          existingReview.status === "approved"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                            : existingReview.status === "rejected"
                              ? "bg-red-100 text-red-700 dark:bg-red-400/10 dark:text-red-300"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300"
                        }`}
                      >
                        {existingReview.status === "approved" ? (
                          <Check className="h-3 w-3" aria-hidden="true" />
                        ) : (
                          <Clock3 className="h-3 w-3" aria-hidden="true" />
                        )}
                        {existingReview.status === "approved"
                          ? "Published"
                          : existingReview.status === "rejected"
                            ? "Rejected"
                            : "Pending approval"}
                      </span>
                    )}
                  </div>

                  {existingReview && (
                    <div className="mt-4 rounded-xl border border-foreground/[0.08] bg-white p-4 shadow-sm dark:bg-white/[0.035]">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-foreground/45">
                          Your submitted review
                        </p>
                        <div
                          className="flex items-center gap-1"
                          aria-label={`${existingReview.rating} out of 5 stars`}
                        >
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <Star
                              key={rating}
                              className={`h-4 w-4 ${
                                rating <= existingReview.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-foreground/15"
                              }`}
                              aria-hidden="true"
                            />
                          ))}
                          <span className="ml-1 text-[11px] font-extrabold text-foreground/45">
                            {existingReview.rating}/5
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 whitespace-pre-wrap text-sm font-medium leading-6 text-foreground/70">
                        {existingReview.comment}
                      </p>
                      {existingReview.attachments.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 border-t border-foreground/[0.07] pt-3">
                          {existingReview.attachments.map((attachment) => (
                            <a
                              key={attachment.url}
                              href={attachment.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-primary/[0.07] px-2.5 py-2 text-[10px] font-extrabold text-primary transition hover:bg-primary/[0.12]"
                            >
                              {attachment.type === "image" ? (
                                <ImageIcon
                                  className="h-3.5 w-3.5 shrink-0"
                                  aria-hidden="true"
                                />
                              ) : (
                                <FileText
                                  className="h-3.5 w-3.5 shrink-0"
                                  aria-hidden="true"
                                />
                              )}
                              <span className="truncate">
                                {attachment.name}
                              </span>
                            </a>
                          ))}
                        </div>
                      )}
                      {existingReview.moderationNote && (
                        <p className="mt-3 rounded-lg bg-foreground/[0.035] px-3 py-2 text-xs leading-5 text-foreground/55">
                          <span className="font-extrabold text-foreground/70">
                            Moderator note:
                          </span>{" "}
                          {existingReview.moderationNote}
                        </p>
                      )}
                    </div>
                  )}

                  {!existingReview && (
                    <>
                      <fieldset className="mt-4">
                        <legend className="mb-2 text-xs font-bold text-foreground/60">
                          Your rating <span className="text-red-500">*</span>
                        </legend>
                        <div
                          className="flex items-center gap-1"
                          aria-label="Product rating"
                        >
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              disabled={isApproved || isSubmitting}
                              onClick={() => updateDraft(key, { rating })}
                              aria-label={`Rate ${rating} out of 5`}
                              aria-pressed={draft.rating === rating}
                              className="rounded-md p-0.5 transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-primary"
                            >
                              <Star
                                className={`h-5 w-5 transition ${
                                  rating <= draft.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-foreground/20"
                                }`}
                                aria-hidden="true"
                              />
                            </button>
                          ))}
                          <span className="ml-2 text-[11px] font-bold text-foreground/40">
                            {draft.rating
                              ? `${draft.rating}/5`
                              : "Select rating"}
                          </span>
                        </div>
                      </fieldset>

                      <label className="mt-4 block">
                        <span className="mb-2 block text-xs font-bold text-foreground/60">
                          Your review <span className="text-red-500">*</span>
                        </span>
                        <textarea
                          value={draft.comment}
                          onChange={(event) =>
                            updateDraft(key, { comment: event.target.value })
                          }
                          rows={3}
                          maxLength={1000}
                          minLength={3}
                          disabled={isApproved || isSubmitting}
                          placeholder="What did you like about this product?"
                          className="w-full resize-y rounded-xl border border-foreground/10 bg-white px-4 py-3 text-sm leading-6 text-foreground outline-none transition placeholder:text-foreground/30 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-white/[0.04]"
                          required
                        />
                        <span className="mt-1 block text-right text-[10px] text-foreground/35">
                          {draft.comment.length}/1000
                        </span>
                      </label>

                      <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <p className="text-xs font-bold text-foreground/60">
                            Attachments{" "}
                            <span className="font-medium text-foreground/35">
                              (optional)
                            </span>
                          </p>
                          <span className="text-[10px] text-foreground/35">
                            Images or PDF · up to 5 files
                          </span>
                        </div>
                        <input
                          id={attachmentInputId}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,application/pdf"
                          multiple
                          disabled={isApproved || isSubmitting}
                          className="sr-only"
                          onChange={(event) => {
                            const selectedFiles = Array.from(
                              event.target.files ?? [],
                            );
                            updateDraft(key, {
                              attachments: [
                                ...draft.attachments,
                                ...selectedFiles,
                              ].slice(0, 5),
                            });
                            event.target.value = "";
                          }}
                        />
                        <label
                          htmlFor={attachmentInputId}
                          className={`flex min-h-24 flex-col items-center justify-center rounded-xl border border-dashed border-primary/25 bg-white/70 px-4 py-4 text-center transition dark:bg-white/[0.025] ${
                            isApproved || isSubmitting
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer hover:border-primary/50 hover:bg-primary/[0.035]"
                          }`}
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Upload className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span className="mt-2 text-xs font-extrabold text-foreground/65">
                            Choose images or PDF files
                          </span>
                          <span className="mt-1 text-[10px] text-foreground/35">
                            JPG, PNG, WEBP or PDF
                          </span>
                        </label>

                        {draft.attachments.length > 0 && (
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {draft.attachments.map((file, fileIndex) => {
                              const isImage = file.type.startsWith("image/");
                              return (
                                <div
                                  key={`${file.name}-${file.lastModified}-${fileIndex}`}
                                  className="flex min-w-0 items-center gap-3 rounded-xl border border-foreground/[0.08] bg-white px-3 py-2.5 dark:bg-white/[0.04]"
                                >
                                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08] text-primary">
                                    {isImage ? (
                                      <ImageIcon
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <FileText
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-[11px] font-extrabold">
                                      {file.name}
                                    </p>
                                    <p className="mt-0.5 text-[10px] text-foreground/35">
                                      {isImage ? "Image" : "PDF"} ·{" "}
                                      {formatFileSize(file.size)}
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateDraft(key, {
                                        attachments: draft.attachments.filter(
                                          (_, attachmentIndex) =>
                                            attachmentIndex !== fileIndex,
                                        ),
                                      })
                                    }
                                    aria-label={`Remove ${file.name}`}
                                    className="rounded-lg p-1.5 text-foreground/35 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-400/10"
                                  >
                                    <X
                                      className="h-3.5 w-3.5"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        <p className="mt-2 flex items-center gap-1.5 text-[10px] text-foreground/35">
                          <Paperclip className="h-3 w-3" aria-hidden="true" />
                          Add clear product photos or supporting PDF documents.
                        </p>
                      </div>

                      {itemFeedback && (
                        <p
                          role="status"
                          className={`mt-3 rounded-xl px-3.5 py-2.5 text-xs font-bold ${
                            itemFeedback.type === "success"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                              : "bg-red-50 text-red-700 dark:bg-red-400/10 dark:text-red-300"
                          }`}
                        >
                          {itemFeedback.text}
                        </p>
                      )}

                      <div className="mt-3 flex justify-end">
                        <button
                          type="submit"
                          disabled={
                            isApproved ||
                            isSubmitting ||
                            !draft.rating ||
                            draft.comment.trim().length < 3
                          }
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#008c75] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {isSubmitting ? (
                            <LoaderCircle
                              className="h-3.5 w-3.5 animate-spin"
                              aria-hidden="true"
                            />
                          ) : isApproved ? (
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <Send className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                          {isSubmitting
                            ? "Submitting…"
                            : isApproved
                              ? "Review published"
                              : existingReview
                                ? "Update review"
                                : "Submit review"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </form>
          );
        })}
      </div>
    </section>
  );
};

export default ProfileView;
