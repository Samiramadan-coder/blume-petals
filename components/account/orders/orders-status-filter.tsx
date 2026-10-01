"use client";

import { Button } from "@/components/ui/button";
import { orderStatuses } from "@/constants/account";
import { useTranslations } from "next-intl";
import { parseAsString, throttle, useQueryStates } from "nuqs";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

export default function OrdersStatusFilter() {
  const t = useTranslations("Account.Orders");

  const [isPending, startTransition] = useTransition();

  // `page` is cleared together with `status`: keeping page=2 after switching
  // to a filter with a single page showed the empty state.
  const [{ status: queryParam }, setQuery] = useQueryStates(
    {
      status: parseAsString.withDefault("all"),
      page: parseAsString,
    },
    {
      history: "replace",
      shallow: false,
      startTransition,
      limitUrlUpdates: throttle(500),
    },
  );

  return (
    <div
      className={cn(
        "mb-6 flex flex-wrap items-center gap-2 transition-opacity",
        isPending && "opacity-70",
      )}
    >
      {orderStatuses(t).map((status) => {
        const isActive = queryParam === status.value;

        return (
          <Button
            type="button"
            variant="ghost"
            key={status.value}
            onClick={() => void setQuery({ status: status.value, page: null })}
            aria-label={`Filter orders by ${status.label}`}
            aria-pressed={isActive}
            className={cn(
              "h-10 rounded-full bg-primary/20 px-4 text-base hover:bg-primary/20",
              isActive &&
                "bg-primary text-white hover:bg-primary hover:text-white",
            )}
          >
            {status.label}
          </Button>
        );
      })}
    </div>
  );
}
