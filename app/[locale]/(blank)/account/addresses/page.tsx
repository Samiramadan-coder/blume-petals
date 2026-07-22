import { Suspense } from "react";
import { http } from "@/lib/http";
import { getTranslations } from "next-intl/server";
import { AddressesResponse, Country } from "@/types/account";
import PageTitle from "@/components/account/shared/page-title";
import Addresses from "@/components/account/addresses/addresses";
import AddressForm from "@/components/account/addresses/address-form";
import LoadingAddresses from "@/components/account/addresses/loading-addresses";

export async function generateMetadata() {
  const t = await getTranslations("Account");

  return {
    title: t("SavedAddresses"),
  };
}

async function AddressesContent({ countries }: { countries: Country[] }) {
  const { data } = await http.get<AddressesResponse>("/api/v1/addresses", {
    cache: "force-cache",
    next: {
      tags: ["addresses-page"],
    },
  });

  return <Addresses addresses={data.data.items} countries={countries} />;
}

export default async function AddressesPage() {
  const t = await getTranslations("Account.Address");

  const { data, ok } = await http.get<{
    data: { items: Country[] };
  }>("/api/v1/countries");

  if (!ok) {
    throw new Error(t("Errors.CountriesFetchFailed"));
  }

  return (
    <div className="space-y-6">
      <PageTitle title={t("Title")}>
        <AddressForm countries={data.data.items} />
      </PageTitle>

      <Suspense fallback={<LoadingAddresses />}>
        <AddressesContent countries={data.data.items} />
      </Suspense>
    </div>
  );
}
