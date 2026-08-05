import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationsPageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex min-h-22 items-center justify-between gap-4 rounded-lg border px-5 py-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <Skeleton className="size-10 shrink-0 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48 sm:w-64" />
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-4">
              <Skeleton className="h-3 w-18" />
              <Skeleton className="size-4 rounded-sm" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 pt-1">
        <Skeleton className="h-8 w-20 rounded-md" />

        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className={index === 0 ? "size-9 rounded-lg" : "size-6 rounded-md"}
          />
        ))}

        <Skeleton className="h-8 w-14 rounded-md" />
      </div>
    </div>
  );
}
