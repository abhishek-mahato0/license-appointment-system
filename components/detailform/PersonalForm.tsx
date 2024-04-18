"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { educationData, peraddressData, personalData } from "./FormData";
import Outline from "../common/FormDetail/Outline";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { setPersonalInformation } from "@/redux/slices/profileInformationSlice";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils/convertDate";

export default function PersonalForm() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const handlePersonalData = (data: any) => {
    if (!data) {
      return toast({
        title: "Error",
        description: "Fields are required.",
      });
    }
    if (data?.dob) {
      const dob = new Date(data.dob);
      const age = new Date().getFullYear() - dob.getFullYear();
      if (age < 18) {
        return toast({
          title: "Error",
          description: "Age should be greater than 18.",
        });
      }
    }
    dispatch(setPersonalInformation(data));
    router.push("address/");
  };

  return (
    <div className=" flex flex-col w-full h-fit">
      <form
        className=" w-[100%] bg-custom-50 p-8 gap-8 flex flex-col md:h-fit max-h-[1300px]"
        onSubmit={handleSubmit((data) => handlePersonalData(data))}
      >
        <Outline title="Personal Information">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-3 items-center justify-between w-full px-3 py-2">
            {personalData.map((item: any) => {
              return (
                <div className=" flex flex-col gap-1 items-start justify-start">
                  {item.type === "select" ? (
                    <>
                      <label>{item.placeholder}</label>
                      <select
                        {...register(item.name, { required: true })}
                        className=" py-1 px-2 rounded-[6px] w-[90%] bg-custom-50 border-[1px] border-custom-100"
                      >
                        {item.options &&
                          item?.options.map((option: any) => {
                            return (
                              <option value={option.value}>
                                {option.name}
                              </option>
                            );
                          })}
                      </select>
                    </>
                  ) : (
                    <>
                      <label>{item.placeholder}</label>
                      <input
                        {...register(item.name, { required: true })}
                        placeholder={item.placeholder}
                        className=" w-[90%] py-1 px-2 rounded-[6px] bg-custom-50 border-custom-150 border-[1px] outline-1 focus:outline-none outline-custom-100"
                        type={item.type}
                      />
                      {errors[item.name]?.type === "required" && (
                        <span className=" text-xs font-light text-red-600">
                          {capitalizeFirstLetter(item.name)} is required
                        </span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </Outline>
        <Outline title="Education Information">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 items-center justify-between w-full px-3 py-2">
            {educationData.map((item) => {
              return (
                <div className=" flex flex-col gap-1 items-start justify-start">
                  {item.type === "select" ? (
                    <>
                      <label>{item.placeholder}</label>
                      <select
                        {...register(item.name, { required: true })}
                        className=" py-1 px-2 rounded-[6px] w-[90%] bg-custom-50 border-[1px] border-custom-100"
                      >
                        {item.options &&
                          item?.options.map((option) => {
                            return (
                              <option value={option.value}>
                                {option.name}
                              </option>
                            );
                          })}
                      </select>
                    </>
                  ) : (
                    <>
                      <label>{item.placeholder}</label>
                      <input
                        {...register(item.name, { required: true })}
                        placeholder={item.placeholder}
                        className=" w-[90%] py-1 px-2 rounded-[6px] bg-custom-50 border-custom-150 border-[1px] outline-1 focus:outline-none outline-custom-100"
                        type={item.type}
                      />
                      {errors[item.name]?.type === "required" && (
                        <span className=" text-xs font-light text-red-600">
                          {capitalizeFirstLetter(item.name)} is required
                        </span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </Outline>
        <div className=" flex items-center justify-end w-full">
          <Button className=" rounded-sm" type="submit">
            Next
            <p>
              <ChevronRight width={17} />
            </p>
          </Button>
        </div>
      </form>
    </div>
  );
}
