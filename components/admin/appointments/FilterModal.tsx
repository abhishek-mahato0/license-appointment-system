"use client";
import React from "react";
import { SearchSelect } from "@/components/common/Searchselect";
import { categoryData } from "@/components/data/CategoryData";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";

type FilterModalProps = {
  triggerChildren?: JSX.Element;
  className?: string;
  onsubmit(
    selectedCategory: string,
    from: string,
    to: string,
    status: string
  ): void;
};

let checkboxes = [
  {
    id: 1,
    name: "Failed",
    value: "failed",
    label: "Failed",
  },
  {
    id: 2,
    name: "Pending",
    value: "pending",
    label: "Pending",
  },
  {
    id: 3,
    name: "Completed",
    value: "completed",
    label: "Completed",
  },
];

export default function FilterModal({ onsubmit }: FilterModalProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("A");
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [status, setStatus] = React.useState("pending");

  return (
    <div className=" w-full items-end justify-end px-4 py-2 flex flex-col z-50 relative">
      <Button onClick={() => setOpen(!open)}>Filter</Button>
      <div
        className={`${
          open
            ? "w-full flex flex-col items-center gap-6 bg-white shadow-lg border-t-[2px] rounded-[10px] absolute top-[54px] px-6 py-4 transition-all duration-300 ease-in-out"
            : "hidden !h-[0px] !w-[0px]"
        }`}
      >
        <h2 className=" w-full font-semibold text-xl">Filter</h2>
        <div className=" w-full flex flex-col gap-2">
          <p className=" font-medium">Filter by date range</p>
          <div className=" w-full flex gap-2 justify-between">
            <input
              type="date"
              className=" focus:outline-none outline-2 border-b-2 border-customtext-100 px-2"
              onChange={(e) => {
                setFrom(e.target.value);
              }}
            />
            <p>to</p>
            <input
              type="date"
              className=" focus:outline-none outline-2 border-b-2 border-customtext-100 px-2"
              onChange={(e) => {
                setTo(e.target.value);
              }}
            />
          </div>
        </div>
        <div className=" w-full flex flex-col gap-2">
          <p className=" font-medium">Search By Category</p>
          <SearchSelect
            data={categoryData.map((item) => ({
              ...item,
              value: item.category,
              label: item.name,
            }))}
            onSelect={(val: string) => setSelectedCategory(val)}
            placeholder="Select Category"
            className="w-full h-[200px]"
            btnclassName="w-full"
          />
        </div>
        <div className=" w-full flex flex-col gap-2">
          <p className="font-medium">Select Status</p>
          <div className="w-full flex items-center justify-between">
            <SingleSelect
              data={checkboxes}
              onSelect={(value: string) => setStatus(value)}
              placeholder="Select Status"
            />
          </div>
        </div>
        <div className=" w-full flex flex-col gap-2 justify-end items-end">
          <Button
            type="submit"
            className=" w-fit"
            onClick={() => onsubmit(selectedCategory, from, to, status)}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
