import { Skeleton } from "@/components/ui/skeleton";

export function CreditCardsSkeleton() {
  return (
    <div className="flex space-x-6 w-full">
      <Skeleton className="w-[265px] sm:w-[350px] h-[170px] sm:h-[235px] shrink-0 grow-0" />
      <Skeleton className="w-[265px] sm:w-[350px] h-[170px] sm:h-[235px] shrink-0 grow-0" />
    </div>
  );
} 