"use server";

import { updateTag } from "next/cache";
import { http } from "./http";

// Add Or Remove Product to Wishlist
type AddToWishlistResponse = { success: boolean };

export async function addToWishlistAction(
  isFav: boolean,
  productSlug: string,
): Promise<AddToWishlistResponse> {
  const method = isFav ? "delete" : "post";

  try {
    await http[method](`/api/v1/products/${productSlug}/favorite`);
    updateTag("wishlist-count");
    return { success: true };
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return { success: false };
  }
}

// Add Product to Cart
type AddToCartResponse = { success: boolean };

export async function addToCartAction(
  variantId: number,
  quantity: number,
  message: string,
): Promise<AddToCartResponse> {
  try {
    await http.post(`/api/v1/cart/items`, {
      variant_id: variantId,
      qty: quantity,
      message_text: message,
    });
    updateTag("cart-count");
    return { success: true };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false };
  }
}
