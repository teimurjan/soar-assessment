import { Search as LucideSearch } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchProps {
  className?: string;
}

export default function Search({ className }: SearchProps) {
  return (
    <div className={cn("relative", className)}>
      <Input
        type="text"
        placeholder="Search for something"
        className="w-full pl-10"
      />
      <LucideSearch className="absolute left-3 top-4 h-4 w-4 text-slate-400" />
    </div>
  );
}
