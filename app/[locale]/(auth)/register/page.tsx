import Register from "@/components/auth/register/register";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Register");

  return {
    title: t("CreateAccountTitle"),
  };
}

export default function RegisterPage() {
  return <Register />;
}
