import Image from "next/image";

export default function WhoWeAre() {
  return (
    <div className="container max-w-7xl">
      <div className="py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-20">
        <div>
          <p className="text-xs font-semibold uppercase mb-3 text-primary">
            Who We Are
          </p>

          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance leading-tight text-foreground mb-8">
            Why Blúme Petals
          </h2>

          <div className="text-foreground/68 leading-relaxed text-[15px] max-w-137.5 space-y-5">
            <p>
              Blúme Petals was born from a simple idea — that beauty
              shouldn&apos;t fade. We craft luxury artificial flower
              arrangements that capture the elegance of fresh blooms, designed
              to stay stunning for years, not days.
            </p>

            <p>
              Based in the UAE, every bouquet we create blends premium materials
              with thoughtful design — whether it&apos;s one of our signature
              collections or a one-of-a-kind arrangement built through our
              Custom Bouquet Builder.
            </p>

            <p>
              We believe gifting flowers should feel personal. That&apos;s why
              we let you choose every detail — from the shape and flowers to the
              ribbon and message card — so every bouquet tells your story.
            </p>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/images/about/who-we-are/who-we-are.png"
            alt="who we are"
            width={500}
            height={500}
            className="aspect-square w-full object-cover rounded-4xl"
          />
        </div>
      </div>
    </div>
  );
}
