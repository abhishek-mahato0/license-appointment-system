import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Data = {
  loading: boolean;
  error: string;
  data?: Array<{ _id: string; count: number; label: string }> | {};
};

export default function ChartCard({
  data,
  children,
  title,
}: {
  data: Data;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <>
      {data.loading ? (
        <Skeleton className=" h-[380px] w-full" />
      ) : (
        <div className=" w-full h-[380px] flex flex-col items-center justify-between px-2 py-4 bg-[#FAFAFA] rounded-[10px]">
          <div className=" flex w-full items-center justify-between mb-4">
            <h3 className=" text-xl text-gray-500 font-semibold pl-2">
              {title}
            </h3>
          </div>
          {children}
        </div>
      )}
    </>
  );
}
