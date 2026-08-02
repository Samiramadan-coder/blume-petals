import { Skeleton } from "@/components/ui/skeleton";

export default function ProductReviewsSkeleton() {
  return (
    <section className="col-span-full space-y-14">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[380px_1fr] lg:gap-20">
        {/* Rating breakdown */}
        <div className="space-y-7">
          <Skeleton className="h-5 w-36" />

          <div className="space-y-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[96px_14px_1fr_24px] items-center gap-3"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Skeleton key={starIndex} className="size-4 rounded-sm" />
                  ))}
                </div>

                {/* Rating number */}
                <Skeleton className="h-4 w-3" />

                {/* Progress bar */}
                <Skeleton className="h-2 w-full rounded-full" />

                {/* Reviews count */}
                <Skeleton className="h-4 w-6" />
              </div>
            ))}
          </div>
        </div>

        {/* Review card */}
        <div className="space-y-14">
          <div className="min-h-38.75 rounded-2xl border p-4">
            <div className="space-y-5">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="size-5 rounded-sm" />
                ))}
              </div>

              {/* Review content */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
              </div>

              {/* Author and date */}
              <div className="flex items-center justify-between pt-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-end">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="size-9 rounded-xl" />
              <Skeleton className="size-5 rounded-md" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="size-4 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
