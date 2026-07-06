"use server";

import { http, ValidationError } from "@/lib/http";
import { Address, AddressFormBody } from "@/types/account";
import { updateTag } from "next/cache";

/**
 * Save address and return serializable field errors for the client form.
 */
export async function saveAddress(
  address: Address | null,
  data: AddressFormBody,
): Promise<
  | {
      success: true;
    }
  | {
      success: false;
      errors?: Partial<Record<keyof AddressFormBody, string>>;
      message?: string;
    }
> {
  try {
    await http[address ? "put" : "post"](
      `/api/v1/addresses${address ? `/${address.id}` : ""}`,
      data,
    );

    updateTag("addresses-page");

    return { success: true };
  } catch (err) {
    if (err instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(err.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof AddressFormBody, string>>;

      return { success: false, errors };
    }

    return { success: false, message: "Failed to save address" };
  }
}

/**
 * Delete Address and return success status.
 */
export async function deleteAddress(
  addressId: number,
): Promise<{ success: boolean }> {
  try {
    await http.delete(`/api/v1/addresses/${addressId}`);
    updateTag("addresses-page");
    return { success: true };
  } catch (error) {
    console.error("Error deleting address:", error);
    return { success: false };
  }
}

/**
 * Set Address as Default and return success status.
 */
export async function setAddressAsDefault(
  address: Address,
): Promise<{ success: boolean }> {
  try {
    await http.put(`/api/v1/addresses/${address.id}`, {
      ...address,
      is_default: true,
    });
    updateTag("addresses-page");
    return { success: true };
  } catch (error) {
    console.error("Error setting address as default:", error);
    return { success: false };
  }
}
