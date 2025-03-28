import React, { PropsWithChildren } from "react";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Header from "@/components/layout/header";
import PageTransition from "@/components/layout/page-transition";
import Sidebar from "@/components/layout/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ReduxProvider } from "@/providers/redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soar Task",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-sans antialiased",
          geistSans.variable,
          geistMono.variable
        )}
      >
        <ReduxProvider>
          <Toaster />
          <div className="flex h-screen bg-white md:bg-slate-50">
            <Sidebar />
            <main className="flex-1 flex flex-col">
              <Header className="p-4 lg:p-8" />
              <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
                <PageTransition>{children}</PageTransition>
              </div>
            </main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
