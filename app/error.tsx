"use client";

import { useEffect } from "react";

import { Home, RefreshCw } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: Log the error to an error reporting service later
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 text-center text-slate-700">
      <h1 className="text-4xl font-bold">Something went wrong!</h1>
      <h2 className="text-2xl font-semibold">An error occurred</h2>
      <p className="text-slate-500 max-w-md">
        We apologize for the inconvenience. Please try again or return to the
        home page.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>
        <Link href="/">
          <Button>Home</Button>
        </Link>
      </div>
    </div>
  );
}
