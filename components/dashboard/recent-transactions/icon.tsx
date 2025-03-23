import {
  ArrowRightSquare,
  Car,
  FileText,
  Film,
  ShoppingCart,
  Utensils,
} from "lucide-react";

import { Transaction } from "@/lib/features/transactions-slice";
import { cn } from "@/lib/utils";

interface IconProps {
  transaction: Transaction;
  className?: string;
}

const iconMap = {
  Shopping: ShoppingCart,
  Food: Utensils,
  Transport: Car,
  Entertainment: Film,
  Bills: FileText,
  Transfer: ArrowRightSquare,
} as const;

const bgColorClasses = {
  amber: "bg-amber-100",
  blue: "bg-blue-100",
  green: "bg-green-100",
  purple: "bg-purple-100",
  red: "bg-red-100",
  gray: "bg-slate-100",
  orange: "bg-orange-100",
};

const textColorClasses = {
  amber: "text-amber-500",
  blue: "text-blue-500",
  green: "text-green-500",
  purple: "text-purple-500",
  red: "text-red-500",
  gray: "text-slate-500",
  orange: "text-orange-500",
};

const colorMap = {
  Shopping: "amber",
  Food: "blue",
  Transport: "green",
  Entertainment: "purple",
  Bills: "red",
  Transfer: "orange",
} as const;

export function Icon({ transaction, className }: IconProps) {
  const categoryName = transaction.category as keyof typeof colorMap;
  const Icon = iconMap[categoryName];
  const color =
    colorMap[transaction.category as keyof typeof colorMap] || "gray";

  return (
    <div
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center",
        bgColorClasses[color],
        className
      )}
    >
      <Icon className={cn("h-5 w-5", textColorClasses[color])} />
    </div>
  );
}
