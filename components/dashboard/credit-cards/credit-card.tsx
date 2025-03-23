"use client";

import React from "react";

import Image from "next/image";

import type { Card } from "@/lib/features/cards-slice";
import { cn } from "@/lib/utils";

interface CreditCardProps extends Omit<Card, "id"> {
  className?: string;
}

export default function CreditCard({
  type,
  balance,
  cardHolder,
  cardNumber,
  validThru,
  className,
}: CreditCardProps) {
  const isDark = type === "dark";

  const formatCardNumber = (number: string) => {
    const first4 = number.slice(0, 4);
    const last4 = number.slice(-4);
    return `${first4} **** **** ${last4}`;
  };

  return (
    <div
      className={cn(
        "relative w-[265px] sm:w-[350px] h-[170px] sm:h-[235px] rounded-2xl flex flex-col justify-between",
        className,
        isDark
          ? "bg-[linear-gradient(107.38deg,_#5B5A6F_2.61%,_#000000_101.2%)] text-white"
          : "bg-white text-slate-700 border border-slate-200"
      )}
    >
      <div className="flex justify-between items-start pt-3 sm:pt-6 px-4 sm:px-6 ">
        <div>
          <p className="text-sm opacity-80">Balance</p>
          <p className="text-base sm:text-xl font-semibold">{balance}</p>
        </div>

        <Image
          src={isDark ? "/icons/chip.png" : "/icons/chip-dark.png"}
          alt="Chip"
          width={32}
          height={32}
          className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 grow-0"
        />
      </div>

      <div className="py-3 px-4 sm:px-6 sm:py-4">
        <div className="flex justify-between items-end gap-2">
          <div className="flex-2/3">
            <p className="text-xs opacity-80">CARD HOLDER</p>
            <p className="text-sm sm:text-base font-medium">{cardHolder}</p>
          </div>
          <div className="flex-1/3">
            <p className="text-xs opacity-80">VALID THRU</p>
            <p className="text-sm sm:text-base font-medium">{validThru}</p>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "flex justify-between items-center py-3 px-4 sm:px-6 sm:py-4",
          isDark ? "bg-gradient-to-b from-white/15 to-transparent" : "border-t"
        )}
      >
        <p className="font-medium tracking-wider text-base sm:text-lg">
          {formatCardNumber(cardNumber)}
        </p>
        <div className="flex items-center">
          <div
            className={cn(
              "w-5 h-5 sm:w-7 sm:h-7 rounded-full",
              isDark ? "bg-white/50" : "bg-[rgba(145,153,175,0.5)]"
            )}
          />
          <div
            className={cn(
              "w-5 h-5 sm:w-7 sm:h-7 rounded-full -ml-2.5 sm:-ml-3.5",
              isDark ? "bg-white/50" : "bg-[rgba(145,153,175,0.5)]"
            )}
          />
        </div>
      </div>
    </div>
  );
}
