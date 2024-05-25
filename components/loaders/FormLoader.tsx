import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function FormLoader() {
  return (
    <div className=" w-full flex px-5 py-3 flex-col mt-3">
      <Skeleton className="w-[35%] h-8 mb-5 mt-2" />
      <div className=" flex flex-col gap-[30px] w-full bg-custom-50 py-5 px-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div className=" flex flex-col w-full gap-3">
            <Skeleton className="w-[20%] h-5 mb-3" />
            <div className=" w-full gap-4 gap-y-4 grid md:grid-cols-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div className=" flex flex-col gap-2" key={i}>
                  <Skeleton key={i} className="w-[60%] h-[30px]" />
                  <Skeleton key={i} className="w-[75%] h-10 rounded-[10px]" />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className=" flex gap-3 w-full justify-end">
          <Skeleton className="w-[10%] h-8" />
        </div>
      </div>
    </div>
  );
}
