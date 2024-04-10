import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
  return (
    <div className=" w-full flex flex-col gap-6">
      <div className=" w-full flex items-center justify-between px-10">
        <Skeleton className="w-[200px] h-10" />
        <Skeleton className="w-[200px] h-10" />
        <Skeleton className="w-[200px] h-10" />
      </div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div className=" w-full flex items-center justify-between px-10">
          <Skeleton className="w-[55%] h-[250px]" />
          <Skeleton className=" w-[41%] h-[220px]" />
        </div>
      ))}
    </div>
  );
}
