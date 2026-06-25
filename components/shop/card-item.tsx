import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Rating } from "../ui/rating";

export default function CardItem() {
  return (
    <Card className="group overflow-hidden bg-background p-0">
      <CardContent className="p-1">
        <div className="overflow-hidden relative aspect-5/5 rounded-2xl">
          <Image
            src="/images/home/hero/bouquet-of-rose.png"
            alt={"-"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          <div className="absolute top-0 left-0 p-4 w-full z-10 flex items-center justify-between">
            <Badge className="text-foreground text-xs">New</Badge>

            <Button
              aria-label={"-"}
              className="rounded-full h-10 w-10 bg-background hover:bg-background"
            >
              <Heart size={16} className="text-foreground" />
            </Button>
          </div>

          <Button
            aria-label={"Add to Cart"}
            className="h-10 bg-primary hover:bg-secondary cursor-pointer absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 z-10 py-2.5 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ShoppingCart size={16} className="mr-2 inline-block" />
            Add to Cart
          </Button>
        </div>

        <div className="flex flex-col pt-4">
          <p className="text-sm font-semibold leading-snug mb-1.5 text-foreground">
            Golden Hour Preserved Roses
          </p>
          <div className="mb-2">
            <Rating rating={4} count={100} />
          </div>
          <p className="text-base font-bold">AED 285</p>
        </div>
      </CardContent>
    </Card>
  );
}
