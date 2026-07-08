import Login from "@/components/auth/login/login";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Login");

  return {
    title: t("SignInButton"),
  };
}

export default function LoginPage() {
  return <Login />;
}
