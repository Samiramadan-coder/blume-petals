import { http } from "@/lib/http";
import { CartProvider } from "@/providers/cart-provider";
import { CartItem, Summary } from "@/types/products";
import type { ReactNode } from "react";

export default async function CartLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { data, ok } = await http.get<{
    data: {
      cart: {
        items: CartItem[];
        summary: Summary;
      };
    };
  }>("/api/v1/cart");

  if (!ok) {
    throw new Error("Failed to fetch cart");
  }

  return (
    <CartProvider
      initialItems={data.data.cart.items}
      initialSummary={data.data.cart.summary}
    >
      {children}
    </CartProvider>
  );
}
