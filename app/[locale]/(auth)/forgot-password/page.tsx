import { getTranslations } from "next-intl/server";
import ForgotPassword from "@/components/auth/forgot-password/forgot-password";

export async function generateMetadata() {
  const t = await getTranslations("ForgotPassword");

  return {
    title: t("Title"),
  };
}

export default function ForgotPasswordPage() {
  return <ForgotPassword />;
}
