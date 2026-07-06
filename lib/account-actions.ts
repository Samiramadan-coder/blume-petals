"use server";

import { http, ValidationError } from "@/lib/http";
import { Address, AddressFormBody } from "@/types/account";
import { updateTag } from "next/cache";

/**
 * Save address to the server. If address is provided, it will update the existing address, otherwise it will create a new one.
 */
type SaveAddressResult =
  | {
      success: true;
    }
  | {
      success: false;
      errors?: Partial<Record<keyof AddressFormBody, string>>;
      message?: string;
    };

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
