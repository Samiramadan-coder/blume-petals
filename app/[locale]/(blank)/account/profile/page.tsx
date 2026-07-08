import { http } from "@/lib/http";
import ProfileForm from "@/components/account/profile/profile-form";
import { UserResponse } from "@/components/reusable/app-header";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Account");

  return {
    title: t("MyProfile"),
  };
}

export default async function ProfilePage() {
  const { data } = await http.get<UserResponse>("/api/v1/auth/me", {
    cache: "force-cache",
    next: { tags: ["profile-page"] },
  });
  return <ProfileForm user={data.data.user} />;
}
