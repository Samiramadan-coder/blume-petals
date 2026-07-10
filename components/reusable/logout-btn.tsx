"use client";

import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { deleteToken } from "@/lib/actions";
import { logoutUser } from "@/lib/auth-actions";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function LogoutBtn({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("AppHeader");
  const router = useRouter();

  async function logout() {
    setIsLoading(true);
    const result = await logoutUser();

    if (result.success) {
      await deleteToken();
      toast.success(t("LogoutSuccess"));
      router.replace("/login");
      setIsLoading(false);
      return;
    }

    toast.error(t("LogoutError"));
    setIsLoading(false);
  }

  return (
    <Button
      className={cn(
        "w-full h-12 text-red-500 rounded-lg cursor-pointer hover:bg-red-50 hover:text-red-600",
        className,
      )}
      variant="ghost"
      onClick={logout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      {isLoading ? <Spinner /> : t("Logout")}
    </Button>
  );
}
