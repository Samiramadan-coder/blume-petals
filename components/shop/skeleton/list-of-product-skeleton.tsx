import { Skeleton } from "@/components/ui/skeleton";

// Mirrors the layout of the product list (toolbar, grid and card sizes) so
// swapping the skeleton for the real content does not shift the page.
export default function ListOfProductsSkeleton() {
  return (
    <div
      aria-busy="true"
      className="col-span-1 md:col-span-2 lg:col-span-3 motion-reduce:**:data-[slot=skeleton]:animate-none"
    >
      <div className="flex items-center justify-between gap-6 border-b border-border pb-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10.5 w-full max-w-48" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="overflow-hidden bg-background p-0">
            <Skeleton className="h-80 w-full rounded-lg" />

            <div className="flex flex-col px-1 pt-4">
              <Skeleton className="mb-2 h-6 w-20" />
              <Skeleton className="mb-1.5 h-5.5 w-3/4" />
              <Skeleton className="mb-3 h-4 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
