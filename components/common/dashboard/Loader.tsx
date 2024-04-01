import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loader() {
  return (
    <div className=" w-full h-full py-5">
      <div className=" grid grid-cols-2 w-full justify-between px-5 gap-4">
        <div className=" flex flex-col px-2 gap-3">
          <Skeleton className="h-[60vh] w-full" />
          <div className="flex flex-col gap-2 mt-3 w-full">
            <Skeleton className="h-[20px] w-[40%]" />
            <Skeleton className="h-[25px] w-[50%]" />
            <Skeleton className="h-[100px] w-full" />
          </div>
        </div>
        <div className=" flex flex-col gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              className="flex gap-3 items-start justify-start w-full pl-10"
              key={i}
            >
              <Skeleton key={i} className="h-[140px] w-[230px]" />
              <div className="flex flex-col gap-3">
                <Skeleton className="h-[20px] w-[150px]" />
                <Skeleton className="h-[20px] w-[160px]" />
                <Skeleton className="h-[60px] w-[350px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3 items-center justify-between mt-10 w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[310px] w-[23%]" />
        ))}
      </div>
    </div>
  );
}
