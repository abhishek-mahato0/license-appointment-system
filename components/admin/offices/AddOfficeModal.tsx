"use client";
import React from "react";
import { PopupModal } from "@/components/common/PopupModal";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { provinces } from "@/components/data/ProvinceList";
import { districtList } from "@/components/data/DistrictList";

type AddOfficeModalProps = {
  defaultValues?: any;
  onSubmit: (data: any) => void;
  triggerChildren: any;
  type?: string;
};
export default function AddOfficeModal({
  defaultValues,
  onSubmit,
  triggerChildren,
  type = "add",
}: AddOfficeModalProps) {
  const { register, handleSubmit, getValues, watch } = useForm({
    defaultValues,
  });

  return (
    <PopupModal
      title="Add new office"
      btnText=""
      triggerChildren={triggerChildren}
      cancelText="close"
      onClick={() => {}}
    >
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            required
            {...register("name", { required: true })}
            className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            required
            {...register("address", { required: true })}
            className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="province">Province</label>
          <select
            id="province"
            {...register("province", watch("province") && { required: true })}
            className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
          >
            {provinces.map((province, index) => (
              <option key={index} value={province?.id}>
                {province?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="province">District</label>
          <select
            id="office"
            required
            {...register("district", { required: true })}
            className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
          >
            {districtList
              .filter((ele) => ele.province_code == getValues("province"))
              .map((province, index) => {
                return (
                  <option key={index} value={province?.value}>
                    {province?.name}
                  </option>
                );
              })}
          </select>
        </div>
        <Button type="submit" className=" absolute bottom-6 right-4">
          Add
        </Button>
      </form>
    </PopupModal>
  );
}
