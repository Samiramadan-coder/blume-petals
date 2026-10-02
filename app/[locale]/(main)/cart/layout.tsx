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
  // This layout re-renders after every cart mutation, so the requests run
  // together instead of one after another.
  const [
    { data: cartData, ok: ok1 },
    { data: addresses, ok: ok2 },
    { data: countries, ok: ok3 },
    { data: pickupLocations, ok: ok4 },
  ] = await Promise.all([
    http.get<{
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
    }),
    http.get<{
      data: {
        items: Address[];
      };
    }>(`/api/v1/addresses`),
    http.get<{
      data: {
        items: Country[];
      };
    }>("/api/v1/countries"),
    http.get<{
      data: {
        items: PickupLocation[];
      };
    }>(`/api/v1/pickup-locations`),
  ]);

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
