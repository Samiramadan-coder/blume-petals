"use server";

import { http, ValidationError } from "@/lib/http";
import { Account, Address, AddressFormBody } from "@/types/account";
import { updateTag } from "next/cache";

/**
 * Save address and return serializable field errors for the client form.
 */
type SaveAddressResult =
  | {
      success: true;
    }
  | {
      success: false;
      errors?: Partial<Record<keyof AddressFormBody, string>>;
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

    return { success: false };
  }
}

/**
 * Delete Address and return success status.
 */
type DeleteAddressResult = {
  success: boolean;
};

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
 * Set Address as Default and return success status.
 */
type SetAddressAsDefaultResult = {
  success: boolean;
};

export async function setAddressAsDefault(
  address: Address,
): Promise<SetAddressAsDefaultResult> {
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

/**
 * update Profile and return serializable field errors for the client form.
 */
type UpdateProfileResult =
  | {
      success: true;
    }
  | {
      success: false;
      errors?: Partial<Record<keyof Account, string>>;
    };

export async function updateProfile(
  data: Account,
): Promise<UpdateProfileResult> {
  const formData = new FormData();

  for (const key in data) {
    if (data[key as keyof Account] !== undefined) {
      formData.append(key, data[key as keyof Account] as string);
    }
  }

  try {
    await http.patch("/api/v1/auth/me", formData);
    updateTag("profile-page");
    return { success: true };
  } catch (err) {
    if (err instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(err.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof Account, string>>;
      return { success: false, errors };
    }

    return { success: false };
  }
}
