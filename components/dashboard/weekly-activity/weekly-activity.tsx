"use client";

import React, { useEffect } from "react";

import { ParentSize } from "@visx/responsive";
import { useDispatch, useSelector } from "react-redux";

import { WeeklyActivitySkeleton } from "@/components/skeletons/weekly-activity";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { fetchWeeklyActivity } from "@/lib/features/activity-slice";
import { AppDispatch, RootState } from "@/lib/store";

import Chart from "./chart";

export default function WeeklyActivity() {
  const dispatch = useDispatch<AppDispatch>();
  const { weeklyData, loading, error } = useSelector(
    (state: RootState) => state.activity
  );

  useEffect(() => {
    dispatch(fetchWeeklyActivity());
  }, [dispatch]);

  if (loading) {
    return <WeeklyActivitySkeleton />;
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
    <div className="w-full">
      <div className="flex items-center justify-end space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-sm text-slate-600">Deposit</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-black" />
          <span className="text-sm text-slate-600">Withdraw</span>
        </div>
      </div>

      <ParentSize>
        {({ width, height: containerHeight }) => {
          const height = Math.min(containerHeight || 300, width * 0.6);
          return (
            <Chart width={width} height={height} weeklyData={weeklyData} />
          );
        }}
      </ParentSize>
    </div>
  );
}
