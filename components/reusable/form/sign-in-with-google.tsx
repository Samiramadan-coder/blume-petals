"use client";

import { toast } from "sonner";
import { http } from "@/lib/http";
import { saveToken } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LoginResponse } from "@/types/auth";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}

export default function GoogleLoginButton() {
  const t = useTranslations("Register");
  const locale = useLocale();
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderGoogleButton = () => {
      if (!window.google || !containerRef.current) return;

      containerRef.current.innerHTML = "";

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async (credentialResponse: { credential?: string }) => {
          const idToken = credentialResponse.credential;

          if (!idToken) {
            toast.error(t("GoogleTokenFailed"));
            return;
          }

          try {
            const { data } = await http.post<LoginResponse>(
              "/api/v1/auth/social/google",
              {
                id_token: idToken,
              },
            );

            if (data.data.token) {
              await saveToken(data.data.token);
              router.push("/");
            }
          } catch {
            toast.error(t("GoogleLoginFailed"));
          }
        },
      });

      window.google.accounts.id.renderButton(containerRef.current, {
        theme: "outline",
        size: "large",
        shape: "rectangular",
        text: "signin",
        locale: locale === "ar" ? "ar" : "en",
        width: containerRef.current.offsetWidth,
      });
    };

    const oldScript = document.querySelector(
      'script[src*="accounts.google.com/gsi/client"]',
    );

    if (oldScript) {
      oldScript.remove();
    }

    delete window.google;

    const script = document.createElement("script");

    script.src = `https://accounts.google.com/gsi/client?hl=${
      locale === "ar" ? "ar" : "en"
    }`;

    script.async = true;
    script.defer = true;
    script.onload = renderGoogleButton;

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [locale, router, t]);

  return <div ref={containerRef} className="w-full" />;
}
