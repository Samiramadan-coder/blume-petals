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

// Response type for saving a design to the server
type SaveDesignResponse = { success: boolean };

export async function saveDesign(
  data: BuilderFormData,
): Promise<SaveDesignResponse> {
  const preparedData = {
    variant_id: data.variant_id,
    image: data.image,
    slots: data.slots.map((slot) => ({
      variant_id: slot.variant_id,
      qty: slot.qty,
    })),
  };

  try {
    await http.post("/api/v1/designs", preparedData);
    return { success: true };
  } catch (error) {
    console.error("Failed to save design:", error);
    return { success: false };
  }
}

// Add Saved Design to Cart
export async function addSavedDesignToCart(
  designId: number,
  qty: number,
): Promise<AddToCardResponse> {
  try {
    await http.post("/api/v1/cart/designs", { design_id: designId, qty });
    updateTag("cart-count");
    return { success: true };
  } catch (error) {
    console.error("Failed to add saved design to cart:", error);
    return { success: false };
  }
}
