import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import AddressForm from "./address-form";
import { Address } from "@/types/account";
import { Card, CardContent } from "../ui/card";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import DeleteAddress from "./delete-address";

export default function Addresses({ addresses }: { addresses: Address[] }) {
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-foreground font-heading">
          My Addresses
        </h1>

        <AddressForm />
      </div>

      <div className="space-y-4">
        {addresses.map((address, index) => (
          <Card key={index} className="shadow-sm">
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
                    {address.label}
                  </Badge>

                  {address.is_default && (
                    <Badge className="h-7 font-semibold mb-2 text-xs">
                      Default
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {address.recipient_name}
                </h3>
                <p className="text-foreground/60 text-sm mb-2">
                  {address.street}, {address.emirate}, {address.city}
                </p>
                <p className="text-foreground/60 text-sm mb-3">
                  {address.area}
                </p>
                <p className="text-foreground/70 text-sm font-medium mb-3">
                  {address.recipient_phone}
                </p>
                {address.is_default && (
                  <p className="text-green-600 text-xs font-medium">
                    Default address
                  </p>
                )}
              </div>

              <div>
                <AddressForm
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
                  <div className="mt-2">
                    <Button
                      variant="ghost"
                      className="cursor-pointer text-xs text-primary hover:text-primary"
                    >
                      Set as Default
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
