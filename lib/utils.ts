import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a URL with the given query string parameters.
 */
export function createQueryStringUrl({
  searchParams,
  pathname,
  key,
  value,
}: {
  searchParams: URLSearchParams | string;
  pathname: string;
  key: string;
  value?: string | string[];
}) {
  const params = new URLSearchParams(searchParams.toString());

  if (!value || (Array.isArray(value) && value.length === 0)) {
    params.delete(key);
  } else if (Array.isArray(value)) {
    params.delete(key);

    value.forEach((item) => {
      if (item) {
        params.append(key, item);
      }
    });
  } else {
    params.set(key, value);
  }

  const queryString = params.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
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
