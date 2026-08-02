import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductPageSkeleton() {
  return (
    <main className="container max-w-7xl py-20">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="grid grid-cols-4 gap-6">
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="aspect-square w-full rounded-xl"
              />
            ))}
          </div>

          <Skeleton className="col-span-3 aspect-square w-full rounded-xl" />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-12 w-4/5" />
            <Skeleton className="h-12 w-2/3" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-12" />
          </div>

          <Skeleton className="h-10 w-40" />

          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-5 w-20" />

            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="size-14 rounded-full" />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-30 w-full rounded-md" />
          </div>

          <Card className="rounded-lg border-l-4 border-muted p-4">
            <CardContent className="flex items-center gap-4 p-0">
              <Skeleton className="size-6 rounded-md" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-44" />
                <Skeleton className="h-4 w-64 max-w-full" />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-12 min-w-36 flex-1 rounded-lg" />
            <Skeleton className="size-12 rounded-lg" />
            <Skeleton className="h-12 min-w-40 flex-1 rounded-lg" />
          </div>
        </div>

        <div className="space-y-5 md:col-span-2">
          <div className="flex gap-6 border-b pb-4">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-28" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        <div className="space-y-6 md:col-span-2">
          <Skeleton className="h-8 w-52" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-4 w-2/5" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
