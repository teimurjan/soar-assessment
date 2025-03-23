"use client";

import React, { useEffect } from "react";

import { ParentSize } from "@visx/responsive";
import { useDispatch, useSelector } from "react-redux";

import { BalanceHistorySkeleton } from "@/components/skeletons/balance-history";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { fetchBalanceHistory } from "@/lib/features/balance-slice";
import { AppDispatch, RootState } from "@/lib/store";

import Chart from "./chart";

export default function BalanceHistory() {
  const dispatch = useDispatch<AppDispatch>();
  const { history, loading, error } = useSelector(
    (state: RootState) => state.balance
  );

  useEffect(() => {
    dispatch(fetchBalanceHistory());
  }, [dispatch]);

  if (loading) {
    return <BalanceHistorySkeleton />;
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
    <div className="relative w-full h-56">
      <ParentSize>
        {({ width, height }) => (
          <Chart width={width} height={height} history={history} />
        )}
      </ParentSize>
    </div>
  );
} 