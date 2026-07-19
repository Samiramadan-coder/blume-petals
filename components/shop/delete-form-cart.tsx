"use client";

import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { removeFromCartAction } from "@/lib/shop-actions";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

export default function DeleteFromCart({ itemId }: { itemId: number }) {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={async () => {
        setLoading(true);
        const result = await removeFromCartAction(itemId);
        setLoading(false);

        if (result.success) {
          toast.success("RemoveFromCartSuccess");
          return;
        }

        toast.error("RemoveFromCartError");
      }}
    >
      {loading ? (
        <Spinner className="text-primary" />
      ) : (
        <Trash2 className="text-red-400" />
      )}
    </Button>
  );
}
