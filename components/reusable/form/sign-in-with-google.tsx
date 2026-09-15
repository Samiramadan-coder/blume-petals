"use client";

import { toast } from "sonner";
import { http } from "@/lib/http";
import { saveToken } from "@/lib/actions";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LoginResponse } from "@/types/auth";
import { useLocale, useTranslations } from "next-intl";

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
  // Keep latest t/router available to the effect below without making it
  // re-run (and reload the Google script) on every unrelated re-render.
  const tRef = useRef(t);
  const routerRef = useRef(router);

  useEffect(() => {
    tRef.current = t;
    routerRef.current = router;
  });

  useEffect(() => {
    // Guards against a stale script's onload firing after this effect was
    // cleaned up (e.g. React Strict Mode double-invoke, or removing/adding
    // the script tag again before the previous load resolved), which used to
    // race the new render and could momentarily insert the button twice.
    let cancelled = false;
    const container = containerRef.current;

    const renderGoogleButton = () => {
      if (cancelled || !window.google || !container) return;

      container.innerHTML = "";

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async (credentialResponse: { credential?: string }) => {
          const idToken = credentialResponse.credential;

          if (!idToken) {
            toast.error(tRef.current("GoogleTokenFailed"));
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
              routerRef.current.push("/");
            }
          } catch {
            toast.error(tRef.current("GoogleLoginFailed"));
          }
        },
      });

      window.google.accounts.id.renderButton(container, {
        theme: "outline",
        size: "large",
        shape: "rectangular",
        text: "signin",
        locale: locale === "ar" ? "ar" : "en",
        width: container.offsetWidth,
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
      cancelled = true;
      script.remove();

      if (container) {
        container.innerHTML = "";
      }
    };
  }, [locale]);

  // Fixed height matches Google's "large" button so the page doesn't jump
  // once the script loads and renders the button in asynchronously.
  return <div ref={containerRef} className="w-full h-10" />;
}
