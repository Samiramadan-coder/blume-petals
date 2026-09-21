"use client";

import { Button } from "../ui/button";
import { MapPin } from "lucide-react";
import LocationPicker from "./form/location-picker";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function MapView({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="" variant="ghost">
          <MapPin />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl" showCloseButton={false}>
        <LocationPicker
          value={{
            latitude,
            longitude,
          }}
          onChange={() => {}}
        />
      </DialogContent>
    </Dialog>
  );
}
