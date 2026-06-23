import CardItem from "@/components/shop/card-item";
import Filters from "@/components/shop/filters";
import ProductSortSelect from "@/components/shop/product-sort-select";

export default function ShopPage() {
  return (
    <div className="container max-w-7xl">
      <div className="py-20">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">
          Shop Our Collection
        </h1>

        <p className="text-lg text-foreground/60">
          Discover our premium artificial flowers for every occasion
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start gap-6 mt-14">
          <Filters />

          <div className="col-span-3">
            <div className="flex items-center justify-between gap-6 border-b border-border pb-6">
              <p className="text-sm font-semibold text-foreground/70">
                12 Products
              </p>

              <ProductSortSelect />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <CardItem key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
