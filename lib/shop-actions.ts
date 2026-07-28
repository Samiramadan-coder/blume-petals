"use server";

import { Coupon, CouponFormValues } from "@/types/products";
import { http, ValidationError } from "./http";
import { updateTag } from "next/cache";
import { toast } from "sonner";

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
type AddToCartResponse =
  | { success: true }
  | { success: false; message?: string };

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
    if (error instanceof ValidationError) {
      return {
        success: false,
        message:
          Object.values(error.errors).flat().join(", ") || "Invalid value",
      };
    }
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
type UpdateCartQuantityResponse =
  | { success: true }
  | { success: false; message?: string };

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
    if (error instanceof ValidationError) {
      return {
        success: false,
        message:
          Object.values(error.errors).flat().join(", ") || "Invalid value",
      };
    }
    return { success: false };
  }
}

// Order Checkout
type CheckoutOrderResponse = { success: boolean };

export async function checkoutOrderAction(
  address_id: string,
  customer_notes: string,
  couponCode?: string | null,
): Promise<CheckoutOrderResponse> {
  try {
    await http.post(`/api/v1/orders`, {
      address_id,
      customer_notes,
      ...(couponCode ? { coupon_code: couponCode } : {}),
    });

    updateTag("cart-count");
    updateTag("orders");
    return { success: true };
  } catch (error) {
    console.error("Error checking out order:", error);
    return { success: false };
  }
}

// Validate Coupon Code
type ValidateCouponCodeResponse =
  | { success: true; coupon: Coupon }
  | {
      success: false;
      errors?: Partial<Record<keyof CouponFormValues, string>>;
    };

export async function validateCouponCodeAction(
  code: string,
): Promise<ValidateCouponCodeResponse> {
  try {
    const { data } = await http.post<{
      data: { coupon: Coupon };
    }>(`/api/v1/coupons/validate`, { code });

    return {
      success: true,
      coupon: data.data.coupon,
    };
  } catch (error) {
    console.error("Error validating coupon code:", error);
    if (error instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(error.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof CouponFormValues, string>>;
      return { success: false, errors };
    }

    return { success: false };
  }
}
