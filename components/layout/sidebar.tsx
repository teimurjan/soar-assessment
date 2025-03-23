"use client";
import React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

import SidebarContent from "./sidebar-content";

export default function Sidebar() {
  const isMaxLg = useMediaQuery("lg", "down");

  if (isMaxLg) {
    return null;
  }

  return (
    <div className="hidden lg:flex flex-col w-60 bg-white border-r border-slate-200 py-6">
      <SidebarContent />
    </div>
  );
}
