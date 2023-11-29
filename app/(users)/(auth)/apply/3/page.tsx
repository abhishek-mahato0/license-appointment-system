import SelectOffice from "@/components/common/SelectOffice";
import React from "react";

export default function page() {
  return (
    <div className=" flex flex-col justify-start items-start gap-4">
      <h1 className=" text-custom-150 text-xl font-bold">
        Select Province and Office
      </h1>
      <SelectOffice />
    </div>
  );
}
