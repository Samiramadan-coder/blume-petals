import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-10 w-full bg-primary/20 rounded-xl shadow-sm" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-20 w-full bg-primary/20 rounded-full shadow-sm" />
        <Skeleton className="h-20 w-full bg-primary/20 rounded-full shadow-sm" />
        <Skeleton className="h-20 w-full bg-primary/20 rounded-full shadow-sm" />
      </div>
      <Skeleton className="h-20 w-full bg-primary/20 rounded-xl shadow-sm" />
      <Skeleton className="h-20 w-full bg-primary/20 rounded-xl shadow-sm" />
      <Skeleton className="h-20 w-full bg-primary/20 rounded-xl shadow-sm" />
    </div>
  );
}
