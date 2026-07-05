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
import { useRef, useState } from "react";
import { Button } from "../../ui/button";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { http } from "@/lib/http";
import { Spinner } from "../../ui/spinner";

export default function DeleteAddress({
  addressId,
  trigger,
}: {
  addressId: number;
  trigger: React.ReactNode;
}) {
  const router = useRouter();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    try {
      await http.delete(`/api/v1/addresses/${addressId}`);
      toast.success("Address deleted successfully.");
      router.refresh();
      closeBtn.current?.click();
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogClose asChild>
        <Button ref={closeBtn} type="button" className="hidden"></Button>
      </DialogClose>

      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-700">Delete Address</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this address? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            variant="destructive"
            className="h-10"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button type="button" className="h-10">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
