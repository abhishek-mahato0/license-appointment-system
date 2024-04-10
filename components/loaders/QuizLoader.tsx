import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function QuizLoader() {
  return (
    <div className=" w-full flex px-5 py-3 flex-col">
      <div className=" flex flex-col gap-[50px] w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <div className=" flex flex-col w-full gap-3">
            <Skeleton className="w-[35%] h-8 rounded-[15px]" />
            <div className=" w-full gap-4 grid grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-10 rounded-[30px]" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
