"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { Button } from "../../ui/button";
import { Spinner } from "../../ui/spinner";
import { useTranslations } from "next-intl";
import { deleteAddress } from "@/lib/account-actions";

export default function DeleteAddress({
  addressId,
  trigger,
}: {
  addressId: number;
  trigger: React.ReactNode;
}) {
  const t = useTranslations("Account.Address");
  const tActions = useTranslations("Actions");
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);

    const result = await deleteAddress(addressId);

    if (result.success) {
      toast.success(t("AddressDeletedSuccess"));
      closeBtn.current?.click();
    } else {
      toast.error(t("AddressDeletedError"));
    }

    setIsLoading(false);
  }

  return (
    <Dialog>
      <DialogClose asChild>
        <Button ref={closeBtn} type="button" className="hidden"></Button>
      </DialogClose>

      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-700">
            {t("DeleteAddressTitle")}
          </DialogTitle>
          <DialogDescription>
            {t("DeleteAddressConfirmation")}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            variant="destructive"
            className="h-10 cursor-pointer"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : tActions("Delete")}
          </Button>
          <DialogClose asChild>
            <Button type="button" className="h-10 cursor-pointer">
              {tActions("Close")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
