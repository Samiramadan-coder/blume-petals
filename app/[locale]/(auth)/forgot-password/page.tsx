import ForgotPassword from "@/components/auth/forgot-password/forgot-password";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ForgotPassword");

  return {
    title: t("Title"),
  };
}

export default function ForgotPasswordPage() {
  return <ForgotPassword />;
}
