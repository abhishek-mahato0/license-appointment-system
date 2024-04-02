"use client";
import React from "react";
import { SearchSelect } from "@/components/common/Searchselect";
import { Button } from "@/components/ui/button";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";
import { RotateCcw } from "lucide-react";

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

let gatewayData = [
  {
    id: 1,
    name: "Cash",
    value: "Cash",
    label: "Cash",
  },
  {
    id: 2,
    name: "Khalti",
    value: "Khalti",
    label: "Khalti",
  },
];

export default function FilterModal({ onsubmit }: FilterModalProps) {
  const [open, setOpen] = React.useState(false);
  const [gateway, setGateway] = React.useState("");
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [status, setStatus] = React.useState("");

  return (
    <div className=" w-[40%] items-end justify-end px-4 py-2 flex flex-col z-50 relative">
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
          <p className=" font-medium">Search By Gateway</p>
          <SingleSelect
            data={gatewayData}
            onSelect={(val: string) => setGateway(val)}
            value={gateway}
            placeholder="Select Gateway"
          />
        </div>
        <div className=" w-full flex flex-col gap-2">
          <p className="font-medium">Select Status</p>
          <div className="w-full flex items-center justify-between">
            <SingleSelect
              data={checkboxes}
              onSelect={(value: string) => setStatus(value)}
              placeholder="Select Status"
              value={status}
            />
          </div>
        </div>
        <div className=" w-full flex gap-2 justify-end items-end">
          <Button
            onClick={() => {
              setFrom("");
              setTo("");
              setStatus("");
              setGateway("");
            }}
            variant="destructive"
          >
            Clear
          </Button>
          <Button
            type="submit"
            className=" w-fit"
            onClick={() => onsubmit(from, to, status, gateway)}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
