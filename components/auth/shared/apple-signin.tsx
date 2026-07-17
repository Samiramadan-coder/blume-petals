"use client";

import { useLocale } from "next-intl";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaApple } from "react-icons/fa";

export default function AppleLoginButton() {
  const locale = useLocale();

  return (
    <Button
      type="button"
      variant="outline"
      className="h-10 w-full rounded-xs bg-white cursor-pointer"
      onClick={() =>
        signIn("apple", { callbackUrl: `/${locale}/apple/callback` })
      }
    >
      <FaApple />
      Continue with Apple
    </Button>
  );
}
