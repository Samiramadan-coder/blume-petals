import ProductDetails from "@/components/shop/product-details";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Rating } from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Van } from "lucide-react";
import Image from "next/image";

const sizes = [
  { label: "S", value: "s" },
  { label: "M", value: "m" },
  { label: "L", value: "l" },
  { label: "XL", value: "xl" },
];

export default function ProductPage() {
  return (
    <main className="container max-w-7xl py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="relative" key={index}>
                <Image
                  src={"/images/home/how-it-works/1.png"}
                  alt={"test"}
                  width={500}
                  height={500}
                  className="aspect-square w-full object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
          <div className="col-span-3 relative">
            <Image
              src={"/images/home/how-it-works/1.png"}
              alt={"test"}
              width={500}
              height={500}
              className="aspect-square w-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Golden Hour Preserved Roses
          </h1>
          <Rating rating={4} count={50} />
          <p className="text-4xl font-bold text-primary">AED 285.00</p>
          <p className="text-foreground/70 leading-relaxed">
            Handcrafted preserved flowers, lasts 1-3 years. Perfect for gifting.
          </p>
          <div className="space-y-3">
            <p className="font-semibold text-foreground mb-3">Size</p>
            <div className="flex gap-3 flex-wrap">
              {sizes.map((size) => (
                <Button
                  variant="outline"
                  key={size.value}
                  className="rounded-full w-14 h-14 boredr border-2 border-border cursor-pointer hover:bg-primary"
                >
                  {size.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-semibold text-foreground mb-3">
              Personal Message (Optional)
            </p>
            <Textarea placeholder="Add a personal message" className="h-30" />
          </div>

          <Card className="bg-secondary/10 border-l-4 border-secondary rounded-lg p-4">
            <CardContent className="flex items-center gap-3 p-0">
              <Van />
              <div>
                <p className="font-semibold text-foreground">
                  Estimated delivery
                </p>
                <p className="text-sm text-foreground/60">5-7 business days</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3">
            <div className="border-2 border-primary flex-1 rounded-lg flex">
              <Button variant="ghost" className="h-full w-10">
                -
              </Button>
              <Input
                className="h-full text-center border-0"
                type="number"
                defaultValue={10}
              />
              <Button variant="ghost" className="h-full w-10">
                +
              </Button>
            </div>

            <Button
              variant="outline"
              className="flex-1 cursor-pointer border-2 border-primary p-5 text-primary font-semibold hover:text-primary"
            >
              <Heart />
              Add to wishlist
            </Button>
            <Button
              variant="ghost"
              className="flex-1 cursor-pointer text-white border-2 border-secondary p-5 bg-secondary hover:bg-secondary hover:text-white font-semibold"
            >
              <Heart />
              Add to Cart
            </Button>
          </div>
        </div>

        {/*  */}
        <ProductDetails />
        {/* <div>
          <div className="mb-6 flex border-b border-border">
            <Button
              variant="ghost"
              className={`flex-1 h-11 rounded-none border-0 ${activeTab === "email" ? "border-b-4 border-primary" : ""}`}
              onClick={() => setActiveTab("email")}
            >
              Email
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 h-11 rounded-none border-0 ${activeTab === "phone" ? "border-b-4 border-primary" : ""}`}
              onClick={() => setActiveTab("phone")}
            >
              Phone Number
            </Button>
          </div>
        </div> */}
      </div>
    </main>
  );
}
