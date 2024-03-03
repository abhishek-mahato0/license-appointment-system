import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function PageLoader() {
  return (
    <div className="flex flex-col space-y-3">
      <div className=" flex justify-between items-center w-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-6 rounded-sm" />
        ))}
      </div>
      <div className=" grid grid-cols-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[100px] w-[250px] " />
        ))}
      </div>
    </div>
  );
}
