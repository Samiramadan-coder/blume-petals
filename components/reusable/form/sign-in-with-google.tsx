"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { http } from "@/lib/http";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { GoogleLogin } from "@react-oauth/google";
import { saveToken } from "@/lib/actions";
import { LoginResponse } from "@/types/auth";

export default function GoogleLoginButton() {
  const t = useTranslations("Register");
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const [buttonWidth, setButtonWidth] = useState(200);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const updateWidth = () => {
      const width = Math.floor(container.getBoundingClientRect().width);

      setButtonWidth(Math.min(width, 400));
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <GoogleLogin
        key={buttonWidth}
        width={buttonWidth.toString()}
        theme="outline"
        shape="rectangular"
        size="large"
        text="signin"
        onSuccess={async (credentialResponse) => {
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
        }}
        onError={() => {
          toast.error(t("GoogleLoginFailed"));
        }}
      />
    </div>
  );
}
