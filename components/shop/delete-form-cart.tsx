"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { removeFromCartAction } from "@/lib/shop-actions";
import { DialogDelete } from "../reusable/delete-dialoge";

export default function DeleteFromCart({
  itemId,
  productName,
}: {
  itemId: number;
  productName: string;
}) {
  const t = useTranslations("Shop");
  const tActions = useTranslations("Actions");
  const [loadingDelete, setLoadingDelete] = useState(false);

  return (
    <DialogDelete
      loading={loadingDelete}
      title={t("RemoveFromCartTitle")}
      description={t("RemoveFromCartConfirmation")}
      confirmLabel={tActions("Delete")}
      onConfirm={async () => {
        setLoadingDelete(true);

        try {
          const result = await removeFromCartAction(itemId);

          if (result.success) {
            toast.success(t("RemoveFromCartSuccess"));
            return;
          }

          toast.error(t("RemoveFromCartError"));
        } catch {
          toast.error(t("RemoveFromCartError"));
        } finally {
          setLoadingDelete(false);
        }
      }}
      trigger={
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-transparent"
          aria-label={t("RemoveFromCart", { name: productName })}
        >
          <Trash2 className="size-4 text-red-400" />
        </Button>
      }
    />
  );
}
