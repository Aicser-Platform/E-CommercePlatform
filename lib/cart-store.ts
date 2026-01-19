"use client";

import { create } from "zustand";
import type { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size?: string, color?: string) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

function getCartItemId(productId: string, size?: string, color?: string): string {
  return `${productId}-${size || "default"}-${color || "default"}`;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product: Product, size?: string, color?: string) => {
    set((state) => {
      const cartItemId = getCartItemId(product.id, size, color);
      const existingItem = state.items.find(
        (item) => getCartItemId(item.product.id, item.selectedSize, item.selectedColor) === cartItemId
      );
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            getCartItemId(item.product.id, item.selectedSize, item.selectedColor) === cartItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1, selectedSize: size, selectedColor: color }] };
    });
  },

  removeItem: (cartItemId: string) => {
    set((state) => ({
      items: state.items.filter(
        (item) => getCartItemId(item.product.id, item.selectedSize, item.selectedColor) !== cartItemId
      ),
    }));
  },

  updateQuantity: (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(cartItemId);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        getCartItemId(item.product.id, item.selectedSize, item.selectedColor) === cartItemId
          ? { ...item, quantity }
          : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
}));

export { getCartItemId };
