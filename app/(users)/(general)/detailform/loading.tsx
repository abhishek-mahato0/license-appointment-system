import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
  return (
    <div className=" w-full h-full items-center justify-center">
      <div className=" w-[90%] h-full grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="w-[70px] h-[20px] bg-gray-400 rounded-md animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
