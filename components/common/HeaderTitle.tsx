import React from "react";

export default function HeaderTitle({ title }: { title: string }) {
  return (
    <div className="w-full flex items-center justify-start pt-5 pl-2 pb-4">
      <h1 className=" text-2xl font-bold leading-7 text-custom-150">{title}</h1>
    </div>
  );
}
