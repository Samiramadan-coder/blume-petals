import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PickupLocation } from "@/types/products";

export default function PickupLocationsPreview({
  pickupLocations,
  selectedPickupLocation,
  setSelectedPickupLocation,
}: {
  pickupLocations: PickupLocation[];
  selectedPickupLocation: string | null;
  setSelectedPickupLocation: (value: string) => void;
}) {
  return (
    <div>
      <h3 className="mb-2 text-foreground font-semibold">Pickup Locations</h3>
      <RadioGroup
        value={selectedPickupLocation || undefined}
        onValueChange={setSelectedPickupLocation}
        className="w-full"
      >
        {pickupLocations.map((location) => (
          <FieldLabel
            htmlFor={location.id.toString()}
            className="bg-white p-4 cursor-pointer"
            key={location.id}
          >
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>
                  <span className="text-foreground">{location.name}</span>
                </FieldTitle>
                <FieldDescription className="flex gap-1">
                  <span className="text-foreground">Address: </span>
                  <div
                    className="underline italic text-muted-foreground font-bold"
                    dangerouslySetInnerHTML={{ __html: location.address }}
                  />
                </FieldDescription>
                <FieldDescription>
                  <span className="text-foreground">Hours: </span>
                  <span className="underline italic text-muted-foreground font-bold">
                    {location.hours}
                  </span>
                </FieldDescription>
                <FieldDescription>
                  <span className="text-foreground">Ready in: </span>
                  <span className="underline italic text-muted-foreground font-bold">
                    {location.ready_in}
                  </span>
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem
                value={location.id.toString()}
                id={location.id.toString()}
              />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </div>
  );
}
