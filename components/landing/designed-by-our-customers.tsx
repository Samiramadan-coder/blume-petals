import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import MainButton from "../ui/main-button";

const reviews = [
  {
    name: "Sara A.",
    image: "/images/home/reviews/review.png",
  },
  {
    name: "Fatima K.",
    image: "/images/home/reviews/review.png",
  },
  {
    name: "Leila M.",
    image: "/images/home/reviews/review.png",
  },
  {
    name: "Nour H.",
    image: "/images/home/reviews/review.png",
  },
  {
    name: "Amira S.",
    image: "/images/home/reviews/review.png",
  },
];

const rotations = [
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-2",
  "-rotate-2",
];

export default async function DesignedByOurCustomers() {
  const t = await getTranslations("LandingHowItWorks");

  return (
    <div className="bg-[#faf8f5]">
      <div className="container">
        <div className="py-20">
          <p className="text-xs font-semibold uppercase mb-3 text-secondary text-center">
            Real Creations
          </p>

          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground text-center">
            Designed by Our Customers
          </h2>

          <p className="mb-12 text-sm md:text-base mt-4 text-center mx-auto max-w-100">
            Every bouquet below was built using our Custom Bouquet Builder — no
            two are the same.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {reviews.map((review, index) => (
              <div key={review.name}>
                <Card
                  className={cn(
                    "p-0 pb-8 shadow-[0_8px_30px_rgba(61,46,0,0.08)] transition-transform duration-300 hover:rotate-0",
                    rotations[index],
                  )}
                >
                  <CardContent className="p-3">
                    <div className="relative aspect-5/5 overflow-hidden">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="pt-4 text-center">
                  <h3 className="text-sm font-semibold text-foreground">
                    {review.name}
                  </h3>

                  <p className="text-[11px]">Built with our Bouquet Builder</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <MainButton href="/builder" label="Start Your Own" />
          </div>
        </div>
      </div>
    </div>
  );
}
