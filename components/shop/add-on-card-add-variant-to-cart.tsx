"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { Product } from "@/types/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddToCartBtn from "./add-to-cart-btn";

export default function AddOnCardAddVariantToCart({ item }: { item: Product }) {
  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (nextQuantity: number) => {
    if (!Number.isFinite(nextQuantity)) {
      setQuantity(1);
      return;
    }

    setQuantity(Math.max(Math.floor(nextQuantity), 1));
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex h-10 items-center overflow-hidden rounded-full border border-primary/30 bg-background shadow-sm">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={quantity === 1}
          onClick={() => updateQuantity(quantity - 1)}
          aria-label="Decrease quantity"
          className="h-full w-10 shrink-0 rounded-none text-primary hover:bg-primary/10 hover:text-primary disabled:opacity-30"
        >
          <Minus className="size-4" />
        </Button>

        <Input
          type="text"
          value={quantity}
          readOnly
          inputMode="numeric"
          aria-label="Quantity"
          className="h-full w-11 rounded-none border-0 bg-transparent px-0 text-center text-sm font-semibold shadow-none focus-visible:ring-0"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => updateQuantity(quantity + 1)}
          aria-label="Increase quantity"
          className="h-full w-10 shrink-0 rounded-none text-primary hover:bg-primary/10 hover:text-primary"
        >
          <Plus className="size-4" />
        </Button>
      </div>

      <AddToCartBtn
        item={item}
        isLoggedIn
        message=""
        quantity={quantity}
        variant_id={1}
        hideText
        className="size-10 shrink-0 rounded-full bg-primary p-0 text-white shadow-sm transition-transform hover:scale-105 hover:bg-primary/90 active:scale-95"
        iconClassName="size-4!"
      />
    </div>
  );
}
