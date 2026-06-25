import { Link } from "@/i18n/navigation";

export default function SimilarProducts() {
  return (
    <div className="col-span-2">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Similar Products
        </p>
        <Link href="/shop" className="text-primary">
          View All
        </Link>
      </div>
    </div>
  );
}
