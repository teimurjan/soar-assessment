"use client";

import React from "react";

import {
  FileCheck,
  Home,
  Wallet,
  Users,
  TrendingUp,
  CreditCard,
  Banknote,
  Settings,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarNavItem } from "./sidebar-nav-item";

const navItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Wallet,
    label: "Transactions",
    href: "#",
  },
  {
    icon: Users,
    label: "Accounts",
    href: "#",
  },
  {
    icon: TrendingUp,
    label: "Investments",
    href: "#",
  },
  {
    icon: CreditCard,
    label: "Credit Cards",
    href: "#-cards",
  },
  {
    icon: Banknote,
    label: "Loans",
    href: "#",
  },
  {
    icon: Wrench,
    label: "Services",
    href: "#",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];

export default function SidebarContent() {
  const pathname = usePathname();

  return (
    <div>
      <Link href="/" className="px-6 mb-8 block">
        <div className="flex items-center space-x-2 text-xl font-bold text-gray-800">
          <FileCheck />
          <span>Soar Task</span>
        </div>
      </Link>

      <div className="space-y-1 px-3 flex-1">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.label}
            icon={<item.icon className="h-6 w-6" />}
            label={item.label}
            href={item.href}
            active={pathname === item.href}
          />
        ))}
      </div>
    </div>
  );
}
