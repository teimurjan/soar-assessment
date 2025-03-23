import { Skeleton } from "@/components/ui/skeleton";

export function QuickTransferSkeleton() {
  return (
    <div className="flex space-x-3 overflow-x-auto pb-2 animate-fadeIn">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex-shrink-0">
          <div className="flex flex-col items-center space-y-2 p-2">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
