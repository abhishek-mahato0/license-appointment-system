"use client";
import { useAppSelector } from "@/redux/TypedHooks";
import React from "react";
import { useRouter } from "next/navigation";
import SelectDateAndTime from "../_components/SelectDateAndTime";

export default function page() {
  const { selectedCat, selectedProv, selectedOffice } = useAppSelector(
    (state) => state.applynew
  );
  const router = useRouter();
  // useEffect(() => {
  //   if (!selectedCat) {
  //     router.push("/apply/3");
  //   }
  // }, [selectedCat]);
  return (
    <div className=" w-full flex flex-col items-center justify-between">
      <h1 className=" w-full justify-start text-custom-150 text-xl font-bold">
        Select Province and Office
      </h1>
      <div className=" w-full flex items-center justify-between mt-2">
        <h2 className=" font-bold border-custom-150 py-1 px-2 border-[1.5px] ">
          Selected Category:{" "}
          <span className=" text-sm font-normal pl-1">{selectedCat}</span>
        </h2>
        <h2 className=" font-bold border-custom-150 py-1 px-2 border-[1.5px] ">
          {" "}
          Selected Province:{" "}
          <span className=" text-sm font-normal pl-1">{selectedProv}</span>{" "}
        </h2>
        <h2 className=" font-bold border-custom-150 py-1 px-2 border-[1.5px] ">
          {" "}
          Selected Office:{" "}
          <span className=" text-sm font-normal pl-1">
            {selectedOffice}
          </span>{" "}
        </h2>
      </div>
      <div className=" w-full">
        <SelectDateAndTime />
      </div>
    </div>
  );
}
