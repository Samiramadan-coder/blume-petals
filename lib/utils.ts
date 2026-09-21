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

/**
 * Formats a date into a human-readable string based on the difference from the current date.
 * If the date is today, it returns "Today" or "اليوم" based on the locale.
 * If the date is yesterday, it returns "Yesterday" or "أمس" based on the locale.
 * If the date is two days ago, it returns "2 days ago" or "منذ يومين" based on the locale.
 * For dates older than two days, it formats the date using Intl.DateTimeFormat.
 */
export function formatSmartDate(
  input: Date | string | number,
  locale: string = "ar",
): string {
  const date = input instanceof Date ? input : new Date(input);

  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();

  const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  const dateUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

  const diffInDays = Math.floor((todayUTC - dateUTC) / (1000 * 60 * 60 * 24));

  const isArabic = locale.startsWith("ar");

  const time = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  let day: string;

  if (diffInDays === 0) {
    day = isArabic ? "اليوم" : "Today";
  } else if (diffInDays === 1) {
    day = isArabic ? "أمس" : "Yesterday";
  } else if (diffInDays === 2) {
    day = isArabic ? "منذ يومين" : "2 days ago";
  } else {
    day = new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  }

  return `${day}${isArabic ? "،" : ","} ${time}`;
}

export const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
