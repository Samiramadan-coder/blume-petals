import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import MainButton from "../ui/main-button";
import LandingSubtitle from "./landing-subtitle";
import LandingTitle from "./landing-title";
import * as motion from "motion/react-client";
import { reviews } from "@/constants/home-page";

const rotations = [
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-2",
  "-rotate-2",
];

export default async function DesignedByOurCustomers() {
  return (
    <div className="bg-[#faf8f5]">
      <div className="container max-w-7xl">
        <div className="py-20">
          <LandingSubtitle className="text-center">
            Real Creations
          </LandingSubtitle>
          <LandingTitle className="mb-6 text-center">
            Designed by Our Customers
          </LandingTitle>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="mb-12 text-sm md:text-base mt-4 text-center mx-auto max-w-100"
          >
            Every bouquet below was built using our Custom Bouquet Builder — no
            two are the same.
          </motion.p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {reviews.map((review, index) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + index * 0.2 }}
                key={review.name}
              >
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
              </motion.div>
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
