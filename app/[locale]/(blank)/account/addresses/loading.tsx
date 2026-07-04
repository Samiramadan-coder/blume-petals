import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-10 w-full bg-primary/20 rounded-xl" />
      <Skeleton className="h-40 w-full bg-primary/20 rounded-xl" />
      <Skeleton className="h-40 w-full bg-primary/20 rounded-xl" />
      <Skeleton className="h-40 w-full bg-primary/20 rounded-xl" />
    </div>
  );
}
