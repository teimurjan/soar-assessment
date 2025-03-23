"use client";

import React, { useEffect } from "react";

import { ParentSize } from "@visx/responsive";
import { useDispatch, useSelector } from "react-redux";

import { ExpenseStatsSkeleton } from "@/components/skeletons/expense-stats";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { fetchExpenseStats } from "@/lib/features/expenses-slice";
import { AppDispatch, RootState } from "@/lib/store";

import Chart from "./chart";

export default function ExpenseStats() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.expenses
  );

  useEffect(() => {
    dispatch(fetchExpenseStats());
  }, [dispatch]);

  if (loading) {
    return <ExpenseStatsSkeleton />;
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
    <div className="w-full flex justify-center" style={{ height: "350px" }}>
      <div className="w-full max-w-full h-full">
        <ParentSize>
          {({ width, height }) => (
            <Chart width={width} height={height} categories={categories} />
          )}
        </ParentSize>
      </div>
    </div>
  );
} 