import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function FormLoader() {
  return (
    <div className=" w-full flex px-5 py-3 flex-col mt-3">
      <Skeleton className="w-[35%] h-8 mb-5" />
      <div className=" flex flex-col gap-[50px] w-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <div className=" flex flex-col w-full gap-3">
            <Skeleton className="w-[30%] h-8" />
            <div className=" w-full gap-4 gap-y-4 grid md:grid-cols-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div className=" flex flex-col gap-2" key={i}>
                  <Skeleton key={i} className="w-[60%] h-[35px]" />
                  <Skeleton key={i} className="w-[75%] h-12 rounded-[15px]" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
