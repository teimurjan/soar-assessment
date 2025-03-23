"use client";

import React, { useEffect } from "react";

import { Bell, Menu, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { AvatarSkeleton } from "@/components/skeletons/avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fetchUser } from "@/lib/features/user-slice";
import { AppDispatch, RootState } from "@/lib/store";
import { cn } from "@/lib/utils";

import HeaderMenu from "./header-menu";
import Search from "./search";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.user);
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/") {
      return "Overview";
    } else if (pathname === "/settings") {
      return "Settings";
    }
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className={cn("bg-white lg:border-b", className)}>
      <div className="flex justify-between items-center">
        <HeaderMenu />

        <h1 className="text-2xl font-semibold text-slate-700">{getTitle()}</h1>

        <div className="flex items-center space-x-4">
          <Search className="hidden lg:block" />
          <Button
            className="max-lg:hidden rounded-full size-10"
            variant="secondary"
            size="icon"
          >
            <Bell />
          </Button>
          <Link href="/settings">
            <Button
              className="max-lg:hidden rounded-full size-10"
              variant="secondary"
              size="icon"
            >
              <Settings />
            </Button>
          </Link>
          {loading ? (
            <AvatarSkeleton />
          ) : (
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>

      <Search className="block lg:hidden w-full mt-4" />
    </div>
  );
}
