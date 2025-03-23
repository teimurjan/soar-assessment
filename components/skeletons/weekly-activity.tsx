import { Skeleton } from "@/components/ui/skeleton";

export function WeeklyActivitySkeleton() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-end space-x-4 mb-4">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-20 h-6" />
      </div>
      <Skeleton className="w-full h-[300px]" />
    </div>
  );
} 