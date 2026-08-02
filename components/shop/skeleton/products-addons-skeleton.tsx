import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type ProductsSkeletonProps = {
  count?: number;
  className?: string;
  showPagination?: boolean;
};

export default function ProductsSkeleton({
  count = 4,
  className,
  showPagination = false,
}: ProductsSkeletonProps) {
  return (
    <section className="col-span-full space-y-8">
      <div
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
          className,
        )}
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border bg-background"
          >
            <Skeleton className="aspect-square w-full rounded-none" />

            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />

                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex h-10 w-32 items-center justify-between rounded-xl border px-4">
                  <Skeleton className="size-3 rounded-sm" />
                  <Skeleton className="h-4 w-3" />
                  <Skeleton className="size-3 rounded-sm" />
                </div>

                <Skeleton className="size-10 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {showPagination && (
        <div className="flex justify-end">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="size-9 rounded-xl" />
            <Skeleton className="h-4 w-3" />
            <Skeleton className="h-4 w-3" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="size-4 rounded-sm" />
          </div>
        </div>
      )}
    </section>
  );
}
