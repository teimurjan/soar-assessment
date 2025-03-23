"use client";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { CreditCardsSkeleton } from "@/components/skeletons/credit-cards";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { fetchCards } from "@/lib/features/cards-slice";
import { AppDispatch, RootState } from "@/lib/store";
import { cn } from "@/lib/utils";

import CreditCard from "./credit-card";

interface CreditCardsProps {
  className?: string;
}

export default function CreditCards({ className }: CreditCardsProps) {
  const { cards, loading, error } = useSelector(
    (state: RootState) => state.cards
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  return (
    <div className={cn("flex gap-6 overflow-x-auto", className)}>
      {loading ? (
        <CreditCardsSkeleton />
      ) : error ? (
        <Alert variant="destructive" className="w-full">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        cards.map((card) => (
          <CreditCard
            key={card.id}
            className="shrink-0 grow-0"
            type={card.type}
            balance={card.balance}
            cardHolder={card.cardHolder}
            cardNumber={card.cardNumber}
            validThru={card.validThru}
          />
        ))
      )}
    </div>
  );
}
