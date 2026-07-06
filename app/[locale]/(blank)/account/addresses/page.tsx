import Addresses from "@/components/account/addresses/addresses";
import { http } from "@/lib/http";
import { AddressesResponse } from "@/types/account";

export default async function AddressesPage() {
  const { data } = await http.get<AddressesResponse>("/api/v1/addresses", {
    cache: "force-cache",
    next: {
      tags: ["addresses-page"],
    },
  });

  return <Addresses addresses={data.data.items} />;
}
