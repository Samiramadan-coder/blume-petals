"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { http } from "@/lib/http";
import { deleteToken } from "@/lib/actions";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

export default function LogoutBtn() {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("AppHeader");
  const router = useRouter();

  async function logout() {
    setIsLoading(true);
    try {
      await http.post("/api/v1/auth/logout");
      await deleteToken();
      toast.success(t("LogoutSuccess"));
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error(t("LogoutError"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      className="w-full h-12 text-red-500 rounded-lg cursor-pointer hover:bg-red-50 hover:text-red-600"
      variant="ghost"
      onClick={logout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      {isLoading ? <Spinner /> : t("Logout")}
    </Button>
  );
}
