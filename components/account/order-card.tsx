"use client";

import { useState } from "react";

import { Card, CardContent } from "../ui/card";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronDownIcon, CircleCheckBig } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export default function OrderCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen}>
      <Card className="shadow-sm">
        <CardContent className="px-0">
          <div className="flex gap-4 items-start px-8">
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
              <div className="flex items-center gap-4 mb-2">
                <p className="font-semibold text-foreground text-base">
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
              <p className="font-semibold text-foreground text-base mb-2">
                AED 305.00
              </p>
              <Button
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
                variant="ghost"
              >
                <ChevronDownIcon
                  className={cn(
                    "ml-auto transition-transform size-5",
                    isOpen && "rotate-180",
                  )}
                />
              </Button>
            </div>
          </div>

          <CollapsibleContent className="mt-4">
            <Separator />
            <div className="px-8 pt-4">
              <div className="mb-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-base">
                    Order Items
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
                  <h4 className="font-semibold text-foreground mb-2 text-base">
                    Delivery Address
                  </h4>
                  <p className="text-foreground/60 text-sm">
                    123 Sheikh Zayed Road, Dubai, UAE
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2 text-base">
                    Payment Method
                  </h4>
                  <p className="text-foreground/60 text-sm">
                    Credit Card (****4242)
                  </p>
                </div>
              </div>

              <Separator className="mb-4" />

              <div className="flex gap-4">
                <Button
                  className="flex-1 cursor-pointer bg-white h-11 border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  variant="outline"
                >
                  Reorder
                </Button>
                <Button
                  className="flex-1 cursor-pointer bg-white h-11 border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  variant="outline"
                >
                  Rate Order
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  );
}
