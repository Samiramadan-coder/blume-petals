"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { removeFromCartAction } from "@/lib/shop-actions";
import { DialogDelete } from "../reusable/delete-dialoge";

export default function DeleteFromCart({ itemId }: { itemId: number }) {
  const [loadingDelete, setLoadingDelete] = useState(false);

  return (
    <DialogDelete
      loading={loadingDelete}
      onConfirm={async () => {
        setLoadingDelete(true);
        const result = await removeFromCartAction(itemId);
        setLoadingDelete(false);

        if (result.success) {
          toast.success("RemoveFromCartSuccess");
          return;
        }

        toast.error("RemoveFromCartError");
      }}
      trigger={
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-transparent"
          aria-label="Delete from cart"
        >
          <Trash2 className="size-4 text-red-400" />
        </Button>
      }
    />
  );
}
