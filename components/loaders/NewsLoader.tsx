import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function NewsLoader() {
  return (
    <div className=" w-full px-4 h-full flex flex-col gap-4 py-5">
      <Skeleton className=" w-[70%] h-10" />
      <Skeleton className="h-[500px] w-full" />
      <Skeleton className="h-[30px] w-[40%]" />
      <Skeleton className="h-[300px] w-full" />
    </div>
  );
}
