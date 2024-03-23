"use client";
import React, { useEffect } from "react";
import { PopupModal } from "@/components/common/PopupModal";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { licenseCategoryData } from "@/components/detailform/FormData";
import LoaderButton from "@/components/common/LoaderButton";
import SingleSelect from "@/components/common/ShadComp/SingleSelect";

type AddOfficeModalProps = {
  defaultValues?: any;
  onSubmit: (data: any) => void;
  triggerChildren: any;
  type?: string;
  loading?: boolean;
};
export default function AddNewsModal({
  defaultValues,
  onSubmit,
  triggerChildren,
  type = "add",
  loading = false,
}: AddOfficeModalProps) {
  const { register, handleSubmit, getValues, setValue, watch } = useForm({
    defaultValues,
  });
  const [image, setImage] = React.useState<string | null>(null);

  const [selectedType, setSelectedType] = React.useState(
    defaultValues?.type || "general"
  );

  useEffect(() => {
    setValue("category", selectedType);
  }, [selectedType]);

  return (
    <PopupModal
      title={type === "edit" ? "Edit News" : "Add A News"}
      btnText=""
      triggerChildren={triggerChildren}
      cancelText="close"
      onClick={() => {}}
      isHidden={true}
    >
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit((data) => onSubmit({ ...data, img: image }))}
      >
        <div
          className={` grid w-full items-center justify-center ${
            defaultValues?.img ? "grid-cols-5" : "grid-cols-1"
          } gap-1`}
        >
          {defaultValues?.img && (
            <img
              src={defaultValues?.img}
              alt="question"
              className="w-[70px] h-[70px] rounded-full"
            />
          )}
          <div className="flex flex-col gap-2 col-span-4">
            <label htmlFor="name">Title</label>
            <input
              type="text"
              id="name"
              required
              {...register("title", { required: true })}
              className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="type">Question Type</label>
          <SingleSelect
            data={[
              {
                id: 1,
                name: "General",
                value: "general",
              },
              {
                id: 2,
                name: "Hot",
                value: "hot",
              },
              {
                id: 3,
                name: "Trending",
                value: "trending",
              },
            ]}
            classNames=" border-[1px] border-custom-150"
            placeholder="Select Type"
            onSelect={(data: any) => {
              setSelectedType(data);
            }}
            value={selectedType}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address">Description</label>
          <textarea
            id="address"
            cols={30}
            rows={6}
            required
            {...register("description", { required: true })}
            className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
          />
        </div>
        {type === "add" && (
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Image</label>
            <input
              type="file"
              id="image"
              required
              {...register("img", { required: true })}
              className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
              onChange={(e: any) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(e.target.files[0]);
                fileReader.onload = () => {
                  setImage(fileReader.result as string);
                };
              }}
            />
          </div>
        )}
        <LoaderButton
          type="submit"
          className=" absolute bottom-6 right-5 z-50"
          loading={loading}
        >
          {type === "edit" ? "Save" : "Add"}
        </LoaderButton>
      </form>
    </PopupModal>
  );
}
