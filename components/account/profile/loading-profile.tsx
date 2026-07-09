import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProfile() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-20 w-full bg-primary/20 rounded-full shadow-[0_6px_20px_rgba(17,24,39,0.08)]" />
        <Skeleton className="h-20 w-full bg-primary/20 rounded-full shadow-[0_6px_20px_rgba(17,24,39,0.08)]" />
        <Skeleton className="h-20 w-full bg-primary/20 rounded-full shadow-[0_6px_20px_rgba(17,24,39,0.08)]" />
      </div>
      <Skeleton className="h-20 w-full bg-primary/20 rounded-xl shadow-[0_6px_20px_rgba(17,24,39,0.08)]" />
      <Skeleton className="h-20 w-full bg-primary/20 rounded-xl shadow-[0_6px_20px_rgba(17,24,39,0.08)]" />
      <Skeleton className="h-20 w-full bg-primary/20 rounded-xl shadow-[0_6px_20px_rgba(17,24,39,0.08)]" />
    </div>
  );
}
