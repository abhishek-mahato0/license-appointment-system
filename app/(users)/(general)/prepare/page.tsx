"use client";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";
import { categoryData } from "@/components/data/CategoryData";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

let typeOptions = [
  {
    id: 1,
    name: "General",
    value: "General",
  },
  {
    id: 2,
    name: "Traffic Signs",
    value: "signs",
  },
];
export default function page() {
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [selectedType, setSelectedType] = useState<any>("");
  return (
    <div className=" flex flex-col w-full items-start justify-start mt-5">
      <h1 className=" font-bold text-custom-150 text-xl">
        Exam Preparation Page
      </h1>
      <div className=" w-full flex justify-end p-4">
        <div className=" w-[40%] flex flex-row items-center justify-end gap-3">
          <SingleSelect
            data={categoryData.map((ele) => ({
              id: ele.id,
              name: ele.name,
              value: ele.category,
            }))}
            placeholder="Select Category"
            onSelect={(value: any) => setSelectedCategory(value)}
          />
          <SingleSelect
            data={typeOptions}
            placeholder="Select Type"
            onSelect={(value: any) => setSelectedType(value)}
          />
          <Button type="submit" className="bg-custom-150 text-white">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
