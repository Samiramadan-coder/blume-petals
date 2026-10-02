import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { useTranslations } from "next-intl";
import { Address, Country } from "@/types/account";
import AddressForm from "@/components/account/addresses/address-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AddresssPreview({
  countries,
  addresses,
  selectedAddress,
  setSelectedAddress,
}: {
  countries: Country[];
  addresses: Address[];
  selectedAddress: string;
  setSelectedAddress: (value: string) => void;
}) {
  const t = useTranslations("Shop");

  return (
    <>
      <AddressForm countries={countries} />

      <div>
        <h3
          id="shipping-address-heading"
          className="mb-2 text-foreground font-semibold"
        >
          {t("ShippingAddress")}
        </h3>
        {addresses.length === 0 ? (
          <p className="italic underline text-primary">
            {t("AddAddressToProceed")}
          </p>
        ) : (
          <RadioGroup
            value={selectedAddress}
            onValueChange={setSelectedAddress}
            aria-labelledby="shipping-address-heading"
            className="w-full"
          >
            {addresses.map((address) => (
              <FieldLabel
                htmlFor={`address-${address.id}`}
                className="bg-white p-4 cursor-pointer"
                key={address.id}
              >
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>
                      <span className="text-foreground">{t("Address")}: </span>
                      <span className="underline italic text-muted-foreground font-bold">
                        {address.city.name}, {address.country.name},{" "}
                        {address.area}, {address.street}, {address.building},{" "}
                        {address.apartment}
                      </span>
                    </FieldTitle>
                    <FieldDescription>
                      <span className="text-foreground">
                        {t("DeliveryFee")}:{" "}
                      </span>
                      <span className="underline italic text-muted-foreground font-bold">
                        {address.city.delivery_fee} {t("AED")}
                      </span>
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    value={address.id.toString()}
                    id={`address-${address.id}`}
                  />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        )}
      </div>
    </>
  );
}
