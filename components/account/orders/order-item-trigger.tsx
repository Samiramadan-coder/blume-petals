"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollapsibleTrigger } from "@/components/ui/collapsible";

export default function OrderItemTrigger() {
  return (
    <CollapsibleTrigger asChild onClick={(e) => e.stopPropagation()}>
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
  );
}
