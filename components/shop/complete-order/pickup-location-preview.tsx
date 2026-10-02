import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { useTranslations } from "next-intl";
import { PickupLocation } from "@/types/products";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MapView from "@/components/reusable/map-view";

export default function PickupLocationsPreview({
  pickupLocations,
  selectedPickupLocation,
  setSelectedPickupLocation,
}: {
  pickupLocations: PickupLocation[];
  selectedPickupLocation: string | null;
  setSelectedPickupLocation: (value: string) => void;
}) {
  const t = useTranslations("Shop");

  return (
    <div>
      <h3
        id="pickup-location-heading"
        className="mb-2 text-foreground font-semibold"
      >
        {t("PickupLocation")}
      </h3>
      <RadioGroup
        value={selectedPickupLocation || undefined}
        onValueChange={setSelectedPickupLocation}
        aria-labelledby="pickup-location-heading"
        className="w-full"
      >
        {pickupLocations.map((location) => (
          <FieldLabel
            htmlFor={`pickup-location-${location.id}`}
            className="bg-white p-4 cursor-pointer"
            key={location.id}
          >
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>
                  <span className="text-foreground">{location.name} </span>
                </FieldTitle>
                <FieldDescription className="flex items-center gap-1">
                  <span className="text-foreground">{t("Address")}: </span>
                  <span
                    className="underline italic text-muted-foreground font-bold"
                    dangerouslySetInnerHTML={{ __html: location.address }}
                  />
                  <MapView
                    latitude={+location.latitude}
                    longitude={+location.longitude}
                  />
                </FieldDescription>
                <FieldDescription>
                  <span className="text-foreground">{t("Hours")}: </span>
                  <span className="underline italic text-muted-foreground font-bold">
                    {location.hours}
                  </span>
                </FieldDescription>
                <FieldDescription>
                  <span className="text-foreground">{t("ReadyIn")}: </span>
                  <span className="underline italic text-muted-foreground font-bold">
                    {location.ready_in}
                  </span>
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem
                value={location.id.toString()}
                id={`pickup-location-${location.id}`}
              />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </div>
  );
}
