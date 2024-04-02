"use client";
import LoaderButton from "@/components/common/LoaderButton";
import { PopupModal } from "@/components/common/PopupModal";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";
import { Button } from "@/components/ui/button";
import React from "react";

type EditModalProps = {
  title: string;
  onSubmit: (value: string) => void;
  triggerChildren: JSX.Element;
  label: string;
  initialValue: string;
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
    name: "Completed",
    value: "completed",
    label: "Completed",
  },
];
export default function PaymentModal({
  title,
  onSubmit,
  triggerChildren,
  label,
  initialValue,
  loading = false,
}: EditModalProps) {
  const [value, setValue] = React.useState(initialValue || "");
  return (
    <PopupModal
      title={title}
      btnText=""
      triggerChildren={triggerChildren}
      cancelText="close"
      onClick={() => {}}
      isHidden={true}
    >
      <div className=" w-full items-center flex gap-3 flex-col">
        <h2>Make Payment of Rs. 1000</h2>
      </div>
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
      <LoaderButton
        onClick={() => onSubmit(value)}
        className=" absolute bottom-6 right-3"
        loading={loading}
      >
        Save
      </LoaderButton>
    </PopupModal>
  );
}
