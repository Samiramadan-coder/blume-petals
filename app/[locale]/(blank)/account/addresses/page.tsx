import AddressForm from "@/components/account/addresses/address-form";
import Addresses from "@/components/account/addresses/addresses";
import LoadingAddresses from "@/components/account/addresses/loading-addresses";
import PageTitle from "@/components/account/shared/page-title";
import { http } from "@/lib/http";
import { AddressesResponse } from "@/types/account";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata() {
  const t = await getTranslations("Account");

  return {
    title: t("SavedAddresses"),
  };
}

async function AddressesContent() {
  const { data } = await http.get<AddressesResponse>("/api/v1/addresses", {
    cache: "force-cache",
    next: {
      tags: ["addresses-page"],
    },
  });

  return <Addresses addresses={data.data.items} />;
}

export default async function AddressesPage() {
  const t = await getTranslations("Account.Address");

  return (
    <div className="space-y-6">
      <PageTitle title={t("Title")}>
        <AddressForm />
      </PageTitle>

      <Suspense fallback={<LoadingAddresses />}>
        <AddressesContent />
      </Suspense>
    </div>
  );
}
