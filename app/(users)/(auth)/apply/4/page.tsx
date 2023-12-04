"use client";
import { useAppSelector } from "@/redux/TypedHooks";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AlertComponent from "@/components/common/shadcn/Alert";

export default function page() {
  const selectedCat = useAppSelector((state) => state.applynew?.selectedCat);
  const router = useRouter();
  useEffect(() => {
    if (!selectedCat) {
      router.push("/apply/3");
    }
  }, [selectedCat]);
  return (
    <div className=" w-full flex flex-col items-center justify-between">
      <h1 className=" w-full justify-start text-custom-150 text-xl font-bold">
        Select Province and Office
      </h1>
      <div className=" w-full flex flex-col items-center justify-start mt-2">
        <h2>Selected Category: {selectedCat}</h2>
      </div>
    </div>
  );
}
