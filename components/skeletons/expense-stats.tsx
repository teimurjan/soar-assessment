import { Skeleton } from "@/components/ui/skeleton";

export function ExpenseStatsSkeleton() {
  return (
    <div className="flex justify-center w-full aspect-square h-full">
      <Skeleton className="w-full h-full rounded-full" />
    </div>
  );
} 