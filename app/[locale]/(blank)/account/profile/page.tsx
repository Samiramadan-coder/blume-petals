import { http } from "@/lib/http";
import ProfileForm from "@/components/account/profile/profile-form";
import { UserResponse } from "@/components/reusable/app-header";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import PageTitle from "@/components/account/shared/page-title";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Link } from "@/i18n/navigation";
import LoadingProfile from "@/components/account/profile/loading-profile";

export async function generateMetadata() {
  const t = await getTranslations("Account");

  return {
    title: t("MyProfile"),
  };
}

type SearchParams = {
  edit?: "true";
};

async function ProfileContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const preparedSearchParams = await searchParams;
  const editMode = preparedSearchParams.edit === "true";

  const { data } = await http.get<UserResponse>("/api/v1/auth/me", {
    cache: "force-cache",
    next: { tags: ["profile-page"] },
  });
  return <ProfileForm user={data.data.user} isEditMode={editMode} />;
}

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const t = await getTranslations("Account.Profile");
  return (
    <div className="space-y-6">
      <PageTitle title={t("Title")}>
        <Link href="/account/profile?edit=true">
          <Button className="cursor-pointer" variant="ghost">
            <Pencil className="text-primary size-5" />
          </Button>
        </Link>
      </PageTitle>

      <Suspense fallback={<LoadingProfile />}>
        <ProfileContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
