"use server";

import { BuilderFormData } from "@/types/builder-page";
import { http } from "./http";
import { updateTag } from "next/cache";

// Response type for adding a design to the cart
type AddToCardResponse = { success: boolean };

export async function addToCart(
  data: BuilderFormData,
): Promise<AddToCardResponse> {
  try {
    await http.post("/api/v1/cart/designs", data);
    updateTag("cart-count");
    return { success: true };
  } catch (error) {
    console.error("Failed to add to cart:", error);
    return { success: false };
  }
}
