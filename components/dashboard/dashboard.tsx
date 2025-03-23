import React, { Suspense, lazy } from "react";

import { BalanceHistorySkeleton } from "@/components/skeletons/balance-history";
import { CreditCardsSkeleton } from "@/components/skeletons/credit-cards";
import { ExpenseStatsSkeleton } from "@/components/skeletons/expense-stats";
import { QuickTransferSkeleton } from "@/components/skeletons/quick-transfer";
import { RecentTransactionsSkeleton } from "@/components/skeletons/recent-transactions";
import { WeeklyActivitySkeleton } from "@/components/skeletons/weekly-activity";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CreditCards = lazy(() => import("./credit-cards/credit-cards"));
const WeeklyActivity = lazy(() => import("./weekly-activity/weekly-activity"));
const ExpenseStats = lazy(() => import("./expense-stats/expense-stats"));
const BalanceHistory = lazy(() => import("./balance-history/balance-history"));
const QuickTransfer = lazy(() => import("./quick-transfer/quick-transfer"));
const RecentTransactions = lazy(
  () => import("./recent-transactions/recent-transactions")
);

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-6 xl:col-span-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-700">My Cards</h2>
          <Button variant="ghost" className="text-base h-auto py-0">
            See All
          </Button>
        </div>
        <Suspense fallback={<CreditCardsSkeleton />}>
          <CreditCards />
        </Suspense>
      </div>

      <div className="col-span-12 md:col-span-6 xl:col-span-4">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">
          Recent Transaction
        </h2>
        <Card className="h-[170px] sm:h-[235px] overflow-y-auto">
          <CardContent>
            <Suspense fallback={<RecentTransactionsSkeleton />}>
              <RecentTransactions />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-12 md:col-span-8 flex flex-col">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">
          Weekly Activity
        </h2>
        <Card className="flex-1">
          <CardContent className="my-auto">
            <Suspense fallback={<WeeklyActivitySkeleton />}>
              <WeeklyActivity />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-12 md:col-span-4 flex flex-col">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">
          Expense Statistics
        </h2>
        <Card className="flex-1">
          <CardContent className="my-auto">
            <Suspense fallback={<ExpenseStatsSkeleton />}>
              <ExpenseStats />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-12 md:col-span-5 flex flex-col">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">
          Quick Transfer
        </h2>
        <Card className="flex-1">
          <CardContent className="flex-1">
            <Suspense fallback={<QuickTransferSkeleton />}>
              <QuickTransfer />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-12 md:col-span-7 flex flex-col">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">
          Balance History
        </h2>
        <Card className="flex-1">
          <CardContent className="my-auto">
            <Suspense fallback={<BalanceHistorySkeleton />}>
              <BalanceHistory />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
