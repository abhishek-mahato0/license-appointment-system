import React from "react";

type TCard = {
  title: string;
  children: React.ReactNode;
};

export default function ChartCard({ title, children }: TCard) {
  return (
    <div className=" w-full h-[380px] flex flex-col items-center justify-between px-3 py-4 bg-[#FAFAFA] rounded-[10px]">
      <div className=" flex w-full items-center justify-between mb-4">
        <h3 className=" text-xl text-customtext-100 font-semibold pl-10">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
