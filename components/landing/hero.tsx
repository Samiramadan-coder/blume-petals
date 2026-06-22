import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="h-screen">
      <div className="absolute inset-0 bg-[url('/images/home/hero/bouquet-of-rose.png')] bg-cover bg-center bg-no-repeat"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,12,0,0.82)_0%,rgba(20,12,0,0.4)_40%,rgba(20,12,0,0.05)_70%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,12,0,0.5)_0%,rgba(20,12,0,0.1)_50%,transparent_100%)]" />
      <div className="absolute inset-0 flex items-end">
        <div className="container pb-12">
          <p className="uppercase text-xs text-primary mb-5">
            Crafted Just For You
          </p>
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-xl mb-5 text-white">
            Design Your Dream Bouquet
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-white/80 mb-8">
            Choose your shape, pick every flower, add the finishing touches.
          </p>
          <div className="flex gap-4 mb-8">
            <Link href={"/building"}>
              <Button
                variant="default"
                className="rounded-full h-12 w-44 bg-secondary text-secondary-foreground hover:bg-secondary cursor-pointer"
              >
                Start Building
                <ArrowRight />
              </Button>
            </Link>
            <Link href={"/collections"}>
              <Button
                variant="ghost"
                className="rounded-full h-12 w-44 text-white hover:bg-transparent hover:text-white underline underline-offset-8 cursor-pointer"
              >
                Browse Collections
              </Button>
            </Link>
          </div>
          <p className="text-xs text-white/65">
            2,000+ Bouquets Designed · 4.9★ Rating · Same-Day Pickup
          </p>
        </div>
      </div>
    </section>
  );
}
