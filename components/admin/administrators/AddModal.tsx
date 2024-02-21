"use client";
import React from "react";
import { PopupModal } from "@/components/common/PopupModal";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { officeList, provinces } from "@/components/data/ProvinceList";
export default function AddModal({
  defaultValues,
  onSubmit,
  triggerChildren,
  type = "add",
}: any) {
  const { register, handleSubmit, getValues, watch } = useForm({
    defaultValues,
  });

  return (
    <PopupModal
      title="Add Administrator"
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
            {...register("name")}
            className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="username"
            required
            {...register("username")}
            className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
          />
        </div>
        {type === "add" && (
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              {...register("password")}
              className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            required
            {...register("role")}
            className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
          >
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
            <option value="editor">Editor</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="province">Province</label>
          <select
            id="province"
            {...register("province", watch("province"))}
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
          <label htmlFor="province">Office</label>
          <select
            id="office"
            required
            {...register("office")}
            className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
          >
            {officeList
              .filter((ele) => ele.province == getValues("province"))
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
