import { TransactionSkeleton } from "./transaction";

export function RecentTransactionsSkeleton() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <TransactionSkeleton />
      <TransactionSkeleton />
      <TransactionSkeleton />
      <TransactionSkeleton />
    </div>
  );
} 