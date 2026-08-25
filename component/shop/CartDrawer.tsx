"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { staticProducts } from "@/component/shop/staticProducts";
import { useShopStore } from "@/component/shop/shopStore";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD").format(price);

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    setCartQuantity,
    removeFromCart,
    clearCart,
    catalog,
  } = useShopStore();

  const cartProducts = useMemo(
    () =>
      cart.flatMap((item) => {
        const product =
          catalog[item.productId] ??
          staticProducts.find(({ id }) => id === item.productId);
        return product ? [{ ...item, product }] : [];
      }),
    [cart, catalog],
  );
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartProducts.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  useEffect(() => {
    if (!isCartOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeCart, isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="pointer-events-auto fixed inset-0 z-[120]">
      <button
        type="button"
        aria-label="Close shopping cart"
        onClick={closeCart}
        className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-sm"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-foreground/10 bg-background text-foreground shadow-2xl dark:border-white/10"
      >
        <header className="flex items-center justify-between border-b border-foreground/10 px-5 py-5 dark:border-white/10 sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-teal-400">
              Your selection
            </p>
            <h2
              id="cart-drawer-title"
              className="mt-1 font-heading text-2xl font-bold"
            >
              Shopping Cart
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-foreground/10 text-foreground/65 transition-colors hover:border-primary hover:text-primary dark:border-white/15"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </header>

        {cartProducts.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/8 text-primary">
              <ShoppingBag aria-hidden="true" className="h-8 w-8" />
            </span>
            <h3 className="mt-5 font-heading text-xl font-bold">
              Your cart is empty
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-foreground/55">
              Explore our aquatic essentials and add the products you need.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008c75]"
            >
              Explore products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
              {cartProducts.map(({ product, quantity }) => (
                <article
                  key={product.id}
                  className="flex gap-4 rounded-2xl border border-foreground/10 p-3 dark:border-white/10"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-foreground/[0.03] dark:bg-white/[0.04]">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">
                          {product.title}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-primary dark:text-teal-400">
                          ৳ {formatPrice(product.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${product.title} from cart`}
                        onClick={() => removeFromCart(product.id)}
                        className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground/40 transition-colors hover:bg-rose-500/10 hover:text-rose-500"
                      >
                        <Trash2 aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-full border border-foreground/10 p-1 dark:border-white/10">
                        <button
                          type="button"
                          aria-label={`Decrease ${product.title} quantity`}
                          onClick={() =>
                            setCartQuantity(product.id, quantity - 1)
                          }
                          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-primary dark:hover:bg-white/5"
                        >
                          <Minus aria-hidden="true" className="h-3 w-3" />
                        </button>
                        <span
                          className="min-w-8 text-center text-xs font-bold"
                          aria-label={`${quantity} items`}
                        >
                          {quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase ${product.title} quantity`}
                          onClick={() =>
                            setCartQuantity(product.id, quantity + 1)
                          }
                          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-primary dark:hover:bg-white/5"
                        >
                          <Plus aria-hidden="true" className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-bold">
                        ৳ {formatPrice(product.price * quantity)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <footer className="border-t border-foreground/10 bg-foreground/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.03] sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/55">Items</span>
                <span className="text-sm font-semibold">{totalItems}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-heading text-lg font-bold">Subtotal</span>
                <span className="font-heading text-xl font-bold text-primary dark:text-teal-400">
                  ৳ {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-2 text-xs text-foreground/45">
                Delivery and payment details are confirmed when placing the
                order.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={clearCart}
                  className="cursor-pointer rounded-full border border-foreground/15 px-4 py-3 text-xs font-semibold transition-colors hover:border-rose-500 hover:text-rose-500 dark:border-white/15"
                >
                  Clear cart
                </button>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex items-center justify-center rounded-full bg-primary px-4 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#008c75]"
                >
                  View full cart
                </Link>
              </div>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-4 block text-center text-xs font-semibold text-foreground/50 transition-colors hover:text-primary"
              >
                Continue shopping
              </Link>
            </footer>
          </>
        )}
      </section>
    </div>
  );
};

export default CartDrawer;
