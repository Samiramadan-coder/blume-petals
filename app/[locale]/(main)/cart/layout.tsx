import { http } from "@/lib/http";
import { CartProvider } from "@/providers/cart-provider";
import { Address, Country } from "@/types/account";
import { CartItem, PickupLocation, Summary } from "@/types/products";
import type { ReactNode } from "react";

export default async function CartLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { data: cartData, ok: ok1 } = await http.get<{
    data: {
      cart: {
        items: CartItem[];
        summary: Summary;
      };
    };
  }>("/api/v1/cart", {
    next: {
      tags: ["cart"],
    },
  });

  const { data: addresses, ok: ok2 } = await http.get<{
    data: {
      items: Address[];
    };
  }>(`/api/v1/addresses`);

  const { data: countries, ok: ok3 } = await http.get<{
    data: {
      items: Country[];
    };
  }>("/api/v1/countries");

  const { data: pickupLocations, ok: ok4 } = await http.get<{
    data: {
      items: PickupLocation[];
    };
  }>(`/api/v1/pickup-locations`);

  if (!ok1 || !ok2 || !ok3 || !ok4) {
    throw new Error("Failed to fetch cart");
  }

  return (
    <CartProvider
      initialItems={cartData.data.cart.items}
      initialSummary={cartData.data.cart.summary}
      addresses={addresses.data.items}
      pickupLocations={pickupLocations.data.items}
      countries={countries.data.items}
    >
      {children}
    </CartProvider>
  );
}
