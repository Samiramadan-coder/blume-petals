"use server";

import { http, ValidationError } from "@/lib/http";
import { Address, AddressFormBody } from "@/types/account";
import { updateTag } from "next/cache";

type SaveAddressResult =
  | {
      success: true;
    }
  | {
      success: false;
      errors?: Partial<Record<keyof AddressFormBody, string>>;
      message?: string;
    };

/**
 * Save address and return serializable field errors for the client form.
 */
export async function saveAddress(
  address: Address | null,
  data: AddressFormBody,
): Promise<SaveAddressResult> {
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
 * Delete Address
 */
type DeleteAddressResult = { success: boolean };

export async function deleteAddress(
  addressId: number,
): Promise<DeleteAddressResult> {
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
 * Set Address as Default
 */
type SetAsDefaultResult = { success: boolean };

export async function setAddressAsDefault(
  address: Address,
): Promise<SetAsDefaultResult> {
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
