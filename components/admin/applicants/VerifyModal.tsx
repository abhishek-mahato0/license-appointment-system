"use client";
import LoaderButton from "@/components/common/LoaderButton";
import { PopupModal } from "@/components/common/PopupModal";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";
import { Button } from "@/components/ui/button";
import React from "react";

type EditModalProps = {
  title: string;
  onSubmit: (value: string, remarks: string) => void;
  triggerChildren: JSX.Element;
  label?: string;
  initialValue?: string;
  loading?: boolean;
};

let data = [
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
  {
    id: 3,
    name: "Rejected",
    value: "rejected",
    label: "Rejected",
  },
];
export default function VerifyModal({
  title,
  onSubmit,
  triggerChildren,
  label,
  initialValue,
  loading,
}: EditModalProps) {
  const [value, setValue] = React.useState(initialValue || "");
  const [remarks, setRemarks] = React.useState("");
  return (
    <PopupModal
      title={title}
      btnText=""
      triggerChildren={triggerChildren}
      cancelText="close"
      onClick={() => {}}
      isHidden={true}
    >
      <div className=" w-full flex flex-col gap-3">
        <span>{label || "Select Status"}</span>
        <SingleSelect
          data={data}
          onSelect={(val: string) => setValue(val)}
          placeholder="Select Status"
          value={value}
          classNames=" w-full"
        />
      </div>
      <div className=" w-full flex flex-col gap-3 my-3">
        <span>Remarks</span>
        <input
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className=" w-full border-[1px] focus:border-custom-100 border-gray-600 rounded-md p-2 outline-none focus:border-primary-500 transition-all duration-300 ease-in-out bg-custom-50"
        />
      </div>
      <LoaderButton
        onClick={() => onSubmit(value, remarks)}
        className=" absolute bottom-6 right-3"
        loading={loading}
      >
        Save
      </LoaderButton>
    </PopupModal>
  );
}
