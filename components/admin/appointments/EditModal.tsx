"use client";
import FullFlex from "@/components/common/Fullflex";
import { PopupModal } from "@/components/common/PopupModal";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import React from "react";
import { useForm } from "react-hook-form";

type EditModalProps = {
  title: string;
  onSubmit: (value: string) => void;
  triggerChildren: JSX.Element;
  label: string;
  initialValue: string;
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
    name: "Completed",
    value: "completed",
    label: "Completed",
  },
  {
    id: 3,
    name: "Failed",
    value: "failed",
    label: "Failed",
  },
];
export default function EditModal({
  title,
  onSubmit,
  triggerChildren,
  label,
  initialValue,
}: EditModalProps) {
  const [value, setValue] = React.useState(initialValue || "");
  return (
    <PopupModal
      title={title}
      btnText=""
      triggerChildren={triggerChildren}
      cancelText="close"
      onClick={() => {}}
    >
      <div className=" w-full items-center flex gap-3 mb-3">
        <span>{label || "Select Status"}</span>
        <SingleSelect
          data={data}
          onSelect={(val: string) => setValue(val)}
          placeholder="Select Status"
          value={value}
          classNames=" w-[70%]"
        />
      </div>
      <Button
        onClick={() => onSubmit(value)}
        className=" absolute bottom-6 right-3"
      >
        Save
      </Button>
    </PopupModal>
  );
}
