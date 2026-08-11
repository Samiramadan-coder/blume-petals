"use client";

import { CartItem, Summary } from "@/types/products";
import { useContext, createContext, type ReactNode } from "react";

type CartContextValue = {
  items: CartItem[];
  summary: Summary | null;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
  initialItems,
  initialSummary,
}: {
  children: ReactNode;
  initialItems: CartItem[];
  initialSummary: Summary;
}) {
  const value: CartContextValue = {
    items: initialItems,
    summary: initialSummary,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Hook to access cart context
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
