import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
  return (
    <div className=" w-full flex flex-col gap-6">
      <Skeleton className="w-[200px] h-10" />
      <div className=" w-full flex items-center justify-between px-40">
        <Skeleton className="w-[40%] h-11" />
        <Skeleton className=" w-[40%] h-11" />
      </div>
    </div>
  );
}
