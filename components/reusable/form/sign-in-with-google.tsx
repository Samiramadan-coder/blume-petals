"use client";

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

  return (
    <GoogleLogin
      theme="outline"
      width={"40px"}
      shape="square"
      size="large"
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
  );
}
