"use client";

import { Button } from "@/components/ui/button";
import { orderStatuses } from "@/constants/account";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { cn } from "@/lib/utils";

export default function OrdersStatusFilter() {
  const t = useTranslations("Account.Orders");
  const [queryParam, setQueryParam] = useQueryState(
    "status",
    parseAsString
      .withDefault("all")
      .withOptions({ history: "push", shallow: false }),
  );

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {orderStatuses(t).map((status) => (
        <Button
          variant="ghost"
          key={status.value}
          onClick={() => setQueryParam(status.value)}
          aria-label={`Filter orders by ${status.label}`}
          className={cn(
            "rounded-full text-base h-10 px-4 bg-primary/20 hover:bg-primary/20",
            queryParam === status.value &&
              "bg-primary hover:bg-primary text-white",
          )}
        >
          {status.label}
        </Button>
      ))}
    </div>
  );
}
