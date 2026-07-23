import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";

import {
  ChevronDownIcon,
  CircleX,
  Clock3,
  LoaderCircle,
  PackageCheck,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import OrderRate from "./order-rate";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import OrderCancel from "./order-cancel";
import { OrderItem } from "@/types/account";
import { Separator } from "../../ui/separator";
import { Card, CardContent } from "../../ui/card";
import { getTranslations } from "next-intl/server";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "pickup"
  | "cancelled";

type StatusConfig = {
  icon: LucideIcon;
  className: string;
  iconClassName?: string;
};

const orderStatusConfig: Record<OrderStatus, StatusConfig> = {
  pending: {
    icon: Clock3,
    className: "bg-amber-100 text-amber-700",
  },
  processing: {
    icon: LoaderCircle,
    className: "bg-blue-100 text-blue-700",
    iconClassName: "animate-spin",
  },
  shipped: {
    icon: Truck,
    className: "bg-violet-100 text-violet-700",
  },
  delivered: {
    icon: PackageCheck,
    className: "bg-green-100 text-green-700",
  },
  pickup: {
    icon: Store,
    className: "bg-cyan-100 text-cyan-700",
  },
  cancelled: {
    icon: CircleX,
    className: "bg-red-100 text-red-700",
  },
};

function formatAddress(address: OrderItem["address"]) {
  return [
    address.building,
    address.street,
    address.area,
    address.city,
    address.country,
  ]
    .map((part) => {
      if (typeof part === "string") {
        return part.trim();
      }

      return part;
    })
    .filter(Boolean)
    .join(", ");
}

export default async function OrderCard({ order }: { order: OrderItem }) {
  const t = await getTranslations("Account.Orders");

  const status =
    order.status in orderStatusConfig
      ? (order.status as OrderStatus)
      : "pending";

  const statusConfig = orderStatusConfig[status];
  const StatusIcon = statusConfig.icon;
  const address = formatAddress(order.address);

  return (
    <Collapsible>
      <Card className="overflow-hidden shadow-[0_6px_20px_rgba(17,24,39,0.08)]">
        <CardContent className="px-0">
          <div className="flex items-start gap-4 px-4 md:px-6">
            <div className="min-w-0 flex-1">
              {order.items[0]?.name && (
                <p className="mb-2 truncate text-sm text-foreground/60">
                  {order.items[0].name}
                </p>
              )}

              <div className="mb-2 flex flex-wrap items-center gap-3">
                <p className="font-semibold text-foreground md:text-base">
                  {order.order_number}
                </p>
                <Badge
                  className={cn(
                    "h-6 gap-1.5 border-0 px-2 text-xs shadow-none",
                    "[&>svg]:size-3!",
                    statusConfig.className,
                  )}
                >
                  <StatusIcon
                    className={statusConfig.iconClassName}
                    aria-hidden="true"
                  />

                  {order.status_label}
                </Badge>
              </div>

              <p className="text-sm text-foreground/60">
                {order.placed_at.split("T")[0]}
              </p>
            </div>

            <div className="flex shrink-0 items-start gap-2">
              <p className="mt-2 whitespace-nowrap font-semibold text-foreground md:text-base">
                {order.currency} {order.summary.grand_total}
              </p>
              <CollapsibleTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "size-10 cursor-pointer rounded-full",
                    "[&[data-state=open]>svg]:rotate-180",
                  )}
                >
                  <ChevronDownIcon className="size-5 transition-transform duration-300" />
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>

          <CollapsibleContent className="mt-4">
            <Separator />

            <div className="px-4 pt-4 md:px-8">
              <div className="mb-4 space-y-5">
                <div>
                  <h4 className="mb-3 font-semibold text-foreground md:text-base">
                    {t("OrderItems")}
                  </h4>

                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-4 text-sm"
                      >
                        <span className="min-w-0 text-foreground">
                          {item.name} ×{item.qty}
                        </span>

                        <span className="shrink-0 text-foreground/60">
                          {order.currency} {item.line_total}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold text-foreground md:text-base">
                    {t("DeliveryAddress")}
                  </h4>
                  <p className="text-sm leading-6 text-foreground/60">
                    {address || "-"}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-foreground md:text-base">
                    {t("PaymentMethod")}
                  </h4>
                  <p className="text-sm text-foreground/60">Not specified</p>
                </div>
              </div>

              <Separator className="mb-4" />

              <div className="flex flex-wrap gap-4">
                {order.status === "pending" && <OrderCancel />}
                {order.status === "delivered" && <OrderRate />}
              </div>
            </div>
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  );
}
