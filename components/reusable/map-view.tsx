"use client";

import { Button } from "../ui/button";
import { MapPin } from "lucide-react";
import LocationPicker from "./form/location-picker";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

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
        <Button
          size="icon"
          className=""
          variant="ghost"
          aria-label="View Location on Map"
        >
          <MapPin />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl" showCloseButton={false}>
        <DialogTitle className="sr-only">Location on Map</DialogTitle>
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
