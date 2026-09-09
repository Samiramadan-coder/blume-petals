"use client";

import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { addSavedDesignToCart } from "@/lib/custom-builder";
import { Spinner } from "@/components/ui/spinner";

export default function AddToCart({ designId }: { designId: number }) {
  const router = useRouter();
  const t = useTranslations("Account.Designs");
  const [loading, setLoading] = useState(false);

  async function handleAddToCart() {
    setLoading(true);
    const result = await addSavedDesignToCart(designId, 1);

    if (result.success) {
      toast.success(t("AddedToCartSuccessfully"));
      router.push("/cart");
    } else {
      toast.error(t("FailedToAddToCart"));
    }
    setLoading(false);
  }

  return (
    <Button
      className="h-10 rounded-[10px] bg-primary text-white hover:bg-primary/90"
      aria-label="Add to Cart"
      onClick={handleAddToCart}
      disabled={loading}
    >
      {loading ? <Spinner /> : <ShoppingCart className="size-4" />}
      {t("AddToCart")}
    </Button>
  );
}
