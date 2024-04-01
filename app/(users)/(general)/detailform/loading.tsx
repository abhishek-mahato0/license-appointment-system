import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
  return (
    <div className=" w-full h-full items-center justify-center">
      <div className=" w-[90%] h-full grid grid-cols-3 gap-4 space-y-4 space-x-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-[90px] bg-gray-400 rounded-md animate-pulse"
          />
        ))}
      </div>
      <div className=" w-[90%] h-full grid grid-cols-3 gap-4 space-y-4 space-x-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-[90px] bg-gray-400 rounded-md animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
