"use client";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RecentTransactionsSkeleton } from "@/components/skeletons/recent-transactions";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  fetchTransactions,
  type Transaction,
} from "@/lib/features/transactions-slice";
import { AppDispatch, RootState } from "@/lib/store";
import { cn } from "@/lib/utils";

import { Icon } from "./icon";

interface RecentTransactionsProps {
  className?: string;
}

export default function RecentTransactions({
  className,
}: RecentTransactionsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (loading) {
    return <RecentTransactionsSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {transactions.map((transaction: Transaction, index: number) => (
        <div
          key={transaction.id}
          className="flex items-center rounded-lg hover:bg-slate-50 transition-colors px-0 md:px-4 animate-slideUp"
        >
          <Icon className="shrink-0" transaction={transaction} />
          <div className="ml-4 mr-2 flex-1">
            <p className="font-medium text-slate-800 overflow-ellipsis">
              {transaction.description}
            </p>
            <p className="text-xs text-slate-500">
              {new Date(transaction.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div
            className={cn(
              "font-normal",
              transaction.type === "income" ? "text-green-500" : "text-red-500"
            )}
          >
            {transaction.type === "income" ? "+" : "-"}
            {transaction.amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
