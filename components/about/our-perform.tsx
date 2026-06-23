import { Card, CardContent } from "../ui/card";
import { Clock3, SlidersHorizontal, PackageCheck } from "lucide-react";

export default function OurPerform() {
  return (
    <div className="bg-[#faf8f5]">
      <div className="container max-w-7xl">
        <div className="py-20">
          <p className="text-xs font-semibold uppercase mb-3 text-primary text-center">
            Our Promise
          </p>

          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-8 text-center">
            What Makes Us Different
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-border shadow-sm p-8">
              <CardContent className="flex flex-col items-center gap-4">
                <div className="bg-border w-14 h-14 rounded-full grid place-items-center">
                  <Clock3 className="w-6 h-6 text-foreground" />
                </div>
                <h4 className="text-center font-heading text-xl font-bold text-foreground">
                  Made to Last
                </h4>
                <p className="text-center text-sm text-foreground/60 leading-relaxed">
                  Premium artificial flowers that stay beautiful for years, not
                  days.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm p-8">
              <CardContent className="flex flex-col items-center gap-4">
                <div className="bg-border w-14 h-14 rounded-full grid place-items-center">
                  <SlidersHorizontal className="w-6 h-6 text-foreground" />
                </div>
                <h4 className="text-center font-heading text-xl font-bold text-foreground">
                  Fully Customizable
                </h4>
                <p className="text-center text-sm text-foreground/60 leading-relaxed">
                  Design your own bouquet with our interactive Custom Builder —
                  every detail, your choice.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm p-8">
              <CardContent className="flex flex-col items-center gap-4">
                <div className="bg-border w-14 h-14 rounded-full grid place-items-center">
                  <PackageCheck className="w-6 h-6 text-foreground" />
                </div>
                <h4 className="text-center font-heading text-xl font-bold text-foreground">
                  UAE-Wide Delivery & Pickup
                </h4>
                <p className="text-center text-sm text-foreground/60 leading-relaxed">
                  Delivered to your door across the Emirates, or pick up from
                  our store.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
