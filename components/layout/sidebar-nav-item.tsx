import React from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href: string;
}

export function SidebarNavItem({
  icon,
  label,
  active = false,
  href,
}: SidebarNavItemProps) {
  return (
    <Link href={href} passHref>
      <div
        className={cn(
          "flex items-center space-x-4 px-4 py-3 rounded-lg",
          active ? "text-slate-900" : "text-slate-500 hover:bg-slate-100"
        )}
      >
        <div className="text-xl">{icon}</div>
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
}
