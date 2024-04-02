"use client";
import LoaderButton from "@/components/common/LoaderButton";
import { PopupModal } from "@/components/common/PopupModal";
import React from "react";

type EditModalProps = {
  title: string;
  onSubmit: () => void;
  triggerChildren: JSX.Element;
  loading?: boolean;
};
export default function AddPaymentModal({
  title,
  onSubmit,
  triggerChildren,
  loading = false,
}: EditModalProps) {
  return (
    <PopupModal
      title={title}
      btnText=""
      triggerChildren={triggerChildren}
      cancelText="close"
      onClick={() => {}}
      isHidden={true}
    >
      <div className="w-full items-center justify-start flex">
        <h2>Make Payment of Rs. 1000 for this User</h2>
      </div>
      <LoaderButton
        onClick={() => onSubmit()}
        className=" absolute bottom-6 right-3"
        loading={loading}
      >
        Save
      </LoaderButton>
    </PopupModal>
  );
}
