import { cn } from "@/lib/utils";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import AddressForm from "./address-form";
import { Address, Country } from "@/types/account";
import DeleteAddress from "./delete-address";
import { Card, CardContent } from "../../ui/card";
import { getTranslations } from "next-intl/server";
import AddressAsDefault from "./address-as-default";
import { MapPin, Pencil, Trash2 } from "lucide-react";

export default async function Addresses({
  addresses,
  countries,
}: {
  addresses: Address[];
  countries: Country[];
}) {
  const t = await getTranslations("Account.Address");

  return (
    <>
      {addresses.length > 0 ? (
        <div className="space-y-4">
          {addresses.map((address, index) => (
            <Card
              key={index}
              className="shadow-[0_6px_20px_rgba(17,24,39,0.08)]"
            >
              <CardContent className="flex items-start gap-6 px-8">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="text-primary" />
                </div>

                <div className="flex-1">
                  <div className="space-x-2">
                    <Badge
                      className={cn("h-7 font-semibold mb-2 text-xs", {
                        "text-green-900 bg-green-200": address.label === "Home",
                        "text-blue-800 bg-blue-100": address.label === "Work",
                        "text-black-800 bg-blue-100": address.label === "Other",
                      })}
                    >
                      {t(address.label)}
                    </Badge>

                    {address.is_default && (
                      <Badge className="h-7 font-semibold mb-2 text-xs">
                        {t("DefaultAddress")}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {address.recipient_name}
                  </h3>
                  <p className="text-foreground/60 text-sm mb-2">
                    {/* {address.street}, {address.emirate}, {address.city} */}
                  </p>
                  <p className="text-foreground/60 text-sm mb-3">
                    {address.area}
                  </p>
                  <p className="text-foreground/70 text-sm font-medium mb-3">
                    {address.recipient_phone}
                  </p>
                  {address.is_default && (
                    <p className="text-green-600 text-xs font-medium">
                      {t("DefaultAddress")}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-1">
                  <AddressForm
                    countries={countries}
                    address={address}
                    trigger={
                      <Button variant="ghost" className="cursor-pointer">
                        <Pencil className="text-primary" />
                      </Button>
                    }
                  />

                  <DeleteAddress
                    addressId={address.id}
                    trigger={
                      <Button variant="ghost" className="cursor-pointer">
                        <Trash2 className="text-red-400" />
                      </Button>
                    }
                  />

                  {!address.is_default && (
                    <AddressAsDefault address={address} />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-sm py-10">
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground text-center">
              {t("NoAddresses")}
            </p>

            <AddressForm
              countries={countries}
              buttonClassName="bg-primary text-white"
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}
