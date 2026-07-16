import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
