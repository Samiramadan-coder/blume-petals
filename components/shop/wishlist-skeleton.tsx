import { Skeleton } from "../ui/skeleton";

export default function WishlistSkeleton() {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="group overflow-hidden bg-background p-0 cursor-pointer"
          >
            <Skeleton className="h-64 w-full rounded-2xl" />

            <div className="flex flex-col pt-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
