"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";

type FilterModalProps = {
  triggerChildren?: JSX.Element;
  className?: string;
  onsubmit(applied: string, byemail: string, status: string): void;
};

let checkboxes = [
  {
    id: 1,
    name: "Pending",
    value: "pending",
    label: "Pending",
  },
  {
    id: 2,
    name: "Verified",
    value: "verified",
    label: "Verified",
  },
];

export default function FilterModal({ onsubmit }: FilterModalProps) {
  const [open, setOpen] = React.useState(false);
  const [byemail, setByEmail] = React.useState("");
  const [applied, setApplied] = React.useState("");
  const [status, setStatus] = React.useState("");

  return (
    <div className=" w-[60%] items-end justify-end px-4 py-2 flex flex-col z-50 relative">
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
        <div className=" w-full flex gap-2 justify-between px-3">
          <div className=" w-1/2 flex gap-2 items-center">
            <label className=" font-bold text-[14px]">Has Applied</label>
            <input
              type="checkbox"
              className=" focus:outline-none outline-2 border-b-2 border-customtext-100 px-2 h-6 w-6"
              onChange={(e) => setApplied(String(e.target.checked))}
              checked={applied === "true" ? true : false}
            />
          </div>
          <div className=" w-1/2 flex gap-2">
            <label className=" font-bold text-[14px]">
              Is Verified By Email
            </label>
            <input
              type="checkbox"
              className=" focus:outline-none outline-2 border-b-2 border-customtext-100 px-2  h-6 w-6"
              onChange={(e) => {
                setByEmail(String(e.target.checked));
              }}
              checked={byemail === "true" ? true : false}
            />
          </div>
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
              setByEmail("");
              setApplied("");
              setStatus("");
            }}
            variant="destructive"
          >
            Clear
          </Button>
          <Button
            type="submit"
            className=" w-fit"
            onClick={() => onsubmit(applied, byemail, status)}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
