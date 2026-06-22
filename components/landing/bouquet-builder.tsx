import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function BouquetBuilder() {
  return (
    <div>
      <div className="container">
        <div className="py-20 grid grid-cols-2 md:grid-cols-2 items-center gap-14">
          <div className="relative">
            <Image
              src="/images/home/bouquet-builder/bouquet-builder.png"
              alt="bouquet builder"
              width={500}
              height={500}
              className="aspect-square w-full object-cover rounded-4xl"
            />
            <div className="absolute -bottom-5 -inset-e-5 bg-primary py-4 px-5 rounded-2xl shadow-[0_8px_32px_rgba(203,182,130,0.4)]">
              <p className="text-xs font-semibold uppercase tracking-wider">
                Infinite Combinations
              </p>
              <p className="font-heading font-bold text-2xl">80+ Flowers</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase mb-3 text-secondary">
              The Bouquet Builder
            </p>

            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground">
              Build Something <br /> Only You Could Design
            </h2>

            <p className="text-base leading-relaxed mt-5 mb-10 max-w-100">
              Our interactive builder puts every creative choice in your hands —
              from the very first stem to the final ribbon tie.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-border w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base">
                  ❋
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Choose Your Shape
                  </p>
                  <p className="text-xs leading-relaxed mt-0.5 max-w-60.5">
                    Round, cascading, hand-tied, or wrist corsage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-border w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base">
                  ⊕
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Select Every Stem
                  </p>
                  <p className="text-xs leading-relaxed mt-0.5 max-w-60.5">
                    Mix and match from 80+ fresh flowers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-border w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base">
                  ⊛
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Pick Your Wrapping
                  </p>
                  <p className="text-xs leading-relaxed mt-0.5 max-w-60.5">
                    Kraft paper, silk, satin ribbon, or velvet box.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-border w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base">
                  ✉
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Add a Message
                  </p>
                  <p className="text-xs leading-relaxed mt-0.5 max-w-60.5">
                    A personalised note, handwritten by our team.
                  </p>
                </div>
              </div>
            </div>

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
