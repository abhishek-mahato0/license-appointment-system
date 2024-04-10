import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
  return (
    <div className=" w-full grid grid-cols-4 gap-x-6 gap-y-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-[140px] rounded-[20px]" />
      ))}
    </div>
  );
}
