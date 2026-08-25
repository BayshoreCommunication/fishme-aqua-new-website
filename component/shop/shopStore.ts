"use client";

import type { ShopProduct } from "@/component/shop/types";
import { useSyncExternalStore } from "react";

export interface CartItem {
  productId: string;
  quantity: number;
}

interface ShopSnapshot {
  wishlist: string[];
  cart: CartItem[];
  catalog: Record<string, ShopProduct>;
  isCartOpen: boolean;
}

const STORAGE_KEY = "fishme-aqua-shop-v1";
const SERVER_SNAPSHOT: ShopSnapshot = {
  wishlist: [],
  cart: [],
  catalog: {},
  isCartOpen: false,
};

let snapshot = SERVER_SNAPSHOT;
let hasLoadedStorage = false;
const listeners = new Set<() => void>();

const normalizeProduct = (value: unknown): ShopProduct | null => {
  if (!value || typeof value !== "object") return null;
  const product = value as Partial<ShopProduct>;
  const id = String(product.id ?? "").trim();
  if (
    !id ||
    typeof product.title !== "string" ||
    typeof product.price !== "number" ||
    typeof product.category !== "string" ||
    typeof product.image !== "string" ||
    typeof product.description !== "string"
  ) {
    return null;
  }
  return { ...product, id } as ShopProduct;
};

const normalizeStoredState = (
  value: unknown,
): Pick<ShopSnapshot, "wishlist" | "cart" | "catalog"> => {
  if (!value || typeof value !== "object") {
    return { wishlist: [], cart: [], catalog: {} };
  }

  const stored = value as Partial<ShopSnapshot>;
  const wishlist = Array.isArray(stored.wishlist)
    ? [
        ...new Set(
          stored.wishlist.map((id) => String(id).trim()).filter(Boolean),
        ),
      ]
    : [];
  const cart = Array.isArray(stored.cart)
    ? stored.cart.flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const candidate = item as Partial<CartItem> & {
          productId?: string | number;
        };
        const productId = String(candidate.productId ?? "").trim();
        const quantity = Number(candidate.quantity);
        return productId && Number.isInteger(quantity) && quantity > 0
          ? [{ productId, quantity: Math.min(quantity, 99) }]
          : [];
      })
    : [];
  const catalog = Object.values(stored.catalog ?? {}).reduce<
    Record<string, ShopProduct>
  >((result, value) => {
    const product = normalizeProduct(value);
    if (product) result[product.id] = product;
    return result;
  }, {});

  return { wishlist, cart, catalog };
};

const readStorage = () => {
  if (typeof window === "undefined") {
    return { wishlist: [], cart: [], catalog: {} };
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    return storedValue
      ? normalizeStoredState(JSON.parse(storedValue) as unknown)
      : { wishlist: [], cart: [], catalog: {} };
  } catch {
    return { wishlist: [], cart: [], catalog: {} };
  }
};

const loadStorage = () => {
  if (hasLoadedStorage || typeof window === "undefined") return;
  snapshot = { ...readStorage(), isCartOpen: false };
  hasLoadedStorage = true;
};

const persist = () => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        wishlist: snapshot.wishlist,
        cart: snapshot.cart,
        catalog: snapshot.catalog,
      }),
    );
  } catch {
    // Shopping remains available in memory if browser storage is unavailable.
  }
};

const emitChange = () => listeners.forEach((listener) => listener());
const updateSnapshot = (
  updater: (current: ShopSnapshot) => ShopSnapshot,
  shouldPersist = true,
) => {
  loadStorage();
  snapshot = updater(snapshot);
  if (shouldPersist) persist();
  emitChange();
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    snapshot = { ...readStorage(), isCartOpen: snapshot.isCartOpen };
    hasLoadedStorage = true;
    emitChange();
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
};

const getSnapshot = () => {
  loadStorage();
  return snapshot;
};
const getServerSnapshot = () => SERVER_SNAPSHOT;
const withProduct = (
  current: ShopSnapshot,
  product?: ShopProduct,
): ShopSnapshot =>
  product
    ? { ...current, catalog: { ...current.catalog, [product.id]: product } }
    : current;

export const toggleWishlist = (productId: string, product?: ShopProduct) => {
  updateSnapshot((currentSnapshot) => {
    const current = withProduct(currentSnapshot, product);
    return {
      ...current,
      wishlist: current.wishlist.includes(productId)
        ? current.wishlist.filter((id) => id !== productId)
        : [...current.wishlist, productId],
    };
  });
};

export const clearWishlist = () => {
  updateSnapshot((current) => ({ ...current, wishlist: [] }));
};

export const addToCart = (
  productId: string,
  quantity = 1,
  product?: ShopProduct,
) => {
  const quantityToAdd = Math.max(1, Math.min(Math.round(quantity), 99));
  updateSnapshot((currentSnapshot) => {
    const current = withProduct(currentSnapshot, product);
    const existingItem = current.cart.find(
      (item) => item.productId === productId,
    );
    const cart = existingItem
      ? current.cart.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantityToAdd, 99),
              }
            : item,
        )
      : [...current.cart, { productId, quantity: quantityToAdd }];
    return { ...current, cart };
  });
};

export const setCartQuantity = (productId: string, quantity: number) => {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  updateSnapshot((current) => ({
    ...current,
    cart: current.cart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.min(Math.round(quantity), 99) }
        : item,
    ),
  }));
};

export const removeFromCart = (productId: string) => {
  updateSnapshot((current) => ({
    ...current,
    cart: current.cart.filter((item) => item.productId !== productId),
  }));
};

export const clearCart = () => {
  updateSnapshot((current) => ({ ...current, cart: [] }));
};
export const openCart = () => {
  updateSnapshot((current) => ({ ...current, isCartOpen: true }), false);
};
export const closeCart = () => {
  updateSnapshot((current) => ({ ...current, isCartOpen: false }), false);
};

export const useShopStore = () => {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    ...state,
    toggleWishlist,
    clearWishlist,
    addToCart,
    setCartQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
  };
};
