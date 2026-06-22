import { Link } from "@/i18n/navigation";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Countdown } from "./count-down";

export default function TodayExclusiveOffers() {
  return (
    <div className="bg-[url('/images/home/today-exclusive-offers/rose.png')] bg-cover bg-center bg-no-repeat">
      <div className="container">
        <div className="py-20 flex items-center justify-between">
          <div>
            <Badge
              variant="ghost"
              className="bg-[#ed8074] text-xs font-bold uppercase text-white mb-4 px-4 py-1.5"
            >
              Flash Sale — Up to 30% Off
            </Badge>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white text-balance leading-tight mb-4 max-w-105">
              Today&apos;s Exclusive Offers
            </h2>
            <p className="text-sm md:text-base mb-6 text-white/70 max-w-85">
              Select bouquets and preserved arrangements at special prices — for
              today only.
            </p>

            <Link href="/builder">
              <Button
                variant="default"
                className="rounded-full h-12 w-44 bg-secondary text-secondary-foreground hover:bg-secondary cursor-pointer"
              >
                Shop Sale
                <ArrowRight />
              </Button>
            </Link>
          </div>

          <Countdown targetDate="2026-06-25T23:59:59" />
        </div>
      </div>
    </div>
  );
}
