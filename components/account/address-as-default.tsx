"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { http } from "@/lib/http";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { Address } from "@/types/account";

export default function AddressAsDefault({ address }: { address: Address }) {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("Account.Address");
  const router = useRouter();

  async function setAsDefault() {
    setIsLoading(true);
    try {
      await http.put(`/api/v1/addresses/${address.id}`, {
        ...address,
        is_default: true,
      });
      toast.success(t("SetAsDefaultSuccess"));
      router.refresh();
    } catch (error) {
      console.error("Failed to set address as default:", error);
      toast.error(t("SetAsDefaultError"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-2">
      <Button
        variant="ghost"
        className="cursor-pointer text-xs text-primary hover:text-primary"
        onClick={setAsDefault}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : t("SetAsDefault")}
      </Button>
    </div>
  );
}
