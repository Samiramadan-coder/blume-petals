"use client";

import { Address, Country } from "@/types/account";
import { CartItem, PickupLocation, Summary } from "@/types/products";
import { useContext, createContext, type ReactNode } from "react";

type CartContextValue = {
  items: CartItem[];
  summary: Summary | null;
  addresses: Address[];
  pickupLocations: PickupLocation[];
  countries: Country[];
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
  initialItems,
  initialSummary,
  addresses,
  pickupLocations,
  countries,
}: {
  children: ReactNode;
  initialItems: CartItem[];
  initialSummary: Summary;
  addresses: Address[];
  pickupLocations: PickupLocation[];
  countries: Country[];
}) {
  const value: CartContextValue = {
    items: initialItems,
    summary: initialSummary,
    addresses: addresses,
    pickupLocations: pickupLocations,
    countries: countries,
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
