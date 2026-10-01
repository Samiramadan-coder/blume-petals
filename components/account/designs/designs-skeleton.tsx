import { Skeleton } from "@/components/ui/skeleton";

export function DesignsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40 md:h-9" />
        <Skeleton className="h-4 w-28" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl bg-white">
            <Skeleton className="h-65 w-full rounded-none" />

            <div className="space-y-4 p-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-4 w-40" />

              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-10 rounded-[10px]" />
                <Skeleton className="h-10 rounded-[10px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
