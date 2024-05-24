import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function NewsLoader() {
  return (
    <div className=" w-full px-4 h-full flex flex-col gap-4 py-5">
      <Skeleton className=" w-[70%] h-10" />
      <Skeleton className="h-[30rem] w-full" />
      <Skeleton className="h-[30px] w-[40%]" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-[1rem] w-full" />
      ))}
    </div>
  );
}
