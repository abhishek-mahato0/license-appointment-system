"use client";
import React, { useEffect } from "react";
import { PopupModal } from "@/components/common/PopupModal";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { provinces } from "@/components/data/ProvinceList";
import { districtList } from "@/components/data/DistrictList";
import SingleSelect from "../ShadComp/SingleSelect";
import Select from "react-select";
import { customStyles } from "../MultiselectStyles";
import { licenseCategoryData } from "@/components/detailform/FormData";

type AddOfficeModalProps = {
  defaultValues?: any;
  onSubmit: (data: any) => void;
  triggerChildren: any;
  type?: string;
};
export default function AddQuestionModal({
  defaultValues,
  onSubmit,
  triggerChildren,
  type = "add",
}: AddOfficeModalProps) {
  const { register, handleSubmit, getValues, setValue, watch } = useForm({
    defaultValues: {
      ...defaultValues,
      A: defaultValues?.answers?.A,
      B: defaultValues?.answers?.B,
      C: defaultValues?.answers?.C,
      D: defaultValues?.answers?.D,
    },
  });
  const [image, setImage] = React.useState<string | null>(null);

  const categoryOptions = [
    { id: "all", label: "All", value: "All" },
    ...licenseCategoryData.options,
  ];
  const [selectedAnswer, setSelectedAnswer] = React.useState(
    defaultValues?.correct_answer || "A"
  );

  const [selectedCategory, setSelectedCategory] = React.useState<any>(
    defaultValues?.category
      ? categoryOptions.filter((ele) =>
          defaultValues?.category.includes(ele.value)
        )
      : [{ id: "all", label: "All", value: "All" }]
  );
  const [selectedType, setSelectedType] = React.useState(
    defaultValues?.type || "general"
  );

  useEffect(() => {
    setValue(
      "category",
      selectedCategory?.map((item: any) => item?.value || item)
    );
  }, [selectedCategory]);

  useEffect(() => {
    setValue("correct_answer", selectedAnswer);
  }, [selectedAnswer]);

  useEffect(() => {
    setValue("type", selectedType);
  }, [selectedType]);

  return (
    <PopupModal
      title={type === "edit" ? "Edit Question" : "Add new Question"}
      btnText=""
      triggerChildren={triggerChildren}
      cancelText="close"
      onClick={() => {}}
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
            <label htmlFor="name">Question</label>
            <input
              type="text"
              id="name"
              required
              {...register("question", { required: true })}
              className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Option A</label>
            <input
              type="text"
              id="address"
              required
              {...register("A", { required: true })}
              className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Option B</label>
            <input
              type="text"
              id="address"
              required
              {...register("B", { required: true })}
              className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Option C</label>
            <input
              type="text"
              id="address"
              required
              {...register("C", { required: true })}
              className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Option D</label>
            <input
              type="text"
              id="address"
              required
              {...register("D", { required: true })}
              className="input bg-custom-50 border-[1px] border-custom-100 p-1 focus:outline-none rounded-[4px] pl-2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address">Question Category</label>
          <Select
            options={[
              { id: "all", value: "All", label: "All" },
              ...licenseCategoryData.options,
            ]}
            placeholder="Select Category"
            onChange={(value) => {
              setSelectedCategory(value);
            }}
            isMulti
            value={selectedCategory}
            className=" py-1 rounded-[6px] w-full bg-custom-50 z-50"
            classNamePrefix={"select"}
            styles={customStyles}
          />
        </div>
        <div className=" grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Correct Answer</label>
            <SingleSelect
              data={[
                {
                  id: 1,
                  name: "A",
                  value: "A",
                },
                {
                  id: 2,
                  name: "B",
                  value: "B",
                },
                {
                  id: 3,
                  name: "C",
                  value: "C",
                },
                {
                  id: 4,
                  name: "D",
                  value: "D",
                },
              ]}
              placeholder="Select Correct Answer"
              onSelect={(data: any) => {
                setSelectedAnswer(data);
                setValue("correct_answer", data);
              }}
              value={selectedAnswer}
            />
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
                  name: "Sign",
                  value: "sign",
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
        </div>
        {type === "add" && selectedType === "sign" && (
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Image</label>
            <input
              type="file"
              id="address"
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

        <Button type="submit" className=" absolute bottom-6 right-4">
          {type === "edit" ? "Save" : "Add"}
        </Button>
      </form>
    </PopupModal>
  );
}
