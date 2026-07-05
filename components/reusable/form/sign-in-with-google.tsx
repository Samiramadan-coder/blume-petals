"use client";

import { toast } from "sonner";
import { http } from "@/lib/http";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { useTranslations } from "next-intl";

type GoogleLoginResponse = {
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
};

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
          const response = await http.post<GoogleLoginResponse>(
            "/api/v1/auth/social/google",
            {
              id_token: idToken,
            },
          );

          // console.log(response);
          // toast.success("Logged in successfully");
          // router.push("/account");
          // router.refresh();
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
