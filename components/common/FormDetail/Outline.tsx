import React from "react";

export default function Outline({
  children,
  title,
}: {
  children: React.ReactNode;
  title: String;
}) {
  return (
    <div className=" w-full p-3 flex flex-col text-customtext-100  border-[1px] border-customtext-100 rounded-md gap-2">
      <h3 className=" mt-[-28px] mr-2 z-20 bg-custom-50 text-custom-150 w-fit p-1 font-bold">
        {title}
      </h3>
      {children}
    </div>
  );
}
