import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Choose Your Shape",
    description: "Round, cascading, hand-tied, or wrist corsage.",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: 2,
    title: "Pick Every Flower",
    description: "Hands placing roses one by one into your design.",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: 3,
    title: "Add Finishing Touches",
    description: "Kraft paper, silk, satin ribbon, or velvet box.",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
  {
    id: 4,
    title: "We Craft & Deliver",
    description: "Completed and packaged with care, delivered to you.",
    image: "/images/home/hero/bouquet-of-rose.png",
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-border">
      <div className="container">
        <div className="py-20">
          <p className="text-xs font-semibold uppercase mb-3 text-secondary text-center">
            How It Works
          </p>

          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-12 text-center">
            Four Steps to Your <br /> Perfect Bouquet
          </h2>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <div key={step.id} className="relative">
                <Card className="border-transparent bg-transparent shadow-none py-0">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-[24px]">
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={500}
                        height={500}
                        className="aspect-square w-full object-cover"
                      />

                      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#d8c07f] text-sm font-semibold text-[#3d2e00]">
                        {step.id}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-heading font-semibold text-lg text-foreground">
                        {step.title}
                      </h3>

                      <p className="text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href={"/building"}>
              <Button
                variant="default"
                className="rounded-full h-12 w-44 bg-secondary text-secondary-foreground hover:bg-secondary cursor-pointer"
              >
                Start Building
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
