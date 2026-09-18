import { SubscribeFormValues } from "@/types/subscribe";
import { http, ValidationError } from "./http";

// Function to handle newsletter subscription
type SubScribeResponse =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      errors?: Partial<Record<keyof SubscribeFormValues, string>>;
    };

export async function subscribe(
  values: SubscribeFormValues,
): Promise<SubScribeResponse> {
  try {
    const { data } = await http.post<{ message: string }>(
      "/api/v1/newsletter/subscribe",
      values,
    );

    return { success: true, message: data.message };
  } catch (err) {
    console.error("Error subscribing:", err);
    if (err instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(err.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof SubscribeFormValues, string>>;
      return { success: false, errors };
    }

    return { success: false };
  }
}
