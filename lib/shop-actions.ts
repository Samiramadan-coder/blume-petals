"use server";

import { http } from "./http";
import { updateTag } from "next/cache";

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

// Remove Product from Cart
type RemoveFromCartResponse = { success: boolean };

export async function removeFromCartAction(
  itemId: number,
): Promise<RemoveFromCartResponse> {
  try {
    await http.delete(`/api/v1/cart/items/${itemId}`);
    updateTag("cart-count");
    return { success: true };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return { success: false };
  }
}

// Update Product Quantity in Cart
type UpdateCartQuantityResponse = { success: boolean };

export async function updateCartQuantityAction(
  itemId: number,
  quantity: number,
): Promise<UpdateCartQuantityResponse> {
  try {
    await http.patch(`/api/v1/cart/items/${itemId}`, {
      qty: quantity,
    });
    updateTag("cart-count");
    return { success: true };
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    return { success: false };
  }
}

// Order Checkout
type CheckoutOrderResponse = { success: boolean };

export async function checkoutOrderAction(
  address_id: string,
  customer_notes: string,
): Promise<CheckoutOrderResponse> {
  try {
    await http.post(`/api/v1/orders`, {
      address_id,
      customer_notes,
    });
    updateTag("cart-count");
    return { success: true };
  } catch (error) {
    console.error("Error checking out order:", error);
    return { success: false };
  }
}
