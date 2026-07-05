import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";
import Image from "next/image";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { Card, CardContent } from "../../ui/card";
import { getTranslations } from "next-intl/server";
import { ChevronDownIcon, CircleCheckBig } from "lucide-react";
import OrderRate from "./order-rate";
import OrderReorder from "./order-reorder";

export default async function OrderCard() {
  const t = await getTranslations("Account.Orders");

  return (
    <Collapsible>
      <Card className="shadow-sm">
        <CardContent className="px-0">
          <div className="flex gap-4 items-start px-4 md:px-6">
            <div>
              <Image
                src="/images/home/bouquet-builder/bouquet-builder.png"
                alt="Product Image"
                width={80}
                height={80}
                className="rounded-md"
              />
            </div>
            <div className="flex-1">
              <p className="text-foreground/60 text-sm mb-1">
                Golden Hour Preserved Roses
              </p>
              <div className="flex items-center flex-wrap gap-4 mb-2">
                <p className="font-semibold text-foreground md:text-base">
                  Order #BP-2847
                </p>
                <Badge className="h-8 gap-1 bg-green-100 text-sm text-green-700 [&>svg]:size-4.5!">
                  <CircleCheckBig />
                  Delivered
                </Badge>
              </div>
              <p className="text-foreground/60 text-sm">June 5 2026</p>
            </div>
            <div>
              <p className="font-semibold text-foreground md:text-base mb-2">
                AED 305.00
              </p>
              <CollapsibleTrigger asChild>
                <Button className="cursor-pointer" variant="ghost">
                  <ChevronDownIcon className="transition-transform group-data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>

          <CollapsibleContent className="mt-4">
            <Separator />
            <div className="px-8 pt-4">
              <div className="mb-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 md:text-base">
                    {t("OrderItems")}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">
                        Golden Hour Preserved Roses ×1
                      </span>
                      <span className="text-foreground/60">AED 305.00</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2 md:text-base">
                    {t("DeliveryAddress")}
                  </h4>
                  <p className="text-foreground/60 text-sm">
                    123 Sheikh Zayed Road, Dubai, UAE
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2 md:text-base">
                    {t("PaymentMethod")}
                  </h4>
                  <p className="text-foreground/60 text-sm">
                    Credit Card (****4242)
                  </p>
                </div>
              </div>

              <Separator className="mb-4" />

              <div className="flex gap-4">
                <OrderReorder />
                <OrderRate />
              </div>
            </div>
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  );
}
