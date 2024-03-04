"use client";
import LoaderButton from "@/components/common/LoaderButton";
import { PopupModal } from "@/components/common/PopupModal";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";
import { Button } from "@/components/ui/button";
import React from "react";
import SelectDateAndTime from "./SelectDateAndTime";
type IInfo = {
  add_id: string;
  medical: any;
  written: any;
  trial: any;
  selectedCat: string;
  selectedOffice: string;
};
type ReModalProps = {
  data: IInfo;
  title: string;
  onSubmit: (value: string) => void;
  triggerChildren: JSX.Element;
  label: string;
  initialValue: string;
  loading?: boolean;
};
export default function RescheduleModal({
  data,
  title,
  onSubmit,
  triggerChildren,
  label,
  initialValue,
  loading = false,
}: ReModalProps) {
  const [value, setValue] = React.useState(initialValue || "");
  return (
    <PopupModal
      title={title}
      btnText=""
      triggerChildren={triggerChildren}
      cancelText="close"
      onClick={() => {}}
    >
      <div className=" overflow-y-scroll h-[380px]">
        <SelectDateAndTime info={data} />
      </div>
      {/* <LoaderButton
        onClick={() => onSubmit(value)}
        className=" absolute bottom-6 right-3"
        loading={loading}
      >
        Save
      </LoaderButton> */}
    </PopupModal>
  );
}
