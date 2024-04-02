"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";

type FilterModalProps = {
  triggerChildren?: JSX.Element;
  className?: string;
  onsubmit(selectedCategory: string, from: string, to: string): void;
};

let gatewayData = [
  {
    id: 1,
    name: "General",
    value: "General",
    label: "General",
  },
  {
    id: 2,
    name: "Featured",
    value: "Featured",
    label: "Featured",
  },
];

export default function FilterModal({ onsubmit }: FilterModalProps) {
  const [open, setOpen] = React.useState(false);
  const [gateway, setGateway] = React.useState("");
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");

  return (
    <div className=" w-[430px] items-end justify-end py-2 flex flex-col z-50 relative">
      <Button onClick={() => setOpen(!open)}>Filter</Button>
      <div
        className={`${
          open
            ? "w-full flex flex-col items-center gap-6 bg-white shadow-lg border-t-[2px] rounded-[10px] absolute top-[54px] px-6 py-4 transition-all duration-300 ease-in-out"
            : "hidden !h-[0px] !w-[0px]"
        }`}
      >
        <div className=" w-full flex justify-end items-center gap-2">
          <h2 className=" w-full font-semibold text-xl">Filter</h2>
        </div>
        <div className=" w-full flex flex-col gap-2">
          <p className=" font-medium">Filter by date range</p>
          <div className=" w-full flex gap-2 justify-between">
            <input
              type="date"
              className=" focus:outline-none outline-2 border-b-2 border-customtext-100 px-2"
              onChange={(e) => {
                setFrom(e.target.value);
              }}
              value={from}
            />
            <p>to</p>
            <input
              type="date"
              className=" focus:outline-none outline-2 border-b-2 border-customtext-100 px-2"
              onChange={(e) => {
                setTo(e.target.value);
              }}
              value={to}
            />
          </div>
        </div>
        <div className=" w-full flex flex-col gap-2">
          <p className=" font-medium">Search By Category</p>
          <SingleSelect
            data={gatewayData}
            onSelect={(val: string) => setGateway(val)}
            value={gateway}
            placeholder="Select Category"
          />
        </div>
        <div className=" w-full flex gap-2 justify-end items-end">
          <Button
            onClick={() => {
              setFrom("");
              setTo("");
              setGateway("");
            }}
            variant="destructive"
          >
            Clear
          </Button>
          <Button
            type="submit"
            className=" w-fit"
            onClick={() => onsubmit(from, to, gateway)}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
