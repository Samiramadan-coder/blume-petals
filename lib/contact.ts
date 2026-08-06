import { ContactFormData } from "@/types/contact";
import { http, ValidationError } from "./http";

// Contact form submission response type
type ContactFormDataResponse =
  | { success: true }
  | { success: false; errors?: Partial<Record<keyof ContactFormData, string>> };

// Sends the contact form data to the server and returns the submission result.
export async function sendContactForm(
  data: ContactFormData,
): Promise<ContactFormDataResponse> {
  try {
    await http.post("/api/v1/contact", data);
    return { success: true };
  } catch (error) {
    console.error("Contact form submission error:", error);

    if (error instanceof ValidationError) {
      const errors = Object.fromEntries(
        Object.entries(error.errors).map(([field, messages]) => [
          field,
          messages[0] ?? "Invalid value",
        ]),
      ) as Partial<Record<keyof ContactFormData, string>>;

      return { success: false, errors };
    }

    return { success: false };
  }
}
