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
} from "@/components/ui/dialog";
import { useRef } from "react";
import { Spinner } from "../ui/spinner";
import { Button } from "@/components/ui/button";

export function DialogDelete({
  loading,
  trigger,
  title,
  description,
  onConfirm,
}: {
  loading: boolean;
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  onConfirm: () => Promise<void>;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  async function handleConfirm() {
    await onConfirm();
    closeButtonRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogClose asChild>
          <Button className="hidden" ref={closeButtonRef}></Button>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>{title ?? "Delete item"}</DialogTitle>
          <DialogDescription>
            {description ??
              "Are you sure you want to delete this item? This action cannot be undone."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" onClick={handleConfirm} variant="destructive">
              {loading ? <Spinner /> : "Confirm"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
