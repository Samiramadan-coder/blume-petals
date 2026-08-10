import { Skeleton } from "@/components/ui/skeleton";

export function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-2xl bg-white px-6 py-6"
        >
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-xl" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-40" />

              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-14" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-5 rounded-md" />
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-5 w-4" />
          <Skeleton className="h-5 w-4" />
          <Skeleton className="h-5 w-4" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </div>
  );
}
