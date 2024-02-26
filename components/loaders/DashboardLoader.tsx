import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function DashboardLoader() {
  return (
    <div className="grid w-full rounded-lg py-2 lg:grid-cols-3 gap-4 ">
      <div className="grid gap-5 md:grid-cols-3 lg:col-span-2">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton
            key={index}
            className="h-32 rounded-lg
         bg-primary-50 shadow-sm md:h-28"
          />
        ))}
      </div>
      <Skeleton
        className="h-32 rounded-lg
   bg-primary-50 shadow-sm md:h-28"
      />
    </div>
  );
}
