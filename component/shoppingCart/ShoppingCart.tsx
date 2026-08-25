"use client";

import { useShopStore } from "@/component/shop/shopStore";
import { staticProducts } from "@/component/shop/staticProducts";
import { ChevronRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

type ShippingMethod = "flat" | "pickup" | "free";

const shippingPrices: Record<ShippingMethod, number> = {
  flat: 200,
  pickup: 450,
  free: 0,
};
const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD").format(Math.max(0, Math.round(price)));

const ShoppingCart = () => {
  const { cart, catalog, setCartQuantity, removeFromCart } = useShopStore();
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("free");
  const [couponCode, setCouponCode] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [cartUpdated, setCartUpdated] = useState(false);

  const cartProducts = cart.flatMap((item) => {
    const product =
      catalog[item.productId] ??
      staticProducts.find(({ id }) => id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const subtotal = cartProducts.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const discount = subtotal * discountRate;
  const shipping = shippingPrices[shippingMethod];
  const total = subtotal - discount + shipping;

  const changeQuantity = (productId: string, quantity: number) => {
    setCartQuantity(productId, quantity);
    setCartUpdated(false);
  };

  const applyCoupon = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedCode = couponCode.trim().toUpperCase();

    if (normalizedCode === "AQUA10") {
      setDiscountRate(0.1);
      setCouponMessage("AQUA10 applied — 10% discount");
      return;
    }

    setDiscountRate(0);
    setCouponMessage(
      normalizedCode ? "Coupon code is not valid" : "Enter a coupon code",
    );
  };

  if (cartProducts.length === 0) {
    return (
      <section className="bg-background py-12 text-foreground sm:py-16 lg:py-20">
        <div className="container max-w-7xl">
          <div className="flex min-h-96 flex-col items-center justify-center rounded-3xl border border-dashed border-foreground/15 bg-foreground/[0.02] px-6 text-center dark:border-white/15 dark:bg-white/[0.02]">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/8 text-primary">
              <ShoppingBag aria-hidden="true" className="h-8 w-8" />
            </span>
            <h1 className="mt-5 font-heading text-2xl font-bold">
              Your cart is empty
            </h1>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground/55">
              Add aquatic essentials to your cart and they will appear here.
            </p>
            <Link
              href="/shop"
              className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008c75]"
            >
              Start shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-12 text-foreground sm:py-16 lg:py-20">
      <div className="container max-w-7xl">
        <header className="mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-teal-400">
            Review your selection
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            Shopping
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-3 flex items-center gap-1.5 text-xs text-foreground/45"
          >
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <ChevronRight aria-hidden="true" className="h-3 w-3" />
            <span aria-current="page" className="font-semibold text-foreground">
              Shopping Cart
            </span>
          </nav>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:gap-8">
          <div className="min-w-0">
            <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-background shadow-sm dark:border-white/10">
              <div className="hidden grid-cols-[minmax(0,2.2fr)_0.7fr_0.9fr_0.65fr] items-center gap-5 bg-foreground/[0.04] px-6 py-4 text-xs font-bold text-foreground/65 dark:bg-white/[0.05] md:grid lg:px-7">
                <span>Product</span>
                <span>Price</span>
                <span className="text-center">Quantity</span>
                <span className="sr-only">Remove</span>
              </div>

              <div className="divide-y divide-foreground/10 dark:divide-white/10">
                {cartProducts.map(({ product, quantity }) => (
                  <article
                    key={product.id}
                    className="grid gap-5 p-5 md:grid-cols-[minmax(0,2.2fr)_0.7fr_0.9fr_0.65fr] md:items-center md:px-6 md:py-5 lg:px-7"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] dark:border-white/10 dark:bg-white/[0.04]">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-primary dark:text-teal-400 md:hidden">
                          {product.category}
                        </span>
                        <h2 className="truncate text-sm font-semibold">
                          {product.title}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:block">
                      <span className="text-xs text-foreground/45 md:hidden">
                        Price
                      </span>
                      <span className="text-sm font-semibold">
                        ৳ {formatPrice(product.price)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between md:justify-center">
                      <span className="text-xs text-foreground/45 md:hidden">
                        Quantity
                      </span>
                      <div className="inline-flex items-center rounded-full border border-foreground/15 p-1 dark:border-white/15">
                        <button
                          type="button"
                          aria-label={`Decrease ${product.title} quantity`}
                          disabled={quantity === 1}
                          onClick={() =>
                            changeQuantity(product.id, quantity - 1)
                          }
                          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-foreground/20 text-background transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/25 dark:text-white"
                        >
                          <Minus aria-hidden="true" className="h-3 w-3" />
                        </button>
                        <span className="min-w-9 text-center text-xs font-semibold">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase ${product.title} quantity`}
                          disabled={quantity === 99}
                          onClick={() =>
                            changeQuantity(product.id, quantity + 1)
                          }
                          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-foreground/20 text-background transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/25 dark:text-white"
                        >
                          <Plus aria-hidden="true" className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label={`Remove ${product.title} from cart`}
                      onClick={() => removeFromCart(product.id)}
                      className="mx-auto inline-flex cursor-pointer items-center gap-1 text-xs text-foreground/40 transition-colors hover:text-rose-500 md:mx-0 md:justify-self-end"
                    >
                      <X aria-hidden="true" className="h-3 w-3" />
                      Remove
                    </button>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <form onSubmit={applyCoupon} className="w-full max-w-md">
                <label
                  htmlFor="coupon-code"
                  className="mb-3 block text-sm font-bold"
                >
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    id="coupon-code"
                    type="text"
                    value={couponCode}
                    onChange={(event) => setCouponCode(event.target.value)}
                    placeholder="Enter Your Coupon Code"
                    className="h-11 min-w-0 flex-1 rounded-full border border-foreground/15 bg-background px-5 text-xs outline-none transition-colors placeholder:text-foreground/30 focus:border-primary dark:border-white/15"
                  />
                  <button
                    type="submit"
                    className="cursor-pointer rounded-full bg-primary px-6 text-xs font-semibold text-white transition-colors hover:bg-[#008c75]"
                  >
                    Apply
                  </button>
                </div>
                <p
                  aria-live="polite"
                  className={`mt-2 min-h-4 text-xs ${
                    discountRate
                      ? "text-primary dark:text-teal-400"
                      : "text-rose-500"
                  }`}
                >
                  {couponMessage}
                </p>
              </form>

              <button
                type="button"
                onClick={() => setCartUpdated(true)}
                className="h-11 cursor-pointer rounded-full border border-foreground/20 px-7 text-xs font-semibold transition-colors hover:border-primary hover:text-primary dark:border-white/20"
              >
                {cartUpdated ? "Cart Updated" : "Update Cart"}
              </button>
            </div>
          </div>

          <aside className="rounded-3xl bg-foreground/[0.045] p-6 shadow-sm dark:bg-white/[0.06] lg:sticky lg:top-28">
            <div className="flex items-center justify-between border-b border-foreground/25 pb-4 dark:border-white/20">
              <h2 className="text-base font-bold">Subtotal</h2>
              <span className="text-base font-bold">
                ৳ {formatPrice(subtotal)}
              </span>
            </div>

            <fieldset className="mt-5">
              <legend className="text-sm font-bold">Shipping</legend>
              <div className="mt-3 space-y-2 text-xs">
                <ShippingOption
                  label="Flat Rate"
                  price={shippingPrices.flat}
                  value="flat"
                  selected={shippingMethod}
                  onChange={setShippingMethod}
                />
                <ShippingOption
                  label="Local Pickup"
                  price={shippingPrices.pickup}
                  value="pickup"
                  selected={shippingMethod}
                  onChange={setShippingMethod}
                />
                <ShippingOption
                  label="Free Shipping"
                  price={shippingPrices.free}
                  value="free"
                  selected={shippingMethod}
                  onChange={setShippingMethod}
                />
              </div>
            </fieldset>

            {discountRate > 0 && (
              <div className="mt-5 flex items-center justify-between text-xs text-primary dark:text-teal-400">
                <span>Coupon discount</span>
                <span>− ৳ {formatPrice(discount)}</span>
              </div>
            )}

            <div className="mt-5 flex items-center justify-between border-t border-foreground/25 pt-4 dark:border-white/20">
              <span className="font-heading text-lg font-bold">Total</span>
              <span className="font-heading text-lg font-bold">
                ৳ {formatPrice(total)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-full bg-primary px-5 py-3 text-center text-xs font-semibold text-white transition-colors hover:bg-[#008c75]"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/shop"
              className="mt-3 flex w-full items-center justify-center rounded-full bg-background px-5 py-3 text-xs font-semibold shadow-sm transition-colors hover:text-primary"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
};

interface ShippingOptionProps {
  label: string;
  price: number;
  value: ShippingMethod;
  selected: ShippingMethod;
  onChange: (value: ShippingMethod) => void;
}

const ShippingOption = ({
  label,
  price,
  value,
  selected,
  onChange,
}: ShippingOptionProps) => (
  <label className="flex cursor-pointer items-center gap-2 text-foreground/65">
    <input
      type="radio"
      name="shipping-method"
      value={value}
      checked={selected === value}
      onChange={() => onChange(value)}
      className="h-3 w-3 accent-primary"
    />
    <span>{label}</span>
    {price > 0 && (
      <span className="font-semibold text-rose-500">
        ৳ {formatPrice(price)}
      </span>
    )}
  </label>
);

export default ShoppingCart;
