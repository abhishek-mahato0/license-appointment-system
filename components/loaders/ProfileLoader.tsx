import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function ProfileLoader() {
  return (
    <div className=" w-full h-screen">
      <div className=" grid grid-cols-3 justify-between items-center">
        {Array.from({ length: 10 }, (_, index) => (
          <Skeleton key={index} className="h-16 w-16 " />
        ))}
      </div>
    </div>
  );
}
