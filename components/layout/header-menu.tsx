"use client";

import React from "react";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";


import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

import SidebarContent from "./sidebar-content";

export default function HeaderMenu() {
  const isMaxLg = useMediaQuery("lg", "down");
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    isMaxLg && (
      <Drawer direction="left" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="py-4">
          {/* Keep for a11y */}
          <DrawerTitle className="invisible absolute">Menu</DrawerTitle>
          <SidebarContent />
        </DrawerContent>
      </Drawer>
    )
  );
}
