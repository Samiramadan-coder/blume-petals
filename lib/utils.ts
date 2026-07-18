import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Builds a query string from the given parameters.
 */
export function buildQueryString(params?: Record<string, unknown>) {
  const searchParams = new URLSearchParams();

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(`${key}[]`, String(item));
      });

      return;
    }

    searchParams.append(key, String(value));
  });

  return searchParams.toString();
}

/**
 * Normalizes a query parameter value to an array.
 * If the value is undefined, it returns undefined.
 * If the value is a string, it returns an array containing that string.
 * If the value is already an array, it returns the array as is.
 */
export function normalizeArrayParam(value?: string | string[]) {
  if (!value) return undefined;

  return Array.isArray(value) ? value : [value];
}
