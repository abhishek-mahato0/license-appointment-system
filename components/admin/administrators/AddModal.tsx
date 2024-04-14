"use client";
import React, { use, useState } from "react";
import { PopupModal } from "@/components/common/PopupModal";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { provinces } from "@/components/data/ProvinceList";
import { useAppSelector } from "@/redux/TypedHooks";
import { Toffice } from "@/redux/slices/officeListSlice";
import Select from "react-select";
import { customStyles } from "@/components/common/MultiselectStyles";
import LoaderButton from "@/components/common/LoaderButton";
export default function AddModal({
  defaultValues,
  onSubmit,
  triggerChildren,
  type = "add",
  addloading,
}: any) {
  const { register, handleSubmit, getValues, watch } = useForm({
    defaultValues,
  });
  const { officeList, loading, error } = useAppSelector(
    (state) => state.officeList
  );
  const [selectedOffice, setSelectedOffice] = useState<any>([]);
  return (
    <PopupModal
      title={type == "add" ? "Add Administrator" : "Edit Administrator"}
      btnText=""
      triggerChildren={triggerChildren}
      cancelText="close"
      onClick={() => {}}
      isHidden={true}
    >
      <form
        className="w-full flex flex-col gap-3"
        onSubmit={handleSubmit((data) => {
          const payload = {
            ...data,
            office: selectedOffice?.map((item: any) => item.value),
          };
          onSubmit(payload);
        })}
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
        {!loading && officeList.length > 0 && (
          <div className="flex flex-col gap-2">
            <label htmlFor="province">Office</label>
            <Select
              options={officeList
                ?.filter(
                  (ele: Toffice) => ele.province == getValues("province")
                )
                .map((ele: Toffice) => ({
                  label: ele.name,
                  value: ele?._id || "value",
                }))}
              value={selectedOffice}
              onChange={setSelectedOffice}
              isMulti
              className=" py-1 rounded-[6px] w-[90%] bg-custom-50 z-50"
              classNamePrefix={"select"}
              styles={customStyles}
            />
          </div>
        )}
        <div className="flex gap-2 items-center justify-start">
          <input
            type="checkbox"
            id="send"
            {...register("send")}
            className=" p-3 h-5 w-9"
          />
          <label htmlFor="send">
            Send Credentials to user with above email.
          </label>
        </div>
        <LoaderButton
          loading={addloading}
          type="submit"
          className=" absolute bottom-6 right-4"
        >
          {type === "add" ? "Add" : "Save"}
        </LoaderButton>
      </form>
    </PopupModal>
  );
}
