import { Skeleton } from "@/components/ui/skeleton";

export function OrderDetailsSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      {/* Order Header */}
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-4">
          <Skeleton className="size-16 rounded-xl" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-14" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="size-10 rounded-full" />
        </div>
      </div>

      <div className="border-t px-8 py-5">
        {/* Order Items */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-24" />

          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Delivery Address */}
        <div className="mt-6 space-y-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-105 max-w-full" />
        </div>

        {/* Payment Method */}
        <div className="mt-6 space-y-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Divider */}
        <Skeleton className="mt-5 h-px w-full" />

        {/* Cancel Button */}
        <Skeleton className="mt-4 h-11 w-full rounded-lg" />
      </div>
    </div>
  );
}
