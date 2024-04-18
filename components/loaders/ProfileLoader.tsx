import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function ProfileLoader() {
  return (
    <div className=" w-full h-screen flex flex-col gap-5">
      <Skeleton className="w-[200px] h-10 mt-5" />
      <div className=" w-[95%] mt-1 px-10 bg-custom-50 flex flex-col p-5">
        <div className="w-full flex items-center justify-end gap-4">
          <Skeleton className="w-[150px] h-10" />
          <Skeleton className="w-[150px] h-10" />
        </div>
        <div className=" w-full flex flex-col gap-4 mt-5">
          <div className=" px-6 grid w-full md:grid-cols-3 grid-cols-1">
            <Skeleton className="w-[300px] h-[300px] col-span-1" />
            <div className=" w-full grid md:grid-cols-3 col-span-2 gap-y-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div className=" w-full flex flex-col gap-2 mb-2" key={i}>
                  <Skeleton key={i} className="w-[130px] h-10" />
                  <Skeleton key={i} className="w-[150px] h-10" />
                </div>
              ))}
            </div>
          </div>
          <div className=" w-full grid md:grid-cols-3 gap-2 mt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className=" flex flex-col gap-2" key={i}>
                <Skeleton key={i} className="w-[130px] h-10" />
                <Skeleton key={i} className="w-[150px] h-10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
