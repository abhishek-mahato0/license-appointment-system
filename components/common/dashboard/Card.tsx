import React, { ReactNode } from "react";

type TCard = {
  title: string;
  count: any;
  children?: ReactNode;
};
export default function DashboardCard({ title, count, children }: any) {
  return (
    <div className=" px-6 py-5 w-[240px] bg-custom-50 rounded-[10px] shadow-md ">
      <div className=" w-full flex flex-col items-start justify-start gap-3">
        <h2 className=" text-xl text-customtext-100 font-bold">{title}</h2>
        <div className=" flex justify-between w-full items-center text-custom-150">
          <p className=" font-bold text-3xl ">{count}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
