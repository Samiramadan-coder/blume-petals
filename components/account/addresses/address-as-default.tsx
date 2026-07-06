"use client";

import { useTranslations } from "next-intl";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "../../ui/spinner";
import { Address } from "@/types/account";
import { setAddressAsDefault } from "@/lib/account-actions";

export default function AddressAsDefault({ address }: { address: Address }) {
  const t = useTranslations("Account.Address");
  const [isLoading, setIsLoading] = useState(false);

  async function setAsDefault() {
    setIsLoading(true);
    const result = await setAddressAsDefault(address);

    if (result.success) {
      toast.success(t("SetAsDefaultSuccess"));
    } else {
      toast.error(t("SetAsDefaultError"));
    }
    setIsLoading(false);
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
