"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryParam() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setQueryParams(
    updates: Record<string, string | string[] | undefined>,
  ) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      params.delete(key);

      if (!value || (Array.isArray(value) && value.length === 0)) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item) {
            params.append(key, item);
          }
        });

        return;
      }

      params.set(key, value);
    });

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(url);
  }

  function setQueryParam(key: string, value: string | string[]) {
    setQueryParams({ [key]: value });
  }

  return {
    setQueryParam,
    setQueryParams,
  };
}
