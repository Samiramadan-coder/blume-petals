import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Pencil, ShoppingCart } from "lucide-react";

export default function DesignCard() {
  return (
    <Card className="overflow-hidden rounded-[20px] bg-white p-0 shadow-sm">
      <div className="relative h-70">
        <Image
          src="/images/home/how-it-works/2.png"
          alt="Sunset Romance"
          fill
          priority
          className="object-cover"
          sizes="294px"
        />

        <Badge className="absolute left-4 top-4 rounded-full bg-primary/40 px-3 py-1 text-xs font-semibold text-white shadow-none hover:bg-primary/50">
          Custom Build
        </Badge>

        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <Heart className="size-5 fill-red-600 text-red-600" />
        </button>
      </div>

      <CardContent className="space-y-4 p-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold leading-none text-foreground">
            Sunset Romance
          </h3>

          <p className="text-sm text-muted-foreground">
            Circular M · 12 flowers · Rosa + Hydrangea
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xl font-bold text-primary">AED 294.00</p>

          <p className="text-sm text-muted-foreground">Saved Jun 1, 2026</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="h-10 rounded-[10px] border-primary bg-white text-primary hover:bg-primary/10 hover:text-primary"
          >
            <Pencil className="size-4" />
            Edit
          </Button>

          <Button className="h-10 rounded-[10px] bg-primary text-white hover:bg-primary/90">
            <ShoppingCart className="size-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
